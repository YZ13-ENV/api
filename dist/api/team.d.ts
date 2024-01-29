import { DocTeam } from '../types/team';
export declare const team: {
    get: (id: string) => Promise<DocTeam | null>;
    create: (id: string) => Promise<DocTeam | null>;
    update: (id: string) => Promise<DocTeam | null>;
    delete: (id: string) => Promise<boolean>;
};
