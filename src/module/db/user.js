import {Context} from "react"
import {doc, getDoc, getDocs, addDoc, deleteDoc, where, updateDoc} from "firebase/firestore"
import {hashSync, genSaltSync} from "bcryptjs-react"

import {database} from "../../index"
import {DB, querySingleDoc, getDocSnapshot, queryDocs} from "./db"
import {Piece, Leak} from "./leak"
import {Log} from "../log"


export class User {
    userID: string
    docSnapshot = null

    name: string
    role: string
    bookmarks: Piece[]


    constructor(id: string) {
        this.userID = id ? id : DB.Roles.GUEST
    }

    async getDocSnapshot() {
        if (this.isGuest()) {
            Log.i("user::getDocSnapshot: no snapshot for a guest")
            return null
        }

        return this.docSnapshot = await getDocSnapshot(
            this.docSnapshot,
            DB.Users.COLLECTION,
            this.userID)
    }


    isGuest: boolean = () => this.userID === DB.Roles.GUEST

    async getName() {
        if (this.name) //Already fetched
            return this.name

        const snap = await this.getDocSnapshot()
        if (!snap) return null

        return this.name = await snap.get(DB.Users.FIELD_NAME)
    }

    async setName(dispatch: Context, value: string) {
        const ref = doc(database, DB.Users.COLLECTION, this.userID)
        try {
            await updateDoc(ref, {name: value})
        } catch (e) {
            Log.e("user::User::setName: unable to update the user")
            Log.e("user::User::setName:   - name old = " + this.name)
            Log.e("user::User::setName:   - name new = " + value)
            Log.e("user::User::setName:   = catching: " + e)
            return false
        }

        this.name = value
        return true
    }

    async getRole() {
        if (this.role) //Already fetched
            return this.role

        const snap = await this.getDocSnapshot()
        if (!snap) return null

        const doc = await snap.get(DB.Users.FIELD_ROLE)
        return this.role = doc.id
    }


    async getBookmarks() {
        if (this.bookmarks) //Already fetched
            return this.bookmarks

        const snap = await this.getDocSnapshot()
        if (!snap) return null

        const docRefs = DB.Users.Bookmarks.all(snap)
        const docs = await getDocs(docRefs)

        const docsSplit = []
        docs.forEach(d => docsSplit.push(d))

        let bookmarks: Piece[] = []
        for (const doc of docsSplit) {
            const leakID = doc.get(DB.Users.Bookmarks.FIELD_LEAK_ID)
            const pieceID = doc.get(DB.Users.Bookmarks.FIELD_PIECE_ID)

            const leak = new Leak(leakID)
            const piece = await leak.getPiece(pieceID)
            piece.setLeak(leak)
            Log.v("user::User::getBookmarks: leak piece retrieved = " + piece.getFriendlyPieceRef())

            bookmarks.push(piece)
        }
        return this.bookmarks = bookmarks
    }

    async isBookmarked(piece: Piece) {
        const bookmarks = await this.getBookmarks()
        return bookmarks.some(bookmark =>
            bookmark.getPieceRef() === piece.getPieceRef())
    }

    async addBookmark(piece: Piece) {
        const snap = await this.getDocSnapshot()
        if (!snap) return

        const docRef = await addDoc(
            DB.Users.Bookmarks.all(snap),
            {
                leakID: piece.leak.leakID,
                pieceID: piece.pieceID,
            })
        Log.v("user::User::addBookmarks: bookmark added with id = " + docRef.id)

        this.bookmarks.push(piece)
    }

    async removeBookmark(piece: Piece) {
        const snap = await this.getDocSnapshot()
        if (!snap) return

        try {
            const docs = await queryDocs(DB.Users.Bookmarks.all(snap),
                [
                    where(DB.Users.Bookmarks.FIELD_LEAK_ID, "==", piece.leak.leakID),
                    where(DB.Users.Bookmarks.FIELD_PIECE_ID, "==", piece.pieceID),
                ])

            docs.forEach(doc => {
                Log.v("user::User::removeBookmark: trying to delete the document")
                Log.v("user::User::removeBookmark:   - id = " + doc.id)

                void deleteDoc(doc.ref)
            })
        } catch (e) {
            Log.e("user::User::removeBookmark: unable to delete the document")
            Log.e("user::User::removeBookmark:   - leakID  = " + piece.leak.leakID)
            Log.e("user::User::removeBookmark:   - pieceID = " + piece.pieceID)
            Log.e("user::User::removeBookmark:   = catching: " + e)
            return
        }

        let removeI
        this.bookmarks.forEach((value, i) => {
            if (value.getPieceRef() === piece.getPieceRef())
                removeI = i
        })
        this.bookmarks.splice(removeI, 1)
    }
}

export const USER_GUEST = new User()


export async function addUser(name: string, email: string, password: string) {
    const generated_salt = genSaltSync(12)
    const generated_hash = hashSync(password, generated_salt)
    const role = doc(DB.Roles.all(), DB.Roles.USER)

    try {
        const docRef = await addDoc(DB.Users.all(), {
            name: name,
            email: email,
            password_hash: generated_hash,
            password_salt: generated_salt,
            role: role,
        })

        Log.v("user::addUser: a user was added to the database")
        Log.v("user::addUser:   - id   = " + docRef.id)
        Log.v("user::addUser:   - name = " + name)
        return getUserByID(docRef.id)
    } catch (e) {
        Log.e("user::addUser: unable to add a user")
        Log.e("user::addUser:   - name  = " + name)
        Log.e("user::addUser:   - email = " + email)
        Log.e("user::addUser:   = catching: " + e)
        return null
    }
}

async function getUserByID(id: string) {
    const docRef = doc(database, DB.Users.COLLECTION, id)
    const docSnap = await getDoc(docRef)
    if (!docSnap) {
        Log.w("user::getUserByID: unable to find the user")
        Log.w("user::getUserByID:   - id = " + id)
        return null
    }
    return new User(docSnap.id)
}

export async function getUserByCredentials(email: string, password: string) {
    const snap = await querySingleDoc(DB.Users.all(),
        where(DB.Users.FIELD_EMAIL, "==", email))
    if (!snap) {
        Log.w("user::getUserByCredentials: unable to find the user")
        Log.w("user::getUserByCredentials:   - email = " + email)
        return null
    }

    const password_hash = snap.get(DB.Users.FIELD_PASSWORD_HASH)
    const password_salt = snap.get(DB.Users.FIELD_PASSWORD_SALT)

    const generated_hash = hashSync(password, password_salt)

    if (generated_hash && generated_hash === password_hash)
        return new User(snap.id)
    return null
}