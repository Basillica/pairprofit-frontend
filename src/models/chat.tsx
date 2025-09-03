export interface RoomModel {
    id: string;
    sender_id: string;
    receiver_id: string;
    created_at: String;
    updated_at: String;
    title: string;
    avatar: string;
    last_message: string;
    last_message_timestamp: string;
}

export type MessageStatus = 'sent' | 'delivered' | 'seen' | 'failed';

export interface ChatMessageModel {
    created_at: string;
    is_media: boolean;
    id: string;
    message: string;
    receiver_id: string;
    room_id: string;
    scope: string;
    sender_id: string;
    updated_at: string;
    status?: MessageStatus;
}
