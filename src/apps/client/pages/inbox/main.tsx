import { Component, createSignal, For, Match, Show, Switch } from 'solid-js';
import { SearchMessagesView } from './SearchView';
import { ArtisanProfileView } from './ProfileView';
import { FilesAndLinksView } from './FilesNLinks';

// Component for the Interactive Offer Card Message
const OfferCardMessage = (props: {
    setShowDetailsPanel: (value: boolean) => void;
}) => {
    // Handler for the main button
    const handleViewDetails = () => {
        props.setShowDetailsPanel(true);
    };

    return (
        // Outer wrapper to align the card to the right (like a sent message)
        <div class="flex justify-end">
            <div
                // Card Container: responsive max-width, white background, border, shadow, and gap
                class="p-4 bg-white border border-gray-300 rounded-xl shadow-sm flex flex-col items-end gap-4 
                       w-full max-w-xs sm:max-w-md"
            >
                <div class="w-full flex flex-col justify-start items-start gap-3">
                    <div class="w-full flex flex-col justify-start items-start gap-1">
                        {/* Title/Price */}
                        <div class="w-full text-[#1376A1] text-sm font-semibold leading-relaxed">
                            Fix leaking kitchen sink - Fixed price: $40
                        </div>

                        {/* Recipient Tag */}
                        <div class="w-full p-4 bg-blue-100 rounded-t-sm rounded-br-lg rounded-bl-lg flex justify-start items-center">
                            <div class="text-base text-gray-800 font-normal">
                                To James Carter
                            </div>
                        </div>
                    </div>

                    {/* File Attachment Section (Offer contract.pdf) */}
                    <div class="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg flex justify-start items-center gap-4">
                        {/* Icon/PDF Badge */}
                        <svg
                            width="28"
                            height="29"
                            viewBox="0 0 28 29"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g clip-path="url(#a)">
                                <g clip-path="url(#b)">
                                    <path
                                        d="m21 .5 4.666 4.667V27.5a1 1 0 0 1-1 1H3.334a1 1 0 0 1-1-1v-26a1 1 0 0 1 1-1z"
                                        fill="#E9F0FA"
                                    />
                                    <path
                                        d="M25.667 5.167H21V.5z"
                                        fill="#C2CDDE"
                                    />
                                </g>
                                <rect
                                    x="1.167"
                                    y="12.166"
                                    width="25.667"
                                    height="11.667"
                                    rx="1"
                                    fill="#F14848"
                                />
                                <path
                                    d="M6.757 21v-5.818H8.94q.67 0 1.125.25.457.25.69.687.236.435.236.989 0 .56-.235.994-.237.435-.696.685-.46.247-1.134.247H7.48v-.866h1.304q.392 0 .642-.137a.86.86 0 0 0 .37-.375q.121-.239.122-.548 0-.31-.123-.546a.83.83 0 0 0-.372-.366q-.249-.134-.645-.134h-.966V21zm7.12 0h-1.971v-5.818h2.011q.867 0 1.489.35.626.346.96.996.336.651.335 1.557 0 .909-.338 1.563-.335.653-.968 1.003-.631.35-1.517.349m-.917-.912h.866q.609 0 1.015-.222.406-.225.61-.667.205-.447.205-1.114t-.205-1.108a1.4 1.4 0 0 0-.605-.662q-.397-.22-.988-.221h-.898zm4.743.912v-5.818h3.727v.883h-2.673v1.58h2.417v.883h-2.417V21z"
                                    fill="#fff"
                                />
                            </g>
                            <defs>
                                <clipPath id="a">
                                    <path fill="#fff" d="M0 .5h28v28H0z" />
                                </clipPath>
                                <clipPath id="b">
                                    <path
                                        fill="#fff"
                                        d="M2.333.5h23.333v28H2.333z"
                                    />
                                </clipPath>
                            </defs>
                        </svg>

                        {/* File Name and Details */}
                        <div class="flex-1 flex flex-col justify-start items-start gap-0.5 min-w-0">
                            <div class="w-full text-sm font-medium text-gray-900 leading-tight truncate">
                                Offer contract.pdf
                            </div>
                            <div class="w-full text-xs text-gray-600">
                                313 KB • 31 Oct, 2025
                            </div>
                        </div>

                        {/* Action Icons (Download/Delete) */}
                        <div class="flex justify-start items-center gap-2 flex-shrink-0">
                            {/* Download Icon (Placeholder) */}
                            <div
                                class="w-4 h-4 text-gray-600 cursor-pointer hover:text-blue-700 transition"
                                title="Download"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                    <polyline points="7 10 12 15 17 10"></polyline>
                                    <line x1="12" y1="15" x2="12" y2="3"></line>
                                </svg>
                            </div>
                            {/* Delete Icon (Placeholder) */}
                            <div
                                class="w-4 h-4 text-red-600 cursor-pointer hover:text-red-700 transition"
                                title="Delete"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <polyline points="3 6 5 6 21 6"></polyline>
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* View Details Button (The Interactive Element) */}
                <button
                    class="px-4 py-2 bg-[#1376A1] hover:bg-blue-800 text-white text-xs font-bold rounded-md transition-colors flex-shrink-0"
                    onClick={handleViewDetails}
                >
                    View details
                </button>
            </div>
        </div>
    );
};

// --- Data Structure ---
interface ChatMessage {
    id: number;
    name: string;
    subject: string;
    lastMessage: string;
    time: string;
    read: boolean;
    active: boolean;
    avatar: string;
    status: string;
}

