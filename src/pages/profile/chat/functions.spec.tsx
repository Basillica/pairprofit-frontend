import {
    groupAndConvertMessages,
    updateConversation,
    deleteMessageFromConversation,
    deleteConversation,
} from './functions';
import { expect } from 'vitest';
import { vi } from 'vitest';
import type { ChatMessage, ConversationType } from './types';

const mockUsers = {
    user1: { id: 'user1', name: 'Alice', avatar: '', isOnline: true },
    user2: { id: 'user2', name: 'Bob', avatar: '', isOnline: false },
    user3: { id: 'user3', name: 'Charlie', avatar: '', isOnline: true },
};

vi.mock('./types', () => ({
    ...vi.importActual('./types'),
    getUserById: vi.fn((id: string) => mockUsers[id as keyof typeof mockUsers]),
}));

describe('groupAndConvertMessages', () => {
    it('should correctly group messages into separate conversations by room_id', () => {
        const rawMessages: ChatMessage[] = [
            {
                id: 'msg1',
                sender_id: 'user2',
                receiver_id: 'user1',
                room_id: 'roomA',
                message: 'Hello',
                is_media: false,
                created_at: '2025-08-30T10:00:00Z',
                updated_at: '2025-08-30T10:00:00Z',
                scope: 'direct',
            },
            {
                id: 'msg2',
                sender_id: 'user1',
                receiver_id: 'user2',
                room_id: 'roomA',
                message: 'Hi',
                is_media: false,
                created_at: '2025-08-30T10:01:00Z',
                updated_at: '2025-08-30T10:01:00Z',
                scope: 'direct',
            },
            {
                id: 'msg3',
                sender_id: 'user3',
                receiver_id: 'user1',
                room_id: 'roomB',
                message: 'Test',
                is_media: false,
                created_at: '2025-08-30T10:02:00Z',
                updated_at: '2025-08-30T10:02:00Z',
                scope: 'direct',
            },
        ];
        const currentUserId = 'user1';

        const conversations = groupAndConvertMessages(
            rawMessages,
            currentUserId
        );

        expect(conversations.length).toBe(2);
        expect(conversations.find((c) => c.id === 'roomA')).toBeDefined();
        expect(conversations.find((c) => c.id === 'roomB')).toBeDefined();
    });
});

describe('groupAndConvertMessages', () => {
    it('should correctly identify the last message and timestamp', () => {
        const rawMessages: ChatMessage[] = [
            {
                id: 'msg1',
                sender_id: 'user2',
                receiver_id: 'user1',
                room_id: 'roomC',
                message: 'First message',
                is_media: false,
                created_at: '2025-08-30T10:00:00Z',
                updated_at: '2025-08-30T10:00:00Z',
                scope: 'direct',
            },
            {
                id: 'msg2',
                sender_id: 'user1',
                receiver_id: 'user2',
                room_id: 'roomC',
                message: 'Last message',
                is_media: false,
                created_at: '2025-08-30T10:05:00Z',
                updated_at: '2025-08-30T10:05:00Z',
                scope: 'direct',
            },
            {
                id: 'msg3',
                sender_id: 'user2',
                receiver_id: 'user1',
                room_id: 'roomC',
                message: 'Middle message',
                is_media: false,
                created_at: '2025-08-30T10:02:00Z',
                updated_at: '2025-08-30T10:02:00Z',
                scope: 'direct',
            },
        ];
        const currentUserId = 'user1';

        const conversations = groupAndConvertMessages(
            rawMessages,
            currentUserId
        );
        const conversationC = conversations.find((c) => c.id === 'roomC');

        expect(conversationC?.last_message).toBe('Last message');
        expect(conversationC?.last_message_timestamp.toISOString()).toBe(
            '2025-08-30T10:05:00.000Z'
        );
    });
});

