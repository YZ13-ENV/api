import { api_host } from "@/const/host"
import { DocTeam } from "@/types/team"
import { ChunkResponse, DocDraftShotData, DocShotData, DraftForUpload, DraftShotData, ShotData, authorizationHeader } from ".."

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
  },
  shots: {
      all: async(id: string, order?: string, category?: string): Promise<ChunkResponse<DocShotData[]>> => {
          try {
              const headers = new Headers()
              const authHeader = authorizationHeader()
              headers.append('authorization', authHeader || '')
              const url = order && category
              ? `${api_host}/team/${id}/shots/${order}/${category}`
              : order
              ? `${api_host}/team/${id}/shots/${order}`
              : `${api_host}/team/${id}/shots`
              const res = await fetch(url, { method: 'GET', headers: headers })
              if (res.ok) return (await res.json() as ChunkResponse<DocShotData[]>)
              return { count: 0, data: [], next: '' }
          } catch(e) {
              console.warn(e)
              return { count: 0, data: [], next: '' }
          }
      },
  },
  drafts: {
      all: async(id: string, order?: string, category?: string): Promise<ChunkResponse<DocShotData[]>> => {
          try {
              const headers = new Headers()
              const authHeader = authorizationHeader()
              headers.append('authorization', authHeader || '')
              const url = order && category
              ? `${api_host}/team/${id}/shots/${order}/${category}?onlyDrafts=true`
              : order
              ? `${api_host}/team/${id}/shots/${order}?onlyDrafts=true`
              : `${api_host}/team/${id}/shots?onlyDrafts=true`
              const res = await fetch(url, { method: 'GET', headers: headers })
              if (res.ok) return (await res.json() as ChunkResponse<DocShotData[]>)
              return { count: 0, data: [], next: '' }
          } catch(e) {
              console.warn(e)
              return { count: 0, data: [], next: '' }
          }
      },
  },
  draft: {
    get: async(id: string, draftId: string): Promise<DocDraftShotData | null> => {
      try {
        const headers = new Headers()
        const authHeader = authorizationHeader()
        headers.append('authorization', authHeader || '')
        const url = `${api_host}/team/${id}/draft/${draftId}`
        const res = await fetch(url, { method: "GET", headers: headers })
        if (res.ok) {
          return await res.json() as DocDraftShotData
        } else return null
      } catch(e) {
        return null
      }
    },
    create: async(id: string, draftId: string, draft: DraftForUpload): Promise<boolean> => {
      try {
        const headers = new Headers()
        const authHeader = authorizationHeader()
        headers.append('authorization', authHeader || '')
        headers.append('Content-Type', 'application/json')
        const url = `${api_host}/team/${id}/draft/${draftId}`
        const res = await fetch(url, { method: "POST", headers: headers, body: JSON.stringify(draft) })
        if (res.ok) {
          return Boolean(res.text())
        } else return false
      } catch(e) {
        return false
      }
    },
    update: async(id: string, draftId: string, draft: DraftShotData): Promise<DraftShotData | null> => {
      try {
        const headers = new Headers()
        const authHeader = authorizationHeader()
        headers.append('authorization', authHeader || '')
        headers.append('Content-Type', 'application/json')
        const url = `${api_host}/team/${id}/draft/${draftId}`
        const res = await fetch(url, { method: "PATCH", headers: headers, body: JSON.stringify(draft) })
        if (res.ok) {
          return await res.json() as DraftShotData
        } else return null
      } catch(e) {
        return null
      }
    },
    delete: async(id: string, draftId: string): Promise<boolean> => {
      try {
        const headers = new Headers()
        const authHeader = authorizationHeader()
        headers.append('authorization', authHeader || '')
        const url = `${api_host}/team/${id}/draft/${draftId}`
        const res = await fetch(url, { method: "DELETE", headers: headers })
        if (res.ok) {
          return Boolean(res.text())
        } else return false
      } catch(e) {
        return false
      }
    }
  },
  shot: {
    get: async(id: string, shotId: string): Promise<DocShotData | null> => {
      try {
        const headers = new Headers()
        const authHeader = authorizationHeader()
        headers.append('authorization', authHeader || '')
        const url = `${api_host}/team/${id}/shot/${shotId}`
        const res = await fetch(url, { method: "", headers: headers })
        if (res.ok) {
          return await res.json() as DocShotData
        } else return null
      } catch(e) {
        return null
      }
    },
    create: async(id: string, shotId: string, draft: ShotData): Promise<boolean> => {
      try {
        const headers = new Headers()
        const authHeader = authorizationHeader()
        headers.append('authorization', authHeader || '')
        headers.append('Content-Type', 'application/json')
        const url = `${api_host}/team/${id}/shot/${shotId}`
        const res = await fetch(url, { method: "POST", headers: headers, body: JSON.stringify(draft) })
        if (res.ok) {
          return Boolean(await res.text())
        } else return false
      } catch(e) {
        return false
      }
    },
    update: async(id: string, shotId: string, shot: ShotData): Promise<boolean> => {
      try {
        const headers = new Headers()
        const authHeader = authorizationHeader()
        headers.append('authorization', authHeader || '')
        headers.append('Content-Type', 'application/json')
        const url = `${api_host}/team/${id}/shot/${shotId}`
        const res = await fetch(url, { method: "PATCH", headers: headers, body: JSON.stringify(shot) })
        if (res.ok) {
          return Boolean(await res.text())
        } else return false
      } catch(e) {
        return false
      }
    },
    delete: async(id: string, shotId: string): Promise<boolean> => {
      try {
        const headers = new Headers()
        const authHeader = authorizationHeader()
        headers.append('authorization', authHeader || '')
        const url = `${api_host}/team/${id}/shot/${shotId}`
        const res = await fetch(url, { method: "DELETE", headers: headers })
        if (res.ok) {
          return Boolean(await res.text())
        } else return false
      } catch(e) {
        return false
      }
    }
  }
}