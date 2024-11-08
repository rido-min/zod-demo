import { ActivityType } from "../ActivityType";

export interface IActivity {
    type : ActivityType | string
    text : string | unknown
    [x: string] : unknown
}