import { api_host } from "@/const/host"
import { authorizationHeader } from "@/helpers/headers"

export const auth = {
    travel: async(uid: string): Promise<string | null> => {
        try {
            const headers = new Headers()
            const authHeader = authorizationHeader()
            headers.append('authorization', authHeader || '')
            const url = `${api_host}/auth/travel?uid=${uid}`
            const res = await fetch(url, { method: "GET", headers: headers, cache: 'no-store' })
            if (res.ok) return await res.text()
            return null
        } catch(e) {
            console.warn(e)
            return null
        }
    }
}