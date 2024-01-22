import { api_host } from "@/const/host"
import { authorizationHeader } from "@/helpers/headers"

export const notifications = {
    push: async(message: string) => {
        // feedback push-message
        try {
            const headers = new Headers()
            const authHeader = authorizationHeader()
            headers.append('authorization', authHeader || '')
            const key = process.env.NEXT_PUBLIC_PUSH_KEY
            if (!key) throw new Error('No key')
            const res = await fetch(`${api_host}/notifications/pushMe?key=${key}&message=${message}`, { method: 'POST', headers: headers })
            return res.ok
        } catch(e) {
            console.log(e)
            return false
        }
    }
}