export interface User {
    id: string;
    name: string;
    avatar: string;
    isOnline: boolean;
}

export type MessageStatus = 'sent' | 'delivered' | 'seen' | 'failed';
export type MessageType = 'text' | 'image' | 'file';

export interface BaseMessage {
    id: string;
    sender_id: string;
    type: MessageType;
    timestamp: Date;
    status: MessageStatus;
}

export interface TextMessage extends BaseMessage {
    type: 'text';
    content: string;
}

export interface ImageMessage extends BaseMessage {
    type: 'image';
    imageUrl: string; // Can be a single URL or an array for galleries
}

export interface FileMessage extends BaseMessage {
    type: 'file';
    fileName: string;
    fileUrl: string;
    fileSize: number;
}

export type Message = TextMessage | ImageMessage | FileMessage;

export interface Conversation {
    id: string;
    receiver: User;
    last_message: string;
    last_message_timestamp: Date;
    unread_count: number;
    messages: Message[];
}

export interface ChatWindowProps {
    activeConversation: Conversation | undefined;
    loggedInUser: User;
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
