import { sign } from "jsonwebtoken"

export const createTokenWithPayload = (payload: object): string | null => {
    if (process.env.NEXT_PUBLIC_JWT_SECRET) {
        const token = sign(payload, process.env.NEXT_PUBLIC_JWT_SECRET)
        return token
    } else {
        return null
    }
}