const chatMessages: ChatMessage[] = [
    {
        id: 1,
        name: 'James Carter',
        subject: 'Fix leaking kitchen sink',
        lastMessage: 'James Carter wants to schedule a meeting',
        time: '01:31 PM',
        read: false,
        active: true,
        avatar: `https://picsum.photos/200?random=${Math.random()}`,
        status: 'none', // none = no dot
    },
    {
        id: 2,
        name: 'Sophia Lee',
        subject: 'Hair styling appointment',
        lastMessage: 'Thanks, see you then!',
        time: '01:27 PM',
        read: true,
        active: false,
        avatar: `https://picsum.photos/200?random=${Math.random()}`,
        status: 'online', // online = yellow dot
    },
    {
        id: 3,
        name: 'Project A',
        subject: 'Plumbing repair',
        lastMessage: 'Can we schedule for tomorrow?',
        time: '01:27 PM',
        read: true,
        active: false,
        avatar: `https://picsum.photos/200?random=${Math.random()}`,
        status: 'online',
    },
    // Duplicates from original structure
    {
        id: 4,
        name: 'Sophia Lee',
        subject: 'Hair styling appointment',
        lastMessage: 'Thanks, see you then!',
        time: '01:27 PM',
        read: true,
        active: false,
        avatar: `https://picsum.photos/200?random=${Math.random()}`,
        status: 'online',
    },
    {
        id: 5,
        name: 'James Carter',
        subject: 'Fix leaking kitchen sink',
        lastMessage: 'James Carter wants to schedule a meeting',
        time: '01:31 PM',
        read: false,
        active: false,
        avatar: `https://picsum.photos/200?random=${Math.random()}`,
        status: 'none',
    },
];

// --- Sub-Components ---
const ChatListItem = (props: any) => {
    const isSelected = () => props.selectedChatId() === props.chat.id;

    return (
        <div
            class="p-3 sm:px-3 sm:py-5 border-b border-gray-200 flex items-center gap-4 cursor-pointer"
            classList={{ 'bg-gray-100': isSelected() }}
            onClick={() => props.onSelect(props.chat.id)}
        >
            <div class="relative w-[60px] h-[60px] flex-shrink-0">
                <img
                    class="w-full h-full rounded-full object-cover"
                    src={props.chat.avatar}
                    alt={`${props.chat.name} avatar`}
                />
                <Show when={props.chat.status === 'online'}>
                    <div class="absolute bottom-0 right-0 w-3 h-3 bg-yellow-400 rounded-full border-2 border-white"></div>
                </Show>
            </div>

            <div class="flex-grow flex flex-col gap-1 w-[315px]">
                <div class="flex justify-between items-center">
                    <div class="text-sm font-bold text-gray-900">
                        {props.chat.name}
                    </div>
                    <div class="text-sm font-bold text-gray-500">
                        {props.chat.time}
                    </div>
                </div>
                <div
                    class="text-base truncate"
                    classList={{
                        'text-sm text-gray-800': !props.chat.read,
                        'text-gray-500': props.chat.read,
                    }}
                >
                    {props.chat.lastMessage}
                </div>
            </div>
        </div>
    );
};

const ChatHeader = (props: any) => (
    <div class="w-full p-4 border-b border-gray-300 flex justify-between items-center bg-white sticky top-0 z-10">
        <div class="flex flex-col gap-1">
            <div class="text-xl font-medium text-gray-900">
                {props.chat().name}
            </div>
            <div class="text-xs font-medium text-blue-600 border-b border-blue-600 inline-flex self-start cursor-pointer">
                {props.chat().subject}
            </div>
        </div>
        <div class="flex items-center gap-4 cursor-pointer">
            {/* Call Icon */}
            <div class="w-6 h-6 relative">
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M19.95 21C17.8667 21 15.8083 20.546 13.775 19.638C11.7417 18.73 9.89167 17.4423 8.225 15.775C6.55833 14.1077 5.271 12.2577 4.363 10.225C3.455 8.19233 3.00067 6.134 3 4.05C3 3.75 3.1 3.5 3.3 3.3C3.5 3.1 3.75 3 4.05 3H8.1C8.33333 3 8.54167 3.07933 8.725 3.238C8.90833 3.39667 9.01667 3.584 9.05 3.8L9.7 7.3C9.73333 7.56667 9.725 7.79167 9.675 7.975C9.625 8.15833 9.53333 8.31667 9.4 8.45L6.975 10.9C7.30833 11.5167 7.704 12.1123 8.162 12.687C8.62 13.2617 9.12433 13.816 9.675 14.35C10.1917 14.8667 10.7333 15.346 11.3 15.788C11.8667 16.23 12.4667 16.634 13.1 17L15.45 14.65C15.6 14.5 15.796 14.3877 16.038 14.313C16.28 14.2383 16.5173 14.2173 16.75 14.25L20.2 14.95C20.4333 15.0167 20.625 15.1377 20.775 15.313C20.925 15.4883 21 15.684 21 15.9V19.95C21 20.25 20.9 20.5 20.7 20.7C20.5 20.9 20.25 21 19.95 21Z"
                        fill="#1376A1"
                    />
                </svg>
            </div>
            {/* Menu/Three Dots Icon */}
            <i class="fa-solid fa-ellipsis fa-lg" style="color: #1376A1;"></i>
            <i
                class="fa-solid fa-circle-info fa-lg"
                style="color: #1376A1;"
            ></i>
        </div>
    </div>
);

type EmojiCategoryKey =
    | 'Smileys & People'
    | 'Animals & Nature'
    | 'Food & Drink'
    | 'Activities & Sports'
    | 'Objects & Symbols';

