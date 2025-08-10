export type ContactModel = {
    user_id: string;
    contact_id: string;
    name: string;
    role: string;
    avatar: string;
    last_interaction: Date;
    is_favorite: boolean;
    is_blocked: boolean;
};