describe('groupAndConvertMessages', () => {
    it('should correctly count unread messages for the current user', () => {
        const rawMessages: ChatMessage[] = [
            // Unread message from user2 to user1
            {
                id: 'msg1',
                sender_id: 'user2',
                receiver_id: 'user1',
                room_id: 'roomD',
                message: 'New message 1',
                is_media: false,
                created_at: '2025-08-30T11:00:00Z',
                updated_at: '2025-08-30T11:00:00Z',
                scope: 'direct',
            },
            // Read message from user1 to user2
            {
                id: 'msg2',
                sender_id: 'user1',
                receiver_id: 'user2',
                room_id: 'roomD',
                message: 'Read message',
                is_media: false,
                created_at: '2025-08-30T11:01:00Z',
                updated_at: '2025-08-30T11:01:00Z',
                scope: 'direct',
            },
            // Another unread message from user3 to user1
            {
                id: 'msg3',
                sender_id: 'user3',
                receiver_id: 'user1',
                room_id: 'roomD',
                message: 'New message 2',
                is_media: false,
                created_at: '2025-08-30T11:02:00Z',
                updated_at: '2025-08-30T11:02:00Z',
                scope: 'direct',
            },
        ];
        const currentUserId = 'user1';

        const conversations = groupAndConvertMessages(
            rawMessages,
            currentUserId
        );
        const conversationD = conversations.find((c) => c.id === 'roomD');

        expect(conversationD?.unread_count).toBe(2);
    });
});

describe('groupAndConvertMessages', () => {
    it('should correctly identify the receiver of the conversation', () => {
        const rawMessages: ChatMessage[] = [
            {
                id: 'msg1',
                sender_id: 'user1',
                receiver_id: 'user3',
                room_id: 'roomE',
                message: 'Hello',
                is_media: false,
                created_at: '2025-08-30T12:00:00Z',
                updated_at: '2025-08-30T12:00:00Z',
                scope: 'direct',
            },
            {
                id: 'msg2',
                sender_id: 'user3',
                receiver_id: 'user1',
                room_id: 'roomE',
                message: 'Hi',
                is_media: false,
                created_at: '2025-08-30T12:01:00Z',
                updated_at: '2025-08-30T12:01:00Z',
                scope: 'direct',
            },
        ];
        const currentUserId = 'user1';

        const conversations = groupAndConvertMessages(
            rawMessages,
            currentUserId
        );
        const conversationE = conversations.find((c) => c.id === 'roomE');

        expect(conversationE?.receiver.id).toBe('user3');
        // expect(conversationE?.receiver.name).toBe('Charlie'); // Based on mockUsers
    });
});

describe('updateConversation', () => {
    const currentUserId = 'user1';
    const mockConversations: ConversationType[] = [
        {
            id: 'roomA',
            receiver: { id: 'user2', name: 'Bob', avatar: '', isOnline: true },
            last_message: 'Hi',
            last_message_timestamp: new Date('2025-08-30T10:01:00Z'),
            unread_count: 0,
            messages: [
                {
                    id: 'msg1',
                    sender_id: 'user2',
                    type: 'text',
                    content: 'Hello',
                    timestamp: new Date('2025-08-30T10:00:00Z'),
                    status: 'delivered',
                },
            ],
        },
    ];

    it('should update an existing conversation with a new message', () => {
        const newMessage = {
            id: 'msg2',
            sender_id: 'user1',
            receiver_id: 'user2',
            room_id: 'roomA',
            message: 'New update',
            is_media: false,
            created_at: '2025-08-30T10:05:00Z',
            updated_at: '2025-08-30T10:05:00Z',
            scope: 'direct',
        };
        const updatedConversations = updateConversation(
            mockConversations,
            newMessage,
            currentUserId
        );
        const updatedConv = updatedConversations.find((c) => c.id === 'roomA');

        expect(updatedConv?.messages.length).toBe(2);
        expect(updatedConv?.last_message).toBe('New update');
        expect(updatedConv?.last_message_timestamp.toISOString()).toBe(
            '2025-08-30T10:05:00.000Z'
        );
    });

    it('should create a new conversation if it does not exist', () => {
        const newMessage = {
            id: 'msg3',
            sender_id: 'user3',
            receiver_id: 'user1',
            room_id: 'roomB',
            message: 'New conversation',
            is_media: false,
            created_at: '2025-08-30T11:00:00Z',
            updated_at: '2025-08-30T11:00:00Z',
            scope: 'direct',
        };
        const updatedConversations = updateConversation(
            mockConversations,
            newMessage,
            currentUserId
        );
        const newConv = updatedConversations.find((c) => c.id === 'roomB');

        expect(updatedConversations.length).toBe(2);
        expect(newConv).toBeDefined();
        expect(newConv?.last_message).toBe('New conversation');
        expect(newConv?.unread_count).toBe(1);
    });
});

