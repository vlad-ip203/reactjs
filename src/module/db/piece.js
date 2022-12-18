import {Leak} from "./leak"


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