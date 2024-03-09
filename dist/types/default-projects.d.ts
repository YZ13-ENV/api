import { DocData } from "./common";
export type DefaultProject = {
    name: string;
    createAt: number;
    iconUrl: string;
    access: {
        desktop: boolean;
        tablet: boolean;
        mobile: boolean;
    };
    link?: string;
    description?: string;
    updateAt?: number;
    theme?: {
        dark: string;
        light: string;
    };
};
export type ProjectScratch = {
    name: string;
    iconUrl: string;
    access: {
        desktop: boolean;
        tablet: boolean;
        mobile: boolean;
    };
    link?: string;
    description?: string;
};
export type DocDefaultProject = DocData<DefaultProject>;
