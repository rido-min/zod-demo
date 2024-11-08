import { ActivityType } from "./ActivityType.js";

export interface IActivity {
    type : ActivityType | string
    text : string | unknown
    [x: string] : unknown
}