import { Categories, ChunkResponse } from '../types/common';
import { DocPost, Post } from '../types/post';
export declare const blog: {
    getLast: (category?: keyof Categories) => Promise<DocPost[]>;
    getAll: (category?: keyof Categories) => Promise<ChunkResponse<DocPost[]>>;
    getById: (postId: string) => Promise<DocPost | null>;
    deleteOne: (postId: string) => Promise<true | null>;
    updateOne: (postId: string, post: Post) => Promise<DocPost | null>;
    search: (query: string) => Promise<DocPost[]>;
    addOne: (postId: string, post: Post) => Promise<DocPost | null>;
};
