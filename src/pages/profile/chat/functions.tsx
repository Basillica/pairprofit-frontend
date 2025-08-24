import { v4 as uuidv4 } from 'uuid';
import {
    ChatMessage,
    MessageStatus,
    User,
    Conversation,
    Message,
    ImageMessage,
    TextMessage,
} from './types';

export function formatRelativeTime(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSeconds = Math.round(diffMs / 1000);
    const diffMinutes = Math.round(diffMs / (1000 * 60));
    const diffHours = Math.round(diffMs / (1000 * 60 * 60));
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

    if (diffSeconds < 60) return 'Just now';
    if (diffMinutes < 60)
        return `${diffMinutes} min${diffMinutes !== 1 ? 's' : ''} ago`;
    if (diffHours < 24)
        return `${diffHours} hr${diffHours !== 1 ? 's' : ''} ago`;
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
}

export function formatMessageTime(date: Date): string {
    return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    });
}

export function getStatusIcon(status: MessageStatus): string {
    switch (status) {
        case 'sent':
            return 'done'; // Single checkmark
        case 'delivered':
            return 'done_all'; // Double checkmark (delivered but not seen)
        case 'seen':
            return 'done_all'; // Double checkmark (seen)
        case 'failed':
            return 'error'; // Error icon
        default:
            return '';
    }
}

export function getStatusColor(status: MessageStatus): string {
    switch (status) {
        case 'failed':
            return 'text-red-500';
        default:
            return 'text-gray-500'; // Default for sent/delivered/seen
    }
}

export const transformMessagesToConversations = (
    chatMessages: ChatMessage[],
    loggedInUser: User
): Conversation[] => {
    const conversationsMap = new Map<string, Conversation>();

    for (const msg of chatMessages) {
        const conversationId = msg.room_id;
        const isMyMessage = msg.sender_id === loggedInUser.id;

        if (!conversationsMap.has(conversationId)) {
            const receiverID = isMyMessage ? msg.receiver_id : msg.sender_id;
            const receiver: User = {
                id: receiverID,
                name: `User ${receiverID}`,
                avatar: 'https://picsum.photos/50',
                isOnline: false,
            };

            conversationsMap.set(conversationId, {
                id: conversationId,
                receiver: receiver,
                last_message: '',
                last_message_timestamp: new Date(0),
                unread_count: 0,
                messages: [],
            });
        }

        const conversation = conversationsMap.get(conversationId)!;

        // handle the discriminated union by creating two separate object types
        let message: Message;

        if (msg.is_media) {
            message = {
                id: msg.id,
                sender_id: msg.sender_id,
                type: 'image',
                imageUrl: msg.message || '', // Assuming `message` field holds the URL for media
                timestamp: new Date(msg.created_at),
                status: 'delivered',
            } as ImageMessage;
        } else {
            message = {
                id: msg.id,
                sender_id: msg.sender_id,
                type: 'text',
                content: msg.message || '',
                timestamp: new Date(msg.created_at),
                status: 'delivered',
            } as TextMessage;
        }

        conversation.messages.push(message);

        if (message.timestamp > conversation.last_message_timestamp) {
            conversation.last_message = (message as any).content || 'Image'; // Cast for simplicity
            conversation.last_message_timestamp = message.timestamp;
        }

        if (!isMyMessage) {
            conversation.unread_count += 1;
        }
    }

    conversationsMap.forEach((conv) => {
        conv.messages.sort(
            (a, b) => a.timestamp.getTime() - b.timestamp.getTime()
        );
    });

    return Array.from(conversationsMap.values()).sort(
        (a, b) =>
            b.last_message_timestamp.getTime() -
            a.last_message_timestamp.getTime()
    );
};

