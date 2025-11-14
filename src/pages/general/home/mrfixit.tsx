import { Component, JSX } from 'solid-js';

// --- Icon & Data Setup ---

// Placeholder for the icon in Feature 1 (Outline Cube/Window)
const FeatureIcon1: Component = (props) => (
    <svg
        class="w-6 h-6 text-[#D0E4EC] outline-[1.5px] outline-offset-[-0.75px] outline-current"
        viewBox="0 0 24 27"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <rect
            x="0.75"
            y="0.75"
            width="22.5"
            height="25.5"
            rx="1.25"
            stroke="currentColor"
            stroke-width="1.5"
        />
    </svg>
);

// Placeholder for the icon in Feature 2 (Outline Map Pin)
const FeatureIcon2: Component = (props) => (
    <svg
        class="w-6 h-6 text-[#D0E4EC] fill-none stroke-current stroke-[1.5px] stroke-linecap-round stroke-linejoin-round"
        viewBox="0 0 24 24"
        {...props}
    >
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
    </svg>
);

// Icon for the "Find jobs" prompt card
const ChatPromptIcon1: Component = () => (
    <div class="w-10 h-10 rounded-full bg-white p-2 flex items-center justify-center">
        <svg
            class="w-6 h-6 fill-[#202939]"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M12.0003 2.08331C6.54199 2.08331 2.08366 6.54165 2.08366 12C2.08366 17.4583 6.54199 21.9166 12.0003 21.9166C17.4587 21.9166 21.917 17.4583 21.917 12C21.917 6.54165 17.4587 2.08331 12.0003 2.08331ZM12.0003 4.58331C16.1462 4.58331 19.5003 7.93748 19.5003 12C19.5003 16.0625 16.1462 19.4166 12.0003 19.4166C7.8545 19.4166 4.50033 16.0625 4.50033 12C4.50033 7.93748 7.8545 4.58331 12.0003 4.58331ZM12.0003 9.5C11.3337 9.5 10.8337 10 10.8337 10.6666V13.3333C10.8337 14 11.3337 14.5 12.0003 14.5C12.667 14.5 13.167 14 13.167 13.3333V10.6666C13.167 10 12.667 9.5 12.0003 9.5Z"
                fill="currentColor"
            />
        </svg>
    </div>
);

// Icon for the "Event planing" prompt card (Complex Icon - using placeholder)
const ChatPromptIcon2: Component = () => (
    <div class="w-10 h-10 rounded-full bg-white p-2 flex items-center justify-center">
        <svg
            class="w-6 h-6 fill-current text-yellow-500"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Simplified complex icon with a star as a stand-in */}
            <path
                d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                fill="currentColor"
            />
        </svg>
    </div>
);

// Icon for the "Vendor search" prompt card
const ChatPromptIcon3: Component = () => (
    <div class="w-10 h-10 rounded-full bg-white p-2 flex items-center justify-center">
        <svg
            class="w-6 h-6 fill-[#EA4335]"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Simplified Location icon in red */}
            <path
                d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"
                fill="currentColor"
            />
        </svg>
    </div>
);

// Icon for the "New chat" button in the left sidebar
const NewChatIcon: Component = (props) => (
    <svg
        class="w-6 h-6 text-[#1376A1] fill-none stroke-current stroke-[1.5px] stroke-linecap-round stroke-linejoin-round"
        viewBox="0 0 24 24"
        {...props}
    >
        <path d="M21 11.5a8.5 8.5 0 1 1-17 0 8.5 8.5 0 0 1 17 0zM12 8v7M8.5 11.5h7" />
    </svg>
);

const FeatureBox: Component<{
    title: string;
    description: string;
    isActive: boolean;
    icon: JSX.Element;
}> = (props) => (
    <div
        class="flex-1 min-w-[300px] p-6 flex justify-start items-center gap-6 border-t-2 md:border-t-3 transition duration-300"
        classList={{
            'border-[#1376A1]': props.isActive,
            'border-[#9AA4B2]': !props.isActive,
        }}
    >
        <div class="p-4 bg-[#093B50] rounded-full flex items-center justify-center">
            {props.icon}
        </div>
        <div class="flex-1 flex flex-col justify-start items-start gap-3">
            <h3 class="text-xl font-semibold text-white leading-relaxed">
                {props.title}
            </h3>
            <p class="self-stretch text-base font-medium text-[#CDD5DF] leading-relaxed">
                {props.description}
            </p>
        </div>
    </div>
);