const EMOJI_CATEGORIES: Record<EmojiCategoryKey, string[]> = {
    'Smileys & People': [
        '😀',
        '😂',
        '😍',
        '🤔',
        '🥳',
        '😭',
        '🤯',
        '😎',
        '😇',
        '😋',
        '😴',
        '😈',
        '🤖',
        '👋',
        '🙏',
        '👍',
        '👎',
        '💪',
        '👀',
        '💋',
    ],
    'Animals & Nature': [
        '🐶',
        '🐱',
        '🐭',
        '🐻',
        '🦊',
        '🦁',
        '🐸',
        '🐔',
        '🦋',
        '🐝',
        '🐢',
        '🐍',
        '🐠',
        '🐬',
        '🐋',
        '💐',
        '🌸',
        '🌵',
        '☀️',
        '🌧️',
        '🌈',
        '🔥',
        '🌍',
        '⚡',
        '🌙',
        '🌊',
    ],
    'Food & Drink': [
        '🍎',
        '🍇',
        '🍉',
        '🍕',
        '🍔',
        '🍟',
        '🍣',
        '🍤',
        '🍜',
        '☕',
        '🍵',
        '🍺',
        '🍻',
        '🥂',
        '🍰',
        '🍩',
        '🍪',
        '🍫',
        '🌶️',
        '🌽',
    ],
    'Activities & Sports': [
        '⚽',
        '🏀',
        '🏈',
        '⚾',
        '🎾',
        '🎳',
        '🎯',
        '🎣',
        '🥊',
        '🥋',
        '🏆',
        '🥇',
        '🥈',
        '🥉',
        '🏊',
        '🏃',
        '🚶',
        '🚴',
        '🎬',
        '🎨',
    ],
    'Objects & Symbols': [
        '⌚',
        '📱',
        '💻',
        '💡',
        '🔦',
        '💰',
        '💵',
        '💳',
        '🎁',
        '🎉',
        '🎊',
        '🔔',
        '⏰',
        '🗓️',
        '📌',
        '📎',
        '📚',
        '❤️',
        '🌟',
        '✅',
        '❌',
        '❓',
        '❗',
        '💯',
        '🆕',
    ],
};

const CATEGORY_KEYS = Object.keys(EMOJI_CATEGORIES) as EmojiCategoryKey[];

// 1. Emoji Picker Popover Component (UPDATED)
const EmojiPicker = (props: { onSelect: (emoji: string) => void }) => {
    // The signal must be explicitly cast to the union type
    const [activeTab, setActiveTab] = createSignal<EmojiCategoryKey>(
        CATEGORY_KEYS[0]
    );

    // Derived signal: Now TypeScript is happy because activeTab() is of type EmojiCategoryKey
    const currentEmojis = () => EMOJI_CATEGORIES[activeTab()];

    return (
        <div
            // POPUP CONTAINER: Smaller height, positioned correctly, and scrollable only in the emoji grid area
            class="absolute bottom-16 right-0 sm:right-24 bg-white border border-gray-300 rounded-xl shadow-xl z-20 
                   w-[95vw] sm:w-[450px] max-h-[300px] flex flex-col"
        >
            {/* 1. TABS / CATEGORY NAVIGATION */}
            <div class="flex flex-wrap p-2 border-b border-gray-200 overflow-x-auto overflow-y-hidden flex-shrink-0">
                <For each={CATEGORY_KEYS}>
                    {(category) => (
                        <button
                            onClick={() => setActiveTab(category)}
                            class="text-xs sm:text-sm font-medium px-3 py-2 rounded-lg whitespace-nowrap transition-colors"
                            classList={{
                                'bg-blue-100 text-blue-700':
                                    activeTab() === category,
                                'text-gray-600 hover:bg-gray-50':
                                    activeTab() !== category,
                            }}
                        >
                            {category}
                        </button>
                    )}
                </For>
            </div>

            {/* 2. EMOJI GRID AREA */}
            <div
                class="p-3 overflow-y-scroll flex-grow"
                onClick={(e) => {
                    // Type assertion remains necessary here
                    const clickedElement = e.target as HTMLElement;
                    if (clickedElement.dataset.emoji) {
                        props.onSelect(clickedElement.dataset.emoji);
                    }
                }}
            >
                {/* GRID: Increased density and reduced size */}
                <div class="grid grid-cols-10 sm:grid-cols-12 gap-1">
                    <For each={currentEmojis()}>
                        {(emoji) => (
                            <div
                                data-emoji={emoji}
                                class="text-lg cursor-pointer hover:bg-gray-100 rounded-md transition-colors 
                                       flex items-center justify-center p-1"
                                title={emoji}
                            >
                                {emoji}
                            </div>
                        )}
                    </For>
                </div>
            </div>
        </div>
    );
};

const MessageInput: Component<{
    handleSendMessage: (msg: ChatMessage) => void;
}> = (props) => {
    const [inputText, setInputText] = createSignal('');
    const [showEmojiPicker, setShowEmojiPicker] = createSignal(false);
    // Ref to the input element to focus/manipulate text
    let textInputRef;

    // Handler to insert the selected emoji into the input text
    const handleEmojiSelect = (emoji: string) => {
        // Insert the emoji at the end of the current text
        setInputText((prev) => prev + emoji);
        // Hide the picker after selection
        setShowEmojiPicker(false);
        // Optional: Focus the input field again
        textInputRef!.focus();
    };

    // Handler to send the message (simplified)
    const handleSend = () => {
        if (inputText().trim() === '') return;
        props.handleSendMessage({
            id: 1,
            name: 'James Carter',
            subject: 'Fix leaking kitchen sink',
            lastMessage: 'James Carter wants to schedule a meeting',
            time: '01:31 PM',
            read: false,
            active: true,
            avatar: `https://picsum.photos/200?random=${Math.random()}`,
            status: 'none',
        });
        console.log('Sending message:', inputText());
        setInputText('');
    };

    return (
        <div class="w-full p-6 bg-gray-50 border-t border-gray-300 flex items-center gap-4 sticky bottom-0 z-10">
            {/* Show the Emoji Picker Popover */}
            <Show when={showEmojiPicker()}>
                <EmojiPicker onSelect={handleEmojiSelect} />
            </Show>
            <div class="flex gap-4 w-auto">
                {/* Attachment Icon */}
                <div class="w-6 h-6 relative text-gray-600 flex-shrink-0 cursor-pointer">
                    <i class="fa-solid fa-paperclip fa-lg"></i>
                </div>
                {/* Image Icon */}
                <div
                    class="w-6 h-6 relative text-gray-600 flex-shrink-0 cursor-pointer"
                    onClick={() => setShowEmojiPicker((prev) => !prev)}
                    title="Select Emoji"
                >
                    {/* Simple Smiley Face Icon */}
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="w-full h-full"
                    >
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                        <line x1="9" y1="9" x2="9.01" y2="9"></line>
                        <line x1="15" y1="9" x2="15.01" y2="9"></line>
                    </svg>
                </div>
            </div>

            {/* Text Input Field */}
            <div class="flex-grow p-3 rounded-xl border border-gray-300 bg-white shadow-inner">
                <input
                    ref={textInputRef}
                    type="text"
                    onInput={(e) => setInputText(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') handleSend();
                    }}
                    value={inputText()}
                    placeholder="Type your message here..."
                    class="w-full text-base text-gray-500 font-normal focus:outline-none bg-white"
                />
            </div>

            {/* Send Button */}
            <button
                class="w-10 h-10 relative bg-[#1376A1] rounded-full flex items-center justify-center flex-shrink-0 cursor-pointer"
                onClick={handleSend}
            >
                <i
                    class="fa-regular fa-paper-plane fa-lg"
                    style={'color: white'}
                ></i>
            </button>
        </div>
    );
};

