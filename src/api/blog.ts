import { api_host } from "@/const/host"
import { authorizationHeader } from "@/helpers/headers"
import { Categories, ChunkResponse } from "@/types/common"
import { DocPost, Post } from "@/types/post"

export const blog = {
    getLast: async(category?: keyof Categories): Promise<DocPost[]> => {
        try {
            const headers = new Headers()
            const authHeader = authorizationHeader()
            headers.append('authorization', authHeader || '')
            const url = `${api_host}/portfolio/last${ category ? `/${category}` : '' }?limit=5`
            const res = await fetch(url, { method: "GET", headers: headers, cache: 'no-store' })
            if (res.ok) {
                const json = await res.json()
                if (json?.error === true) throw new Error(json?.text)
                const posts = json as DocPost[]
                return posts
            } else return []
        } catch(e) {
            console.warn(e)
            return []
        }
    },
    getAll: async(category?: keyof Categories): Promise<ChunkResponse<DocPost[]>> => {
        try {
            const headers = new Headers()
            const authHeader = authorizationHeader()
            headers.append('authorization', authHeader || '')
            const url = `${api_host}/portfolio/all${ category ? `/${category}` : '' }?skip=0`
            const res = await fetch(url, { method: "GET", headers: headers, cache: 'no-store' })
            if (res.ok) {
                const posts = await res.json() as ChunkResponse<DocPost[]>
                return posts
            }
            return { count: 0, data: [], next: '' }
        } catch(e) {
            console.log(e)
            return { count: 0, data: [], next: '' }
        }
    },
    getById: async(postId: string) => {
        try {
            const headers = new Headers()
            const authHeader = authorizationHeader()
            headers.append('authorization', authHeader || '')
            const url = `${api_host}/portfolio/${postId}`
            const res = await fetch(url, { method: "GET", headers: headers, cache: 'no-store' })
            if (res.ok) return await res.json() as DocPost | null
            return null
        } catch(e) {
            console.log(e)
            return null
        }
    },
    deleteOne: async(postId: string): Promise<true | null> => {
        try {
            const headers = new Headers()
            const authHeader = authorizationHeader()
            headers.append('authorization', authHeader || '')
            const url = `${api_host}/portfolio/${postId}`
            const res = await fetch(url, { method: "DELETE", headers: headers })
            if (res.ok) return Boolean(await res.text()) as true | null
            return null
        } catch(e) {
            console.log(e)
            return null
        }
    },
    updateOne: async(postId: string, post: Post) => {
        try {
            const headers = new Headers()
            const authHeader = authorizationHeader()
            headers.append('Content-Type', 'application/json')
            headers.append('authorization', authHeader || '')
            const body = JSON.stringify(post, null, 2)
            const url = `${api_host}/portfolio/${postId}`
            const res = await fetch(url, { method: "PATCH", body: body, headers: headers })
            if (res.ok) return await res.json() as DocPost | null
            return null
        } catch(e) {
            console.log(e)
            return null
        }
    },
    search: async(query: string) => {
        try {
            const headers = new Headers()
            const authHeader = authorizationHeader()
            headers.append('Content-Type', 'application/json')
            headers.append('authorization', authHeader || '')
            const url = `${api_host}/portfolio/search/${query.toLowerCase()}`
            const res = await fetch(url, { method: "GET", headers: headers })
            if (res.ok) return await res.json() as DocPost[]
            return []
        } catch(e) {
            console.log(e)
            return []
        }
    },
    addOne: async(postId: string, post: Post) => {
        try {
            const headers = new Headers()
            const authHeader = authorizationHeader()
            headers.append('Content-Type', 'application/json')
            headers.append('authorization', authHeader || '')
            const body = JSON.stringify(post, null, 2)
            const url = `${api_host}/portfolio/${postId}`
            const res = await fetch(url, { method: "POST", body: body, headers: headers })
            if (res.ok) return await res.json() as DocPost | null
            return null
        } catch(e) {
            console.log(e)
            return null
        }
    }
}