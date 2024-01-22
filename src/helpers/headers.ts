import { DateTime } from "luxon"
import { createTokenWithPayload } from "./token"

export const authorizationHeader = () => {
    const time = DateTime.now().toSeconds()
    const payload = {
        iat: time
    }
    const token = createTokenWithPayload(payload)
    return token
}