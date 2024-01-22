import { api_host } from "@/const/host"
import { authorizationHeader } from "../helpers/headers"
import { DocNote, Note } from "@/types/notes"

export const notes = (() => {
    return {
        getNoteById: async(noteId: string): Promise<DocNote | null> => {
            try {
                const headers = new Headers()
                const authHeader = authorizationHeader()
                headers.append('authorization', authHeader || '')
                const url = `${api_host}/notes/${noteId}`
                const res = await fetch(url, { method: 'GET', headers: headers })
                if (res.ok) return await res.json() as DocNote
                return null
            } catch(e) {
                console.warn(e)
                return null
            }
        },
        getAllForUser: async(userId: string): Promise<DocNote[]> => {
            try {
                const headers = new Headers()
                const authHeader = authorizationHeader()
                headers.append('authorization', authHeader || '')
                const url = `${api_host}/notes/uid/${userId}`
                const res = await fetch(url, { method: 'GET', headers: headers })
                if (res.ok) return await res.json() as DocNote[]
                return []
            } catch(e) {
                console.warn(e)
                return []
            }
        },
        deleteOne: async(noteId: string): Promise<true | null> => {
            try {
                const headers = new Headers()
                const authHeader = authorizationHeader()
                headers.append('authorization', authHeader || '')
                const url = `${api_host}/notes/${noteId}`
                const res = await fetch(url, { method: "DELETE", headers: headers })
                if (res.ok) return Boolean(await res.text()) as true | null
                return null
            } catch(e) {
                console.log(e)
                return null
            }
        },
        updateOne: async(noteId: string, note: Note) => {
            try {
                const headers = new Headers()
                const authHeader = authorizationHeader()
                headers.append('Content-Type', 'application/json')
                headers.append('authorization', authHeader || '')
                const body = JSON.stringify(note, null, 2)
                const url = `${api_host}/notes/${noteId}`
                const res = await fetch(url, { method: "PATCH", body: body, headers: headers })
                if (res.ok) return await res.json() as DocNote | null
                return null
            } catch(e) {
                console.log(e)
                return null
            }
        },
        addOne: async(noteId: string, note: Note) => {
            try {
                const headers = new Headers()
                const authHeader = authorizationHeader()
                headers.append('Content-Type', 'application/json')
                headers.append('authorization', authHeader || '')
                const body = JSON.stringify(note, null, 2)
                const url = `${api_host}/notes/${noteId}`
                const res = await fetch(url, { method: "POST", body: body, headers: headers })
                if (res.ok) return await res.json() as DocNote | null
                return null
            } catch(e) {
                console.log(e)
                return null
            }
        }
    }
})()