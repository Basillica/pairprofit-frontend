import { MessageStatus, ConversationType } from './types';

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
