import {collection, query, where, getDocs} from "firebase/firestore"

import {database} from "../../index"
import {Log} from "../log"


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