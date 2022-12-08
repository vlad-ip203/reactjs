import {collection, doc, getDoc, query, where, getDocs, addDoc} from "firebase/firestore"
import {hashSync, genSaltSync} from "bcryptjs-react"

import {database} from "../index"
import {Log} from "./log"


export class Database {
    static USERS = "users"
    static USERS_NAME = "name"
    static USERS_EMAIL = "email"
    static USERS_PASSWORD_HASH = "password_hash"
    static USERS_PASSWORD_SALT = "password_salt"
}

export const USER_GUEST = {
    id: "guest",
    name: "Guest",
}


export function allUsers() {
    return collection(database, Database.USERS)
}

export function allLeaks() {
    return collection(database, Database.LEAKS)
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


export async function addUser(name: string, email: string, password: string) {
    const generated_salt = genSaltSync(12)
    const generated_hash = hashSync(password, generated_salt)

    try {
        const docRef = await addDoc(allUsers(), {
            name: name,
            email: email,
            password_hash: generated_hash,
            password_salt: generated_salt,
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

    return {
        id: docSnap.id,
        name: docSnap.get(Database.USERS_NAME),
    }
}

export async function getUserByCredentials(email: string, password: string) {
    const document = await queryDocument(allUsers(), Database.USERS_EMAIL, email)
    if (!document) {
        Log.w("db::getUserByCredentials: unable to find the user")
        Log.w("db::getUserByCredentials:   - email = " + email)
        return null
    }

    const password_hash = document.get(Database.USERS_PASSWORD_HASH)
    const password_salt = document.get(Database.USERS_PASSWORD_SALT)

    const generated_hash = hashSync(password, password_salt)

    if (generated_hash && generated_hash === password_hash)
        return {
            id: document.id,
            name: document.get(Database.USERS_NAME),
        }
    return null
}