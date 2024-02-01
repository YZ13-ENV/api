import { DocData } from "./common"

export type Team = {
  name: string
  signature: string
  founder: string
  members: string[] // userId[]
  createdAt: number
  about?: string
  photoURL?: string
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

export type TeamInvite = {
  uid: string // Это даст доступ конкретному пользователю на страницу приглашения
  teamId: string // Это поможет создать ссылку на документ
  createAt: string
  expiredAt?: number
}

export type DocTeamInvite = DocData<TeamInvite>
export type DocTeam = DocData<Team>