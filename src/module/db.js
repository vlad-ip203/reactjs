// noinspection JSUnresolvedFunction,JSUnresolvedVariable

import {collection, doc, getDoc, query, where, getDocs, addDoc} from "firebase/firestore"
import {hashSync, genSaltSync} from "bcryptjs-react"

import {database} from "../index"
import {Log} from "./log"


export class Database {
    static ROLES = "roles"
    static ROLES_ADMIN = "admin"
    static ROLES_GUEST = "guest"
    static ROLES_MODERATOR = "moderator"
    static ROLES_USER = "user"
    static USERS = "users"
    static USERS_NAME = "name"
    static USERS_EMAIL = "email"
    static USERS_ROLE = "role"
    static USERS_PASSWORD_HASH = "password_hash"
    static USERS_PASSWORD_SALT = "password_salt"
    static LEAKS = "leaks"
    static LEAKS_EMAIL = "email"
    static LEAKS_DATA = "data"
}


export class User {
    id
    docSnap
    name
    role

    constructor(id: string) {
        this.id = id ? id : Database.ROLES_GUEST
    }

    async getUserDocumentSnapshot() {
        if (this.id === Database.ROLES_GUEST)
            return null

        if (!this.docSnap) { //Not fetched yet
            const docRef = doc(database, Database.USERS, this.id)

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

    async getName(): Promise<null | string> {
        if (!this.name) {
            const docSnap = await this.getUserDocumentSnapshot()
            if (!docSnap)
                return null

            this.name = await docSnap.get(Database.USERS_NAME)
        }
        return this.name
    }

    async getRole(): Promise<null | string> {
        if (!this.role) {
            const docSnap = await this.getUserDocumentSnapshot()
            if (!docSnap)
                return null

            this.role = await docSnap.get(Database.USERS_ROLE).id
        }
        return this.role
    }

    isGuest: boolean = () => this.id === Database.ROLES_GUEST
}

export const USER_GUEST = new User()


export const allRoles = () => collection(database, Database.ROLES)
export const allUsers = () => collection(database, Database.USERS)
export const allLeaks = () => collection(database, Database.LEAKS)


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


export async function addUser(name: string, email: string, password: string) {
    const generated_salt = genSaltSync(12)
    const generated_hash = hashSync(password, generated_salt)
    const role = doc(allRoles(), Database.ROLES_USER)

    try {
        const docRef = await addDoc(allUsers(), {
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
    const docRef = doc(database, Database.USERS, id)
    const docSnap = await getDoc(docRef)
    if (!docSnap) {
        Log.w("db::getUserByID: unable to find the user")
        Log.w("db::getUserByID:   - id = " + id)
        return null
    }
    return new User(docSnap.id)
}

export async function getUserByCredentials(email: string, password: string) {
    const docSnap = await queryDocument(allUsers(), Database.USERS_EMAIL, email)
    if (!docSnap) {
        Log.w("db::getUserByCredentials: unable to find the user")
        Log.w("db::getUserByCredentials:   - email = " + email)
        return null
    }

    const password_hash = docSnap.get(Database.USERS_PASSWORD_HASH)
    const password_salt = docSnap.get(Database.USERS_PASSWORD_SALT)

    const generated_hash = hashSync(password, password_salt)

    if (generated_hash && generated_hash === password_hash)
        return new User(docSnap.id)
    return null
}


export class LeakData {
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

//Firestore data converter
const leakDataConverter = {
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


export async function getLeaks(email: string) {
    const document = await queryDocument(allLeaks(), Database.LEAKS_EMAIL, email)
    if (!document) {
        Log.w("db::getLeaks: unable to find leaks")
        Log.w("db::getLeaks:   - email = " + email)
        return []
    }

    const docRefs = collection(database, document.ref.path + "/" + Database.LEAKS_DATA).withConverter(leakDataConverter)
    const docs = await getDocs(docRefs)

    let leaks = []
    docs.forEach(d => {
        const leak = d.data()
        leak.person_id = document.id
        leak.person_email = email
        leak.leak_id = d.id
        leaks.push(leak)
    })
    return leaks
}