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
export type SubTask = {
    checked: boolean;
    text: string;
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
export type TeamTaskScratch = {
    status: string;
    checked: boolean;
    performers: string[];
    name: string;
    createAt: number;
    authorId: string;
};
export type TeamTask = {
    status: string;
    checked: boolean;
    performers: string[];
    name: string;
    createAt: number;
    authorId: string;
    description?: string;
    priority?: string;
    deadline?: number;
    updatedAt?: number;
    comments?: object[];
    subtasks?: SubTask[];
    attachments: Attachment[];
};
export type TeamTasksConfig = {
    createdAt: number;
    updatedAt?: number;
    teamId: string;
    statuses: string[];
};
export type DocTeamTaskConfig = DocData<TeamTasksConfig>;
export type DocTeamTask = DocData<TeamTask>;
export type DocTeamInvite = DocData<TeamInvite>;
export type DocTeam = DocData<Team>;