const ChatPromptCard: Component<{
    icon: JSX.Element;
    title: string;
    prompt: string;
}> = (props) => (
    <div class="flex-1 p-4 bg-[#D0E4EC]/24 rounded-xl flex flex-col justify-center items-start gap-5 min-w-[200px]">
        {props.icon}
        <div class="self-stretch flex flex-col justify-start items-start gap-1">
            <h4 class="self-stretch text-lg font-medium text-[#121926] leading-relaxed">
                {props.title}
            </h4>
            <p class="self-stretch text-sm font-normal text-[#4B5565] leading-normal">
                {props.prompt}
            </p>
        </div>
    </div>
);

const AiChatMockup: Component = () => (
    <div class="self-stretch bg-[#F8FAFC] rounded-2xl ring-7 ring-[#3A8DB1] ring-offset-[-7px] flex flex-col items-start overflow-hidden">
        {/* 1. Top Navigation Bar (Header) */}
        <div class="self-stretch flex flex-col lg:flex-row justify-between items-center bg-white border-b border-[#EEF2F6]">
            {/* Left/Center: Search Bar */}
            <div class="w-full lg:w-auto p-4 lg:p-0 flex-1 flex justify-start items-center">
                <div class="w-full max-w-[459px] px-4 py-3 bg-[#F8FAFC] rounded-full border border-[#E3E8EF] flex items-center gap-2 lg:ml-8 my-2">
                    {/* Search Icon Placeholder */}
                    <svg
                        class="w-4 h-4 text-[#9AA4B2]"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle
                            cx="6.5"
                            cy="6.5"
                            r="5.75"
                            stroke="currentColor"
                            stroke-width="1.5"
                        />
                        <path
                            d="M11 11L14.5 14.5"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                        />
                    </svg>
                    <span class="text-xs font-normal text-[#697586] leading-relaxed">
                        Search for jobs
                    </span>
                </div>
            </div>

            {/* Right: Profile Controls */}
            <div class="w-full lg:w-auto p-4 lg:p-0 lg:pr-12 flex justify-end items-center gap-8 border-t lg:border-t-0 border-[#EEF2F6] lg:border-l">
                {/* Switch to Client */}
                <button class="flex items-center text-gray-600 hover:text-gray-800 text-sm">
                    <i class="fas fa-sync-alt mr-0 sm:mr-2 pl-2"></i>
                    <span class="hidden sm:inline">Switch to Client</span>{' '}
                    {/* Text hidden on mobile */}
                </button>

                <button class="p-2 text-gray-500 hover:text-gray-700 relative">
                    <svg
                        width="18"
                        height="19"
                        viewBox="0 0 18 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M12.75 15.875H5.25C3 15.875 1.5 14.75 1.5 12.125V6.875C1.5 4.25 3 3.125 5.25 3.125H12.75C15 3.125 16.5 4.25 16.5 6.875V12.125C16.5 14.75 15 15.875 12.75 15.875Z"
                            stroke="#697586"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M12.75 7.25L10.4025 9.125C9.63 9.74 8.3625 9.74 7.59 9.125L5.25 7.25"
                            stroke="#697586"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                    <span class="absolute top-2 right-1 block h-1 w-1 rounded-full bg-green-500 ring-1 ring-white"></span>
                </button>

                {/* Profile Dropdown */}
                <div class="flex justify-start items-center gap-2">
                    <img
                        class="w-12 h-12 rounded-full"
                        src={`https://picsum.photos/200?random=${Math.random()}`}
                        alt="User Avatar"
                    />
                    <div class="hidden md:flex flex-col justify-start items-start">
                        <div class="text-sm font-medium text-[#0D121C] leading-normal">
                            Stanley Agu
                        </div>
                        <div class="text-xs font-normal text-[#4B5565] leading-tight">
                            stanleyagu@gmail.com
                        </div>
                    </div>
                    {/* Dropdown Arrow Placeholder */}
                    <svg
                        class="w-4 h-4 text-[#292D32] transform rotate-180"
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <path d="M4 6L8 10L12 6" stroke="currentColor" />
                    </svg>
                </div>
            </div>
        </div>

        {/* 2. Main Content: Sidebar (Left) and Chat Area (Right) */}
        <div class="self-stretch flex flex-col md:flex-row justify-start items-start flex-1">
            {/* Left Column: Chat Sidebar (fixed width on desktop) */}
            <div class="w-full md:w-[301px] flex flex-col justify-start items-start border-r border-[#CDD5DF]">
                {/* New Chat Button (Top) */}
                <div class="self-stretch p-6 flex justify-start items-center gap-3 border-b border-[#CDD5DF]">
                    <NewChatIcon />
                    <span class="text-lg font-semibold text-[#1376A1] leading-relaxed">
                        New chat
                    </span>
                </div>

                {/* Start a Project Button */}
                <div class="w-full px-10 py-5 flex justify-center items-center">
                    <button class="px-4 py-3 bg-[#1376A1] text-base font-semibold text-white rounded-lg hover:bg-[#106283] transition">
                        Start a project
                    </button>
                </div>

                {/* Chat History Area */}
                <div class="self-stretch px-6 py-8 flex-1 flex flex-col justify-start items-center gap-12">
                    {/* Search for artisans input */}
                    <div class="w-full px-4 py-3 bg-white rounded-3xl border border-[#E3E8EF] flex items-center gap-2">
                        {/* Search Icon Placeholder */}
                        <svg
                            class="w-4 h-4 text-[#9AA4B2]"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <circle
                                cx="6.5"
                                cy="6.5"
                                r="5.75"
                                stroke="currentColor"
                                stroke-width="1.5"
                            />
                            <path
                                d="M11 11L14.5 14.5"
                                stroke="currentColor"
                                stroke-width="1.5"
                                stroke-linecap="round"
                            />
                        </svg>
                        <span class="text-xs font-normal text-[#697586] leading-relaxed">
                            Search for artisans
                        </span>
                    </div>

                    {/* No Chat History Message */}
                    <div class="flex flex-col justify-start items-center gap-4">
                        <div class="w-[90px] h-[90px] rounded-[80px] bg-[#EEF2F6] overflow-hidden flex items-center justify-center">
                            {/* AI Icon Placeholder (simplified) */}
                            <svg
                                class="w-10 h-10 fill-[#D1D1D1]"
                                viewBox="0 0 40 40"
                            >
                                <circle
                                    cx="20"
                                    cy="20"
                                    r="18"
                                    fill="currentColor"
                                />
                            </svg>
                        </div>
                        <p class="text-sm font-medium text-[#697586] leading-normal">
                            No chat history
                        </p>
                    </div>

                    {/* New Chat Button (Bottom) */}
                    <button class="w-full px-4 py-3 rounded-3xl border border-[#697586] flex justify-center items-center gap-3 hover:bg-gray-100 transition">
                        {/* Plus Icon Placeholder */}
                        <svg
                            class="w-6 h-6 fill-[#202939]"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"
                                fill="currentColor"
                            />
                        </svg>
                        <span class="text-base font-medium text-[#4B5565] leading-relaxed">
                            New chat
                        </span>
                    </button>
                </div>
            </div>

            {/* Right Column: Chat Window */}
            <div class="flex-1 w-full flex flex-col justify-between items-start">
                {/* Chat Body (Scrollable content) */}
                <div class="self-stretch p-10 flex flex-col justify-start items-start gap-16 overflow-y-auto">
                    {/* Welcome Message */}
                    <div class="self-stretch flex flex-col justify-start items-start gap-2">
                        <h2 class="text-2xl font-medium text-[#0D121C] leading-relaxed">
                            Hey there,{' '}
                            <span class="text-[#1376A1]">Stanley</span>.
                            <br />
                            What would you like to search for?
                        </h2>
                        <p class="text-sm font-normal text-[#364152] leading-normal">
                            Hi, I'm MrFixit - your assistant for finding jobs
                            and planning projects. Ask me anything!
                        </p>
                    </div>

                    {/* Prompt Cards */}
                    <div class="self-stretch flex flex-col justify-start items-start gap-4">
                        <h3 class="text-base font-medium text-[#0D121C] leading-relaxed">
                            Try these prompts
                        </h3>
                        <div class="self-stretch flex flex-col md:flex-row justify-start items-stretch gap-5">
                            <ChatPromptCard
                                icon={<ChatPromptIcon1 />}
                                title="Find jobs"
                                prompt="Show me electrical jobs available in my area this week."
                            />
                            <ChatPromptCard
                                icon={<ChatPromptIcon2 />}
                                title="Event planing"
                                prompt="Help me plan a wedding with catering, photography, and decorations in Lagos."
                            />
                            <ChatPromptCard
                                icon={<ChatPromptIcon3 />}
                                title="Vendor search"
                                prompt="Who are the best photographers in my city within $100 budget?"
                            />
                        </div>
                    </div>
                </div>

                {/* 3. Bottom Input Bar */}
                <div class="self-stretch p-6 bg-[#F8FAFC] border-t border-[#CDD5DF] flex justify-between items-center">
                    {/* Attachment Icon */}
                    <div class="w-6 h-6 relative text-gray-600 flex-shrink-0 cursor-pointer">
                        <i class="fa-solid fa-paperclip fa-lg"></i>
                    </div>
                    <div
                        class="w-6 h-6 relative text-gray-600 flex-shrink-0 cursor-pointer"
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

                    {/* Text Input */}
                    <div class="flex-1 max-w-[691px] mx-4 px-4 py-3 rounded-xl border border-[#CDD5DF]">
                        <span class="text-base font-normal text-[#697586] leading-relaxed">
                            Ask MrFixit anything
                        </span>
                    </div>

                    {/* Send Button */}
                    <button class="w-10 h-10 relative bg-[#1376A1] rounded-full flex items-center justify-center flex-shrink-0 cursor-pointer">
                        <i
                            class="fa-regular fa-paper-plane fa-lg"
                            style={'color: white'}
                        ></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
);

