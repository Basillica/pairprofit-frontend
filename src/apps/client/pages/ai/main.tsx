import {
    createSignal,
    For,
    Show,
    onMount,
    onCleanup,
    Switch,
    Match,
} from 'solid-js';
import { CreateProjectModal } from './modals/project';

const NewChatIcon = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="w-6 h-6 text-gray-800"
    >
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="16"></line>
        <line x1="8" y1="12" x2="16" y2="12"></line>
    </svg>
);

const PromptCard = (props: { icon: any; title: string; subtitle: string }) => (
    <button
        class="w-full flex items-center gap-5 p-4 md:p-6 bg-blue-50/70 rounded-xl transition-shadow hover:shadow-lg hover:bg-blue-100/70 text-left"
        onClick={() => console.log(`Prompt selected: ${props.title}`)}
    >
        <div class="w-10 h-10 flex-shrink-0 relative bg-white rounded-full p-2 shadow-sm">
            {props.icon}
        </div>

        <div class="flex flex-col gap-1 min-w-0">
            <div class="text-lg font-semibold text-gray-900 truncate">
                {props.title}
            </div>
            <div class="text-sm font-normal text-gray-600 truncate">
                {props.subtitle}
            </div>
        </div>
    </button>
);

const LandingChatSidebar = () => (
    <div class="hidden md:flex flex-col items-center gap-14 py-8 px-6 w-[281px] flex-shrink-0 border-r border-gray-300 h-full overflow-y-auto">
        <div class="w-full flex items-center gap-2 p-3 border border-gray-200 rounded-full bg-white shadow-sm">
            <i
                class="fa-solid fa-magnifying-glass"
                style={'color: #9AA4B2'}
            ></i>
            <div class="text-xs font-normal text-gray-500">
                Search for artisans
            </div>
        </div>

        <div class="flex flex-col items-center gap-4 flex-grow justify-center">
            <div class="w-[90px] h-[90px] flex items-center justify-center bg-gray-100 rounded-full">
                <svg
                    width="41"
                    height="40"
                    viewBox="0 0 41 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M20.5 0c10.684 0 20 8.82 20 19 0 10.008-9.106 17.884-20 17.884a22 22 0 0 1-6.86-1.092c-.928.9-1.246 1.206-3.216 3.106-1.42 1.072-2.756 1.436-3.95.76-1.204-.68-1.566-2.004-1.32-3.748l.8-4.638C2.48 28.004.5 23.684.5 19c0-10.18 9.314-19 20-19m0 2.8C11.328 2.8 3.3 10.4 3.3 19c0 4.09 1.824 7.856 5.04 10.66l.04.034.594.516-.134.78-.276 1.608-.074.428-.57 3.316a6 6 0 0 0-.06.674v.19q0 .015-.004.016c.014-.02.286-.106.752-.446l4.34-4.212.828.312a19.2 19.2 0 0 0 6.724 1.21c9.432 0 17.2-6.72 17.2-15.086 0-8.598-8.028-16.2-17.2-16.2m-9.546 12.826a2.999 2.999 0 1 1 .22 5.994 2.999 2.999 0 0 1-.22-5.994m9.996 0a2.999 2.999 0 1 1 .22 5.994 2.999 2.999 0 0 1-.22-5.994m9.994 0a2.999 2.999 0 1 1 .22 5.994 2.999 2.999 0 0 1-.22-5.994"
                        fill="#D1D1D1"
                    />
                </svg>
            </div>
            <div class="text-sm font-semibold text-gray-600">
                No chat history
            </div>
        </div>

        <button class="w-full flex justify-center items-center gap-3 p-3 border border-gray-600 rounded-3xl hover:bg-gray-50 transition-colors">
            <NewChatIcon />
            <div class="text-base font-semibold text-gray-700">New chat</div>
        </button>
    </div>
);

