import { api_host } from "@/const/host"
import { DocTeam } from "@/types/team"
import { authorizationHeader } from ".."

export const team = {
  get: async(id: string) => {
    try {
      const headers = new Headers()
      const authHeader = authorizationHeader()
      headers.append('authorization', authHeader || '')
      const url = `${api_host}/team/${id}`
      const res = await fetch(url, { method: "GET", headers: headers })
      if (res.ok) {
        return await res.json() as DocTeam
      } else return null
    } catch(e) {
      return null
    }
  },
  create: async(id: string) => {
    try {
      const headers = new Headers()
      const authHeader = authorizationHeader()
      headers.append('authorization', authHeader || '')
      headers.append('Content-Type', 'application/json')
      const url = `${api_host}/team/${id}`
      const res = await fetch(url, { method: "POST", headers: headers, body: JSON.stringify(team) })
      if (res.ok) {
        return await res.json() as DocTeam
      } else return null
    } catch(e) {
      return null
    }
  },
  update: async(id: string) => {
    try {
      const headers = new Headers()
      const authHeader = authorizationHeader()
      headers.append('authorization', authHeader || '')
      headers.append('Content-Type', 'application/json')
      const url = `${api_host}/team/${id}`
      const res = await fetch(url, { method: "PATCH", headers: headers, body: JSON.stringify(team) })
      if (res.ok) {
        return await res.json() as DocTeam
      } else return null
    } catch(e) {
      return null
    }
  },
  delete: async(id: string) => {
    try {
      const headers = new Headers()
      const authHeader = authorizationHeader()
      headers.append('authorization', authHeader || '')
      const url = `${api_host}/team/${id}`
      const res = await fetch(url, { method: "DELETE", headers: headers })
      if (res.ok) {
        return Boolean(await res.text())
      } else return false
    } catch(e) {
      return false
    }
  }
}