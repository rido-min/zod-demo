import { ActivityType } from "../ActivityType";
import { IActivity } from "../IActivity";

class Activity implements IActivity {
    type: ActivityType | string;
    text: string | unknown;
    [x: string]: unknown;

}

export { IActivity, ActivityType, Activity }