const MessageBubble = (props: any) => (
    <div
        class="flex"
        classList={{
            'justify-end': props.isUser,
            'justify-start': !props.isUser,
        }}
    >
        <div
            class="p-4 max-w-xs sm:max-w-md rounded-3xl inline-flex shadow-sm"
            classList={{
                'bg-[#1376A1] text-white rounded-br-lg': props.isUser,
                'bg-[#EEF2F6] text-gray-800 rounded-bl-lg': !props.isUser,
            }}
        >
            <div class="text-sm font-medium leading-7 whitespace-normal break-words">
                {props.text}
            </div>
        </div>
    </div>
);

const ChatContent = (props: {
    setShowDetailsPanel: (value: boolean) => void;
}) => (
    <div class="flex-grow p-6 space-y-4 overflow-y-auto">
        {/* Right-aligned Info Card */}
        <div class="flex justify-end">
            <div class="max-w-[289px] p-3 border border-gray-300 rounded-xl flex flex-col items-end gap-3">
                <img
                    class="w-full h-[133px] rounded-lg bg-white object-cover"
                    src={`https://picsum.photos/200?random=${Math.random()}`}
                    alt="Project image"
                />
                <div class="w-full flex flex-col gap-1">
                    <div class="text-base text-gray-900 font-normal">
                        Fix leaking kitcnen sink
                    </div>
                    <div class="text-xs text-gray-600 font-normal">
                        Kitchen sink leaking from the pipe underneath: Water
                        drips when tap is off. Need diagnosis and fix. Prefer
                        experience with household plumbing and installation of
                        new seals if necessary.
                    </div>
                </div>
            </div>
        </div>

        <MessageBubble
            isUser={true}
            text="Hi James, I need urgent plumbing work done."
        />
        <MessageBubble
            isUser={false}
            text="Sure. can you share your location?"
        />
        <OfferCardMessage setShowDetailsPanel={props.setShowDetailsPanel} />
        <MessageBubble
            isUser={true}
            text="Yes, it's 24 Main Street. Where can you come?"
        />
        <MessageBubble
            isUser={false}
            text="Alright, I can come around the specified time and I don't know if that's okay by you."
        />

        {/* Spacer to push content up from the input field */}
        <div class="h-10"></div>
    </div>
);

const TIMELINE_STEPS = [
    {
        title: 'Proposal received',
        subtitle: 'September 31st',
        status: 'done', // done, current, pending
    },
    {
        title: 'Project alignment',
        description:
            'Connect with James and agree on project scope, deliverables, timeline and other expectations before sending a contract offer',
        actionText: 'Send offer',
        status: 'done',
    },
    {
        title: 'Contract acceptance',
        description: 'some boring description',
        status: 'current',
    },
    {
        title: 'Contract starts',
        status: 'pending',
    },
    {
        title: 'Milestone completed',
        description: 'Approved. October 15th',
    },
    {
        title: 'Need more help?',
        description: 'Add a new milestone to keep the project going',
    },
    {
        bottom_text: 'Contract ends',
        actionText: 'End contract',
    },
];

