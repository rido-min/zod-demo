import { ActivityType } from "./ActivityType.js";

export interface IActivity {
    type : ActivityType | string
    text? : string | unknown
    channelId?: string | unknown
    [x: string] : unknown
}