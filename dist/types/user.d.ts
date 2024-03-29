import { UserMetadata } from "firebase/auth";
export type ShortUserData = {
    uid: string;
    photoUrl: string;
    displayName: string;
    email: string;
    isSubscriber: boolean;
    subscription_expired_at?: number;
    metadata: UserMetadata;
    position?: string;
    nickname?: string;
    teamId?: string;
    [key: string]: any;
};
export type NicknameReference = {
    nickname: string;
    uid: string;
};
