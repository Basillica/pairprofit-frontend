export interface User {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
}

export type MessageStatus = "sent" | "delivered" | "seen" | "failed";
export type MessageType = "text" | "image" | "file";

export interface BaseMessage {
  id: string;
  senderId: string;
  type: MessageType;
  timestamp: Date;
  status: MessageStatus;
}

export interface TextMessage extends BaseMessage {
  type: "text";
  content: string;
}

export interface ImageMessage extends BaseMessage {
  type: "image";
  imageUrl: string | string[]; // Can be a single URL or an array for galleries
}

export interface FileMessage extends BaseMessage {
  type: "file";
  fileName: string;
  fileUrl: string;
  fileSize: number;
}

export type Message = TextMessage | ImageMessage | FileMessage;

export interface Conversation {
  id: string;
  partner: User;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  messages: Message[];
}

export interface ChatWindowProps {
  activeConversation: Conversation | undefined;
  loggedInUser: User;
  sendMessage: (
    content: string,
    type?: "text" | "image" | "file",
    imageUrl?: string | string[]
  ) => void;
  defaultPartnerAvatar: string;
  showGoBackButton: boolean;
  goBackToSidebar: () => void;
}

// src/types.ts or wherever you define your interfaces

export interface HeroItem {
  image: string; // Assuming image paths are strings or imported modules
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
  type: "image" | "video"; // Or extend with other types like 'audio', 'document'
}

// Define the structure for a single message
export interface ChatMessage {
  conversationId: string;
  senderId: string;
  text?: string; // Optional text content
  media?: MessageMedia[]; // Optional array of media
  timestamp: number;
  // ... other properties like messageId, readStatus, etc.
}

// Define the structure for an active conversation (adjust as per your actual data)
export interface ActiveConversation {
  id: string;
  name: string;
  // ... other conversation details
}

// Define props for your messaging component (e.g., ChatInputArea)
export interface ChatInputAreaProps {
  activeConversation: ActiveConversation | null; // Can be null if no conversation is active
  // You might also need a prop for the current user's ID
  currentUserId: string;
}
