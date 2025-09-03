import { createMemo, createResource, createSignal, onMount } from 'solid-js';
import chat_module from './chat.module.css';
import { MessageModel } from './types';
import ChatWindow from './ChatWindow';
import { ChatSidebar } from './ChatSideBar';
import { useAppContext } from '../../../state';
import { LocalStorageKey, SecureLocalStorage } from '../../../lib/localstore';
import { UserModel } from '../../../models/auth';
import { RoomApiHandler } from '../../../api/backend/room';
import { ChatMessageModel, RoomModel } from '../../../models/chat';
import { ChatApiHandler } from '../../../api/backend/chat';

export const ChatPage = () => {
    const [activeConversationId, setActiveConversationId] = createSignal<
        string | null
    >('');
    const fetchUserRooms = async (user: UserModel): Promise<RoomModel[]> => {
        if (!user) return [];
        setIsAppLoading(true);
        const api = new RoomApiHandler();
        const response = await api.listUserRooms(user.id);
        setIsAppLoading(false);
        if (!response.success) return [];
        setUserRooms(response.data.rooms as RoomModel[]);
        return response.data.rooms as RoomModel[];
    };

    const fetRoomMessages = async (
        roomID: string
    ): Promise<ChatMessageModel[]> => {
        if (!roomID) return [];
        setIsAppLoading(true);
        let api = new ChatApiHandler();
        let res = await api.getRoomMessages(roomID);
        setIsAppLoading(false);
        if (res.success) {
            console.log(res.data, 'messagesmessages');
            return res.data.message as ChatMessageModel[];
        } else {
            return [] as ChatMessageModel[];
        }
    };

    const [roomMessages] = createResource(
        activeConversationId,
        fetRoomMessages
    );

    const {
        userType: { authUser, setAuthUser },
        inAppConnection: {
            getConnectedClients,
            connectedClients,
            setIsAppLoading,
        },
    } = useAppContext();

    const [mobileView, setMobileView] = createSignal<'sidebar' | 'chat'>(
        window.innerWidth <= 768 ? 'sidebar' : 'chat'
    );
    const [unreadCount] = createSignal(0);
    const isReceiverOnline = createMemo(() => {
        if (!authUser()) return false;
        return connectedClients().includes(authUser()!.id);
    });
    const [userRooms, setUserRooms] = createSignal<RoomModel[]>([]);
    const [currentRoom, setCurrentRoom] = createSignal<RoomModel>();

    const handleSendMessage = (
        content: string,
        type: string = 'text',
        imageUrl?: string
    ) => {
        if (!activeConversationId()) return;

        let newMessage: MessageModel = {
            id: '',
            sender_id: authUser()?.id!,
            room_id: activeConversationId()!,
            receiver_id: '', // This should be set based on the active conversation
            message: imageUrl ? imageUrl : content,
            is_media: type !== 'text',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            scope: type,
            status: 'sent',
        };
        console.log(newMessage);
    };

    const handleResize = () => {
        console.log(
            window.innerWidth,
            'window.innerWidthwindow.innerWidthwindow.innerWidth'
        );
        if (window.innerWidth > 768) {
            // On desktop, always show both
            setMobileView('chat'); // 'chat' implies both are visible on desktop
        } else {
            // On mobile, if an active chat exists, stay on chat view, otherwise go to sidebar
            if (activeConversationId()) {
                setMobileView('chat'); // Stay on chat if one is selected
            } else {
                setMobileView('sidebar'); // Go to sidebar if no chat selected initially
            }
        }
    };

    // Handle window resize for sidebar visibility
    // Handle window resize to adjust mobileView state
    onMount(() => {
        if (!authUser()) {
            const user = SecureLocalStorage.getItem<UserModel>(
                LocalStorageKey.AppAuthUserModel
            );
            if (!user) return;
            setAuthUser(user);
        }
        window.addEventListener('resize', handleResize);
        fetchUserRooms(authUser()!);
        getConnectedClients();
        return () => window.removeEventListener('resize', handleResize);
    });

    const setCurrentRoomID = (id: string) => {
        setCurrentRoom(userRooms().find((el) => el.id === id));
        setActiveConversationId(id);
        handleResize();
    };

    return (
        <div class={chat_module.chat_container}>
            <div
                class={`w-full md:w-1/4
                    bg-white border-r border-gray-200
                    flex flex-col shadow-md md:shadow-none
                    absolute md:relative inset-0
                    transition-transform duration-300 ease-in-out
                    ${
                        mobileView() === 'sidebar'
                            ? 'translate-x-0'
                            : '-translate-x-full md:translate-x-0'
                    }
                `}
            >
                <ChatSidebar
                    activeConversationId={activeConversationId()}
                    showOnMobile={mobileView() === 'sidebar'}
                    authUser={authUser}
                    rooms={userRooms}
                    unreadCount={unreadCount}
                    isReceiverOnline={isReceiverOnline}
                    setCurrentRoomID={setCurrentRoomID}
                />
            </div>

            <div
                class={`${
                    chat_module.flex_grow
                } w-full md:w-3/4 flex flex-col bg-gray-50 ${
                    mobileView() === 'chat' ? 'block' : 'hidden'
                } md:block
        transition-transform duration-300 ease-in-out
                    ${
                        mobileView() === 'chat'
                            ? 'translate-x-0'
                            : 'translate-x-full md:translate-x-0'
                    }
        `}
            >
                <ChatWindow
                    activeConversationId={activeConversationId}
                    authUser={authUser}
                    sendMessage={handleSendMessage}
                    roomMessages={roomMessages}
                    showGoBackButton={
                        window.innerWidth <= 768 && mobileView() === 'chat'
                    }
                    goBackToSidebar={() => setMobileView('sidebar')}
                    currentRoom={currentRoom}
                />
            </div>
        </div>
    );
};
