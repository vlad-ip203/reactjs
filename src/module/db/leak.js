import {collection, getDocs} from "firebase/firestore"

import {database} from "../../index"
import {queryDocument, DB} from "./db"
import {Log} from "../log"


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
        Log.w("leak::getLeaks: unable to find leaks")
        Log.w("leak::getLeaks:   - email = " + email)
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