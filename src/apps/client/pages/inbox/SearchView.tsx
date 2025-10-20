import { For, createSignal, createMemo } from 'solid-js';

// --- ICONS ---
const Icons = {
    timeline: (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
    ),
    search: (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
    ),
    profile: (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
        </svg>
    ),
    files: (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <path d="M15 7h3a5 5 0 0 1 5 5 5 5 0 0 1-5 5h-3m-6 0H6a5 5 0 0 1-5-5 5 5 0 0 1 5-5h3"></path>
            <line x1="8" y1="12" x2="16" y2="12"></line>
        </svg>
    ),
    back: (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
    ),
    clear: (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="15" y1="9" x2="9" y2="15"></line>
            <line x1="9" y1="9" x2="15" y2="15"></line>
        </svg>
    ),
};

// --- Search Data (Now plain text) ---
const searchResults = [
    {
        name: 'James Carter',
        date: 'Oct 16, 2025 8:...',
        text: '...project kitchen sink leaking from the pipe underneath: Water drips when tap is off.',
        profileImg: `https://picsum.photos/200?random=${Math.random()}`,
    },
    {
        name: 'James Carter',
        date: 'Oct 16, 2025 8:...',
        text: 'We need to check the plumbing under the kitchen before installing the new faucet.',
        profileImg: `https://picsum.photos/200?random=${Math.random()}`,
    },
    {
        name: 'James Carter',
        date: 'Oct 16, 2025 8:...',
        text: 'The initial quote for the kitchen cabinet installation seems too high.',
        profileImg: `https://picsum.photos/200?random=${Math.random()}`,
    },
    {
        name: 'James Carter',
        date: 'Oct 16, 2025 8:...',
        text: 'I have uploaded the floor plans for the new kitchen layout.',
        profileImg: `https://picsum.photos/200?random=${Math.random()}`,
    },
    {
        name: 'James Carter',
        date: 'Oct 15, 2025 1:...',
        text: 'Just confirming the appliance models for the kitchen.',
        profileImg: `https://picsum.photos/200?random=${Math.random()}`,
    },
    {
        name: 'You',
        date: 'Oct 15, 2025 10:...',
        text: 'I will review the new kitchen layout this afternoon.',
        profileImg: `https://picsum.photos/200?random=${Math.random()}`,
    },
];

const HighlightedText = (props: { fullText: string; keyword: string }) => {
    const keyword = props.keyword.trim();

    // Base Case: No keyword, just return the raw text
    if (!keyword) {
        return (
            <div
                class="text-base text-gray-700 font-normal leading-relaxed whitespace-pre-wrap"
                style={{ width: '280px' }}
            >
                {props.fullText}
            </div>
        );
    }

    // Split the text case-insensitively using a RegExp, keeping the keyword match in the parts array
    const regex = new RegExp(`(${keyword})`, 'gi');
    const parts = props.fullText.split(regex).filter((p) => p.length > 0);

    const baseClass =
        'text-base text-gray-700 font-normal leading-relaxed whitespace-pre-wrap';
    const highlightClass = 'text-blue-700 font-medium';

    return (
        <div class={baseClass} style={{ width: '280px' }}>
            <For each={parts}>
                {(part) => {
                    // Check if the current part is the keyword (case-insensitive)
                    const isKeyword =
                        part.toLowerCase() === keyword.toLowerCase();
                    return (
                        <span class={isKeyword ? highlightClass : ''}>
                            {part}
                        </span>
                    );
                }}
            </For>
        </div>
    );
};

// --- Search Result Card Component ---
const SearchResultCard = (props: {
    name: string;
    date: string;
    rawText: string;
    keyword: string;
    profileImg: string;
}) => {
    return (
        <div class="w-full p-3 border border-gray-300 rounded-lg flex flex-col gap-3 cursor-pointer hover:bg-gray-50 transition-colors">
            <div class="flex items-center gap-4">
                <img
                    class="w-[60px] h-[60px] rounded-full object-cover flex-shrink-0"
                    src={props.profileImg}
                    alt={`${props.name} Avatar`}
                />
                <div class="flex items-center gap-4">
                    <div class="text-base font-medium text-gray-900">
                        {props.name}
                    </div>
                    <div class="text-xs text-gray-600">{props.date}</div>
                </div>
            </div>
            <div class="pl-[6px]">
                <HighlightedText
                    fullText={props.rawText}
                    keyword={props.keyword}
                />
            </div>
        </div>
    );
};

