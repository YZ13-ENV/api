import { api_host } from "@/const/host"
import { DocTeam, DocTeamInvite, Team, TeamInvite, TeamScratch } from "@/types/team"
import { ChunkResponse, CommentBlock, DocDraftShotData, DocShotData, DraftForUpload, DraftShotData, ShotData, authorizationHeader } from ".."

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
  create: async(id: string, team: TeamScratch) => {
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
  update: async(id: string, team: Partial<Team>) => {
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
  likes: async(id: string): Promise<Array<ShotData['likes']>> => {
    try {
        const headers = new Headers()
        const authHeader = authorizationHeader()
        headers.append('authorization', authHeader || '')
        const res = await fetch(`${api_host}/team/${id}/likes`, {
            method: 'GET',
            headers: headers
        })
        if (res.ok) {
            return await res.json() as Array<ShotData['likes']>
        } else return []
    } catch(e) {
        console.log(e)
        return []
    }
  },
  followings: async(id: string): Promise<string[]> => {
      try {
          const headers = new Headers()
          const authHeader = authorizationHeader()
          headers.append('authorization', authHeader || '')
          const res = await fetch(`${api_host}/team/${id}/following`, {
              method: 'GET',
              headers: headers
          })
          if (res.ok) {
              return await res.json() as string[]
          } else return []
      } catch(e) {
          console.log(e)
          return []
      }
  },
  mostPopularShot: async(id: string): Promise<DocShotData | null> => {
      try {
          if (!id) throw new Error('uid is not provided')
          const headers = new Headers()
          const authHeader = authorizationHeader()
          headers.append('authorization', authHeader || '')
          const url = `${api_host}/team/${id}/popular`
          const res = await fetch(url, { method: 'GET', headers: headers })
          if (res.ok) return await res.json() as DocShotData
          return null
      } catch(e) {
          return null
      }
  },
  invite: {
    all: async(id: string): Promise<DocTeamInvite[]> => {
      try {
          const headers = new Headers()
          const authHeader = authorizationHeader()
          headers.append('authorization', authHeader || '')
          const url = `${api_host}/team/${id}/invites`
          const res = await fetch(url, { method: "GET", headers: headers })
          if (res.ok) return await res.json() as DocTeamInvite[]
          return []
      } catch(e) {
          return []
      }
    },
    get: async(id: string, inviteId: string): Promise<DocTeamInvite | null> => {
      try {
          const headers = new Headers()
          const authHeader = authorizationHeader()
          headers.append('authorization', authHeader || '')
          const url = `${api_host}/team/${id}/invite/${inviteId}`
          const res = await fetch(url, { method: "GET", headers: headers })
          if (res.ok) return await res.json() as DocTeamInvite
          return null
      } catch(e) {
          return null
      }
    },
    invite: async(id: string, uid: string) => {
      try {
          const headers = new Headers()
          const authHeader = authorizationHeader()
          headers.append('authorization', authHeader || '')
          const url = `${api_host}/team/${id}/invite?uid=${uid}`
          const res = await fetch(url, { method: "POST", headers: headers })
          if (res.ok) return await res.json() as DocTeamInvite
          return null
      } catch(e) {
          return null
      }
    },
    delete: async(id: string, inviteId: string) => {
      try {
          const headers = new Headers()
          const authHeader = authorizationHeader()
          headers.append('authorization', authHeader || '')
          const url = `${api_host}/team/${id}/invite/${inviteId}`
          const res = await fetch(url, { method: "DELETE", headers: headers })
          if (res.ok) return Boolean(await res.text())
          return false
      } catch(e) {
          return false
      }
    }
  },
  shots: {
      last: async(id: string, exclude?: string): Promise<DocShotData[]> => {
          try {
              if (!id) throw new Error('uid is not provided')
              const headers = new Headers()
              const authHeader = authorizationHeader()
              headers.append('authorization', authHeader || '')
              const url = `${api_host}/team/${id}/last${exclude ? `?exclude=${exclude}` : ""}`
              const res = await fetch(url, { method: 'GET', headers: headers })
              if (res.ok) return await res.json() as DocShotData[]
              return []
          } catch(e) {
              return []
          }
      },
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
    like: async(id: string, shotId: string, uid: string): Promise<DocShotData['likes']> => {
        try {
            if (!uid) throw new Error('uid is not provided')
            const headers = new Headers()
            const authHeader = authorizationHeader()
            headers.append('authorization', authHeader || '')
            const url = `${api_host}/team/${id}/shot/${shotId}/like?uid=${uid}`
            const res = await fetch(url, { method: 'POST', headers: headers })
            if (res.ok) return await res.json() as DocShotData['likes']
            return []
        } catch(e) {
            return []
        }
    },
    view: async(id: string, shotId: string, uid: string): Promise<DocShotData['views']> => {
      try {
          if (!uid) throw new Error('uid is not provided')
          const headers = new Headers()
          const authHeader = authorizationHeader()
          headers.append('authorization', authHeader || '')
          const url = `${api_host}/team/${id}/shot/${shotId}/view?uid=${uid}`
          const res = await fetch(url, { method: 'POST', headers: headers })
          if (res.ok) return await res.json() as DocShotData['views']
          return []
      } catch(e) {
          return []
      }
    },
    addComment: async(id: string, shotId: string, comment: CommentBlock) => {
        try {
            const headers = new Headers()
            const authHeader = authorizationHeader()
            headers.append('authorization', authHeader || '')
            headers.append('Content-Type', 'application/json')
            const url = `${api_host}/team/${id}/shot/${shotId}/comment`
            const res = await fetch(url, { method: 'POST', headers: headers, body: JSON.stringify(comment) })
            if (res.ok) return await res.json() as CommentBlock[]
            return []
        } catch(e) {
            return []
        }
    },
    deleteComment: async(id: string, shotId: string, commentId: string) => {
        try {
            const headers = new Headers()
            const authHeader = authorizationHeader()
            headers.append('authorization', authHeader || '')
            const url = `${api_host}/team/${id}/shot/${shotId}/comment?commentId=${commentId}`
            const res = await fetch(url, { method: 'DELETE', headers: headers })
            if (res.ok) return Boolean(await res.text())
            return false
        } catch(e) {
            return false
        }
    },
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