export const AiIntegrationSection: Component = () => (
    <section class="w-full flex justify-center py-16 px-4 md:px-12 bg-white">
        <div class="w-full max-w-[1440px] flex flex-col items-start gap-16">
            <div class="self-stretch p-8 md:p-12 lg:p-16 bg-[#041820] rounded-[48px] flex flex-col justify-start items-center gap-16">
                {/* Header Block */}
                <div class="flex flex-col justify-start items-center gap-3 text-center max-w-4xl">
                    <div class="p-1 rounded-lg flex items-center gap-2">
                        <span class="text-2xl font-semibold text-[#E3E8EF]">
                            |
                        </span>
                        <h2 class="text-xl font-medium text-[#E3E8EF]">
                            AI INTEGRATION
                        </h2>
                    </div>
                    <h1 class="text-4xl sm:text-5xl md:text-[48px] font-bold text-[#FCFCFD] leading-tight md:leading-[74px] capitalize">
                        Plan and Search with MrFixit AI
                    </h1>
                    <p class="text-lg md:text-xl font-normal text-[#EEF2F6] leading-8">
                        Explore our most in-demand services trusted by customers
                        for
                    </p>
                </div>

                {/* Main Content (Features and Mockup) */}
                <div class="self-stretch flex flex-col justify-center items-end gap-16">
                    {/* Feature Tabs/Boxes */}
                    <div class="self-stretch flex flex-col md:flex-row justify-center items-stretch border-t border-[#E3E8EF] gap-4 md:gap-0">
                        <FeatureBox
                            isActive={true}
                            title="Create and Plan events"
                            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doincididunt ut labore et dolore magna aliqua."
                            icon={<FeatureIcon1 />}
                        />
                        <FeatureBox
                            isActive={false}
                            title="Find and Search Easily"
                            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doincididunt ut labore et dolore magna aliqua."
                            icon={<FeatureIcon2 />}
                        />
                    </div>

                    {/* AI Chat Mockup */}
                    <AiChatMockup />
                </div>
            </div>
        </div>
    </section>
);
