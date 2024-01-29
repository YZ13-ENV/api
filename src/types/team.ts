import { DocData } from "./common"

export type Team = {
  name: string
  signature: string
  photoURL?: string
  founder: string
  members: string[] // userId[]
  createdAt: number
  updatedAt?: number
  follows?: string[]
  links?: {
    web?: string
  }
}

export type TeamScratch = {
  name: string
  bio: string
  photoURL?: string
  founder: string
  members: string[] // userId[]
}

export type DocTeam = DocData<Team>