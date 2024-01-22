export type Note = {
    name: string
    content: string
    createdAt: number
    updatedAt?: number
    author: string
    pinned: boolean
    members?: string[] 
}
export type PartialDocNote = { doc_id?: string } & Note
export type DocNote = { doc_id: string } & Note