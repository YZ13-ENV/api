import { UserMetadata } from "firebase/auth"

export type ShortUserData = {
    uid: string
    photoUrl: string
    displayName: string
    email: string
    isSubscriber: boolean
    metadata: UserMetadata
    position?: string
    nickname?: string
    [key: string]: any
}

export type NicknameReference = {
    nickname: string
    uid: string
}