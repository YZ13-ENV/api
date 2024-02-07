import { DocData } from "./common";
import { Attachment } from "./shot";
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
    statuses?: string[];
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
    createAt: number;
    expiredAt?: number;
};
export type TeamTask = {
    status: string;
    checked: boolean;
    priority: string;
    performers: string[];
    name: string;
    description: string;
    deadline?: number;
    createAt: number;
    updatedAt?: number;
    comments?: object[];
    subtasks: object[];
    attachments: Attachment[];
};
export type DocTeamInvite = DocData<TeamInvite>;
export type DocTeam = DocData<Team>;
