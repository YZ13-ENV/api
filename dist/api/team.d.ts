import { DocTeam } from '../types/team';
import { ChunkResponse, DocDraftShotData, DocShotData, DraftForUpload, DraftShotData, ShotData } from "..";
export declare const team: {
    get: (id: string) => Promise<DocTeam | null>;
    create: (id: string) => Promise<DocTeam | null>;
    update: (id: string) => Promise<DocTeam | null>;
    delete: (id: string) => Promise<boolean>;
    shots: {
        all: (id: string, order?: string, category?: string) => Promise<ChunkResponse<DocShotData[]>>;
    };
    drafts: {
        all: (id: string, order?: string, category?: string) => Promise<ChunkResponse<DocShotData[]>>;
    };
    draft: {
        get: (id: string, draftId: string) => Promise<DocDraftShotData | null>;
        create: (id: string, draftId: string, draft: DraftForUpload) => Promise<boolean>;
        update: (id: string, draftId: string, draft: DraftShotData) => Promise<DraftShotData | null>;
        delete: (id: string, draftId: string) => Promise<boolean>;
    };
    shot: {
        get: (id: string, shotId: string) => Promise<DocShotData | null>;
        create: (id: string, shotId: string, draft: ShotData) => Promise<boolean>;
        update: (id: string, shotId: string, shot: ShotData) => Promise<boolean>;
        delete: (id: string, shotId: string) => Promise<boolean>;
    };
};
