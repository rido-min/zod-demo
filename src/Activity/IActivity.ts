import { ActivityType } from "./ActivityType.js";
import { ChannelAccount } from "./ChannelAccount.js";

export interface IActivity {
    type : ActivityType | string
    text? : string | unknown
    channelId?: string | unknown
    from?: ChannelAccount
    [x: string] : unknown
}