const ChatLandingPage = () => {
    const userName = 'Stanley';
    const prompts = [
        {
            title: 'Find an artisan',
            subtitle: 'Show me electricians available in my area this week.',
            icon: (
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="m22.7 19-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4"
                        fill="#202939"
                    />
                </svg>
            ),
        },
        {
            title: 'Event planing',
            subtitle:
                'Help me plan a wedding with catering, photography, and decorations in Lagos.',
            icon: (
                <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <rect width="40" height="40" rx="20" fill="#fff" />
                    <path
                        d="M9.397 31.113c.426.462 2.179-.343 3.562-.988 1.037-.482 5.187-2.184 7.25-3.067.556-.238 1.366-.55 1.95-1.317.517-.682 1.89-3.58-.875-6.517-2.805-2.981-5.694-2.158-6.774-1.393-.636.45-1.153 1.464-1.386 1.98-.982 2.179-2.383 6.17-2.953 7.74-.418 1.157-1.196 3.105-.774 3.562"
                        fill="#FFC107"
                    />
                    <path
                        d="M12.847 20.467c.026.326.092.857.317 1.879.154.7.405 1.436.61 1.921.612 1.461 1.473 2.05 2.345 2.522 1.481.803 2.488.953 2.488.953l-1.208.493s-.73-.152-1.728-.643c-.951-.469-1.941-1.262-2.665-2.815a8.3 8.3 0 0 1-.6-1.843 8 8 0 0 1-.15-1.005zm-1.483 3.802s.15 1.217 1.155 2.753c1.177 1.796 2.822 2.09 2.822 2.09l-1.093.45s-1.221-.373-2.382-1.957c-.723-.988-.926-2.17-.926-2.17zm-1.04 2.884s.273 1.05.873 1.834c.714.935 1.624 1.207 1.624 1.207l-.838.372s-.636-.134-1.332-1.015c-.528-.67-.678-1.438-.678-1.438z"
                        fill="#FF8F00"
                    />
                    <path
                        opacity=".44"
                        d="M9.867 29.82a.31.31 0 0 1 .002-.263l4.776-9.904.786 2.953-5.025 7.259a.308.308 0 0 1-.539-.045"
                        fill="#FFFDE7"
                    />
                    <path
                        d="M15.81 23.598c2.23 2.61 4.771 2.284 5.617 1.624.847-.662 1.517-2.936-.705-5.503-2.329-2.689-4.965-1.922-5.574-1.34-.61.58-1.386 2.825.661 5.22"
                        fill="url(#a)"
                    />
                    <path
                        d="M23.473 24.673c-.814-.683-1.247-.561-1.829-.32-.75.312-1.929.543-3.53 0l.482-1.16c.95.32 1.638.165 2.233-.185.765-.45 1.811-1.067 3.438.3.68.57 1.375.948 1.885.776.371-.124.568-.677.667-1.118.01-.039.025-.152.036-.25.09-.689.24-2.174 1.346-2.933 1.183-.812 2.427-.812 2.427-.812l.224 2.235c-.571-.085-.969.032-1.305.217-1.263.703-.163 3.403-2.13 4.31-1.891.88-3.438-.637-3.945-1.06"
                        fill="#03A9F4"
                    />
                    <path
                        d="m16.513 21.823-.814-.73c1.494-1.669 1.1-2.895.813-3.787a5 5 0 0 1-.262-2.032 5.3 5.3 0 0 1-.844-1.514c-.349-1.056-.086-2.085.516-3.05 1.217-1.96 3.42-1.96 3.42-1.96l.735 1.967c-.559-.023-2.39.005-2.953.892-.71 1.118-.244 1.808-.21 1.887.137-.178.275-.321.4-.432.897-.796 1.677-.91 2.174-.866a2.04 2.04 0 0 1 1.427.793c.396.507.559 1.165.433 1.763-.122.583-.51 1.076-1.093 1.39-1.018.547-1.866.472-2.434.282l.01.042c.02.093.061.224.11.376.332 1.028.949 2.66-1.428 4.979m1.378-7.037c.108.078.223.144.34.19.395.158.824.106 1.311-.157.287-.153.321-.318.332-.373a.68.68 0 0 0-.144-.527.53.53 0 0 0-.379-.223c-.281-.024-.662.154-1.042.493q-.272.246-.418.597"
                        fill="#F44336"
                    />
                    <path
                        d="m19.77 22.128-1.165-.032s.553-3.124 2.344-3.649a8 8 0 0 1 1.072-.25c.22-.035.566-.085.737-.149.04-.294-.084-.67-.223-1.095a7 7 0 0 1-.281-1.04c-.117-.724.077-1.364.543-1.804.57-.535 1.491-.705 2.53-.47.592.136 1.03.427 1.414.681.549.366.87.552 1.54.1.813-.548-.248-2.69-.813-3.928l2.106-.878c.283.619 1.65 3.803.748 5.62-.304.61-.827 1.016-1.513 1.168-1.493.333-2.367-.248-3.004-.672-.302-.2-.566-.358-.853-.44-1.993-.568.79 2.364-.514 3.682-.782.79-2.692.998-2.816 1.028-1.23.296-1.853 2.128-1.853 2.128"
                        fill="#F48FB1"
                    />
                    <path
                        d="M16.248 15.273c-.036.413-.052.659.054 1.195.516.379 1.64.379 1.64.379a4 4 0 0 1-.111-.377l-.01-.042c-1.142-.57-1.573-1.155-1.573-1.155"
                        fill="#C92B27"
                    />
                    <path
                        d="m13.912 17.12-1.939-.95.966-1.396 1.52 1.007z"
                        fill="#FFC107"
                    />
                    <path
                        d="M11.054 14.488c-.99-.133-1.998-.973-2.109-1.069l.973-1.142c.295.25.919.668 1.337.724z"
                        fill="#FB8C00"
                    />
                    <path
                        d="m12.802 11.988-1.425-.467a3.3 3.3 0 0 0 .122-1.556l1.481-.238c.122.753.06 1.535-.178 2.26"
                        fill="#03A9F4"
                    />
                    <path
                        d="m21.701 10.873 1.465-.32.424 1.934-1.466.32z"
                        fill="#FB8C00"
                    />
                    <path
                        d="m25.336 11.332-1.031-1.09a2.4 2.4 0 0 0 .664-1.188l1.481.242a3.83 3.83 0 0 1-1.114 2.036"
                        fill="#FFC107"
                    />
                    <path
                        d="m25.909 17.109 1.31-.41.447 1.432-1.31.41z"
                        fill="#FB8C00"
                    />
                    <path
                        d="m26.29 29.193-1.49-.176c.064-.531-.332-1.182-.44-1.326l1.2-.9c.09.118.871 1.2.73 2.402"
                        fill="#F44336"
                    />
                    <path
                        d="M30.57 27.292a9 9 0 0 0-1.701-.097l-.05-1.5c.657-.023 1.323.015 1.974.114z"
                        fill="#FB8C00"
                    />
                    <path
                        d="m28.553 29.357 1.053-1.068 1.45 1.432-1.053 1.067z"
                        fill="#F48FB1"
                    />
                    <path
                        d="m25.457 19.875 1.084 1.24-1.24 1.083-1.083-1.24z"
                        fill="#F44336"
                    />
                    <defs>
                        <linearGradient
                            id="a"
                            x1="21.947"
                            y1="19.595"
                            x2="16.366"
                            y2="22.944"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop offset=".024" stop-color="#8F4700" />
                            <stop offset="1" stop-color="#703E2D" />
                        </linearGradient>
                    </defs>
                </svg>
            ),
        },
        {
            title: 'Vendor search',
            subtitle:
                'Who are the best photographers in my city within $100 budget?',
            icon: (
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M12.75 11.945v9.805a.75.75 0 0 1-1.5 0v-9.805a5.25 5.25 0 1 1 1.5 0"
                        fill="#EA4335"
                    />
                </svg>
            ),
        },
    ];

    const [message, setMessage] = createSignal('');

    const handleSend = () => {
        if (message().trim()) {
            console.log(`Sending message: ${message()}`);
            setMessage('');
        }
    };

    return (
        <div class="flex-grow flex flex-col justify-between w-full h-full min-w-0">
            {/* Content Area (Scrollable) */}
            <div class="flex-grow flex flex-col gap-16 py-8 px-6 sm:px-10 overflow-y-auto">
                <div class="flex flex-col gap-10">
                    <div class="flex flex-col gap-2">
                        <div class="text-2xl sm:text-3xl font-medium text-gray-900 leading-tight">
                            Hey there,{' '}
                            <span class="text-blue-700">{userName}</span>.
                        </div>
                        <div class="text-2xl sm:text-3xl font-medium text-gray-900 leading-tight">
                            What would you like to search for?
                        </div>
                        <p class="text-sm font-normal text-gray-700 mt-1">
                            Hi, I'm MrFixit - your assistant for finding
                            artisans and planning projects. Ask me anything!
                        </p>
                    </div>

                    <div class="flex flex-col gap-5">
                        <div class="text-base font-semibold text-gray-900">
                            Try these prompts
                        </div>
                        <div class="flex flex-col gap-3">
                            <For each={prompts}>
                                {(prompt) => (
                                    <PromptCard
                                        icon={prompt.icon}
                                        title={prompt.title}
                                        subtitle={prompt.subtitle}
                                    />
                                )}
                            </For>
                        </div>
                    </div>
                </div>
            </div>

            {/* Input Footer */}
            <div class="w-full flex-shrink-0 flex items-center gap-4 p-4 sm:p-6 bg-gray-50">
                <button class="p-2 rounded-full hover:bg-gray-100 transition-colors flex-shrink-0">
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M9.29 21a6.23 6.23 0 0 1-4.43-1.88 6 6 0 0 1-.22-8.49L12 3.2A4.1 4.1 0 0 1 15 2a4.48 4.48 0 0 1 3.19 1.35 4.36 4.36 0 0 1 .15 6.13l-7.4 7.43a2.54 2.54 0 0 1-1.81.75 2.72 2.72 0 0 1-1.95-.82 2.68 2.68 0 0 1-.08-3.77l6.83-6.86a1 1 0 0 1 1.37 1.41l-6.83 6.86a.68.68 0 0 0 .08.95.78.78 0 0 0 .53.23.56.56 0 0 0 .4-.16l7.39-7.43a2.36 2.36 0 0 0-.15-3.31 2.38 2.38 0 0 0-3.27-.15L6.06 12a4 4 0 0 0 .22 5.67 4.22 4.22 0 0 0 3 1.29 3.67 3.67 0 0 0 2.61-1.06l7.39-7.43a1 1 0 1 1 1.42 1.41l-7.39 7.43A5.65 5.65 0 0 1 9.29 21"
                            fill="#697586"
                        />
                    </svg>
                </button>

                <div class="flex-grow">
                    <input
                        type="text"
                        value={message()}
                        onInput={(e) => setMessage(e.currentTarget.value)}
                        placeholder="Ask MrFixit anything"
                        class="w-full py-3 px-4 border border-gray-300 rounded-xl bg-white text-base text-gray-700 placeholder-gray-500 focus:border-blue-700 focus:ring-1 focus:ring-blue-700 outline-none transition-shadow"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSend();
                        }}
                    />
                </div>

                <button
                    onClick={handleSend}
                    classList={{
                        'bg-[#1376A1] cursor-pointer': message().trim() !== '',
                        'bg-gray-400 cursor-not-allowed':
                            message().trim() === '',
                    }}
                    disabled={message().trim() === ''}
                    class="w-10 h-10 flex items-center justify-center rounded-3xl transition-colors flex-shrink-0"
                >
                    <i
                        class="fa-regular fa-paper-plane fa-lg"
                        style={'color: white'}
                    ></i>
                </button>
            </div>
        </div>
    );
};

