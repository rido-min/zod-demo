import { Activity, ActivityType } from "./Activity";
import { TeamsChannelAccount } from "./TeamsChannelAccount";

class TeamsActivity extends Activity {
    channelAccount?: TeamsChannelAccount
    constructor(t: ActivityType | string) {
        super(t);
    }
}

export { TeamsActivity }