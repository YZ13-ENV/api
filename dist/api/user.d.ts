import { NicknameReference, ShortUserData } from '../types/user';
export declare const user: {
    byId: {
        short: (userId: string) => Promise<ShortUserData | null>;
        updateProfile: (uid: string, data: {
            displayName?: string;
            photoURL?: string;
        }) => Promise<boolean>;
        update: (uid: string, field: object) => Promise<ShortUserData | null>;
    };
    byNick: {
        short: (nick: string, check?: boolean) => Promise<boolean | ShortUserData | null>;
        create: (nick: string, uid: string) => Promise<NicknameReference | null>;
        delete: (nick: string) => Promise<boolean>;
    };
};
