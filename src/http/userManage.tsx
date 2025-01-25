import { httpUrl } from "@/helpers/httpsUrl"
import { ILoginData } from "@/pages/authPage/Interface"

const url = httpUrl('/')

export class UserManage {

    async register (body: ILoginData) {
        const { data } = await url.post('/register', body)
        return data
    }

    async login (body: ILoginData) {
        const { data } = await url.post('/login', body)
        return data
    }

    async profile () {
        const { data } = await url.get('/profile')
        return data
    }

}