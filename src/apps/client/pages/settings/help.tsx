import { createSignal } from 'solid-js';

//
const MessageIcon = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="#1376A1"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="w-6 h-6"
    >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
);

//
const SearchIcon = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="#697586"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="w-5 h-5"
    >
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
);

const QuickLink = (props: { title: string; subtitle: string }) => (
    <a
        href="#"
        class="flex flex-col gap-1 p-4 rounded-lg border border-gray-200 hover:border-[#1376A1] transition-colors bg-white"
    >
        <div class="text-lg font-bold text-[#1376A1]">{props.title}</div>
        <div class="text-sm font-normal text-[#1376A1]">{props.subtitle}</div>
    </a>
);

export const HelpCenterView = () => {
    const [searchQuery, setSearchQuery] = createSignal('');

    const handleSearch = (e: Event) => {
        e.preventDefault();
        alert(`Searching for: ${searchQuery()}`);
        // In a real app, redirect to the help center search results
    };

    return (
        <div class="flex flex-col gap-8 w-full max-w-4xl">
            {/* Header */}
            <div class="flex items-center gap-4 pb-2 border-b border-gray-300">
                <MessageIcon />
                <h2 class="text-2xl font-medium [#1376A1]">Help Center</h2>
            </div>

            {/* Subtitle */}
            <p class="text-base font-normal text-gray-700">
                Find answers to your questions, troubleshooting steps, and
                guides.
            </p>

            {/* Search Bar (Matching input style) */}
            <form
                onSubmit={handleSearch}
                class="flex items-stretch gap-4 w-full"
            >
                <div class="flex-grow flex items-center p-3 border border-gray-300 rounded-lg bg-gray-50 focus-within:border-blue-700 focus-within:ring-1 focus-within:ring-blue-700 transition-all">
                    <SearchIcon />
                    <input
                        type="search"
                        value={searchQuery()}
                        onInput={(e) => setSearchQuery(e.currentTarget.value)}
                        placeholder="Search for 'Two-factor authentication' or 'Billing'"
                        class="w-full bg-transparent outline-none text-base text-gray-700 placeholder-gray-500 ml-3"
                    />
                </div>
                <button
                    type="submit"
                    class="py-3 px-6 bg-[#1376A1] text-white font-semibold rounded-lg shadow-md hover:bg-blue-800 transition-colors text-base flex-shrink-0"
                >
                    Search
                </button>
            </form>

            {/* Quick Links */}
            <div class="flex flex-col gap-4">
                <h3 class="text-xl font-medium text-[#1376A1]">
                    Popular Topics
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <QuickLink
                        title="Billing & Invoicing"
                        subtitle="How to view and download your monthly statements."
                    />
                    <QuickLink
                        title="Security & Access"
                        subtitle="Everything about 2FA, password resets, and sessions."
                    />
                    <QuickLink
                        title="Getting Started"
                        subtitle="A beginner's guide to setting up your first account."
                    />
                </div>
            </div>
        </div>
    );
};
