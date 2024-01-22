import { api_host } from "@/const/host"
import { authorizationHeader } from "@/helpers/headers"
import { NicknameReference, ShortUserData } from "@/types/user"

export const user = {
    byId: {
        short: async(userId: string): Promise<ShortUserData | null> => {
            try {
                const headers = new Headers()
                const authHeader = authorizationHeader()
                headers.append('authorization', authHeader || '')
                const userRes = await fetch(`${api_host}/users/uid/${userId}`, { method: 'GET', cache: 'no-store', headers: headers })
                const user: ShortUserData | null = await userRes.json()
                return user
            } catch(e) {
                console.log(e)
                return null
            }
        },
        updateProfile: async(uid: string, data: { displayName?: string, photoURL?: string }) => {
            try {
                const headers = new Headers()
                const authHeader = authorizationHeader()
                headers.append('authorization', authHeader || '')
                headers.append('Content-Type', 'application/json')
                const url = `${api_host}/users/uid/${uid}`
                const res = await fetch(url, { 
                    method: 'POST', 
                    headers: headers,
                    body: JSON.stringify(data)
                })
                if (res.ok) return Boolean(await res.json())
                return false
            } catch(e) {
                return false
            }
        },
        update: async(uid: string, field: object) => {
            try {
                const headers = new Headers()
                const authHeader = authorizationHeader()
                headers.append('authorization', authHeader || '')
                headers.append('Content-Type', 'application/json')
                const url = `${api_host}/users/claim/${uid}`
                const res = await fetch(url, { 
                    method: 'POST', 
                    headers: headers,
                    body: JSON.stringify(field)
                })
                if (res.ok) return await res.json() as ShortUserData | null
                return null
            } catch(e) {
                return null
            }
        }
    },
    byNick: {
        short: async(nick: string, check: boolean): Promise<boolean | ShortUserData | null> => {
            try {
                const headers = new Headers()
                const authHeader = authorizationHeader()
                headers.append('authorization', authHeader || '')
                const res = await fetch(`${api_host}/users/nickname/${nick}${check ? '?check=true' : ''}`, { method: 'GET', cache: 'no-store', headers: headers })
                if (check) return Boolean(await res.text())
                const user: ShortUserData | null = await res.json()
                return user
            } catch(e) {
                console.log(e)
                return null
            }
        },
        create: async(nick: string, uid: string) => {
            try {
                const headers = new Headers()
                const authHeader = authorizationHeader()
                headers.append('authorization', authHeader || '')
                const url = `${api_host}/users/nickname/${nick}?uid=${uid}`
                const res = await fetch(url, { method: 'POST', headers: headers })
                if (res.ok) return await res.json() as NicknameReference
                return null
            } catch(e) {
                console.log(e)
                return null
            }
        },
        delete: async(nick: string): Promise<boolean> => {
            try {
                const headers = new Headers()
                const authHeader = authorizationHeader()
                headers.append('authorization', authHeader || '')
                const url = `${api_host}/users/nickname/${nick}`
                const res = await fetch(url, { method: 'Delete', headers: headers })
                if (res.ok) return Boolean(await res.text())
                return false
            } catch(e) {
                console.log(e)
                return false
            }
        }
    }
}