export const generateMockChatMessages = (count: number): ChatMessage[] => {
    const mockMessages: ChatMessage[] = [];
    const baseDate = new Date('2025-06-01T00:00:00Z').getTime();

    for (let i = 0; i < count; i++) {
        const isMedia = Math.random() > 0.7; // 30% chance of being media
        const senderId = i % 2 === 0 ? 'user_me' : 'contact_kit';
        const receiverId = senderId === 'user_me' ? 'contact_kit' : 'user_me';
        const timestamp = new Date(baseDate + i * 1000 * 60 * 5); // 5-minute intervals

        const message: ChatMessage = {
            id: `msg_${i}`,
            sender_id: senderId,
            receiver_id: receiverId,
            room_id: 'chat_kit_herrington',
            message: isMedia
                ? `https://picsum.photos/200?random=${i}` // Mock URL for media
                : `This is mock message number ${i}.`,
            is_media: isMedia,
            created_at: timestamp.toISOString(),
            updated_at: timestamp.toISOString(),
            scope: 'private',
        };

        mockMessages.push(message);
    }

    return mockMessages;
};

export class ChatState {
    /**
     * Initializes the chat state with a list of messages from the backend.
     * @param chatMessages A flat array of messages from the server.
     * @param loggedInUser The current user.
     * @returns The updated array of conversations.
     */
    initialize(
        chatMessages: ChatMessage[],
        loggedInUser: User
    ): Conversation[] {
        return this.transformMessagesToConversations(
            chatMessages,
            loggedInUser
        );
    }

    // Function to group and transform ChatMessages into Conversations
    private transformMessagesToConversations = (
        chatMessages: ChatMessage[],
        loggedInUser: User
    ): Conversation[] => {
        const conversationsMap = new Map<string, Conversation>();

        for (const msg of chatMessages) {
            const conversationId = msg.room_id;
            const isMyMessage = msg.sender_id === loggedInUser.id;

            if (!conversationsMap.has(conversationId)) {
                const receiverID = isMyMessage
                    ? msg.receiver_id
                    : msg.sender_id;
                const receiver: User = {
                    id: receiverID,
                    name: `User ${receiverID}`,
                    avatar: 'https://picsum.photos/50',
                    isOnline: false,
                };

                conversationsMap.set(conversationId, {
                    id: conversationId,
                    receiver: receiver,
                    last_message: '',
                    last_message_timestamp: new Date(0),
                    unread_count: 0,
                    messages: [],
                });
            }

            const conversation = conversationsMap.get(conversationId)!;

            // handle the discriminated union by creating two separate object types
            let message: Message;

            if (msg.is_media) {
                message = {
                    id: msg.id,
                    sender_id: msg.sender_id,
                    type: 'image',
                    imageUrl: msg.message || '', // Assuming `message` field holds the URL for media
                    timestamp: new Date(msg.created_at),
                    status: 'delivered',
                } as ImageMessage;
            } else {
                message = {
                    id: msg.id,
                    sender_id: msg.sender_id,
                    type: 'text',
                    content: msg.message || '',
                    timestamp: new Date(msg.created_at),
                    status: 'delivered',
                } as TextMessage;
            }

            conversation.messages.push(message);

            if (message.timestamp > conversation.last_message_timestamp) {
                conversation.last_message = (message as any).content || 'Image'; // Cast for simplicity
                conversation.last_message_timestamp = message.timestamp;
            }

            if (!isMyMessage) {
                conversation.unread_count += 1;
            }
        }

        conversationsMap.forEach((conv) => {
            conv.messages.sort(
                (a, b) => a.timestamp.getTime() - b.timestamp.getTime()
            );
        });

        return Array.from(conversationsMap.values()).sort(
            (a, b) =>
                b.last_message_timestamp.getTime() -
                a.last_message_timestamp.getTime()
        );
    };

