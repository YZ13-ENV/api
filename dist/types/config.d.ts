type Remote = {
    domain?: string;
    logo: {
        dark: string;
        light: string;
    };
};
type Features = {
    enableLightMode: boolean;
    enableAppsGrid: boolean;
    enableNotifications: boolean;
};
type AppPagesOptions = {
    hasAuthPage: boolean;
    hasDashboardPage: boolean;
    hasProfilePageByNickname: boolean;
    hasHomePage: boolean;
    hasSearchPage: boolean;
};
export type AppConfig = {
    name: string;
    description?: string;
    tagline?: string;
    version: string;
    status: 'production' | 'development' | 'preview';
    app: AppPagesOptions;
    features: Features;
    remote: Remote;
};
export type RemoteConfig = {
    name: string;
    remote: Remote;
};
export {};
