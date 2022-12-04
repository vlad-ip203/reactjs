import {collection, doc, getDoc, query, where, getDocs, addDoc} from "firebase/firestore"
import {hashSync, genSaltSync} from "bcryptjs-react"

import {Log} from "./log"
import {database} from "../index"


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


export async function findDoc(table: string, row: string, value: string) {
    const docs = await findDocs(table, row, value)
    if (docs.size !== 1)
        Log.i("db::findDoc: found " + docs.size + " docs instead of 1")

    let out = null
    if (docs)
        docs.forEach(docRef => out = docRef)
    return out
}

async function findDocs(table: string, row: string, value: string) {
    try {
        const docRefs = await collection(database, table)
        //Query docs
        const q = query(docRefs, where(row, "==", value))
        //Return all of them
        return await getDocs(q)
    } catch (e) {
        Log.e("db::findDocs: unable to perform a query")
        Log.e("db::findDocs:   - table = " + table)
        Log.e("db::findDocs:   - row   = " + row)
        Log.e("db::findDocs:   - value = " + value)
        Log.e("db::findDocs:   = catching: " + e)
        return null
    }
}


export async function addUser(name: string, email: string, password: string) {
    const generated_salt = genSaltSync(12)
    const generated_hash = hashSync(password, generated_salt)

    try {
        const docRef = await addDoc(collection(database, Database.USERS), {
            name: name,
            email: email,
            password_hash: generated_hash,
            password_salt: generated_salt,
        })

        Log.v("db::addUser: user added to database")
        Log.v("db::addUser:   - id   = " + docRef.id)
        Log.v("db::addUser:   - name = " + name)
        return getUserByID(docRef.id)
    } catch (e) {
        Log.e("db::addUser: unable to add user")
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
        Log.w("db::getUserByID: unable to find user")
        Log.w("db::getUserByID:   - id = " + id)
        return null
    }

    return {
        id: docSnap.id,
        name: docSnap.get(Database.USERS_NAME),
    }
}

export async function getUserByCredentials(email: string, password: string) {
    const docRef = await findDoc(Database.USERS, Database.USERS_EMAIL, email)
    if (!docRef) {
        Log.w("db::getUserByCredentials: unable to find user")
        Log.w("db::getUserByCredentials:   - email = " + email)
        return null
    }

    const password_hash = docRef.get(Database.USERS_PASSWORD_HASH)
    const password_salt = docRef.get(Database.USERS_PASSWORD_SALT)

    const generated_hash = hashSync(password, password_salt)

    if (generated_hash && generated_hash === password_hash)
        return {
            id: docRef.id,
            name: docRef.get(Database.USERS_NAME),
        }
    return null
}