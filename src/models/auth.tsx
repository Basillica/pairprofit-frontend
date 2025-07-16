export interface UserModel {
    firstname: string;
    lastname: string;
    email: string;
    username: string;
    password: string;
    passwordRepeat?: string;
    profile_uri: string;
    status: string;
    platform: string;
    scope: string;
    role: string;
    permissions: string[];
    created_at: string;
    updated_at: string;
    id: string;
}
