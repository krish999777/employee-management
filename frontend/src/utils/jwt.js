export function getPayloadFromToken(token) {
    if (!token) return null
    try {
        const payloadBase64 = token.split('.')[1]
        const decoded = atob(payloadBase64)
        return JSON.parse(decoded)
    } catch (err) {
        return null
    }
}