const conversationsData = [
    {
        id: 'c1',
        title: 'Find a plumber nearby',
        snippet: 'AI helped me connect with 3 availa..',
        active: true,
    },
    {
        id: 'p1',
        title: 'Office renovation project',
        snippet: 'Project details and planning.',
        active: false,
    },
    {
        id: 'p2',
        title: 'House repairs project',
        snippet: 'Estimate and vendor shortlists.',
        active: false,
    },
    {
        id: 'c2',
        title: 'Find a plumber nearby',
        snippet: 'AI helped me connect with 3 availa..',
        active: false,
    },
    {
        id: 'c3',
        title: 'Top rated carpenters in lagos',
        snippet: 'AI helped me connect with 3 availa..',
        active: false,
    },
    {
        id: 'c4',
        title: 'Plan small office renovation..',
        snippet: 'AI helped me connect with 3 availa..',
        active: false,
    },
];

const projectsData = [
    { id: 'p1', name: 'Office renovation project' },
    { id: 'p2', name: 'House repairs project' },
];

const messagesData = [
    {
        sender: 'AI',
        content_parts: [
            {
                text: "Hi, I'm MrFixit - your assistant for finding artisans and planning projects. Ask me anything!",
                is_secondary: false,
            },
        ],
    },
    {
        sender: 'User',
        content_parts: [
            {
                text: 'I will like to plan a small get together with friends, can you suggest location here in Lagos?',
                is_secondary: false,
            },
        ],
    },
    {
        sender: 'AI',
        content_parts: [
            {
                text: "Planning a wedding for 150 guests - here's a starter vendor list and rough budget. Would you like me to shortlist vendors in your city?",
                is_secondary: false,
            },
            {
                text: 'Caterers (3) - $X,XXX,X\nVenues (5) - $X,XX',
                is_secondary: true,
            },
        ],
    },
];

