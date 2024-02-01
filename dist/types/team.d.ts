import { DocData } from "./common";
export type Team = {
    name: string;
    signature: string;
    founder: string;
    members: string[];
    createdAt: number;
    about?: string;
    photoURL?: string;
    updatedAt?: number;
    follows?: string[];
    links?: {
        web?: string;
    };
};
export type TeamScratch = {
    name: string;
    bio: string;
    photoURL?: string;
    founder: string;
    members: string[];
};
export type TeamInvite = {
    uid: string;
    teamId: string;
    createAt: string;
    expiredAt?: number;
};
export type DocTeamInvite = DocData<TeamInvite>;
export type DocTeam = DocData<Team>;