const EmptyMessages = () => {
    return (
        <div style="flex-direction: column; justify-content: flex-start; align-items: center; gap: 20px; display: inline-flex; margin-top: 220px">
            <svg
                width="80"
                height="80"
                viewBox="0 0 80 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M73.3332 20.8332V37.8331C73.3332 42.0664 71.9332 45.6331 69.4332 48.0998C66.9665 50.5998 63.3998 51.9998 59.1665 51.9998V58.0331C59.1665 60.2998 56.6331 61.6665 54.7665 60.3998L51.5332 58.2664C51.8332 57.2331 51.9665 56.0997 51.9665 54.8997V41.3333C51.9665 34.5333 47.4332 29.9998 40.6332 29.9998H17.9998C17.5332 29.9998 17.0998 30.0332 16.6665 30.0666V20.8332C16.6665 12.3332 22.3332 6.6665 30.8332 6.6665H59.1665C67.6665 6.6665 73.3332 12.3332 73.3332 20.8332Z"
                    stroke="#697586"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
                <path
                    d="M51.9665 41.3334V54.8999C51.9665 56.0999 51.8332 57.2333 51.5332 58.2666C50.2999 63.1666 46.2332 66.2333 40.6332 66.2333H31.5665L21.4998 72.9333C19.9998 73.9667 17.9998 72.8667 17.9998 71.0667V66.2333C14.5998 66.2333 11.7665 65.1 9.79985 63.1333C7.79985 61.1333 6.6665 58.2999 6.6665 54.8999V41.3334C6.6665 35.0001 10.5998 30.6334 16.6665 30.0667C17.0998 30.0334 17.5331 30 17.9998 30H40.6332C47.4332 30 51.9665 34.5334 51.9665 41.3334Z"
                    stroke="#697586"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
            </svg>

            <div style="align-self: stretch; flex-direction: column; justify-content: flex-start; align-items: center; gap: 8px; display: flex">
                <div style="align-self: stretch; text-align: center; color: #364152; font-size: 18px; font-family: Geist; font-weight: 500; line-height: 28.80px; word-wrap: break-word">
                    Search messages
                </div>
                <div style="align-self: stretch; text-align: center; color: #364152; font-size: 14px; font-family: Geist; font-weight: 400; line-height: 22.40px; word-wrap: break-word">
                    between you and James Carter in conversation
                </div>
            </div>
        </div>
    );
};

// --- SearchMessagesView Component ---
export const SearchMessagesView = (props: { onBack: () => void }) => {
    // State to hold the current search input value
    const [searchText, setSearchText] = createSignal('kitchen');

    // Function to clear the input
    const clearSearch = () => setSearchText('');

    // Memoized signal for the filtered list (ensures efficient re-rendering)
    const filteredResults = createMemo(() => {
        const query = searchText().toLowerCase().trim();

        // If the query is empty, return all results
        if (!query) {
            return searchResults;
        }

        // Filter: Keep results where the message text includes the query
        return searchResults.filter((result) =>
            result.text.toLowerCase().includes(query)
        );
    });

    return (
        <div class="h-full w-full flex flex-col bg-white border border-gray-200 rounded-lg p-4 shadow-lg">
            {/* Header (Unchanged) */}
            <div class="flex justify-between items-center pb-4 mb-4 border-b border-gray-100 flex-shrink-0">
                <div class="flex items-center gap-3">
                    <div class="w-6 h-6 flex items-center justify-center text-gray-700">
                        {Icons.search}
                    </div>
                    <div class="text-lg font-semibold text-gray-900">
                        Search Messages
                    </div>
                    {Icons.search}
                </div>
                <button
                    onClick={props.onBack}
                    class="p-1 rounded-full text-gray-600 hover:bg-gray-100 transition-colors"
                    title="Go Back"
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
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                </button>
            </div>

            {/* Search Input Field (Now controlled and interactive) */}
            <div class="w-full p-3 rounded-lg border border-gray-900 flex justify-between items-center mb-6 flex-shrink-0">
                <div class="flex items-center gap-3 w-full">
                    <div class="w-5 h-5 text-gray-700">{Icons.search}</div>
                    <input
                        type="text"
                        value={searchText()} // 👈 Controlled Input
                        onInput={(e) => setSearchText(e.currentTarget.value)} // 👈 Update state on typing
                        class="text-base font-medium text-gray-900 focus:outline-none w-full bg-transparent"
                        placeholder="Type to search..."
                    />
                    {/* Cancel (X) Button */}
                    <button
                        class="w-6 h-6 cursor-pointer"
                        type="reset"
                        onClick={clearSearch}
                    >
                        <span class="w-8 h-8 text-xl text-red-600 font-semibold flex items-center justify-center cursor-pointer">
                            <svg
                                width="32"
                                height="32"
                                viewBox="0 0 32 32"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M12 22c5.5 0 10-4.5 10-10S17.5 2 12 2 2 6.5 2 12s4.5 10 10 10m-2.83-7.17 5.66-5.66m0 5.66L9.17 9.17"
                                    stroke="#121926"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </svg>
                        </span>
                    </button>
                </div>
            </div>

            {/* Search Results List (SCROLLABLE AREA) */}
            {filteredResults().length === 0 && <EmptyMessages />}

            <div class="flex flex-col gap-4 overflow-y-auto flex-grow pb-4">
                {/* Renders the results from the computed signal */}
                <For each={filteredResults()}>
                    {(result) => (
                        <SearchResultCard
                            name={result.name}
                            date={result.date}
                            rawText={result.text}
                            keyword={searchText()} // 👈 Pass the active search text for highlighting
                            profileImg={result.profileImg}
                        />
                    )}
                </For>
            </div>
        </div>
    );
};