const BackIcon = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="w-6 h-6 text-gray-900"
    >
        <polyline points="15 18 9 12 15 6"></polyline>
    </svg>
);

const SearchIcon = (props: any) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        {...props}
    >
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
);

const ChatHeader = (props: {
    onNewProject: () => void;
    isChatView: boolean;
    onBack: () => void;
    isDesktop: boolean; // Used to correctly apply mobile-only classes
}) => {
    return (
        // Header height set to 78px as requested
        <div class="w-full h-[78px] flex items-center justify-between bg-white mx-auto border-b border-gray-200">
            {/* Left Side Container: Dynamic width/padding */}
            <div
                class="flex items-center h-full flex-shrink-0"
                classList={{
                    // 1. Desktop Sidebar View: Fixed width and border (when NOT in chat view)
                    'md:w-[301px] md:border-r md:border-gray-200':
                        !props.isChatView,

                    // 2. Mobile Sidebar View OR Chat View: Apply mobile padding.
                    // This ensures padding exists on the left even when the content (New Chat button) is hidden on mobile.
                    'px-6': !props.isDesktop || props.isChatView,
                }}
            >
                {/* 1. Back Button (Mobile only, when viewing a chat) */}
                <Show when={props.isChatView}>
                    <button
                        class="mr-4 p-2 rounded-full hover:bg-gray-100"
                        onClick={props.onBack}
                    >
                        <BackIcon />
                    </button>
                    <div class="text-lg font-semibold text-gray-900 truncate">
                        Chat Details
                    </div>
                </Show>

                {/* 2. New Chat Button (Desktop only) */}
                <Show when={!props.isChatView}>
                    <button
                        class="hidden md:flex w-full h-full items-center gap-3 px-6 hover:bg-gray-50 transition-colors"
                        onClick={() =>
                            console.log('New chat button clicked in header')
                        }
                    >
                        <NewChatIcon />
                        <div class="text-lg font-bold text-[#1376A1]">
                            New chat
                        </div>
                    </button>
                    {/* The mobile fix for the sidebar view relies on the `px-6` on the parent container above. */}
                </Show>
            </div>

            {/* Right Side: Start a Project Button */}
            <div class="flex justify-end items-center px-6 md:px-10">
                <button
                    onClick={props.onNewProject}
                    class="py-2.5 px-6 bg-[#1376A1] text-white font-semibold rounded-lg shadow-md text-base hover:bg-[#106588] transition-colors"
                >
                    Start a project
                </button>
            </div>
        </div>
    );
};

