import { DocData } from "./common";
export type Team = {
    name: string;
    bio: string;
    photoURL?: string;
    founder: string;
    members: string[];
    createdAt: number;
    updatedAt?: number;
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
export type DocTeam = DocData<Team>;
