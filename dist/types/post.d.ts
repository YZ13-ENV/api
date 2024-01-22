import { Categories } from "./common";
export type Post = {
    name: string;
    description?: string;
    category?: keyof Categories;
    authorsId: string[];
    createdAt: number;
    updatedAt?: number;
    content: string;
    thumbnail?: string;
    pinned?: boolean;
    draft: boolean;
};
export type PartialDocPost = {
    doc_id?: string;
} & Post;
export type DocPost = {
    doc_id: string;
} & Post;
