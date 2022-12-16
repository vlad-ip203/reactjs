import {collection, getDocs, where} from "firebase/firestore"

import {database} from "../../index"
import {DB, getDocSnapshot, querySingleDoc} from "./db"
import {Log} from "../log"


export class Leak {
    leakID: string
    docSnapshot = null
    piecesPath: string

    email: string
    pieces: []


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


export class Piece {
    //Firestore data converter
    // noinspection JSUnusedGlobalSymbols
    static FIRESTORE_CONVERTER = {
        toFirestore: (obj: Piece) => {
            return {
                login: obj.login,
                nickname: obj.nickname,
                password_hash: obj.password_hash,
                tel: obj.tel,
            }
        },
        fromFirestore: (snapshot, options) => {
            const dict = snapshot.data(options)
            return new Piece(
                snapshot.id,
                dict.login,
                dict.nickname,
                dict.password_hash,
                dict.tel,
            )
        },
    }

    leak: Leak
    pieceID: string

    login: string
    nickname: string
    password_hash: string
    tel: string


    constructor(pieceID: string, login = "", nickname = "", password_hash = "", tel = "") {
        this.pieceID = pieceID
        this.login = login
        this.nickname = nickname
        this.password_hash = password_hash
        this.tel = tel
    }

    setLeak = (value: Leak) => this.leak = value

    getPieceRef = () => this.leak.piecesPath + "/" + this.pieceID
    getFriendlyPieceRef = () => this.leak.leakID + "@" + this.pieceID
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