const TimelineStep = (props: any) => {
    return (
        <div class="flex gap-3">
            {/* Timeline Dot/Line */}
            <div class="flex flex-col items-center flex-shrink-0 w-7">
                {/* Circle */}
                <div
                    class={`w-7 h-7 rounded-full border-2 flex items-center justify-center ${
                        props.status === 'done'
                            ? 'border-[#697586] bg-white'
                            : props.status === 'current'
                            ? 'border-gray-900 bg-white'
                            : 'border-gray-400 bg-white'
                    }`}
                >
                    {/* Inner Icon for done */}
                    <Switch
                        fallback={
                            <svg
                                width="18"
                                height="19"
                                viewBox="0 0 18 19"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M10.927 16.154c1.92-.024 3.279-.13 4.166-.23a1.714 1.714 0 0 0 1.534-1.54c.12-1.084.248-2.903.248-5.725 0-1.079-.019-2.01-.049-2.811-.132-.369-.581-1.338-1.975-2.704-1.478-1.45-2.501-1.857-2.82-1.956q-.952-.03-1.906-.03c-2.35 0-3.962.12-4.968.236a1.714 1.714 0 0 0-1.535 1.54c-.084.762-.172 1.89-.217 3.475"
                                    stroke="#697586"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                                <path
                                    d="M16.832 6.019c-.783.116-2.19.027-3.259-.072a1.75 1.75 0 0 1-1.585-1.579c-.1-1.051-.19-2.426-.068-3.183M1.125 12.409a4.5 4.5 0 1 0 9 0 4.5 4.5 0 0 0-9 0"
                                    stroke="#697586"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                                <path
                                    d="m7.5 10.909-2.206 3-1.544-1.75"
                                    stroke="#697586"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </svg>
                        }
                    >
                        <Match when={props.status === 'done'}>
                            <svg
                                class="w-3 h-3 text-[#697586]"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="3"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            >
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                        </Match>
                        <Match when={props.title === 'Project alignment'}>
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M16.5 9.00781L2.25 15.0078L4.92225 9.00781L2.25 3.00781L16.5 9.00781ZM16.5 9.00781H4.875"
                                    stroke="#697586"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </svg>
                        </Match>
                        <Match when={props.title === 'Contract acceptance'}>
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M10.9278 16.1314C12.8474 16.1077 14.2064 16.0024 15.0933 15.9011C15.9183 15.8066 16.537 15.1875 16.6278 14.3617C16.7474 13.278 16.8753 11.4589 16.8753 8.63624C16.8753 7.55774 16.8565 6.62586 16.8265 5.82524C16.6949 5.45699 16.2453 4.48724 14.8518 3.12149C13.3739 1.67249 12.3505 1.26449 12.0321 1.16511C11.3967 1.14551 10.761 1.13589 10.1253 1.13624C7.77627 1.13624 6.16302 1.25624 5.15727 1.37136C4.3319 1.46586 3.71352 2.08499 3.62277 2.91074C3.5384 3.67349 3.45027 4.80074 3.40527 6.38624"
                                    stroke="#697586"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                                <path
                                    d="M16.8315 5.99623C16.0489 6.11248 14.6415 6.02323 13.5735 5.92423C13.1664 5.88781 12.7849 5.70996 12.4953 5.42156C12.2056 5.13316 12.0262 4.75243 11.988 4.34548C11.8871 3.29436 11.7979 1.91998 11.9201 1.16211M1.125 12.3862C1.125 13.5797 1.59911 14.7243 2.44302 15.5682C3.28693 16.4121 4.43153 16.8862 5.625 16.8862C6.81847 16.8862 7.96307 16.4121 8.80698 15.5682C9.65089 14.7243 10.125 13.5797 10.125 12.3862C10.125 11.1928 9.65089 10.0482 8.80698 9.20425C7.96307 8.36034 6.81847 7.88623 5.625 7.88623C4.43153 7.88623 3.28693 8.36034 2.44302 9.20425C1.59911 10.0482 1.125 11.1928 1.125 12.3862Z"
                                    stroke="#697586"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                                <path
                                    d="M7.5 10.8862L5.29425 13.8862L3.75 12.1361"
                                    stroke="#697586"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </svg>
                        </Match>
                        <Match when={props.title === 'Contract starts'}>
                            <svg
                                width="15"
                                height="16"
                                viewBox="0 0 15 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="m12.815.178.29.042c.45.071.953.19 1.263.5s.43.815.5 1.265l.043.288a8.8 8.8 0 0 1-.042 2.57c-.318 1.96-1.361 4.298-3.981 6.11a4 4 0 0 0-.013.402l.013.407c.007.272.003.543-.072.803-.143.495-.65.821-1.125 1.055l-.233.11-.3.132-.204.083c-.53.202-1.17.344-1.589-.075-.19-.19-.277-.448-.348-.706l-.034-.129a13 13 0 0 0-.426-1.345 2 2 0 0 1-.148.163c-.409.408-.963.614-1.517.773l-.369.1-.367.098-.359.09-.324.075-.387.083-.243.047a.758.758 0 0 1-.882-.883l.083-.413.097-.434.093-.382.168-.634c.168-.615.37-1.248.825-1.702l.075-.071-.573-.206-.575-.198c-.337-.111-.69-.228-.935-.472-.447-.447-.257-1.145-.035-1.693l.125-.29.103-.226c.237-.506.575-1.088 1.112-1.242.26-.075.53-.08.802-.073l.408.014q.202.005.402-.013C5.946 1.58 8.286.538 10.246.22a8.8 8.8 0 0 1 2.569-.042M10.485 1.7c-1.648.268-3.652 1.15-5.215 3.502-.19.285-.51.42-.836.473-.184.03-.37.037-.557.037l-.56-.008q-.14-.001-.28.004c-.228.303-.387.663-.506 1.021l1.125.409.462.175c.846.331 1.665.732 2.295 1.362 1.062 1.062 1.6 2.45 1.99 3.868.343-.12.686-.273.977-.491l.005-.28-.008-.56c0-.185.007-.371.037-.557.051-.327.188-.647.473-.837 2.35-1.563 3.234-3.566 3.501-5.214a7.3 7.3 0 0 0 .037-2.125 4 4 0 0 0-.145-.671 4 4 0 0 0-.67-.144 7.3 7.3 0 0 0-2.125.036M4.287 9.731c-.262.318-.385.734-.483 1.146l-.08.351-.042.17.52-.123c.413-.097.83-.22 1.146-.483a.75.75 0 0 0-1.06-1.06M8.53 4.43a1.5 1.5 0 1 1 2.122 2.122A1.5 1.5 0 0 1 8.53 4.428"
                                    fill="#697586"
                                />
                            </svg>
                        </Match>
                        <Match when={props.title === 'Milestone completed'}>
                            <i class="fa-solid fa-bullseye"></i>
                        </Match>
                        <Match when={props.title === 'Need more help?'}>
                            <i class="fa-solid fa-plus"></i>
                        </Match>
                    </Switch>
                </div>

                {/* Vertical Line (Hidden for last item) */}
                <Show when={!props.isLast}>
                    <div
                        class={`flex-grow w-px ${
                            props.status === 'done'
                                ? 'bg-gray-900'
                                : 'bg-gray-400'
                        } mt-0.5 mb-0.5`}
                    ></div>
                </Show>
            </div>

            {/* Content */}
            <div class="flex flex-col justify-start items-start gap-1 pb-6 w-full">
                <div class="text-base font-medium text-gray-900">
                    {props.title}
                </div>
                <Show when={props.subtitle}>
                    <div class="text-sm text-gray-600">{props.subtitle}</div>
                </Show>
                <Show when={props.description}>
                    <div class="text-xs text-gray-600 leading-relaxed">
                        {props.description}
                    </div>
                </Show>

                {/* Action Button for Current Step */}
                <Show when={props.actionText}>
                    <button
                        class="mt-2 px-4 py-2 bg-[#1376A1] hover:bg-blue-800 text-white text-base font-semibold rounded-lg transition-colors"
                        onClick={() => alert(props.actionText + ' clicked!')}
                    >
                        {props.actionText}
                    </button>
                </Show>
                <Show when={props.bottom_text}>
                    <div class="text-xs text-gray-600 leading-relaxed">
                        {props.bottom_text}
                    </div>
                </Show>
            </div>
        </div>
    );
};

