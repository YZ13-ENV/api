import { UserMetadata } from "firebase/auth";

export type ShortUserData = {
  uid: string;
  photoUrl: string;
  displayName: string;
  email: string;
  isSubscriber: boolean;
  subscription_expired_at?: number; // Это должна быть любая дата 13/08/2024 18:00, и обязательно время должно быть 18:00
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

