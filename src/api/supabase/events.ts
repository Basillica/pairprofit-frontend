import { SupabaseHandler } from "./base";
import { Subscription } from "@supabase/supabase-js";

export class EventsAPIHandler extends SupabaseHandler {
    constructor() {
        super();
    }

    subscribeToAuthEvents(): EventsData {
        const { data } = this.getClient().auth.onAuthStateChange((event, session) => {
            console.log(event, session);
            // PASSWORD_RECOVERY" | "SIGNED_IN" | "SIGNED_OUT" | "TOKEN_REFRESHED" | "USER_UPDATED" | "MFA_CHALLENGE_VERIFIED"
            if (event === "INITIAL_SESSION") {
                // handle initial session
            } else if (event === "SIGNED_IN") {
                // handle sign in event
            } else if (event === "SIGNED_OUT") {
                // handle sign out event
            } else if (event === "PASSWORD_RECOVERY") {
                // handle password recovery event
            } else if (event === "TOKEN_REFRESHED") {
                // handle token refreshed event
            } else if (event === "USER_UPDATED") {
                // handle user updated event
            }
        });
        return data;
    }
}

// call unsubscribe to remove the callback
// data.subscription.unsubscribe();

type EventsData = {
    subscription: Subscription;
};
