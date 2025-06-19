import { SupabaseHandler } from "./base";
import { User, Session, AuthError, WeakPassword } from "@supabase/supabase-js";
// import { UserModel } from "../../models";

export interface UserModel {
    email: string
    password: string
}

export class UserAPIHandler extends SupabaseHandler {
    constructor() {
        super();
    }

    async createUser(user: UserModel): Promise<UserData | null> {
        const { data, error } = await this.getClient().auth.signUp({
            email: user.email,
            password: user.password!,
            options: {
                data: {
                    ...user,
                },
            },
        });

        if (error) {
            console.log(error);
            return null;
        }
        return data;
    }

    async signIn(email: string, password: string): Promise<SignInData | null> {
        const { data, error } = await this.getClient().auth.signInWithPassword({
            email: email,
            password: password,
        });
        if (error) {
            return null;
        }
        return data;
    }

    async signOut(): Promise<AuthError | null> {
        const { error } = await this.getClient().auth.signOut();
        return error;
    }

    async requestPasswordReset(email: string): Promise<AuthError | null> {
        const { error } = await this.getClient().auth.resetPasswordForEmail(email, {
            redirectTo: this.redirectUrl,
        });
        return error;
    }

    async getUser(): Promise<User | null> {
        const {
            data: { user },
        } = await this.getClient().auth.getUser();
        return user;
    }

    async getSession(): Promise<Session | null> {
        const { data, error } = await this.getClient().auth.getSession();
        if (error) {
            return null;
        }
        return data.session!;
    }

    async getNewSession(): Promise<{ session: Session; user: User } | AuthError> {
        const { data, error } = await this.getClient().auth.refreshSession();
        const { session, user } = data;
        if (error) return error;
        return { session: session!, user: user! };
    }

    async updateUser(user: User): Promise<User | null> {
        const { data, error } = await this.getClient().auth.updateUser({
            ...user,
        });
        if (error) return null;
        return data.user;
    }

    async updateUserMetadata(user: Object): Promise<User | null> {
        const { data, error } = await this.getClient().auth.updateUser({
            data: { ...user },
        });
        if (error) return null;
        return data.user;
    }
}

type UserData = {
    user: User | null;
    session: Session | null;
};

type SignInData = {
    user: User;
    session: Session;
    weakPassword?: WeakPassword | undefined;
};