const ChatItem = (props: {
    title: string;
    snippet: string;
    active: boolean;
    onClick: () => void;
}) => (
    <button
        class="w-full flex flex-col justify-start items-start gap-1 p-4 rounded-xl transition-colors text-left"
        classList={{
            'bg-blue-50/70 cursor-pointer': props.active, // Active chat background
            'hover:bg-gray-100 cursor-pointer': !props.active,
        }}
        onClick={props.onClick}
    >
        <div class="text-base font-semibold text-gray-900 truncate w-full">
            {props.title}
        </div>
        <div class="text-sm font-normal text-gray-600 truncate w-full">
            {props.snippet}
        </div>
    </button>
);

const ChevronDownIcon = (props: any) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="w-4 h-4"
        {...props}
    >
        <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
);

const ProjectItem = (props: { name: string; onClick: () => void }) => (
    <button
        onClick={props.onClick}
        class="text-base font-semibold text-gray-900 py-1 px-4 text-left w-full hover:bg-gray-50 rounded-md transition-colors whitespace-nowrap overflow-hidden text-ellipsis"
    >
        {props.name}
    </button>
);

const ChatSidebar = (props: {
    conversations: any;
    projects: typeof projectsData;
    onChatSelect: (chatId: string) => void;
}) => {
    // State to manage the open/closed status of the conversation list
    const [isConversationsOpen, setIsConversationsOpen] = createSignal(true);
    const [isProjectsOpen, setIsProjectsOpen] = createSignal(true);

    const toggleConversations = () => {
        setIsConversationsOpen(!isConversationsOpen());
    };

    const toggleProjects = () => {
        setIsProjectsOpen(!isProjectsOpen());
    };

    return (
        <div class="w-full md:w-[301px] flex-shrink-0 border-r border-gray-300 h-full overflow-y-auto flex flex-col items-start gap-8 py-8 px-6">
            {/* 1. Search Bar */}
            <div class="w-full flex items-center gap-2 p-3 border border-gray-200 rounded-full bg-white shadow-sm">
                <SearchIcon class="w-4 h-4 text-gray-500" />
                <div class="text-xs font-normal text-gray-500">
                    Search for artisans
                </div>
            </div>

            <div class="w-full flex flex-col items-start gap-3">
                <button
                    class="flex justify-start items-center gap-4 w-full"
                    onClick={toggleProjects}
                >
                    <h3 class="text-xl font-medium text-gray-900">Chats</h3>
                    {/* Chevron icon rotates 180deg when closed */}
                    <ChevronDownIcon
                        // class="text-gray-900 transition-transform duration-200"
                        classList={{ 'rotate-180': !isProjectsOpen() }}
                    />
                </button>
                <Show when={isProjectsOpen()}>
                    <div class="w-full flex flex-col items-start gap-1">
                        <For each={props.projects}>
                            {(project) => (
                                <ProjectItem
                                    name={project.name}
                                    onClick={() =>
                                        console.log(
                                            `Selected Project: ${project.id}`
                                        )
                                    }
                                />
                            )}
                        </For>
                    </div>
                </Show>
            </div>

            {/* 2. Collapsible Conversations Section */}
            <div class="w-full flex flex-col items-start gap-3">
                {/* Header with Toggle Button */}
                <button
                    class="flex justify-start items-center gap-4 w-full"
                    onClick={toggleConversations}
                >
                    <h3 class="text-xl font-medium text-gray-900">Chats</h3>
                    {/* Chevron icon rotates 180deg when closed */}
                    <ChevronDownIcon
                        // class="text-gray-900 transition-transform duration-200"
                        classList={{ 'rotate-180': !isConversationsOpen() }}
                    />
                </button>

                {/* Conversation List (Conditional Rendering) */}
                <Show when={isConversationsOpen()}>
                    <div class="w-full flex flex-col items-start gap-1">
                        <For each={props.conversations}>
                            {(chat) => (
                                <ChatItem
                                    title={chat.title}
                                    snippet={chat.snippet}
                                    active={chat.active}
                                    onClick={() => props.onChatSelect(chat.id)}
                                />
                            )}
                        </For>
                    </div>
                </Show>
            </div>
        </div>
    );
};

