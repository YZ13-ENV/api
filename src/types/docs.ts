
export type SideElementProps = {
    type: 'single'
    id: string
    name: string
    hasArrow?: boolean
}
export type SideGroupProps = {
    type: 'group'
    id: string
    name: string
    items: SideElementProps[]
}

export type SideMap = (SideGroupProps | SideElementProps)[]

export type DocumentMap = {
    root?: boolean
    id: string
    name: string
    side: SideMap
}

export type DocsNav = {
    name: string
    link: string
}