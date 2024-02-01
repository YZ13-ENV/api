import { api_host } from "@/const/host"
import { authorizationHeader } from "@/helpers/headers"
import { ChunkResponse } from "@/types/common"
import { Attachment, CommentBlock, DocDraftShotData, DocShotData, DraftForUpload, DraftShotData, ShotData } from "@/types/shot"

const LONG_CACHE_TIME = 600
const MEDIUM_CACHE_TIME = 300
const SHORT_CACHE_TIME = 120

export const bum = {
        author: {
            saved: async(uid: string): Promise<DocShotData[]> => {
                try {
                    if (!uid) throw new Error('uid is not provided')
                    const headers = new Headers()
                    const authHeader = authorizationHeader()
                    headers.append('authorization', authHeader || '')
                    const url = `${api_host}/shots/user/saved?id=${uid}`
                    const res = await fetch(url, { method: 'GET', headers: headers })
                    if (res.ok) return await res.json() as DocShotData[]
                    return []
                } catch(e) {
                    return []
                }
            },
            mostPopularShot: async(uid: string): Promise<DocShotData | null> => {
                try {
                    if (!uid) throw new Error('uid is not provided')
                    const headers = new Headers()
                    const authHeader = authorizationHeader()
                    headers.append('authorization', authHeader || '')
                    const url = `${api_host}/shots/user/popular?id=${uid}`
                    const res = await fetch(url, { method: 'GET', headers: headers })
                    if (res.ok) return await res.json() as DocShotData
                    return null
                } catch(e) {
                    return null
                }
            },
            last: async(uid: string, exclude?: string): Promise<DocShotData[]> => {
                try {
                    if (!uid) throw new Error('uid is not provided')
                    const headers = new Headers()
                    const authHeader = authorizationHeader()
                    headers.append('authorization', authHeader || '')
                    const url = `${api_host}/shots/user/last?id=${uid}${exclude ? `&exclude=${exclude}` : ""}`
                    const res = await fetch(url, { method: 'GET', headers: headers })
                    if (res.ok) return await res.json() as DocShotData[]
                    return []
                } catch(e) {
                    return []
                }
            },
            follow: async(from: string, to: string): Promise<string[]> => {
                try {
                    const headers = new Headers()
                    const authHeader = authorizationHeader()
                    headers.append('authorization', authHeader || '')
                    const res = await fetch(`${api_host}/shots/user/follow?from=${from}&to=${to}`, {
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
            addAbout: async(id: string, about: string): Promise<string> => {
                try {
                    const headers = new Headers()
                    const authHeader = authorizationHeader()
                    headers.append('authorization', authHeader || '')
                    const res = await fetch(`${api_host}/shots/user/about?id=${id}&about=${about}`, {
                        method: 'POST',
                        headers: headers
                    })
                    if (res.ok) {
                        return await res.text() as string
                    } else return ''
                } catch(e) {
                    console.log(e)
                    return ''
                }
            },
            getAbout: async(id: string): Promise<string> => {
                try {
                    const headers = new Headers()
                    const authHeader = authorizationHeader()
                    headers.append('authorization', authHeader || '')
                    const res = await fetch(`${api_host}/shots/user/about?id=${id}`, {
                        method: 'GET',
                        headers: headers
                    })
                    if (res.ok) {
                        return await res.text() as string
                    } else return ''
                } catch(e) {
                    console.log(e)
                    return ''
                }
            },
            addSignature: async(id: string, signature: string): Promise<string> => {
                try {
                    const headers = new Headers()
                    const authHeader = authorizationHeader()
                    headers.append('authorization', authHeader || '')
                    const res = await fetch(`${api_host}/shots/user/signature?id=${id}&signature=${signature}`, {
                        method: 'POST',
                        headers: headers
                    })
                    if (res.ok) {
                        return await res.text() as string
                    } else return ''
                } catch(e) {
                    console.log(e)
                    return ''
                }
            },
            getSignature: async(id: string): Promise<string> => {
                try {
                    const headers = new Headers()
                    const authHeader = authorizationHeader()
                    headers.append('authorization', authHeader || '')
                    const res = await fetch(`${api_host}/shots/user/signature?id=${id}`, {
                        method: 'GET',
                        headers: headers
                    })
                    if (res.ok) {
                        return await res.text() as string
                    } else return ''
                } catch(e) {
                    console.log(e)
                    return ''
                }
            },
            likes: async(id: string): Promise<Array<ShotData['likes']>> => {
                try {
                    const headers = new Headers()
                    const authHeader = authorizationHeader()
                    headers.append('authorization', authHeader || '')
                    const res = await fetch(`${api_host}/shots/user/likes?id=${id}`, {
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
            followers: async(id: string): Promise<string[]> => {
                try {
                    const headers = new Headers()
                    const authHeader = authorizationHeader()
                    headers.append('authorization', authHeader || '')
                    const res = await fetch(`${api_host}/shots/user/followers?id=${id}`, {
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
            followings: async(id: string): Promise<string[]> => {
                try {
                    const headers = new Headers()
                    const authHeader = authorizationHeader()
                    headers.append('authorization', authHeader || '')
                    const res = await fetch(`${api_host}/shots/user/following?id=${id}`, {
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
            }
        },
        attachments: {
            generate: async(path: string, file: File, asThumbnail?: boolean): Promise<Attachment | null> => {
                try {
                    const headers = new Headers()
                    const form = new FormData()
                    const authHeader = authorizationHeader()
                    headers.append('authorization', authHeader || '')
                    const url = `${api_host}/shots/attachments?id=${path}${asThumbnail ? `&asThumbnail=${asThumbnail}` : ""}`
                    form.append('file', file)
                    const res = await fetch(url, { method: 'POST', headers: headers, body: form })
                    if (res.ok) {
                        const attachment: Attachment = await res.json()
                        return attachment
                    } else return null
                } catch(e) {
                    console.warn(e)
                    return null
                }
            }
        },
        drafts: {
            all: async(order?: string, category?: string): Promise<ChunkResponse<DocDraftShotData[]>> => {
                try {
                    const headers = new Headers()
                    const authHeader = authorizationHeader()
                    headers.append('authorization', authHeader || '')
                    const url = order && category
                    ? `${api_host}/shots/all/${order}/${category}?onlyDrafts=true`
                    : order ? `${api_host}/shots/all/${order}?onlyDrafts=true`
                    : `${api_host}/shots/all/popular?onlyDrafts=true`
                    const res = await fetch(url, { method: 'GET', headers: headers })
                    if (res.ok) return (await res.json() as ChunkResponse<DocShotData[]>)
                    return { count: 0, data: [], next: '' }
                } catch(e) {
                    console.warn(e)
                    return { count: 0, data: [], next: '' }
                }
            },
            byUser: async(order?: string, category?: string, uid?: string): Promise<ChunkResponse<DocDraftShotData[]>> => {
                try {
                    if (!uid) throw Error('uid is not provided')
                    const headers = new Headers()
                    const authHeader = authorizationHeader()
                    headers.append('authorization', authHeader || '')
                    const url = order && category
                    ? `${api_host}/shots/user/${uid}/${order}/${category}?onlyDrafts=true`
                    : order
                    ? `${api_host}/shots/user/${uid}/${order}?onlyDrafts=true`
                    : `${api_host}/shots/user/${uid}?onlyDrafts=true`
                    const res = await fetch(url, { method: 'GET', headers: headers })
                    if (res.ok) return (await res.json() as ChunkResponse<DocShotData[]>)
                    return { count: 0, data: [], next: '' }
                } catch(e) {
                    console.warn(e)
                    return { count: 0, data: [], next: '' }
                }
            },
        },
        shots: {
                search: async(query: string, order: string, category?: string, uid?: string): Promise<ChunkResponse<DocShotData[]>> => {
                    try {
                        if (!uid) throw Error('uid is not provided')
                        const headers = new Headers()
                        const authHeader = authorizationHeader()
                        headers.append('authorization', authHeader || '')
                        const url = order && category
                        ? `${api_host}/shots/search/${query}/${order}/${category}?uid=${uid}`
                        : order
                        ? `${api_host}/shots/search/${query}/${order}?uid=${uid}`
                        : `${api_host}/shots/search/${query}/popular?uid=${uid}`
                        const res = await fetch(url, { method: 'GET', headers: headers })
                        if (res.ok) return (await res.json() as ChunkResponse<DocShotData[]>)
                        return { count: 0, data: [], next: '' }
                    } catch(e) {
                        console.warn(e)
                        return { count: 0, data: [], next: '' }
                    }
                },
                byUser: async(uid?: string, order?: string, category?: string): Promise<ChunkResponse<DocShotData[]>> => {
                    try {
                        if (!uid) throw Error('uid is not provided')
                        const headers = new Headers()
                        const authHeader = authorizationHeader()
                        headers.append('authorization', authHeader || '')
                        const url = order && category
                        ? `${api_host}/shots/user/${uid}/${order}/${category}`
                        : order
                        ? `${api_host}/shots/user/${uid}/${order}`
                        : `${api_host}/shots/user/${uid}`
                        const res = await fetch(url, { method: 'GET', headers: headers })
                        if (res.ok) return (await res.json() as ChunkResponse<DocShotData[]>)
                        return { count: 0, data: [], next: '' }
                    } catch(e) {
                        console.warn(e)
                        return { count: 0, data: [], next: '' }
                    }
                },
                tags: async(): Promise<ChunkResponse<string[]>> => {
                    try {
                        const headers = new Headers()
                        const authHeader = authorizationHeader()
                        headers.append('authorization', authHeader || '')
                        const url = `${api_host}/tags`
                        const res = await fetch(url, { method: 'GET', headers: headers })
                        if (res.ok) {
                            const tags: ChunkResponse<string[]> = await res.json()
                            return tags
                        } else return { count: 0, data: [], next: '' }
                    } catch(e) {
                        console.warn(e)
                        return { count: 0, data: [], next: '' }
                    }
                },
                all: async(order: string, category?: string, uid?: string): Promise<ChunkResponse<DocShotData[]>> => {
                    try {
                        const headers = new Headers()
                        const authHeader = authorizationHeader()
                        headers.append('authorization', authHeader || '')
                        const url = order && category
                        ? `${api_host}/shots/all/${order}/${category}${uid ? `?uid=${uid}` : ''}` :
                        order ? `${api_host}/shots/all/${order}${uid ? `?uid=${uid}` : ''}` : `${api_host}/shots/all/popular${uid ? `?uid=${uid}` : ''}`
                        const res = await fetch(url, { method: 'GET', headers: headers })
                        if (res.ok) return (await res.json() as ChunkResponse<DocShotData[]>)
                        return { count: 0, data: [], next: '' }
                    } catch(e) {
                        console.warn(e)
                        return { count: 0, data: [], next: '' }
                    }
                },
                byTag: async(tag: string, order: string): Promise<DocShotData[]> => {
                    try {
                        const headers = new Headers()
                        const authHeader = authorizationHeader()
                        headers.append('authorization', authHeader || '')
                        const fetchUrl = `${api_host}/tags/${tag}/${order}`
                        const res = await fetch(fetchUrl, { method: 'GET', headers: headers })
                        if (res.ok) {
                            const shots: DocShotData[] = await res.json()
                            return shots
                        } else return []
                    } catch(e) {
                        console.log(e)
                        return []
                    }
                },
                byType: async(userId: string, type: 'draft' | 'shots'='shots', order?: 'popular' | 'new'): Promise<DocShotData[]> => {
                    const requestType = type === 'shots' ? 'onlyShots' : 'onlyDrafts'
                    try {
                        const headers = new Headers()
                        const authHeader = authorizationHeader()
                        headers.append('authorization', authHeader || '')
                        const shotsRes = await fetch(`${api_host}/shots/${requestType}/${userId}${order ? `?order=${order}` : ''}`, {
                            headers: headers
                        })
                        const shots: DocShotData[] = await shotsRes.json()
                        return shots
                    } catch(e) {
                        console.log(e)
                        return []
                    }
                },
        },
        shot: {
                like: async(id: string, uid: string): Promise<DocShotData['likes']> => {
                    try {
                        if (!uid) throw new Error('uid is not provided')
                        const headers = new Headers()
                        const authHeader = authorizationHeader()
                        headers.append('authorization', authHeader || '')
                        const url = `${api_host}/shots/shot/${id}/like?uid=${uid}`
                        const res = await fetch(url, { method: 'POST', headers: headers })
                        if (res.ok) return await res.json() as DocShotData['likes']
                        return []
                    } catch(e) {
                        return []
                    }
                },
                view: async(id: string, uid: string): Promise<DocShotData['views']> => {
                    try {
                        if (!uid) throw new Error('uid is not provided')
                        const headers = new Headers()
                        const authHeader = authorizationHeader()
                        headers.append('authorization', authHeader || '')
                        const url = `${api_host}/shots/shot/${id}/view?uid=${uid}`
                        const res = await fetch(url, { method: 'POST', headers: headers })
                        if (res.ok) return await res.json() as DocShotData['views']
                        return []
                    } catch(e) {
                        return []
                    }
                },
                addComment: async(id: string, comment: CommentBlock) => {
                    try {
                        const headers = new Headers()
                        const authHeader = authorizationHeader()
                        headers.append('authorization', authHeader || '')
                        headers.append('Content-Type', 'application/json')
                        const url = `${api_host}/shots/shot/${id}/comment`
                        const res = await fetch(url, { method: 'POST', headers: headers, body: JSON.stringify(comment) })
                        if (res.ok) return await res.json() as CommentBlock[]
                        return []
                    } catch(e) {
                        return []
                    }
                },
                deleteComment: async(id: string, commentId: string) => {
                    try {
                        const headers = new Headers()
                        const authHeader = authorizationHeader()
                        headers.append('authorization', authHeader || '')
                        const url = `${api_host}/shots/shot/${id}/comment?commentId=${commentId}`
                        const res = await fetch(url, { method: 'DELETE', headers: headers })
                        if (res.ok) return Boolean(await res.text())
                        return false
                    } catch(e) {
                        return false
                    }
                },
                get: async(shotId: string, userId?: string): Promise<DocShotData | null> => {
                    try {
                        if (userId) {
                            const shotRes = await fetch(`${api_host}/shots/shot/${shotId}/${userId}`, { method: 'GET', cache: 'no-store' })
                            const shot: DocShotData = await shotRes.json()
                            return shot
                        } else {
                            const shotRes = await fetch(`${api_host}/shots/shot/${shotId}`, { method: 'GET', cache: 'no-store' })
                            const shot: DocShotData = await shotRes.json()
                            return shot
                        }
                    } catch(e) {
                        console.log(e)
                        return null
                    }
                },
                create: async(id: string, draft: ShotData) => {
                    try {
                        const headers = new Headers()
                        const authHeader = authorizationHeader()
                        headers.append('authorization', authHeader || '')
                        headers.append('Content-Type', 'application/json')
                        const url = `${api_host}/shots/shot/${id}`
                        const res = await fetch(url, { method: 'POST', headers: headers, body: JSON.stringify(draft) })
                        if (res.ok) return Boolean(await res.text())
                        return false
                    } catch(e) {
                        console.log(e)
                        return false
                    }
                },
                update: async(id: string, draft: ShotData) => {
                    try {
                        const headers = new Headers()
                        const authHeader = authorizationHeader()
                        headers.append('authorization', authHeader || '')
                        headers.append('Content-Type', 'application/json')
                        const url = `${api_host}/shots/shot/${id}`
                        const res = await fetch(url, { method: 'PATCH', headers: headers, body: JSON.stringify(draft) })
                        if (res.ok) return Boolean(await res.text())
                        return false
                    } catch(e) {
                        console.log(e)
                        return false
                    }
                },
                delete: async(id: string) => {
                    try {
                        const headers = new Headers()
                        const authHeader = authorizationHeader()
                        headers.append('authorization', authHeader || '')
                        const url = `${api_host}/shots/shot/${id}`
                        const res = await fetch(url, { method: 'DELETE', headers: headers })
                        if (res.ok) return Boolean(await res.text())
                        return false
                    } catch(e) {
                        console.log(e)
                        return false
                    }
                },
                getPopularOne: async(userId: string): Promise<DocShotData | null> => {
                    try {
                        const shots = await bum.shots.byType(userId, 'shots', 'popular')
                        if (shots.length !== 0) {
                            return shots[0]
                        } else return null
                    } catch(e) {
                        return null
                    }
                }
        },
        draft: {
            get: async(shotId: string): Promise<DocDraftShotData | null> => {
                try {
                    const res = await fetch(`${api_host}/shots/draft/${shotId}`, { method: 'GET', cache: 'no-store' })
                    const draft: DocDraftShotData = await res.json()
                    return draft
                } catch(e) {
                    console.log(e)
                    return null
                }
            },
            create: async(id: string, draft: DraftForUpload) => {
                try {
                    const headers = new Headers()
                    const authHeader = authorizationHeader()
                    headers.append('authorization', authHeader || '')
                    headers.append('Content-Type', 'application/json')
                    const url = `${api_host}/shots/draft/${id}`
                    const res = await fetch(url, { method: 'POST', headers: headers, body: JSON.stringify(draft) })
                    if (res.ok) return Boolean(await res.text())
                    return false
                } catch(e) {
                    console.log(e)
                    return false
                }
            },
            update: async(id: string, draft: DraftShotData): Promise<DocDraftShotData | null> => {
                try {
                    const headers = new Headers()
                    const authHeader = authorizationHeader()
                    headers.append('authorization', authHeader || '')
                    headers.append('Content-Type', 'application/json')
                    const url = `${api_host}/shots/draft/${id}`
                    const res = await fetch(url, { method: 'PATCH', headers: headers, body: JSON.stringify(draft) })
                    if (res.ok) return await res.json() as DocDraftShotData
                    return null
                } catch(e) {
                    console.log(e)
                    return null
                }
            },
            delete: async(id: string) => {
                try {
                    const headers = new Headers()
                    const authHeader = authorizationHeader()
                    headers.append('authorization', authHeader || '')
                    const url = `${api_host}/shots/draft/${id}`
                    const res = await fetch(url, { method: 'DELETE', headers: headers })
                    if (res.ok) return Boolean(await res.text())
                    return false
                } catch(e) {
                    console.log(e)
                    return false
                }
            }
        },
}