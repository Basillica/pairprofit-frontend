import { v4 as uuidv4 } from 'uuid';
import {
    ChatMessage,
    MessageStatus,
    User,
    ConversationType,
    Message,
    ImageMessage,
    TextMessage,
} from './types';

export function formatRelativeTime(dateString: string): string {
    const date = new Date(dateString);
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

export function stringToHslColor(str: string, s: number, l: number): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    const h = hash % 360;
    return `hsl(${h}, ${s}%, ${l}%)`;
}

export function getInitials(name: string): string {
    // Trim leading/trailing whitespace and split the name into words.
    const parts = name.trim().split(/\s+/);

    // If there are two or more parts (e.g., "John Doe")
    if (parts.length >= 2) {
        const firstInitial = parts[0].charAt(0).toUpperCase();
        const secondInitial = parts[1].charAt(0).toUpperCase();
        return `${firstInitial}${secondInitial}`;
    }

    // If there's only one part (e.g., "John")
    else if (parts.length === 1 && parts[0].length > 1) {
        return parts[0].substring(0, 2).toUpperCase();
    }

    // For single-character names or empty strings
    return parts[0] ? parts[0].toUpperCase() : '';
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

/**
 * A placeholder for a function that fetches a User object by their ID.
 * You must implement this function based on your data source.
 * It could be an API call, a map, or a simple lookup.
 */
function getUserById(userId: string): User {
    // Implement your user lookup logic here.
    return {
        id: userId,
        name: `User ${userId}`,
        avatar: `https://example.com/avatars/${userId}.png`,
        isOnline: true,
    };
}

/**
 * Converts a raw ChatMessage object into a structured Message object.
 */
function toStructuredMessage(chatMessage: ChatMessage): Message {
    const baseMessage = {
        id: chatMessage.id,
        sender_id: chatMessage.sender_id,
        timestamp: new Date(chatMessage.created_at),
        status: 'delivered' as MessageStatus, // Default status for conversion
    };

    // This part assumes you know the message type from the raw data.
    // The raw `ChatMessage` type doesn't specify, so this is an assumption.
    if (chatMessage.is_media) {
        // You would need to add logic here to determine if it's an image or file.
        // For now, we'll return a placeholder.
        return {
            ...baseMessage,
            type: 'text',
            content: 'Media message',
        } as TextMessage;
    } else {
        return {
            ...baseMessage,
            type: 'text',
            content: chatMessage.message || '',
        } as TextMessage;
    }
}

export function groupAndConvertMessages(
    rawMessages: ChatMessage[],
    currentUserId: string
): ConversationType[] {
    const conversationsMap = new Map<string, ConversationType>();

    for (const rawMessage of rawMessages) {
        const roomId = rawMessage.room_id;

        // Find or create the conversation for this room
        let conversation = conversationsMap.get(roomId);
        if (!conversation) {
            const receiverId =
                rawMessage.sender_id === currentUserId
                    ? rawMessage.receiver_id
                    : rawMessage.sender_id;
            const receiver = getUserById(receiverId);

            conversation = {
                id: roomId,
                receiver: receiver,
                last_message: '',
                last_message_timestamp: new Date(0),
                unread_count: 0,
                messages: [],
            };
            conversationsMap.set(roomId, conversation);
        }

        const structuredMessage = toStructuredMessage(rawMessage);
        conversation.messages.push(structuredMessage);

        // Update unread count for the current user.
        // Assuming a message is 'unread' if it's from another user and not yet seen.
        if (structuredMessage.sender_id !== currentUserId) {
            // Your API should provide the status. Here, we're assuming 'delivered' means unread.
            if (structuredMessage.status === 'delivered') {
                conversation.unread_count++;
            }
        }
    }

    // After processing all messages, sort and set the last_message
    conversationsMap.forEach((conv) => {
        conv.messages.sort(
            (a, b) => a.timestamp.getTime() - b.timestamp.getTime()
        );
        const lastMessage = conv.messages[conv.messages.length - 1];

        if (lastMessage) {
            if (lastMessage.type === 'text') {
                conv.last_message = lastMessage.content;
            } else if (lastMessage.type === 'image') {
                conv.last_message = 'Image message';
            } else if (lastMessage.type === 'file') {
                conv.last_message = 'File message';
            }
            conv.last_message_timestamp = lastMessage.timestamp;
        }
    });

    return Array.from(conversationsMap.values());
}

/**
 * Updates an existing conversation or creates a new one based on a new chat message.
 *
 * @param conversations The current array of ConversationType objects.
 * @param newMessage The new ChatMessage to add.
 * @param currentUserId The ID of the current logged-in user.
 * @returns A new array of ConversationType objects with the update applied.
 */
export function updateConversation(
    conversations: ConversationType[],
    newMessage: ChatMessage,
    currentUserId: string
): ConversationType[] {
    const structuredMessage = toStructuredMessage(newMessage);
    const existingIndex = conversations.findIndex(
        (conv) => conv.id === newMessage.room_id
    );

    let lastMessageSummary: string;
    // Type narrowing to safely access properties
    if (structuredMessage.type === 'text') {
        lastMessageSummary = structuredMessage.content;
    } else if (structuredMessage.type === 'image') {
        lastMessageSummary = 'Image message';
    } else if (structuredMessage.type === 'file') {
        lastMessageSummary = 'File message';
    } else {
        lastMessageSummary = 'New message';
    }

    if (existingIndex !== -1) {
        // ConversationType already exists, update it.
        const updatedConversations = [...conversations];
        const conv = updatedConversations[existingIndex];

        conv.messages.push(structuredMessage);
        conv.last_message = lastMessageSummary; // Use the safe summary
        conv.last_message_timestamp = structuredMessage.timestamp;

        // Increment unread count if the message is from another user.
        if (structuredMessage.sender_id !== currentUserId) {
            conv.unread_count++;
        }

        return updatedConversations;
    } else {
        // No existing conversation, create a new one.
        const receiverId =
            structuredMessage.sender_id === currentUserId
                ? newMessage.receiver_id
                : structuredMessage.sender_id;
        const receiver = getUserById(receiverId);

        const newConversation: ConversationType = {
            id: newMessage.room_id,
            receiver: receiver,
            last_message: lastMessageSummary, // Use the safe summary
            last_message_timestamp: structuredMessage.timestamp,
            unread_count: structuredMessage.sender_id !== currentUserId ? 1 : 0,
            messages: [structuredMessage],
        };
        return [newConversation, ...conversations];
    }
}

/**
 * Deletes a single message from a conversation based on its ID.
 *
 * @param conversations The current array of ConversationType objects.
 * @param roomId The ID of the conversation (room) to find.
 * @param messageIdToDelete The ID of the message to delete.
 * @returns A new array of ConversationType objects with the message removed.
 */
export function deleteMessageFromConversation(
    conversations: ConversationType[],
    roomId: string,
    messageIdToDelete: string
): ConversationType[] {
    const conversationIndex = conversations.findIndex(
        (conv) => conv.id === roomId
    );

    if (conversationIndex === -1) {
        return conversations;
    }

    const updatedConversations = [...conversations];
    const conversationToUpdate = { ...updatedConversations[conversationIndex] };

    // Filter out the message to be deleted
    conversationToUpdate.messages = conversationToUpdate.messages.filter(
        (message) => message.id !== messageIdToDelete
    );

    // Re-calculate last_message and timestamp based on the remaining messages
    if (conversationToUpdate.messages.length > 0) {
        // Find the last message in the *newly filtered* array
        const lastMessage = conversationToUpdate.messages.sort(
            (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
        )[0];

        // Update the last_message and timestamp based on the new last message
        if (lastMessage.type === 'text') {
            conversationToUpdate.last_message = lastMessage.content;
        } else if (lastMessage.type === 'image') {
            conversationToUpdate.last_message = 'Image message';
        } else if (lastMessage.type === 'file') {
            conversationToUpdate.last_message = 'File message';
        } else {
            conversationToUpdate.last_message = 'Message deleted'; // Default fallback
        }

        conversationToUpdate.last_message_timestamp = lastMessage.timestamp;
    } else {
        // If all messages are deleted, clear the last message details
        conversationToUpdate.last_message = '';
        conversationToUpdate.last_message_timestamp = new Date(0);
    }

    updatedConversations[conversationIndex] = conversationToUpdate;
    return updatedConversations;
}

/**
 * Deletes a conversation from the list based on its room ID.
 *
 * @param conversations The current array of ConversationType objects.
 * @param roomIdToDelete The ID of the room to delete.
 * @returns A new array of ConversationType objects with the specified conversation removed.
 */
export function deleteConversation(
    conversations: ConversationType[],
    roomIdToDelete: string
): ConversationType[] {
    return conversations.filter((conv) => conv.id !== roomIdToDelete);
}

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
    ): ConversationType[] {
        return this.transformMessagesToConversations(
            chatMessages,
            loggedInUser
        );
    }

    // Function to group and transform ChatMessages into Conversations
    private transformMessagesToConversations = (
        chatMessages: ChatMessage[],
        loggedInUser: User
    ): ConversationType[] => {
        const conversationsMap = new Map<string, ConversationType>();

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
        conversations: ConversationType[],
        conversationId: string,
        messageId: string,
        newStatus: MessageStatus
    ): ConversationType[] => {
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
        conversations: ConversationType[],
        newMessage: Message,
        loggedInUser: User,
        getReceiverInfo: (receiverId: string) => User
    ): ConversationType[] => {
        const receiverId =
            newMessage.sender_id === loggedInUser.id
                ? (newMessage as any).receiver_id // Assuming you have receiver_id on new messages
                : newMessage.sender_id;

        const existingConv = conversations.find(
            (conv) => conv.receiver.id === receiverId
        );

        let updatedConversations: ConversationType[];

        if (existingConv) {
            // ConversationType already exists
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
            const newConversation: ConversationType = {
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
        conversations: ConversationType[],
        conversationId: string,
        messageId: string
    ): ConversationType[] => {
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
        conversations: ConversationType[],
        conversationId: string
    ): ConversationType[] => {
        return conversations.filter((conv) => conv.id !== conversationId);
    };
}
