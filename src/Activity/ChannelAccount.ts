export enum RoleTypes {
    User = 'user',
    Bot = 'bot',
    Skill = 'skill',
}

export interface ChannelAccount {
    id: string
    name: string
    aadObjectId?: string
    role?: RoleTypes | string
    properties? : unknown
}