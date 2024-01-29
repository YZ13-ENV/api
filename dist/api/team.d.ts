import { DocTeam } from '../types/team';
import { ChunkResponse, DocShotData } from "..";
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
};
