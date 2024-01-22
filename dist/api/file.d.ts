export declare const file: {
    static: {
        get: (path: string) => Promise<string | null>;
    };
    upload: {
        file: (link: string, file: File) => Promise<string | null>;
        delete: (url: string) => Promise<boolean>;
    };
};