const ChatMessage = (props: {
    sender: 'User' | 'AI' | string;
    content_parts: { text: string; is_secondary: boolean }[];
}) => {
    const isUser = props.sender === 'User';

    return (
        <div
            classList={{
                'flex justify-end': isUser,
                'flex justify-start': !isUser,
            }}
            class="w-full"
        >
            <div
                classList={{
                    // User Bubble Styling: Blue, white text, rounded corners
                    'bg-[#1376A1] text-white rounded-t-xl rounded-bl-xl':
                        isUser,
                    // AI Bubble Styling: White, dark text, rounded corners
                    'bg-white text-gray-900 rounded-t-xl rounded-br-xl shadow-sm':
                        !isUser,
                }}
                class="max-w-[80%] md:max-w-[65%] p-4 text-lg leading-relaxed flex flex-col gap-3"
            >
                <For each={props.content_parts}>
                    {(part) => (
                        <div
                            classList={{
                                // Primary text style (Bold for AI, standard for User)
                                'text-sm font-medium text-gray-900':
                                    !isUser && !part.is_secondary,
                                'text-sm font-medium text-white': isUser,
                                // Secondary text style (for budget summary in AI message)
                                'text-sm font-normal text-gray-600 border-t border-gray-100 pt-2':
                                    part.is_secondary && !isUser,
                            }}
                        >
                            {/* Render lines individually using '\n' as a separator */}
                            <For each={part.text.split('\n')}>
                                {(line) => (
                                    <p class="whitespace-pre-wrap">{line}</p>
                                )}
                            </For>
                        </div>
                    )}
                </For>
            </div>
        </div>
    );
};