const CollapsibleNavItem = (props: {
    title: string;
    icon: any;
    children: any;
    defaultOpen?: boolean;
}) => {
    const [isOpen, setIsOpen] = createSignal(props.defaultOpen || false);

    // Toggle function
    const toggleOpen = () => {
        setIsOpen(!isOpen());
    };

    return (
        <div class="w-full bg-white border border-gray-200 rounded-lg flex flex-col overflow-hidden">
            {/* Nav Header (Always visible and clickable) */}
            <button
                class="w-full p-3 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={toggleOpen}
            >
                <div class="flex items-center gap-3">
                    {/* Icon Container */}
                    <div class="w-7 h-7 flex items-center justify-center text-gray-700">
                        {props.icon}
                    </div>
                    {/* Title */}
                    <div class="text-base font-medium text-gray-900">
                        {props.title}
                    </div>
                </div>
                {/* Chevron Icon: Rotates based on state */}
                <div
                    class="w-5 h-5 text-gray-600 transition-transform duration-300 flex-shrink-0"
                    classList={{ 'transform rotate-90': isOpen() }} // Rotate right when closed
                >
                    {/* Right-facing chevron */}
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                </div>
            </button>

            {/* Content Area: Collapsible and Scrollable */}
            <Show when={isOpen()}>
                <div
                    // max-h-64 allows content to scroll independently if it gets too long
                    class="px-3 pb-3 max-h-64 overflow-y-auto"
                    style={'min-height: 408px'}
                >
                    {props.children}
                </div>
            </Show>
        </div>
    );
};

const ActivityTimelineContent = () => (
    <div class="mt-2 pl-2">
        <For each={TIMELINE_STEPS}>
            {(step, index) => (
                <TimelineStep
                    title={step.title}
                    subtitle={step.subtitle}
                    description={step.description}
                    actionText={step.actionText}
                    status={step.status}
                    isLast={index() === TIMELINE_STEPS.length - 1}
                    bottom_text={step.bottom_text}
                />
            )}
        </For>
    </div>
);

