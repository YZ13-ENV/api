export type ChunkResponse<T> = {
    count: number;
    data: T;
    next: string;
};
export type Categories = {
    "all": string;
    "dev": string;
    "community": string;
    "projects": string;
    "YZ13": string;
    "updates": string;
    "other": string;
};
export type GridRatioByCategory = {
    [key in keyof Categories]: string;
};
export type PickedCategory<T extends keyof Categories> = Categories[T];
export type AllPostsRatio = `${number}-${number}-${number}-${number}-${number}`;
