export const cdn = (link: string): string => {
    const isStartWithSlash = link.startsWith('/')
    const fetchUrl = isStartWithSlash
    ? `https://cdn.darkmaterial.space${link}`
    : `https://cdn.darkmaterial.space/${link}`
    return fetchUrl
}