const DetailsPanel = (props: { show: () => boolean; onClose: () => void }) => {
    const [currentView, setCurrentView] = createSignal('fileNlink');
    const icons = {
        timeline: (
            <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M12.875 6.204a1.312 1.312 0 0 0-.37-2.599 10.502 10.502 0 1 0 11.889 11.897 1.313 1.313 0 0 0-2.6-.372 7.877 7.877 0 1 1-8.919-8.926M17.5 4.097a1.313 1.313 0 0 0-.875 2.476 7.8 7.8 0 0 1 1.498.714A1.313 1.313 0 1 0 19.5 5.052c-.63-.388-1.3-.708-1.999-.955m5.452 4.41a1.313 1.313 0 1 0-2.235 1.375q.432.7.71 1.488a1.312 1.312 0 0 0 2.475-.875 10.5 10.5 0 0 0-.95-1.988M14 10.063a1.312 1.312 0 1 0-2.625 0v5.25c0 .724.588 1.312 1.313 1.312h3.5a1.312 1.312 0 1 0 0-2.625H14z"
                    fill="#4B5565"
                />
            </svg>
        ),
        search: (
            <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M11.083 18.667q-3.18 0-5.38-2.203Q3.5 14.261 3.5 11.084q-.001-3.18 2.203-5.381Q7.906 3.5 11.083 3.5t5.382 2.203 2.202 5.38a7.1 7.1 0 0 1-1.517 4.434l6.533 6.533q.321.32.321.817 0 .495-.32.816-.322.321-.817.321t-.817-.32l-6.533-6.534a7.1 7.1 0 0 1-4.433 1.517m0-2.334q2.188 0 3.72-1.53 1.53-1.53 1.53-3.72 0-2.188-1.53-3.718t-3.72-1.532q-2.19-.001-3.718 1.532-1.53 1.535-1.533 3.718t1.532 3.72q1.536 1.534 3.718 1.53"
                    fill="#4B5565"
                />
            </svg>
        ),
        profile: (
            <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M14 1.459a5.542 5.542 0 1 0 0 11.083 5.542 5.542 0 0 0 0-11.083M10.21 7a3.792 3.792 0 1 1 7.583 0 3.792 3.792 0 0 1-7.583 0M14 14.292c-2.698 0-5.185.614-7.028 1.65-1.815 1.021-3.18 2.569-3.18 4.475v.119c-.001 1.355-.002 3.057 1.49 4.272.734.598 1.762 1.023 3.15 1.303 1.39.283 3.205.43 5.568.43 2.364 0 4.177-.147 5.57-.43 1.388-.28 2.415-.706 3.15-1.303 1.492-1.215 1.49-2.916 1.489-4.272v-.12c0-1.905-1.365-3.453-3.18-4.475-1.843-1.036-4.329-1.65-7.029-1.65m-8.458 6.125c0-.993.726-2.071 2.288-2.95 1.535-.863 3.715-1.425 6.172-1.425 2.454 0 4.634.562 6.169 1.425 1.563.879 2.288 1.957 2.288 2.95 0 1.526-.047 2.384-.845 3.033-.432.352-1.155.697-2.392.946-1.233.25-2.919.396-5.222.396s-3.99-.146-5.222-.396c-1.236-.25-1.96-.594-2.391-.945-.798-.65-.845-1.508-.845-3.034"
                    fill="#4B5565"
                />
            </svg>
        ),
        files: (
            <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M14.412 5.58 5.75 14.241a5.25 5.25 0 0 0 7.425 7.424l10.312-10.312a3.5 3.5 0 1 0-4.95-4.95L8.225 16.716a1.75 1.75 0 1 0 2.475 2.476l8.662-8.663"
                    stroke="#4B5565"
                    stroke-width="2.667"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
            </svg>
        ),
    };

    return (
        <Show when={props.show()}>
            {/* Overlay for mobile view (for modal effect) */}
            <div
                class="fixed inset-0 z-40 bg-black opacity-30"
                onClick={props.onClose}
            ></div>

            {/* Main Panel Container: Fixed position, sliding in from the right */}
            <div
                // Positioning & Size: Full height, fixed width on web, full width on mobile
                class="fixed top-0 right-0 h-full z-50 transition-transform duration-300 ease-in-out
                       w-full sm:w-[400px] bg-gray-100 shadow-2xl"
                // class="fixed top-0 right-0 h-full z-50 transition-transform duration-300 ease-in-out
                //        w-full sm:w-[400px] bg-gray-100 overflow-y-auto shadow-2xl"
            >
                <Switch>
                    <Match when={currentView() === 'search'}>
                        {/* We remove the padding from the wrapper div here because SearchMessagesView has its own padding */}
                        <div class="h-full w-full pt-4 sm:pt-6">
                            <SearchMessagesView
                                onBack={() => setCurrentView('default')}
                            />
                        </div>
                    </Match>
                    <Match when={currentView() === 'artisan'}>
                        <div class="h-full w-full p-6 pt-16 sm:pt-6">
                            <ArtisanProfileView
                                onBack={() => setCurrentView('default')}
                            />
                        </div>
                    </Match>
                    <Match when={currentView() === 'fileNlink'}>
                        <div class="h-full w-full p-6 pt-16 sm:pt-6">
                            <FilesAndLinksView
                                onBack={() => setCurrentView('default')}
                            />
                        </div>
                    </Match>
                    <Match when={currentView() === 'default'}>
                        <>
                            {/* Close Button (Top Right) */}
                            <button
                                onClick={props.onClose}
                                class="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200 z-10 text-gray-900"
                                title="Close"
                            >
                                <svg
                                    class="w-6 h-6"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>

                            {/* Inner Content Container */}
                            <div class="p-6 pt-16 sm:pt-6 h-full flex flex-col overflow-y-auto">
                                {/* Header/Profile Section (Fixed at top of scroll) */}
                                {/* The profile and action buttons scroll WITH the content */}
                                <div class="mb-8 flex flex-col items-center text-center gap-6 flex-shrink-0">
                                    {/* ... Profile Image/Info ... */}
                                    <div class="w-24 h-24 rounded-full overflow-hidden border-2 border-white shadow-md">
                                        <img
                                            class="w-full h-full object-cover"
                                            src={`https://picsum.photos/200?random=${Math.random()}`}
                                            alt="James Carter Avatar"
                                        />
                                    </div>
                                    <div class="flex flex-col items-center gap-3">
                                        <div class="text-xl font-medium text-gray-900">
                                            James Carter
                                        </div>
                                        <div class="text-sm text-gray-600">
                                            Professional plumber with 7+ years
                                            experience
                                        </div>
                                        <div class="flex items-center gap-2 text-xs text-gray-500">
                                            <svg
                                                class="w-4 h-4 text-gray-500"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            >
                                                <path d="M21.5 2v6h-6" />
                                                <path d="M21.5 13c0 3.3-2.7 6-6 6h-2c-3.3 0-6-2.7-6-6s2.7-6 6-6h.5" />
                                            </svg>
                                            <span>
                                                2:18 PM GMT +5 (3h ahead)
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div class="mb-8 flex flex-col items-center gap-3 w-4/5 self-center flex-shrink-0">
                                    <button style="align-self: stretch; justify-content: center; align-items: center; gap: 12px; display: inline-flex; cursor: pointer">
                                        <div style="width: 28px; height: 28px; position: relative">
                                            <svg
                                                width="29"
                                                height="28"
                                                viewBox="0 0 29 28"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M22.666 7h-3.5V5.833A2.333 2.333 0 0 0 16.833 3.5h-4.667a2.333 2.333 0 0 0-2.333 2.333V7h-3.5a3.5 3.5 0 0 0-3.5 3.5V21a3.5 3.5 0 0 0 3.5 3.5h16.333a3.5 3.5 0 0 0 3.5-3.5V10.5a3.5 3.5 0 0 0-3.5-3.5m-10.5-1.167h4.667V7h-4.667zM23.833 21a1.167 1.167 0 0 1-1.167 1.167H6.333A1.167 1.167 0 0 1 5.166 21v-6.545l5.46 1.878q.187.025.374 0h7q.19-.003.373-.058l5.46-1.82zm0-9.007L17.813 14h-6.627l-6.02-2.007V10.5a1.167 1.167 0 0 1 1.167-1.167h16.333a1.167 1.167 0 0 1 1.167 1.167z"
                                                    fill="#1376A1"
                                                />
                                            </svg>{' '}
                                        </div>
                                        <span style="text-align: center; color: #1376A1; font-size: 16px; font-weight: 500; line-height: 25.60px; word-wrap: break-word">
                                            Hire freelancer
                                        </span>
                                    </button>
                                    <button style="align-self: stretch; justify-content: center; align-items: center; gap: 12px; display: inline-flex; cursor: pointer">
                                        <div style="width: 28px; height: 28px; position: relative">
                                            <svg
                                                width="27"
                                                height="20"
                                                viewBox="0 0 27 20"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M17 10a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0"
                                                    stroke="#1376A1"
                                                    stroke-width="2"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                />
                                                <path
                                                    d="M1.833 10C3.7 5.22 8.058 1.834 13.5 1.834c5.441 0 9.8 3.386 11.666 8.166-1.866 4.78-6.225 8.167-11.666 8.167S3.7 14.78 1.833 10"
                                                    stroke="#1376A1"
                                                    stroke-width="2"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                />
                                            </svg>
                                        </div>
                                        <span style="text-align: center; color: #1376A1; font-size: 16px; font-weight: 500; line-height: 25.60px; word-wrap: break-word">
                                            View proposal
                                        </span>
                                    </button>
                                </div>

                                {/* Nav/Information Links - Collapsible Sections */}
                                <div class="flex flex-col gap-4 pb-6 flex-grow">
                                    {/* 1. Activity Timeline (Open by default) */}
                                    <CollapsibleNavItem
                                        title="Activity timeline"
                                        defaultOpen={true}
                                        icon={icons.timeline}
                                    >
                                        <ActivityTimelineContent />
                                    </CollapsibleNavItem>

                                    {/* 2. Search messages */}
                                    <CollapsibleNavItem
                                        title="Search messages"
                                        icon={icons.search}
                                    >
                                        {/* Search Content Placeholder */}
                                        <div class="p-3 text-gray-500">
                                            Search input and results will go
                                            here.
                                        </div>
                                    </CollapsibleNavItem>

                                    {/* 3. Artisan profile */}
                                    <CollapsibleNavItem
                                        title="Artisan profile"
                                        icon={icons.profile}
                                    >
                                        {/* Profile Content Placeholder */}
                                        <div class="p-3 text-gray-500">
                                            Detailed profile information and
                                            reviews.
                                        </div>
                                    </CollapsibleNavItem>

                                    {/* 4. Files and links */}
                                    <CollapsibleNavItem
                                        title="Files and links"
                                        icon={icons.files}
                                    >
                                        {/* Files Content Placeholder */}
                                        <div class="p-3 text-gray-500">
                                            List of shared documents and links.
                                        </div>
                                    </CollapsibleNavItem>
                                </div>
                            </div>
                        </>
                    </Match>
                </Switch>
            </div>
        </Show>
    );
};

