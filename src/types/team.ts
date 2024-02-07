import { DocData } from "./common";
import { Attachment } from "./shot";

export type Team = {
  name: string;
  signature: string;
  founder: string;
  members: string[]; // userId[]
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
  members: string[]; // userId[]
};

export type TeamInvite = {
  uid: string; // Это даст доступ конкретному пользователю на страницу приглашения
  teamId: string; // Это поможет создать ссылку на документ
  createAt: number;
  expiredAt?: number;
};

export type TeamTask = {
  status: string;
  checked: boolean;
  priority: string;
  performers: string[]; // only can be a team member or team founder
  name: string;
  description: string;
  deadline?: number;
  createAt: number;
  updatedAt?: number;
  comments?: object[]; // { author: string, text: string, createdAt: number updatedAt?:number }
  subtasks: object[]; // { checked: boolean, name: string, performersa?: string }
  attachments: Attachment[];
};

export type DocTeamInvite = DocData<TeamInvite>;
export type DocTeam = DocData<Team>;

