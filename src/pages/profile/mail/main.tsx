import { createSignal, onMount, Show } from 'solid-js';
import './mail.css'; // Assuming you'll compile your Tailwind CSS into this file

const globalStyles = `
/* Custom Scrollbar Style for Webkit (Chrome, Safari) */
.custom-scrollbar::-webkit-scrollbar {
    width: 12px;
    height: 12px;
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: #f3f4f6; /* bg-gray-100 equivalent */
    border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background: #cbd5e1; /* A lighter gray/slate for subtlety */
    border-radius: 10px;
    border: 3px solid #f3f4f6; /* Border matches track */
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #94a3b8; /* Darker on hover */
}

/* Custom Scrollbar Style for Firefox */
.custom-scrollbar {
    scrollbar-width: thin; /* "auto" or "none" */
    scrollbar-color: #cbd5e1 #f3f4f6; /* thumb color track color */
}

/* Basic keyframe for subtle pulse on compose button */
@keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.01); }
}

.animate-pulse-subtle {
    animation: pulse 2s ease-in-out infinite;
}
`;

export function MailApp() {
    const [isSidebarOpen, setIsSidebarOpen] = createSignal(false);
    // New state: 'list' for email list, 'detail' for email detail view
    const [mobileView, setMobileView] = createSignal('list'); // Default to list on mobile

    onMount(() => {
        const styleElement = document.createElement('style');
        styleElement.innerHTML = globalStyles;
        document.head.appendChild(styleElement);

        // Optional: Close sidebar if screen size changes from mobile to desktop
        const mediaQuery = window.matchMedia('(min-width: 768px)'); // md breakpoint
        const handleMediaQueryChange = (e: any) => {
            if (e.matches) {
                setIsSidebarOpen(false); // Close sidebar when switching to desktop view
                setMobileView('list'); // Reset view on desktop
            }
        };
        mediaQuery.addEventListener('change', handleMediaQueryChange);
        // Cleanup listener on unmount (important for single page apps)
        // SolidJS automatically handles this for `onCleanup` within a component,
        // but for global listeners on `window` or `document`, manual cleanup is good practice.
        // For this simple example, it's illustrative.
    });

    const handleEmailClick = () => {
        if (window.innerWidth < 768) {
            // Only switch view on mobile (less than md breakpoint)
            setMobileView('detail');
        }
    };

    const handleBackToList = () => {
        setMobileView('list');
    };

    return (
        <div class="flex flex-col md:flex-row min-h-screen overflow-hidden bg-gray-50 text-gray-800 font-sans">
            {/* Mobile Sidebar Overlay */}
            <Show when={isSidebarOpen()}>
                <div
                    class="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            </Show>

            {/* Sidebar */}
            <aside
                class={`fixed inset-y-0 left-0 transform ${
                    isSidebarOpen() ? 'translate-x-0' : '-translate-x-full'
                } md:relative md:translate-x-0 md:flex md:w-64 lg:w-72 bg-white shadow-2xl p-6 flex-col items-start space-y-6 border-r border-gray-200 z-40 transition-transform duration-300 ease-in-out`}
            >
                <h1 class="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-500 mb-8">
                    In App Mail
                </h1>

                <button class="w-full py-3 px-6 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 text-white text-lg font-semibold shadow-md hover:from-blue-600 hover:to-teal-600 transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 animate-pulse-subtle">
                    <svg
                        class="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-7.793 7.793a1 1 0 01-.293.293l-2.5 1.75a.5.5 0 01-.66-.66l1.75-2.5a1 1 0 01.293-.293l7.793-7.793zM10.146 5.146a.5.5 0 01.708 0L14 8.293V2a2 2 0 00-2-2H2a2 2 0 00-2 2v10a2 2 0 002 2h6.293l-3.147 3.146a.5.5 0 00.708.708l3.146-3.147L15 17.293a.5.5 0 00.707-.707L11.293 11z"></path>
                    </svg>
                    <span>Compose</span>
                </button>

                <nav class="w-full space-y-2 text-lg">
                    <a
                        href="#"
                        class="flex items-center space-x-3 p-3 rounded-xl bg-blue-100 text-blue-800 font-medium shadow-md"
                    >
                        <svg
                            class="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0018 4H2a2 2 0 00-.003 1.884z"></path>
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                        </svg>
                        <span>Inbox</span>
                        <span class="ml-auto text-sm bg-blue-200 text-blue-800 px-3 py-1 rounded-full font-bold">
                            12
                        </span>
                    </a>
                    <a
                        href="#"
                        class="flex items-center space-x-3 p-3 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors duration-200"
                    >
                        <svg
                            class="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 012 14v2a1 1 0 01-1 1H0a1 1 0 01-1-1v-2a3 3 0 01.879-2.121L4 8V6a6 6 0 016-6zM8 9.897V8a2 2 0 014 0v1.897l-2 1.333-2-1.333z"
                                clip-rule="evenodd"
                            ></path>
                        </svg>
                        <span>Starred</span>
                    </a>
                    <a
                        href="#"
                        class="flex items-center space-x-3 p-3 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors duration-200"
                    >
                        <svg
                            class="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
                            <path
                                fill-rule="evenodd"
                                d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                                clip-rule="evenodd"
                            ></path>
                        </svg>
                        <span>Drafts</span>
                        <span class="ml-auto text-sm bg-gray-200 text-gray-800 px-3 py-1 rounded-full font-bold">
                            3
                        </span>
                    </a>
                    <a
                        href="#"
                        class="flex items-center space-x-3 p-3 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors duration-200"
                    >
                        <svg
                            class="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2V7a5 5 0 00-5-5zm-3 7v2a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2H9a2 2 0 00-2 2v2z"
                                clip-rule="evenodd"
                            ></path>
                        </svg>
                        <span>Sent</span>
                    </a>
                    <a
                        href="#"
                        class="flex items-center space-x-3 p-3 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors duration-200"
                    >
                        <svg
                            class="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1zm1 3a1 1 0 000 2h4a1 1 0 100-2H8z"
                                clip-rule="evenodd"
                            ></path>
                        </svg>
                        <span>Trash</span>
                    </a>
                </nav>

                <div class="mt-auto w-full pt-6 border-t border-gray-200">
                    <h3 class="text-md font-semibold text-gray-700 mb-3">
                        Labels
                    </h3>
                    <div class="space-y-2 text-sm">
                        <a
                            href="#"
                            class="flex items-center space-x-2 p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors duration-200"
                        >
                            <span class="w-3 h-3 bg-red-500 rounded-full"></span>{' '}
                            <span>Urgent</span>
                        </a>
                        <a
                            href="#"
                            class="flex items-center space-x-2 p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors duration-200"
                        >
                            <span class="w-3 h-3 bg-green-500 rounded-full"></span>{' '}
                            <span>Work</span>
                        </a>
                        <a
                            href="#"
                            class="flex items-center space-x-2 p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors duration-200"
                        >
                            <span class="w-3 h-3 bg-blue-500 rounded-full"></span>{' '}
                            <span>Personal</span>
                        </a>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main class="flex-1 flex flex-col bg-gray-100 rounded-xl shadow-2xl m-4 overflow-hidden">
                <header class="p-5 border-b border-gray-200 flex items-center justify-between bg-white/50 backdrop-blur-sm z-10">
                    <div class="flex items-center space-x-4">
                        {/* Hamburger menu / Back button for mobile */}
                        <Show
                            when={mobileView() === 'list'}
                            fallback={
                                <button
                                    class="md:hidden text-gray-600 hover:text-gray-900 transition-colors duration-200"
                                    onClick={handleBackToList}
                                >
                                    <svg
                                        class="w-6 h-6"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                            clip-rule="evenodd"
                                        ></path>
                                    </svg>
                                </button>
                            }
                        >
                            <button
                                class="md:hidden text-gray-600 hover:text-gray-900 transition-colors duration-200"
                                onClick={() =>
                                    setIsSidebarOpen(!isSidebarOpen())
                                }
                            >
                                <svg
                                    class="w-6 h-6"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                        clip-rule="evenodd"
                                    ></path>
                                </svg>
                            </button>
                        </Show>

                        {/* Dynamic header text based on view */}
                        <h2 class="text-2xl font-bold text-gray-900">
                            <Show
                                when={mobileView() === 'list'}
                                fallback="Message Detail"
                            >
                                Inbox
                            </Show>
                        </h2>
                    </div>
                    <div class="flex-1 mx-4 sm:mx-8 relative">
                        <input
                            type="text"
                            placeholder="Search emails..."
                            class="w-full bg-gray-200 rounded-full py-3 pl-12 pr-4 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                        />
                        <svg
                            class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                clip-rule="evenodd"
                            ></path>
                        </svg>
                    </div>
                    <div class="flex items-center space-x-4">
                        <button class="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                            <svg
                                class="w-6 h-6"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 012 14v2a1 1 0 01-1 1H0a1 1 0 01-1-1v-2a3 3 0 01.879-2.121L4 8V6a6 6 0 016-6zM8 9.897V8a2 2 0 014 0v1.897l-2 1.333-2-1.333z"
                                    clip-rule="evenodd"
                                ></path>
                            </svg>
                        </button>
                        <div class="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-400 to-teal-400 flex items-center justify-center text-lg font-bold text-white">
                            JD
                        </div>
                    </div>
                </header>

                <div class="flex flex-1 flex-col md:flex-row overflow-hidden">
                    {/* Email List - Conditionally rendered on mobile */}
                    <Show
                        when={
                            mobileView() === 'list' || window.innerWidth >= 768
                        }
                    >
                        <div class="w-full md:w-2/5 lg:w-1/3 p-4 border-b md:border-b-0 md:border-r border-gray-200 overflow-y-auto custom-scrollbar">
                            <div class="space-y-3">
                                <div
                                    class="flex items-start p-4 rounded-xl bg-white shadow-md cursor-pointer hover:bg-gray-50 transition-all duration-200 transform hover:scale-[1.01]"
                                    onClick={handleEmailClick}
                                >
                                    <div class="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-sm font-semibold text-white mr-4">
                                        TS
                                    </div>
                                    <div class="flex-1 min-w-0">
                                        {' '}
                                        <div class="flex justify-between items-center mb-1">
                                            <h3 class="font-bold text-lg text-gray-900 truncate">
                                                Tech Solutions Inc.
                                            </h3>
                                            <span class="text-sm text-gray-600 flex-shrink-0 ml-2">
                                                10:30 AM
                                            </span>
                                        </div>
                                        <p class="font-semibold text-lg text-gray-800 mb-1 truncate">
                                            Project Proposal - Exciting
                                            Opportunities!
                                        </p>
                                        <p class="text-gray-600 text-sm truncate">
                                            Hello Team, I hope this email finds
                                            you well. Attached is the
                                            comprehensive project proposal for
                                            our new...
                                        </p>
                                    </div>
                                </div>

                                <div
                                    class="flex items-start p-4 rounded-xl bg-white shadow-md cursor-pointer hover:bg-gray-50 transition-all duration-200 transform hover:scale-[1.01] opacity-80"
                                    onClick={handleEmailClick}
                                >
                                    <div class="flex-shrink-0 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-sm font-semibold text-white mr-4">
                                        KW
                                    </div>
                                    <div class="flex-1 min-w-0">
                                        {' '}
                                        <div class="flex justify-between items-center mb-1">
                                            <h3 class="font-medium text-lg text-gray-700 truncate">
                                                Kylie Watson
                                            </h3>
                                            <span class="text-sm text-gray-500 flex-shrink-0 ml-2">
                                                Yesterday
                                            </span>
                                        </div>
                                        <p class="font-medium text-lg text-gray-600 mb-1 truncate">
                                            Regarding your recent inquiry
                                        </p>
                                        <p class="text-gray-500 text-sm truncate">
                                            Hi John, Thank you for reaching out.
                                            I've reviewed your request and I'm
                                            happy to assist...
                                        </p>
                                    </div>
                                </div>

                                <div
                                    class="flex items-start p-4 rounded-xl bg-white shadow-md cursor-pointer hover:bg-gray-50 transition-all duration-200 transform hover:scale-[1.01]"
                                    onClick={handleEmailClick}
                                >
                                    <div class="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-sm font-semibold text-white mr-4">
                                        MR
                                    </div>
                                    <div class="flex-1 min-w-0">
                                        {' '}
                                        <div class="flex justify-between items-center mb-1">
                                            <h3 class="font-bold text-lg text-gray-900 truncate">
                                                Marketing Team
                                            </h3>
                                            <span class="text-sm text-gray-600 flex items-center space-x-1 flex-shrink-0 ml-2">
                                                <svg
                                                    class="w-4 h-4"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path
                                                        fill-rule="evenodd"
                                                        d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                                                        clip-rule="evenodd"
                                                    ></path>
                                                </svg>
                                                <span>May 28</span>
                                            </span>
                                        </div>
                                        <p class="font-semibold text-lg text-gray-800 mb-1 truncate">
                                            New Campaign Assets for Review
                                        </p>
                                        <p class="text-gray-600 text-sm truncate">
                                            Hi everyone, Please find attached
                                            the latest assets for our upcoming
                                            campaign. Your feedback is highly...
                                        </p>
                                    </div>
                                </div>

                                <div
                                    class="flex items-start p-4 rounded-xl bg-white shadow-md cursor-pointer hover:bg-gray-50 transition-all duration-200 transform hover:scale-[1.01] opacity-80"
                                    onClick={handleEmailClick}
                                >
                                    <div class="flex-shrink-0 w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-sm font-semibold text-white mr-4">
                                        SU
                                    </div>
                                    <div class="flex-1 min-w-0">
                                        {' '}
                                        <div class="flex justify-between items-center mb-1">
                                            <h3 class="font-medium text-lg text-gray-700 truncate">
                                                Support Team
                                            </h3>
                                            <span class="text-sm text-gray-500 flex-shrink-0 ml-2">
                                                May 25
                                            </span>
                                        </div>
                                        <p class="font-medium text-lg text-gray-600 mb-1 truncate">
                                            Ticket #12345: Issue Resolved
                                        </p>
                                        <p class="text-gray-500 text-sm truncate">
                                            Your support ticket #12345 has been
                                            resolved. Please confirm if the
                                            issue is fixed.
                                        </p>
                                    </div>
                                </div>

                                <div
                                    class="flex items-start p-4 rounded-xl bg-white shadow-md cursor-pointer hover:bg-gray-50 transition-all duration-200 transform hover:scale-[1.01]"
                                    onClick={handleEmailClick}
                                >
                                    <div class="flex-shrink-0 w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-sm font-semibold text-gray-900 mr-4">
                                        AL
                                    </div>
                                    <div class="flex-1 min-w-0">
                                        {' '}
                                        <div class="flex justify-between items-center mb-1">
                                            <h3 class="font-bold text-lg text-gray-900 truncate">
                                                Alice L.
                                            </h3>
                                            <span class="text-sm text-gray-600 flex-shrink-0 ml-2">
                                                May 20
                                            </span>
                                        </div>
                                        <p class="font-semibold text-lg text-gray-800 mb-1 truncate">
                                            Quick Catch-up and Brainstorming
                                            Session for Q3 Initiatives
                                        </p>
                                        <p class="text-gray-600 text-sm truncate">
                                            Hi, Just wanted to schedule a quick
                                            chat to discuss the Q3 initiatives
                                            and brainstorm some initial ideas.
                                            Let me know what times work for you
                                            next week.
                                        </p>
                                    </div>
                                </div>

                                <div
                                    class="flex items-start p-4 rounded-xl bg-white shadow-md cursor-pointer hover:bg-gray-50 transition-all duration-200 transform hover:scale-[1.01] opacity-80"
                                    onClick={handleEmailClick}
                                >
                                    <div class="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-sm font-semibold text-white mr-4">
                                        FN
                                    </div>
                                    <div class="flex-1 min-w-0">
                                        <div class="flex justify-between items-center mb-1">
                                            <h3 class="font-medium text-lg text-gray-700 truncate">
                                                Fitness Now
                                            </h3>
                                            <span class="text-sm text-gray-500 flex-shrink-0 ml-2">
                                                May 18
                                            </span>
                                        </div>
                                        <p class="font-medium text-lg text-gray-600 mb-1 truncate">
                                            Your Weekly Workout Summary
                                        </p>
                                        <p class="text-gray-500 text-sm truncate">
                                            Check out your progress this week
                                            and discover new routines!
                                        </p>
                                    </div>
                                </div>
                                <div
                                    class="flex items-start p-4 rounded-xl bg-white shadow-md cursor-pointer hover:bg-gray-50 transition-all duration-200 transform hover:scale-[1.01]"
                                    onClick={handleEmailClick}
                                >
                                    <div class="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-sm font-semibold text-white mr-4">
                                        DS
                                    </div>
                                    <div class="flex-1 min-w-0">
                                        <div class="flex justify-between items-center mb-1">
                                            <h3 class="font-bold text-lg text-gray-900 truncate">
                                                Data Science Collective
                                            </h3>
                                            <span class="text-sm text-gray-600 flex-shrink-0 ml-2">
                                                May 15
                                            </span>
                                        </div>
                                        <p class="font-semibold text-lg text-gray-800 mb-1 truncate">
                                            New Research Paper: AI in Healthcare
                                        </p>
                                        <p class="text-gray-600 text-sm truncate">
                                            A groundbreaking study on the impact
                                            of artificial intelligence in modern
                                            healthcare practices.
                                        </p>
                                    </div>
                                </div>
                                <div
                                    class="flex items-start p-4 rounded-xl bg-white shadow-md cursor-pointer hover:bg-gray-50 transition-all duration-200 transform hover:scale-[1.01] opacity-80"
                                    onClick={handleEmailClick}
                                >
                                    <div class="flex-shrink-0 w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-sm font-semibold text-white mr-4">
                                        HM
                                    </div>
                                    <div class="flex-1 min-w-0">
                                        <div class="flex justify-between items-center mb-1">
                                            <h3 class="font-medium text-lg text-gray-700 truncate">
                                                Home Maintenance Co.
                                            </h3>
                                            <span class="text-sm text-gray-500 flex-shrink-0 ml-2">
                                                May 12
                                            </span>
                                        </div>
                                        <p class="font-medium text-lg text-gray-600 mb-1 truncate">
                                            Your scheduled service reminder
                                        </p>
                                        <p class="text-gray-500 text-sm truncate">
                                            Don't forget your upcoming HVAC
                                            maintenance on June 1st.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Show>

                    {/* Email Content - Conditionally rendered on mobile */}
                    <Show
                        when={
                            mobileView() === 'detail' ||
                            window.innerWidth >= 768
                        }
                    >
                        <div class="flex-1 p-6 overflow-y-auto custom-scrollbar">
                            <div class="bg-white rounded-xl shadow-xl p-8 flex flex-col h-full">
                                <div class="flex justify-between items-start mb-6 border-b border-gray-200 pb-4">
                                    <div>
                                        <h2 class="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-500 mb-2">
                                            Project Proposal - Exciting
                                            Opportunities!
                                        </h2>
                                        <p class="text-gray-600 text-md flex items-center space-x-2">
                                            <span class="font-semibold text-gray-800">
                                                Tech Solutions Inc.
                                            </span>
                                            <span class="text-gray-600">
                                                &lt;info@techsolutions.com&gt;
                                            </span>
                                            <svg
                                                class="w-4 h-4 text-gray-500"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zm0 12a2 2 0 110-4 2 2 0 010 4zm-9-6a2 2 0 110-4 2 2 0 010 4zm18 0a2 2 0 110-4 2 2 0 010 4z"></path>
                                            </svg>
                                            <span class="text-gray-500">
                                                to me
                                            </span>
                                        </p>
                                    </div>
                                    <div class="flex items-center space-x-3 text-gray-600 text-sm flex-shrink-0">
                                        <span class="font-bold">
                                            10:30 AM (2 days ago)
                                        </span>
                                        <button class="hover:text-gray-900 transition-colors duration-200">
                                            <svg
                                                class="w-5 h-5"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M14.707 7.293a1 1 0 010 1.414L11.414 12l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"></path>
                                            </svg>
                                        </button>
                                        <button class="hover:text-gray-900 transition-colors duration-200">
                                            <svg
                                                class="w-5 h-5"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M15.586 16.293a1 1 0 01-1.414 0L12 13.414l-2.172 2.172a1 1 0 01-1.414-1.414L10.586 12l2.172-2.172a1 1 0 011.414 1.414L13.414 12l2.172 2.172a1 1 0 010 1.414z"></path>
                                                <path
                                                    fill-rule="evenodd"
                                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm0 2a10 10 0 100-20 10 10 0 000 20z"
                                                    clip-rule="evenodd"
                                                ></path>
                                            </svg>
                                        </button>
                                        <button class="hover:text-gray-900 transition-colors duration-200">
                                            <svg
                                                class="w-5 h-5"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    fill-rule="evenodd"
                                                    d="M15 10a1 1 0 11-2 0 1 1 0 012 0zm-5 0a1 1 0 11-2 0 1 1 0 012 0zm-5 0a1 1 0 11-2 0 1 1 0 012 0z"
                                                    clip-rule="evenodd"
                                                ></path>
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                <div class="flex-1 text-gray-700 leading-relaxed text-md overflow-y-auto custom-scrollbar">
                                    <p class="mb-4">Hello Team,</p>
                                    <p class="mb-4">
                                        I hope this email finds you well.
                                        Attached is the comprehensive project
                                        proposal for our new initiative,
                                        "Project Aurora." This document outlines
                                        the scope, objectives, key deliverables,
                                        timeline, and estimated budget.
                                    </p>
                                    <img
                                        src="http://googleusercontent.com/image_generation_content/1"
                                        alt="Abstract Light Blue and Gray Background"
                                        class="w-full h-auto max-w-lg mx-auto rounded-lg shadow-md mb-6 border border-gray-200 object-cover"
                                    />
                                    <p class="mb-4">
                                        We believe this project holds immense
                                        potential for expanding our market reach
                                        and significantly enhancing our product
                                        offerings. We've incorporated feedback
                                        from our initial brainstorming sessions
                                        and conducted thorough market research
                                        to ensure its viability.
                                    </p>
                                    <p class="mb-4">Key highlights include:</p>
                                    <ul class="list-disc list-inside mb-4 space-y-2 pl-4">
                                        <li>
                                            Innovative user experience design.
                                        </li>
                                        <li>
                                            Integration of cutting-edge AI
                                            features.
                                        </li>
                                        <li>
                                            Scalable architecture for future
                                            growth.
                                        </li>
                                        <li>
                                            Detailed financial projections with
                                            a clear ROI path.
                                        </li>
                                    </ul>
                                    <p class="mb-4">
                                        Please take some time to review the
                                        proposal at your earliest convenience.
                                        We plan to hold a follow-up meeting on{' '}
                                        <span class="font-bold text-blue-500">
                                            Friday, June 13th, at 2:00 PM CEST
                                        </span>{' '}
                                        to discuss any questions, gather
                                        feedback, and finalize the next steps.
                                    </p>
                                    <p class="mb-6">
                                        Your insights are invaluable to us as we
                                        move forward with this exciting venture.
                                    </p>
                                    <p class="font-semibold">Best regards,</p>
                                    <p class="font-semibold text-lg text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-500">
                                        The Tech Solutions Team
                                    </p>

                                    <div class="mt-8 pt-6 border-t border-gray-200">
                                        <h3 class="text-lg font-semibold text-gray-800 mb-3">
                                            Attachments:
                                        </h3>
                                        <div class="flex flex-wrap gap-4">
                                            <a
                                                href="#"
                                                class="flex items-center space-x-2 bg-gray-200 p-3 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                                            >
                                                <svg
                                                    class="w-5 h-5 text-gray-600"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path
                                                        fill-rule="evenodd"
                                                        d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                                                        clip-rule="evenodd"
                                                    ></path>
                                                </svg>
                                                <span class="text-gray-700">
                                                    Project_Aurora_Proposal.pdf
                                                </span>
                                            </a>
                                            <a
                                                href="#"
                                                class="flex items-center space-x-2 bg-gray-200 p-3 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                                            >
                                                <svg
                                                    class="w-5 h-5 text-gray-600"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path
                                                        fill-rule="evenodd"
                                                        d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                                                        clip-rule="evenodd"
                                                    ></path>
                                                </svg>
                                                <span class="text-gray-700">
                                                    Budget_Breakdown.xlsx
                                                </span>
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div class="mt-6 flex justify-end space-x-4 border-t border-gray-200 pt-6">
                                    <button class="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg text-white font-semibold shadow-md hover:from-blue-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-105">
                                        <svg
                                            class="w-5 h-5"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                                clip-rule="evenodd"
                                            ></path>
                                        </svg>
                                        <span>Reply</span>
                                    </button>
                                    <button class="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg text-white font-semibold shadow-md hover:from-blue-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-105">
                                        <svg
                                            class="w-5 h-5"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M15 8l-3-3l-3 3m0 0l3 3l3-3m-3-3v6m0 4a1 1 0 01-1 1H8a1 1 0 01-1-1v-4L4.8 7.2A3 3 0 003 9a3 3 0 003 3h3m7-7v4a3 3 0 01-3 3h-3.2L12 7.2A3 3 0 009 5a3 3 0 00-3 3h3a1 1 0 011 1h4a1 1 0 011 1v4z"
                                                clip-rule="evenodd"
                                            ></path>
                                        </svg>
                                        <span>Forward</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Show>
                </div>
            </main>
        </div>
    );
}
