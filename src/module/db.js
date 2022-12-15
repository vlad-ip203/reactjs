// noinspection JSUnresolvedFunction,JSUnresolvedVariable

import {collection, doc, getDoc, query, where, getDocs, addDoc, deleteDoc} from "firebase/firestore"
import {hashSync, genSaltSync} from "bcryptjs-react"

import {database} from "../index"
import {Log} from "./log"


export class DB {
    static Roles = class {
        static COLLECTION = "roles"

        static ADMIN = "admin"
        static GUEST = "guest"
        static MODERATOR = "moderator"
        static USER = "user"

        static all = () => collection(database, this.COLLECTION)
    }
    static Users = class {
        static COLLECTION = "users"

        static FIELD_NAME = "name"
        static FIELD_EMAIL = "email"
        static FIELD_ROLE = "role"
        static FIELD_PASSWORD_HASH = "password_hash"
        static FIELD_PASSWORD_SALT = "password_salt"

        static Bookmarks = class {
            static COLLECTION = "bookmarks"

            static FIELD_LEAK = "leak"

            static all = (userDocSnap) => collection(database, userDocSnap.ref.path + "/" + this.COLLECTION)
        }

        static all = () => collection(database, this.COLLECTION)
    }
    static Leaks = class {
        static COLLECTION = "leaks"

        static FIELD_EMAIL = "email"

        static Data = class {
            static COLLECTION = "data"
        }

        static all = () => collection(database, this.COLLECTION)
    }
}


export async function queryDocument(there, by: string, value: string) {
    const docs = await queryDocuments(there, by, value)
    if (docs.size !== 1)
        Log.i("db::queryDocument: found " + docs.size + " docs instead of 1")

    let out = null
    if (docs)
        docs.forEach(docRef => out = docRef)
    return out
}

async function queryDocuments(there, by: string, value: string) {
    try {
        //Query docs
        const q = query(there, where(by, "==", value))
        //Return all of them
        return await getDocs(q)
    } catch (e) {
        Log.e("db::queryDocuments: unable to perform a query")
        Log.e("db::queryDocuments:   - there = " + there)
        Log.e("db::queryDocuments:   - by    = " + by)
        Log.e("db::queryDocuments:   - value = " + value)
        Log.e("db::queryDocuments:   = catching: " + e)
        return null
    }
}


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
        if (this.id === DB.Roles.GUEST)
            return null

        if (!this.docSnap) { //Not fetched yet
            const docRef = doc(database, DB.Users.COLLECTION, this.id)

            const docSnap = await getDoc(docRef)
            if (!docSnap) {
                Log.w("db::User::getUserDocumentSnapshot: unable to find the user")
                Log.w("db::User::getUserDocumentSnapshot:   - id = " + this.id)
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
        Log.v("db::addBookmarks: bookmark added with id = " + docRef.id)

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

        Log.v("db::addUser: a user was added to the database")
        Log.v("db::addUser:   - id   = " + docRef.id)
        Log.v("db::addUser:   - name = " + name)
        return getUserByID(docRef.id)
    } catch (e) {
        Log.e("db::addUser: unable to add a user")
        Log.e("db::addUser:   - name  = " + name)
        Log.e("db::addUser:   - email = " + email)
        Log.e("db::addUser:   = catching: " + e)
        return null
    }
}

async function getUserByID(id: string) {
    const docRef = doc(database, DB.Users.COLLECTION, id)
    const docSnap = await getDoc(docRef)
    if (!docSnap) {
        Log.w("db::getUserByID: unable to find the user")
        Log.w("db::getUserByID:   - id = " + id)
        return null
    }
    return new User(docSnap.id)
}

export async function getUserByCredentials(email: string, password: string) {
    const docSnap = await queryDocument(DB.Users.all(), DB.Users.FIELD_EMAIL, email)
    if (!docSnap) {
        Log.w("db::getUserByCredentials: unable to find the user")
        Log.w("db::getUserByCredentials:   - email = " + email)
        return null
    }

    const password_hash = docSnap.get(DB.Users.FIELD_PASSWORD_HASH)
    const password_salt = docSnap.get(DB.Users.FIELD_PASSWORD_SALT)

    const generated_hash = hashSync(password, password_salt)

    if (generated_hash && generated_hash === password_hash)
        return new User(docSnap.id)
    return null
}


export class LeakData {
    //Firestore data converter
    static CONVERTER = {
        toFirestore: (data) => {
            return {
                login: data.login,
                nickname: data.nickname,
                password_hash: data.password_hash,
                tel: data.tel,
            }
        },
        fromFirestore: (snapshot, options) => {
            const data = snapshot.data(options)
            return new LeakData(data.login, data.nickname, data.password_hash, data.tel)
        },
    }

    person_id
    person_email
    leak_id

    constructor(login = "", nickname = "", password_hash = "", tel = "") {
        this.login = login
        this.nickname = nickname
        this.password_hash = password_hash
        this.tel = tel
    }

    getID = () => this.person_id + this.leak_id
}

export async function getLeaks(email: string) {
    const docSnap = await queryDocument(DB.Leaks.all(), DB.Leaks.FIELD_EMAIL, email)
    if (!docSnap) {
        Log.w("db::getLeaks: unable to find leaks")
        Log.w("db::getLeaks:   - email = " + email)
        return []
    }

    const docRefs = collection(database, docSnap.ref.path + "/" + DB.Leaks.Data.COLLECTION)
        .withConverter(LeakData.CONVERTER)
    const docs = await getDocs(docRefs)

    let leaks = []
    docs.forEach(d => {
        const leak = d.data()
        leak.person_id = docSnap.id
        leak.person_email = email
        leak.leak_id = d.id
        leaks.push(leak)
    })
    return leaks
}