export default class UserDataStore {
    _data: {};
    _auth: boolean;

    constructor(){
        this._data = {}
        this._auth = false
    }

    set (data: any) {
        this._data = data
        this._auth = true
    }

    get data() {
        return this._data
    }
    
    get auth() {
        return this._auth
    }
}