// --- Main Component ---
export const ClientChatPage = () => {
    const [selectedChatId, setSelectedChatId] = createSignal(
        chatMessages[0].id
    );
    const [messages, setMessage] = createSignal<ChatMessage[]>(chatMessages);
    const currentChat = () =>
        chatMessages.find((c) => c.id === selectedChatId());
    const [showDetailsPanel, setShowDetailsPanel] = createSignal(false);
    // State for mobile view management (e.g., small screens)
    const [isMobileOpen, setIsMobileOpen] = createSignal(false);

    const handleSelectChat = (id: number) => {
        setSelectedChatId(id);
        setIsMobileOpen(true); // Open chat view on mobile when a chat is selected
    };

    const handleBack = () => {
        setIsMobileOpen(false); // Go back to list view on mobile
    };

    const handleSendMessage = (msg: ChatMessage) => {
        chatMessages.push(msg);
        setMessage([...messages(), msg]);
    };

    return (
        <div class="min-h-screen bg-white text-gray-900">
            <div class="flex h-screen max-h-screen">
                {/* Chat List Sidebar (Visible on web, Conditional on mobile) */}
                <div
                    class="w-full sm:w-[415px] flex-shrink-0 flex flex-col border-r border-gray-300 p-3"
                    classList={{ 'hidden sm:flex': isMobileOpen() }}
                >
                    {/* Header */}
                    <div class="p-4 border-b border-gray-300 flex justify-between items-center bg-white sticky top-0 z-10">
                        <div class="flex items-center gap-4">
                            <div class="text-medium font-bold">
                                All Messages
                            </div>
                            {/* Chevron Down Icon */}
                            <div class="w-6 h-6 text-gray-800 cursor-pointer">
                                <i
                                    class="fa-solid fa-angle-down fa-lg"
                                    style="color: #1376A1;"
                                ></i>
                            </div>
                        </div>
                        {/* Search Icon */}
                        <div class="w-10 h-10 bg-gray-100 rounded-sm flex items-center justify-center cursor-pointer">
                            <i
                                class="fa-solid fa-magnifying-glass fa-lg"
                                style="color: #1376A1;"
                            ></i>
                        </div>
                    </div>

                    {/* List of Chats */}
                    <div class="flex-grow overflow-y-auto">
                        <For each={messages()}>
                            {(chat) => (
                                <ChatListItem
                                    chat={chat}
                                    selectedChatId={selectedChatId}
                                    onSelect={handleSelectChat}
                                />
                            )}
                        </For>
                    </div>
                </div>

                {/* Chat Message Area (Conditional on mobile) */}
                <div
                    class="flex-grow flex flex-col w-full"
                    classList={{ 'hidden sm:flex': !isMobileOpen() }}
                >
                    <Show
                        when={currentChat()}
                        fallback={
                            <div class="flex-grow flex items-center justify-center text-gray-500">
                                Select a chat to begin
                            </div>
                        }
                    >
                        {/* Mobile Back Button (only visible on mobile when chat is open) */}
                        <div class="p-4 sm:hidden border-b border-gray-300 flex items-center bg-white">
                            <button
                                onClick={handleBack}
                                class="text-blue-600 text-lg font-medium mr-4"
                            >
                                <i
                                    class="fa-solid fa-arrow-left"
                                    style={'color: #1376A1'}
                                ></i>
                            </button>
                            <ChatHeader chat={currentChat} />
                        </div>

                        {/* Web Header (only visible on web) */}
                        <div class="hidden sm:block">
                            <ChatHeader chat={currentChat} />
                        </div>

                        {/* Messages */}
                        <ChatContent
                            setShowDetailsPanel={() =>
                                setShowDetailsPanel(true)
                            }
                        />

                        {/* Input Field */}
                        <MessageInput handleSendMessage={handleSendMessage} />
                    </Show>
                </div>

                <DetailsPanel
                    show={showDetailsPanel}
                    onClose={() => setShowDetailsPanel(false)}
                />
            </div>
        </div>
    );
};
