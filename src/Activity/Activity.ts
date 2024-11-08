import { ActivityType } from "./ActivityType.js";
import { IActivity } from "./IActivity.js";
import { iActivitySchema } from "./IActivity._schema.js"

class Activity implements IActivity {
    
    type: ActivityType | string;
    text?: string | unknown;
     [x: string]: unknown;

    constructor(t: ActivityType | string) {
        this.type = t
    }
    static fromJson(json: string) : IActivity {
        return iActivitySchema.parse(JSON.parse(json))
    }
    static fromObject(o: object) : IActivity {
        return iActivitySchema.parse(o)
    }
}

export { IActivity, ActivityType, Activity }