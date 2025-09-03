import { Accessor, Resource } from 'solid-js';
import { UserModel } from '../../../models/auth';
import { ChatMessageModel } from '../../../models/chat';

export interface User {
    id: string;
    name: string;
    avatar: string;
    isOnline: boolean;
}

export type MessageStatus = 'sent' | 'delivered' | 'seen' | 'failed';

export interface MessageModel {
    id: string;
    room_id: string;
    sender_id: string;
    receiver_id: string;
    message?: string;
    is_media: boolean;
    created_at: string;
    updated_at: string;
    scope: string;
    status: MessageStatus;
}

export interface ConversationType {
    id: string;
    receiver: User;
    last_message: string;
    last_message_timestamp: Date;
    unread_count: number;
}

export interface ChatWindowProps {
    activeConversationId: Accessor<string | null>;
    authUser: Accessor<UserModel | undefined>;
    roomMessages: Resource<ChatMessageModel[]>;
    sendMessage: (
        content: string,
        type?: 'text' | 'image' | 'file',
        imageUrl?: string
    ) => void;
    showGoBackButton: boolean;
    goBackToSidebar: () => void;
}

export interface HeroItem {
    image: string;
    title: string;
    description: string;
}

// Define the structure for a file selected for upload
export interface SelectedFile {
    file: File;
    previewUrl: string; // URL.createObjectURL result for preview
    type: string; // e.g., "image/jpeg", "video/mp4"
}

// Define the structure for media sent in a message (after upload)
export interface MessageMedia {
    url: string;
    type: 'image' | 'video' | 'audio' | 'document';
}

// Define the structure for a single message
export interface ChatMessage {
    id: string;
    sender_id: string;
    receiver_id: string;
    room_id: string;
    message?: string;
    is_media: boolean;
    created_at: string;
    updated_at: string;
    scope: string;
}

// Define the structure for an active conversation (adjust as per your actual data)
export interface ActiveConversation {
    id: string;
    name: string;
    // ...
}

export interface ChatInputAreaProps {
    activeConversation: ActiveConversation | null; // Can be null if no conversation is active
    currentUserId: string;
}
