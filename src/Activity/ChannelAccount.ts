import { RoleType } from "./RoleType.js"

interface ChannelAccount {
    id: string
    name: string
    aadObjectId?: string
    role?: RoleType | string
    // properties? : unknown
}

export { RoleType, ChannelAccount }