const MainChatView = (props: { messages: typeof messagesData }) => {
    // Input text reflecting the example.
    const [message, setMessage] = createSignal(
        '... small get together with friends in Lagos, can you suggest a nice place we could use in the.'
    );

    const handleSend = () => {
        if (message().trim()) {
            console.log(`Sending message: ${message()}`);
            setMessage('');
        }
    };

    return (
        <div class="flex-grow w-full h-full min-w-0 flex flex-col justify-between">
            {/* Content Area (Chat Feed) */}
            <div class="flex-grow flex flex-col gap-6 py-8 px-6 sm:px-10 overflow-y-auto bg-gray-50">
                <For each={props.messages}>
                    {(msg) => (
                        <ChatMessage
                            sender={msg.sender}
                            content_parts={msg.content_parts}
                        />
                    )}
                </For>
            </div>

            {/* Input Footer */}
            <div class="w-full flex-shrink-0 flex items-center gap-4 p-4 sm:p-6 bg-gray-50 border-t border-gray-300">
                <button class="p-2 rounded-full hover:bg-gray-100 transition-colors flex-shrink-0">
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M9.29 21a6.23 6.23 0 0 1-4.43-1.88 6 6 0 0 1-.22-8.49L12 3.2A4.1 4.1 0 0 1 15 2a4.48 4.48 0 0 1 3.19 1.35 4.36 4.36 0 0 1 .15 6.13l-7.4 7.43a2.54 2.54 0 0 1-1.81.75 2.72 2.72 0 0 1-1.95-.82 2.68 2.68 0 0 1-.08-3.77l6.83-6.86a1 1 0 0 1 1.37 1.41l-6.83 6.86a.68.68 0 0 0 .08.95.78.78 0 0 0 .53.23.56.56 0 0 0 .4-.16l7.39-7.43a2.36 2.36 0 0 0-.15-3.31 2.38 2.38 0 0 0-3.27-.15L6.06 12a4 4 0 0 0 .22 5.67 4.22 4.22 0 0 0 3 1.29 3.67 3.67 0 0 0 2.61-1.06l7.39-7.43a1 1 0 1 1 1.42 1.41l-7.39 7.43A5.65 5.65 0 0 1 9.29 21"
                            fill="#697586"
                        />
                    </svg>
                </button>

                <div class="flex-grow">
                    <input
                        type="text"
                        value={message()}
                        onInput={(e) => setMessage(e.currentTarget.value)}
                        placeholder="Ask MrFixit anything"
                        class="w-full py-3 px-4 border border-blue-700 rounded-xl bg-white text-base text-gray-900 focus:ring-1 focus:ring-blue-700 outline-none transition-shadow"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSend();
                        }}
                    />
                </div>

                <button
                    onClick={handleSend}
                    classList={{
                        'bg-[#1376A1] cursor-pointer': message().trim() !== '',
                        'bg-gray-400 cursor-not-allowed':
                            message().trim() === '',
                    }}
                    disabled={message().trim() === ''}
                    class="w-10 h-10 flex items-center justify-center rounded-3xl transition-colors flex-shrink-0"
                >
                    <i
                        class="fa-regular fa-paper-plane fa-lg"
                        style={'color: white'}
                    ></i>
                </button>
            </div>
        </div>
    );
};