describe('deleteConversation and deleteMessageFromConversation', () => {
    const mockConversations: ConversationType[] = [
        {
            id: 'roomA',
            receiver: { id: 'user2', name: 'Bob', avatar: '', isOnline: true },
            last_message: 'Hi',
            last_message_timestamp: new Date('2025-08-30T10:01:00Z'),
            unread_count: 0,
            messages: [
                {
                    id: 'msg1',
                    sender_id: 'user2',
                    type: 'text',
                    content: 'Hello',
                    timestamp: new Date('2025-08-30T10:00:00Z'),
                    status: 'delivered',
                },
                {
                    id: 'msg2',
                    sender_id: 'user1',
                    type: 'text',
                    content: 'Hi',
                    timestamp: new Date('2025-08-30T10:01:00Z'),
                    status: 'sent',
                },
            ],
        },
        {
            id: 'roomB',
            receiver: {
                id: 'user3',
                name: 'Charlie',
                avatar: '',
                isOnline: true,
            },
            last_message: 'Test',
            last_message_timestamp: new Date('2025-08-30T11:00:00Z'),
            unread_count: 1,
            messages: [
                {
                    id: 'msg3',
                    sender_id: 'user3',
                    type: 'text',
                    content: 'Test',
                    timestamp: new Date('2025-08-30T11:00:00Z'),
                    status: 'delivered',
                },
            ],
        },
    ];

    it('should delete a conversation by its ID', () => {
        const updatedConversations = deleteConversation(
            mockConversations,
            'roomB'
        );

        expect(updatedConversations.length).toBe(1);
        expect(
            updatedConversations.find((c) => c.id === 'roomB')
        ).toBeUndefined();
    });

    it('should delete a message from a conversation', () => {
        const updatedConversations = deleteMessageFromConversation(
            mockConversations,
            'roomA',
            'msg1'
        );
        const updatedConv = updatedConversations.find((c) => c.id === 'roomA');

        expect(updatedConv?.messages.length).toBe(1);
        expect(
            updatedConv?.messages.find((m) => m.id === 'msg1')
        ).toBeUndefined();
    });

    it('should update last_message after deleting the latest message', () => {
        // Here we're mocking a timestamp-based ID for simplicity.
        // In a real scenario, you'd use a UUID and find the last message by timestamp.
        const mockConvWithNewMsg = updateConversation(
            mockConversations,
            {
                id: 'msg_temp',
                sender_id: 'user1',
                receiver_id: 'user2',
                room_id: 'roomA',
                message: 'Temporary message',
                is_media: false,
                created_at: '2025-08-30T12:00:00Z',
                updated_at: '2025-08-30T12:00:00Z',
                scope: 'direct',
            },
            'user1'
        );
        const updatedConversations = deleteMessageFromConversation(
            mockConvWithNewMsg,
            'roomA',
            'msg_temp'
        );
        const updatedConv = updatedConversations.find((c) => c.id === 'roomA');

        expect(updatedConv?.last_message).toBe('Hi');
        expect(updatedConv?.last_message_timestamp.toISOString()).toBe(
            '2025-08-30T10:01:00.000Z'
        );
    });
});
