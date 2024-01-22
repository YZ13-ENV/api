/*
    ------

    К написанию конфига для приложения нужно подойти как следует, ведь приложение будет от него зависеть,
    также надо разработать механизм, который будет держать некоторые составляющие конфига в облаке, например,
    статус приложения можно держать в remote-config by Firebase
    
    ------
*/

type Remote = {
    domain?: string
    logo: {
        dark: string
        light: string
    }
}

type Features = {
    enableLightMode: boolean
    enableAppsGrid: boolean
    enableNotifications: boolean
}

type AppPagesOptions = {
    // hasDashboardPage: true -> /auth/* > 200, false -> /auth/* > 404
    hasAuthPage: boolean
    // hasDashboardPage: true -> /dashboard > 200, false -> /dashboard > 404
    hasDashboardPage: boolean
    // hasProfilePageByNickname: true -> :domain/yz13, false -> :domain/profile
    hasProfilePageByNickname: boolean
    // hasDashboardPage: true -> /home > 200, false -> /home > 404
    hasHomePage: boolean
    // hasDashboardPage: true -> /search > 200, false -> /search > 404
    hasSearchPage: boolean
}

export type AppConfig = {
    name: string
    description?: string
    tagline?: string
    version: string
    status: 'production' | 'development' | 'preview'
    app: AppPagesOptions
    features: Features
    remote: Remote
}


export type RemoteConfig = {
    name: string
    remote: Remote
}