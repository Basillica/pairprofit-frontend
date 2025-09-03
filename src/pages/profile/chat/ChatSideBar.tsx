import { createSignal, createEffect, For, Accessor } from 'solid-js';
import { formatRelativeTime, stringToHslColor, getInitials } from './functions';
import chat_module from './chat.module.css';
import { RoomModel } from '../../../models/chat';
import { UserModel } from '../../../models/auth';

interface SidebarProps {
    rooms: Accessor<RoomModel[]>;
    activeConversationId: string | null;
    unreadCount: Accessor<number>;
    isReceiverOnline: Accessor<boolean>;
    authUser: Accessor<UserModel | undefined>;
    setCurrentRoomID: (id: string) => void;
    showOnMobile: boolean;
}

export const ChatSidebar = (props: SidebarProps) => {
    const [searchTerm, setSearchTerm] = createSignal('');
    const [filteredRooms, setFilteredRooms] = createSignal<
        RoomModel[] | undefined
    >([]);

    createEffect(() => {
        const lowerCaseSearchTerm = searchTerm().toLowerCase();
        const filtered = props
            .rooms()
            ?.filter((room) =>
                room.title.toLowerCase().includes(lowerCaseSearchTerm)
            );
        // filtered.filter((room) => {room.});
        // filtered.sort(
        //     (a, b) =>
        //         new Date(b.updated_at).getTime() -
        //         a.updated_at.getTime()
        // );
        setFilteredRooms(filtered);
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
                    <div
                        class="h-10 w-10 rounded-full flex items-center justify-center text-white font-semibold text-sm"
                        style={{
                            'background-color': stringToHslColor(
                                `${props.authUser()?.firstname} ${
                                    props.authUser()?.lastname
                                }`,
                                70,
                                70
                            ),
                        }}
                        aria-label={`${props.authUser()?.firstname} ${
                            props.authUser()?.lastname
                        }`}
                    >
                        {getInitials(
                            `${props.authUser()?.firstname} ${
                                props.authUser()?.lastname
                            }`
                        )}
                    </div>
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
                <For each={filteredRooms()}>
                    {(room) => (
                        <div
                            class={`flex items-center p-3 cursor-pointer border-b border-gray-100 hover:bg-gray-50 relative ${
                                props.activeConversationId === room.id
                                    ? 'bg-blue-50 border-l-4 border-blue-600'
                                    : ''
                            }`}
                            onClick={() => props.setCurrentRoomID(room.id)}
                        >
                            {props.unreadCount() > 0 &&
                                props.activeConversationId !== room.id && (
                                    <div class="absolute left-0 top-0 h-full w-1 bg-blue-600 rounded-r-sm"></div>
                                )}
                            <div class="relative flex-shrink-0">
                                <div
                                    class="h-10 w-10 rounded-full flex items-center justify-center text-white font-semibold text-sm"
                                    style={{
                                        'background-color': stringToHslColor(
                                            room.title,
                                            70,
                                            70
                                        ),
                                    }}
                                    aria-label={room.title}
                                >
                                    {getInitials(room.title)}
                                </div>

                                <span
                                    class={`absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-1 ring-white ${
                                        props.isReceiverOnline()
                                            ? 'bg-green-500'
                                            : 'bg-gray-400'
                                    }`}
                                ></span>
                            </div>
                            <div class="flex-grow ml-3 overflow-hidden">
                                <div class="flex justify-between items-center">
                                    <span class="font-medium text-gray-800 truncate">
                                        {room.title}
                                    </span>
                                    <span class="text-xs text-gray-500">
                                        {formatRelativeTime(
                                            room.last_message_timestamp
                                        )}
                                    </span>
                                </div>
                                <div class="flex justify-between items-center text-sm text-gray-600">
                                    <p class="truncate text-gray-500">
                                        {room.last_message ||
                                            'No messages yet.'}
                                    </p>
                                    {props.unreadCount() > 0 &&
                                        props.activeConversationId !==
                                            room.id && (
                                            <span class="bg-blue-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                                {props.unreadCount()}
                                            </span>
                                        )}
                                </div>
                            </div>
                        </div>
                    )}
                </For>
                {filteredRooms()?.length === 0 && (
                    <p class="text-center text-gray-500 py-4">
                        No conversations found.
                    </p>
                )}
            </div>
        </div>
    );
};
