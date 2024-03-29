import { DocTeam, DocTeamInvite, DocTeamTask, DocTeamTaskConfig, Team, TeamScratch, TeamTask, TeamTaskScratch, TeamTasksConfig } from '../types/team';
import { ChunkResponse, CommentBlock, DocDraftShotData, DocShotData, DraftForUpload, DraftShotData, ShotData } from "..";
export declare const team: {
    get: (id: string) => Promise<DocTeam | null>;
    create: (id: string, team: TeamScratch) => Promise<DocTeam | null>;
    update: (id: string, team: Partial<Team>) => Promise<DocTeam | null>;
    delete: (id: string) => Promise<boolean>;
    likes: (id: string) => Promise<Array<ShotData["likes"]>>;
    followings: (id: string) => Promise<string[]>;
    mostPopularShot: (id: string) => Promise<DocShotData | null>;
    task: {
        config: {
            get: (id: string) => Promise<TeamTasksConfig | null>;
            update: (id: string, cfg: Partial<TeamTasksConfig>) => Promise<DocTeamTaskConfig | null>;
            delete: (id: string) => Promise<boolean>;
        };
        all: (id: string) => Promise<DocTeamTask[] | null>;
        get: (id: string, taskId: string) => Promise<DocTeamTask | null>;
        create: (id: string, scratch: TeamTaskScratch) => Promise<DocTeamTask | null | undefined>;
        update: (id: string, taskId: string, scratch: Partial<TeamTask>) => Promise<DocTeamTask | null | undefined>;
        delete: (id: string, taskId: string) => Promise<boolean>;
    };
    invite: {
        all: (id: string) => Promise<DocTeamInvite[]>;
        accept: (id: string, inviteId: string) => Promise<boolean>;
        get: (id: string, inviteId: string) => Promise<DocTeamInvite | null>;
        invite: (id: string, uid: string) => Promise<DocTeamInvite | null>;
        delete: (id: string, inviteId: string) => Promise<boolean>;
    };
    shots: {
        last: (id: string, exclude?: string) => Promise<DocShotData[]>;
        all: (id: string, order?: string, category?: string) => Promise<ChunkResponse<DocShotData[]>>;
    };
    drafts: {
        all: (id: string, order?: string, category?: string) => Promise<ChunkResponse<DocShotData[]>>;
        byTeam: (id: string, order?: string, category?: string) => Promise<ChunkResponse<DocDraftShotData[]>>;
    };
    draft: {
        get: (id: string, draftId: string) => Promise<DocDraftShotData | null>;
        create: (id: string, draftId: string, draft: DraftForUpload) => Promise<boolean>;
        update: (id: string, draftId: string, draft: DraftShotData) => Promise<DraftShotData | null>;
        delete: (id: string, draftId: string) => Promise<boolean>;
    };
    shot: {
        like: (id: string, shotId: string, uid: string) => Promise<DocShotData["likes"]>;
        view: (id: string, shotId: string, uid: string) => Promise<DocShotData["views"]>;
        addComment: (id: string, shotId: string, comment: CommentBlock) => Promise<CommentBlock[]>;
        deleteComment: (id: string, shotId: string, commentId: string) => Promise<boolean>;
        get: (id: string, shotId: string) => Promise<DocShotData | null>;
        create: (id: string, shotId: string, draft: ShotData) => Promise<boolean>;
        update: (id: string, shotId: string, shot: ShotData) => Promise<boolean>;
        delete: (id: string, shotId: string) => Promise<boolean>;
    };
};
