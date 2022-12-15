import {doc, getDoc, getDocs, addDoc, deleteDoc} from "firebase/firestore"
import {hashSync, genSaltSync} from "bcryptjs-react"

import {database} from "../../index"
import {DB, queryDocument} from "./db"
import {LeakData} from "./leak"
import {Log} from "../log"


export class User {
    id
    docSnap
    name
    role
    bookmarks


    constructor(id: string = DB.Roles.GUEST) {
        this.id = id
    }


    isGuest: boolean = () => this.id === DB.Roles.GUEST

    async getUserDocumentSnapshot() {
        if (this.isGuest)
            return null

        if (!this.docSnap) { //Not fetched yet
            const docRef = doc(database, DB.Users.COLLECTION, this.id)

            const docSnap = await getDoc(docRef)
            if (!docSnap) {
                Log.w("user::User::getUserDocumentSnapshot: unable to find the user")
                Log.w("user::User::getUserDocumentSnapshot:   - id = " + this.id)
                return null
            }

            this.docSnap = docSnap
        }
        return this.docSnap
    }

    async getName() {
        if (!this.name) {
            const docSnap = await this.getUserDocumentSnapshot()
            if (!docSnap) return null

            this.name = await docSnap.get(DB.Users.FIELD_NAME)
        }
        return this.name
    }

    async getRole() {
        if (!this.role) {
            const docSnap = await this.getUserDocumentSnapshot()
            if (!docSnap) return null

            this.role = await docSnap.get(DB.Users.FIELD_ROLE).id
        }
        return this.role
    }


    async getBookmarks() {
        if (!this.bookmarks) {
            const docSnap = await this.getUserDocumentSnapshot()
            if (!docSnap) return null

            const docRefs = DB.Users.Bookmarks.all(docSnap)
            const docs = await getDocs(docRefs)

            let bookmarks = []
            docs.forEach(d => bookmarks.push(d.data()))
            this.bookmarks = bookmarks
        }
        return this.bookmarks
    }

    async isBookmarked(data: LeakData) {
        const bookmarks = await this.getBookmarks()
        return bookmarks.some(value => value.leak === data.leak)
    }

    async addBookmark(data: LeakData) {
        const docSnap = await this.getUserDocumentSnapshot()
        if (!docSnap) return

        const docRef = await addDoc(DB.Users.Bookmarks.all(docSnap), data)
        Log.v("user::addBookmarks: bookmark added with id = " + docRef.id)

        this.bookmarks.push(data)
    }

    async removeBookmark(data: LeakData) {
        const docSnap = await this.getUserDocumentSnapshot()
        if (!docSnap) return

        //FIXME 12/16/2022: Would it work with snapshot?
        const bookmarkDocSnap = await queryDocument(DB.Users.Bookmarks.all(docSnap), DB.Users.Bookmarks.FIELD_LEAK, data.leak)
        void deleteDoc(bookmarkDocSnap)

        let iToRemove
        this.bookmarks.forEach((value, i) => {
            if (value.leak === data.leak)
                iToRemove = i
        })
        this.bookmarks.splice(iToRemove, 1)
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
    const docSnap = await queryDocument(DB.Users.all(), DB.Users.FIELD_EMAIL, email)
    if (!docSnap) {
        Log.w("user::getUserByCredentials: unable to find the user")
        Log.w("user::getUserByCredentials:   - email = " + email)
        return null
    }

    const password_hash = docSnap.get(DB.Users.FIELD_PASSWORD_HASH)
    const password_salt = docSnap.get(DB.Users.FIELD_PASSWORD_SALT)

    const generated_hash = hashSync(password, password_salt)

    if (generated_hash && generated_hash === password_hash)
        return new User(docSnap.id)
    return null
}