export interface EmailModel {
    id: string;
    sender: string;
    sender_initials: string;
    sender_color: string;
    sender_email: string;
    subject: string;
    preview: string;
    date: string;
    is_read: boolean;
    has_attachment: boolean;
    body: string;
    cc: string[];
    bcc: string[];
}
