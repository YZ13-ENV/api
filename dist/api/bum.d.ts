import { ChunkResponse } from '../types/common';
import { Attachment, CommentBlock, DocDraftShotData, DocShotData, DraftForUpload, DraftShotData, ShotData } from '../types/shot';
export declare const bum: {
    author: {
        saved: (uid: string) => Promise<DocShotData[]>;
        mostPopularShot: (uid: string) => Promise<DocShotData | null>;
        last: (uid: string) => Promise<DocShotData[]>;
        follow: (from: string, to: string) => Promise<string[]>;
        addAbout: (id: string, about: string) => Promise<string>;
        getAbout: (id: string) => Promise<string>;
        addSignature: (id: string, signature: string) => Promise<string>;
        getSignature: (id: string) => Promise<string>;
        likes: (id: string) => Promise<Array<ShotData['likes']>>;
        followers: (id: string) => Promise<string[]>;
        followings: (id: string) => Promise<string[]>;
    };
    attachments: {
        generate: (path: string, file: File, asThumbnail?: boolean) => Promise<Attachment | null>;
    };
    drafts: {
        all: (order?: string, category?: string) => Promise<ChunkResponse<DocDraftShotData[]>>;
        byUser: (order?: string, category?: string, uid?: string) => Promise<ChunkResponse<DocDraftShotData[]>>;
    };
    shots: {
        search: (query: string, order: string, category?: string, uid?: string) => Promise<ChunkResponse<DocShotData[]>>;
        byUser: (uid?: string, order?: string, category?: string) => Promise<ChunkResponse<DocShotData[]>>;
        tags: () => Promise<ChunkResponse<string[]>>;
        all: (order: string, category?: string, uid?: string) => Promise<ChunkResponse<DocShotData[]>>;
        byTag: (tag: string, order: string) => Promise<DocShotData[]>;
        byType: (userId: string, type?: 'draft' | 'shots', order?: 'popular' | 'new') => Promise<DocShotData[]>;
    };
    shot: {
        like: (id: string, uid: string) => Promise<DocShotData['likes']>;
        view: (id: string, uid: string) => Promise<DocShotData['views']>;
        addComment: (id: string, comment: CommentBlock) => Promise<CommentBlock[]>;
        deleteComment: (id: string, commentId: string) => Promise<boolean>;
        get: (shotId: string, userId?: string) => Promise<DocShotData | null>;
        create: (id: string, draft: ShotData) => Promise<boolean>;
        update: (id: string, draft: ShotData) => Promise<boolean>;
        delete: (id: string) => Promise<boolean>;
        getPopularOne: (userId: string) => Promise<DocShotData | null>;
    };
    draft: {
        get: (shotId: string) => Promise<DocDraftShotData | null>;
        create: (id: string, draft: DraftForUpload) => Promise<boolean>;
        update: (id: string, draft: DraftShotData) => Promise<DocDraftShotData | null>;
        delete: (id: string) => Promise<boolean>;
    };
};
