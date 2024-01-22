export const format = {
    numbers: (num: number) => {
        if (num < 999) {
            return num
        } else if (num >= 1_000 && num <= 999_999) {
            return (num / 1_000).toFixed(1) + ' тыс.'
        } else return (num / 1_000_000).toFixed(1) + ' млн.'
    },
    random: (len: number, charSet?: string) => {
        charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
        var randomString = ''
        for (var i = 0; i < len; i++) {
            var randomPoz = Math.floor(Math.random() * charSet.length)
            randomString += charSet.substring(randomPoz,randomPoz+1)
        }
        return randomString
    },
    generateId: (len: number, onlyNumbers?: boolean) => {
        const charSet = onlyNumbers
        ? '0123456789'
        : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
        let result = ''
        for (let i = 0; i < len; i++) {
            const randomPoz = Math.floor(Math.random() * charSet.length)
            result += charSet.substring(randomPoz,randomPoz+1)
        }
        if (onlyNumbers) return parseInt(result)
        return result
    }
}