export const MrFixitChatPage = () => {
    const [mobileView, setMobileView] = createSignal('sidebar');
    const [isDesktop, setIsDesktop] = createSignal(window.innerWidth >= 768);
    const [showModal, setShowModal] = createSignal(false);

    const checkWindowSize = () => {
        setIsDesktop(window.innerWidth >= 768);
    };

    onMount(() => {
        window.addEventListener('resize', checkWindowSize);
    });

    onCleanup(() => {
        window.removeEventListener('resize', checkWindowSize);
    });

    const handleNewProject = () => {
        setShowModal(true);
    };

    const handleCreateProject = () => {
        console.log('Project created!');
        setShowModal(false);
    };

    const handleChatSelect = (chatId: string) => {
        console.log(`Selected Chat: ${chatId}`);
        // Only change view on mobile
        if (!isDesktop()) {
            setMobileView('chat');
        }
    };

    const handleBack = () => {
        setMobileView('sidebar');
    };

    const showSidebar = () => isDesktop() || mobileView() === 'sidebar';
    const showMainChat = () => isDesktop() || mobileView() === 'chat';
    const isChatView = () => !isDesktop() && mobileView() === 'chat';

    return (
        <div class="w-full h-screen flex flex-col items-center mx-auto">
            {/* 1. Header component */}
            <CreateProjectModal
                isOpen={showModal}
                closeModal={setShowModal}
                onClose={() => setShowModal(false)}
                onCreate={handleCreateProject}
            />
            <ChatHeader
                onNewProject={handleNewProject}
                isChatView={isChatView()}
                onBack={handleBack}
                isDesktop={isDesktop()}
            />

            {/* 2. Main Chat Body Container (Sidebar + Main View) */}
            <div class="flex flex-grow w-full h-[calc(100vh-118px)] mx-auto overflow-hidden">
                {/* Chat Sidebar: Hidden on mobile when 'chat' is active */}
                <Switch
                    fallback={
                        <>
                            <Show when={showSidebar()}>
                                <ChatSidebar
                                    conversations={conversationsData}
                                    onChatSelect={handleChatSelect}
                                    projects={projectsData}
                                />
                            </Show>

                            {/* Main Chat View: Hidden on mobile when 'sidebar' is active */}
                            <Show when={showMainChat()}>
                                <MainChatView messages={messagesData} />
                            </Show>
                        </>
                    }
                >
                    <Match
                        when={
                            conversationsData.length === 0 ||
                            projectsData.length === 0
                        }
                    >
                        <LandingChatSidebar />
                        <ChatLandingPage />
                    </Match>
                </Switch>
            </div>
        </div>
    );
};
