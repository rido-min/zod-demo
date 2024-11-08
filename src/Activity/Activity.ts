import { ActivityType } from "./ActivityType.js";
import { IActivity } from "./IActivity.js";

class Activity implements IActivity {
    type: ActivityType | string;
    text: string | unknown;
     [x: string]: unknown;
    constructor(t: ActivityType | string) {
        this.type = t
    }
}

export { IActivity, ActivityType, Activity }