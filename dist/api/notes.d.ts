import { DocNote, Note } from '../types/notes';
export declare const notes: {
    getNoteById: (noteId: string) => Promise<DocNote | null>;
    getAllForUser: (userId: string) => Promise<DocNote[]>;
    deleteOne: (noteId: string) => Promise<true | null>;
    updateOne: (noteId: string, note: Note) => Promise<DocNote | null>;
    addOne: (noteId: string, note: Note) => Promise<DocNote | null>;
};
