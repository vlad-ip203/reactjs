import {collection, getDocs, where, addDoc} from "firebase/firestore"

import {database} from "../../index"
import {DB, getDocSnapshot, querySingleDoc} from "./db"
import {Log} from "../log"
import {Piece} from "./piece"


export class Leak {
    leakID: string
    docSnapshot = null
    piecesPath: string

    email: string
    pieces: Piece[]


    constructor(id: string) {
        this.leakID = id
    }

    async getDocSnapshot() {
        return this.docSnapshot = await getDocSnapshot(
            this.docSnapshot,
            DB.Leaks.COLLECTION,
            this.leakID)
    }


    async getEmail() {
        if (this.email) //Already fetched
            return this.email

        const snap = await this.getDocSnapshot()
        return this.email = snap.get(DB.Leaks.FIELD_EMAIL)
    }

    async getPieces() {
        if (this.pieces) //Already fetched
            return this.pieces

        const snap = await this.getDocSnapshot()
        this.piecesPath = snap.ref.path + "/" + DB.Leaks.Pieces.COLLECTION

        const docRefs = collection(database, this.piecesPath)
            .withConverter(Piece.FIRESTORE_CONVERTER)
        const docs = await getDocs(docRefs)

        let out: Piece[] = []
        docs.forEach(d => {
            const piece = d.data()
            piece.setLeak(this)
            out.push(piece)
        })
        return this.pieces = out
    }

    async getPiece(id: string) {
        if (!this.pieces) //Not yet fetched
            await this.getPieces()

        let piece = null
        this.pieces.forEach(value => {
            if (value.pieceID === id)
                piece = value
        })
        return piece
    }
}


export async function addLeak(email: string, pieces: []) {
    const leakByEmailSnap = await querySingleDoc(DB.Leaks.all(),
        where(DB.Leaks.FIELD_EMAIL, "==", email))

    let leakRef
    if (leakByEmailSnap) {
        Log.i("leak::addLeak: email already exists, merging leaks")
        leakRef = leakByEmailSnap.ref
    } else
        try {
            leakRef = await addDoc(DB.Leaks.all(), {
                email: email,
            })

            Log.v("user::addUser: a leak was added to the database")
            Log.v("user::addUser:   - id = " + leakRef.id)
        } catch (e) {
            Log.e("user::addUser: unable to add a leak")
            Log.e("user::addUser:   - email = " + email)
            Log.e("user::addUser:   = catching: " + e)
            return
        }

    try {
        for (const piece of pieces) {
            const pieceRef = await addDoc(DB.Leaks.Pieces.all(leakRef), piece)

            Log.v("user::addUser: a leak piece was added to the database")
            Log.v("user::addUser:   - id = " + pieceRef.id)
        }
    } catch (e) {
        Log.e("user::addUser: unable to add pieces")
        Log.e("user::addUser:   = catching: " + e)
    }
}

export async function getLeak(email: string) {
    const snap = await querySingleDoc(DB.Leaks.all(),
        where(DB.Users.FIELD_EMAIL, "==", email))
    if (!snap) {
        Log.e("leak::getLeak: unable to find the document")
        Log.e("leak::getLeak:   - email = " + email)
        return null
    }
    return new Leak(snap.id)
}