    /**
     * Updates a specific message's status within a conversation.
     * @param conversations The array of conversations to update.
     * @param conversationId The ID of the conversation containing the message.
     * @param messageId The ID of the message to update.
     * @param newStatus The new status to apply to the message.
     * @returns The updated array of conversations.
     */
    updateMessageStatus = (
        conversations: Conversation[],
        conversationId: string,
        messageId: string,
        newStatus: MessageStatus
    ): Conversation[] => {
        return conversations.map((conv) => {
            if (conv.id === conversationId) {
                const updatedMessages = conv.messages.map((msg) => {
                    if (msg.id === messageId) {
                        return { ...msg, status: newStatus };
                    }
                    return msg;
                });
                return { ...conv, messages: updatedMessages };
            }
            return conv;
        });
    };

    /**
     * Appends a new message to a conversation.
     * If the conversation doesn't exist, it creates a new one.
     * @param conversations The array of conversations.
     * @param newMessage The new message to add.
     * @param loggedInUser The current user.
     * @param getReceiverInfo A function to get receiver details if a new conversation is created.
     * @returns The updated array of conversations.
     */
    appendMessage = (
        conversations: Conversation[],
        newMessage: Message,
        loggedInUser: User,
        getReceiverInfo: (receiverId: string) => User
    ): Conversation[] => {
        const receiverId =
            newMessage.sender_id === loggedInUser.id
                ? (newMessage as any).receiver_id // Assuming you have receiver_id on new messages
                : newMessage.sender_id;

        const existingConv = conversations.find(
            (conv) => conv.receiver.id === receiverId
        );

        let updatedConversations: Conversation[];

        if (existingConv) {
            // Conversation already exists
            const updatedMessages = [...existingConv.messages, newMessage];
            const updatedConv = {
                ...existingConv,
                messages: updatedMessages,
                last_message: (newMessage as any).content || 'New File',
                last_message_timestamp: newMessage.timestamp,
            };

            // Replace the old conversation with the updated one
            updatedConversations = conversations.map((conv) =>
                conv.id === existingConv.id ? updatedConv : conv
            );
        } else {
            // Create a new conversation
            const newConversation: Conversation = {
                id: uuidv4(),
                receiver: getReceiverInfo(receiverId),
                last_message: (newMessage as any).content || 'New File',
                last_message_timestamp: newMessage.timestamp,
                unread_count: 1,
                messages: [newMessage],
            };
            updatedConversations = [newConversation, ...conversations];
        }

        // Sort conversations by the latest message timestamp
        return updatedConversations.sort(
            (a, b) =>
                b.last_message_timestamp.getTime() -
                a.last_message_timestamp.getTime()
        );
    };

    /**
     * Deletes a message from a conversation.
     * @param conversations The array of conversations.
     * @param conversationId The ID of the conversation.
     * @param messageId The ID of the message to delete.
     * @returns The updated array of conversations.
     */
    deleteMessage = (
        conversations: Conversation[],
        conversationId: string,
        messageId: string
    ): Conversation[] => {
        return conversations.map((conv) => {
            if (conv.id === conversationId) {
                const updatedMessages = conv.messages.filter(
                    (msg) => msg.id !== messageId
                );

                // Optional: Update last_message if the deleted message was the latest one
                let newLastMessage = conv.last_message;
                let newLastTimestamp = conv.last_message_timestamp;
                if (updatedMessages.length > 0) {
                    const lastMsg = updatedMessages[updatedMessages.length - 1];
                    newLastMessage = (lastMsg as any).content || 'File';
                    newLastTimestamp = lastMsg.timestamp;
                }

                return {
                    ...conv,
                    messages: updatedMessages,
                    last_message: newLastMessage,
                    last_message_timestamp: newLastTimestamp,
                };
            }
            return conv;
        });
    };

    /**
     * Removes a conversation from the list.
     * @param conversations The array of conversations.
     * @param conversationId The ID of the conversation to delete.
     * @returns The updated array of conversations.
     */
    deleteConversation = (
        conversations: Conversation[],
        conversationId: string
    ): Conversation[] => {
        return conversations.filter((conv) => conv.id !== conversationId);
    };
}
