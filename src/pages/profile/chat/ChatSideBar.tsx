import { createSignal, createEffect, For } from 'solid-js';
import { User, Conversation } from './types';
import { formatRelativeTime } from './functions';
import chat_module from './chat.module.css';

interface SidebarProps {
    conversations: Conversation[];
    activeConversationId: string | null;
    switchChat: (id: string) => void;
    loggedInUser: User;
    showOnMobile: boolean;
}

export const ChatSidebar = (props: SidebarProps) => {
    const [searchTerm, setSearchTerm] = createSignal('');
    const [filteredConversations, setFilteredConversations] = createSignal<
        Conversation[]
    >([]);

    createEffect(() => {
        const lowerCaseSearchTerm = searchTerm().toLowerCase();
        const filtered = props.conversations.filter(
            (conv) =>
                conv.receiver.name
                    .toLowerCase()
                    .includes(lowerCaseSearchTerm) ||
                conv.last_message.toLowerCase().includes(lowerCaseSearchTerm)
        );
        filtered.sort(
            (a, b) =>
                b.last_message_timestamp.getTime() -
                a.last_message_timestamp.getTime()
        );
        setFilteredConversations(filtered);
    });

    return (
        <div
            id="chatSidebar"
            // No longer uses 'open' class for transform, handled by App.tsx's conditional rendering
            // shadow-md and md:shadow-none remain for desktop styling
            class={`w-full bg-white border-r border-gray-200 flex flex-col shadow-md md:shadow-none`}
        >
            <div class="p-4 border-b border-gray-200 flex items-center justify-between">
                <div class="flex items-center space-x-3">
                    <img
                        class="h-10 w-10 rounded-full object-cover"
                        src={props.loggedInUser.avatar}
                        alt={props.loggedInUser.name}
                    />
                    <span class="font-semibold text-gray-800">My Profile</span>
                </div>
                {/* No close button needed here, as App.tsx will handle showing/hiding this entire component */}
            </div>

            <div class="p-3 border-b border-gray-200 bg-gray-50">
                <div class="relative">
                    <span class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <i class="fas fa-magnifying-glass text-gray-400"></i>
                    </span>
                    <input
                        type="text"
                        id="searchChats"
                        placeholder="Search conversations..."
                        class="w-full p-2 pl-10 pr-3 rounded-full bg-white border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-400 text-sm"
                        onInput={(e) => setSearchTerm(e.currentTarget.value)}
                        value={searchTerm()}
                    />
                </div>
            </div>

            <div
                id="conversationList"
                class={`${chat_module.chat_sidebar_list} flex-grow`}
            >
                <For each={filteredConversations()}>
                    {(conv) => (
                        <div
                            class={`flex items-center p-3 cursor-pointer border-b border-gray-100 hover:bg-gray-50 relative ${
                                props.activeConversationId === conv.id
                                    ? 'bg-blue-50 border-l-4 border-blue-600'
                                    : ''
                            }`}
                            onClick={() => props.switchChat(conv.id)}
                        >
                            {conv.unread_count > 0 &&
                                props.activeConversationId !== conv.id && (
                                    <div class="absolute left-0 top-0 h-full w-1 bg-blue-600 rounded-r-sm"></div>
                                )}
                            <div class="relative flex-shrink-0">
                                <img
                                    class="h-10 w-10 rounded-full object-cover"
                                    src={conv.receiver.avatar}
                                    alt={conv.receiver.name}
                                />
                                <span
                                    class={`absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-1 ring-white ${
                                        conv.receiver.isOnline
                                            ? 'bg-green-500'
                                            : 'bg-gray-400'
                                    }`}
                                ></span>
                            </div>
                            <div class="flex-grow ml-3 overflow-hidden">
                                <div class="flex justify-between items-center">
                                    <span class="font-medium text-gray-800 truncate">
                                        {conv.receiver.name}
                                    </span>
                                    <span class="text-xs text-gray-500">
                                        {formatRelativeTime(
                                            conv.last_message_timestamp
                                        )}
                                    </span>
                                </div>
                                <div class="flex justify-between items-center text-sm text-gray-600">
                                    <p class="truncate text-gray-500">
                                        {conv.last_message}
                                    </p>
                                    {conv.unread_count > 0 &&
                                        props.activeConversationId !==
                                            conv.id && (
                                            <span class="bg-blue-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                                {conv.unread_count}
                                            </span>
                                        )}
                                </div>
                            </div>
                        </div>
                    )}
                </For>
                {filteredConversations().length === 0 && (
                    <p class="text-center text-gray-500 py-4">
                        No conversations found.
                    </p>
                )}
            </div>
        </div>
    );
};
