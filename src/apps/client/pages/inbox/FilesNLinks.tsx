import { createSignal, For, Show } from 'solid-js';

// --- ICONS ---
const Icons = {
    // Custom icon for Files and Links Title
    filesLinks: (
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
    chevronUp: (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
    ),
    // Icon for Link Card (World/Globe)
    link: (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="#1376A1"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="2" y1="12" x2="22" y2="12"></line>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
        </svg>
    ),
    // Icon for File Card (Document)
    file: (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="#697586"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
            <polyline points="13 2 13 9 20 9"></polyline>
        </svg>
    ),
};

// --- DATA MOCKUP ---
const fileAndLinkData = [
    {
        id: 1,
        type: 'link',
        name: 'Https://www.linkedin.com/in/...',
        author: 'James Carter',
        date: '12/10/25',
    },
    {
        id: 2,
        type: 'link',
        name: 'Https://www.linkedin.com/in/...',
        author: 'Stanley Agu',
        date: '12/10/25',
    },
    {
        id: 3,
        type: 'link',
        name: 'Https://www.youtube.com/watch?v=...',
        author: 'Ibrahim Rasaq',
        date: '12/10/25',
    },
    {
        id: 4,
        type: 'file',
        name: 'Kitchen image and s...',
        size: '4MB',
        date: '12/10/25',
    },
    {
        id: 5,
        type: 'file',
        name: 'Roofing project plan v3',
        size: '1.2MB',
        date: '10/05/25',
    },
    {
        id: 6,
        type: 'file',
        name: 'Invoice Q4-2025.pdf',
        size: '230KB',
        date: '09/20/25',
    },
];

// --- CARD COMPONENTS ---

const LinkItemCard = (props: (typeof fileAndLinkData)[0]) => (
    // Card Container: [padding: 12px; background: #F8FAFC; border-radius: 8px; gap: 16px]
    <div class="w-full p-3 bg-gray-50 hover:bg-gray-100 rounded-lg flex items-center gap-4 cursor-pointer transition-colors">
        {/* Icon/Thumbnail: [width: 70px; height: 70px; background: #E3E8EF] */}
        <div class="w-[70px] h-[70px] bg-gray-200 rounded-lg flex items-center justify-center">
            <div class="w-8 h-8">{Icons.link}</div>
        </div>

        {/* Text Details */}
        <div class="flex flex-col flex-grow min-w-0">
            {/* Link URL: [color: #1376A1; font-size: 16px] - using truncate to handle long links */}
            <div class="text-base text-blue-700 truncate">{props.name}</div>

            {/* Metadata: [color: #697586; font-size: 14px] */}
            <div class="flex justify-between items-center mt-1 text-sm text-gray-600">
                <div>{props.author}</div>
                <div>{props.date}</div>
            </div>
        </div>
    </div>
);

const FileItemCard = (props: (typeof fileAndLinkData)[0]) => (
    // Card Container: [padding: 12px; background: #F8FAFC; border-radius: 8px; gap: 16px]
    <div class="w-full p-3 bg-gray-50 hover:bg-gray-100 rounded-lg flex items-center gap-4 cursor-pointer transition-colors">
        {/* Icon/Thumbnail: [width: 70px; height: 70px; background: #E3E8EF] */}
        <div class="w-[70px] h-[70px] bg-gray-200 rounded-lg flex items-center justify-center">
            <div class="w-8 h-8">{Icons.file}</div>
        </div>

        {/* Text Details */}
        <div class="flex flex-col flex-grow min-w-0">
            {/* File Name and Size: [color: #202939; font-size: 16px] */}
            <div class="flex justify-between items-center">
                <div class="text-base text-gray-900 font-normal truncate">
                    {props.name}
                </div>
                <div class="text-sm text-gray-600 ml-4 flex-shrink-0">
                    {props.size}
                </div>
            </div>

            {/* Date: [color: #697586; font-size: 14px] */}
            <div class="text-sm text-gray-600 text-right mt-1">
                {props.date}
            </div>
        </div>
    </div>
);

// --- TAB BUTTON COMPONENT ---
const TabButton = (props: {
    label: string;
    active: boolean;
    onClick: () => void;
}) => (
    <button
        onClick={props.onClick}
        class={`
            py-2 px-5 text-base font-normal transition-all duration-150 relative
            ${
                props.active
                    ? 'text-blue-700 border-b-[2px] border-blue-700'
                    : 'text-gray-700 hover:text-gray-900'
            }
        `}
    >
        {props.label}
    </button>
);

// --- 2. Main FilesAndLinksView Component ---
export const FilesAndLinksView = (props: { onBack: () => void }) => {
    const [activeTab, setActiveTab] = createSignal<'all' | 'files' | 'links'>(
        'all'
    );

    const filteredResults = () => {
        if (activeTab() === 'files') {
            return fileAndLinkData.filter((item) => item.type === 'file');
        }
        if (activeTab() === 'links') {
            return fileAndLinkData.filter((item) => item.type === 'link');
        }
        return fileAndLinkData; // 'all'
    };

    return (
        // Outer Container: Responsive, full-height, scrollable
        <div class="h-full w-full flex flex-col bg-white border border-gray-200 rounded-lg p-4 shadow-lg">
            {/* --- Header --- */}
            <div class="flex justify-between items-center pb-4 flex-shrink-0">
                <div class="flex items-center gap-3">
                    {/* Title and Icon: [width: 28px; height: 28px] */}
                    <div class="w-7 h-7 text-gray-700">{Icons.filesLinks}</div>
                    <div class="text-base font-medium text-gray-900">
                        Files and links
                    </div>
                </div>
                {/* Collapse Button */}
                <button
                    class="p-1 rounded-full text-gray-600 hover:bg-gray-100 transition-colors"
                    onClick={props.onBack}
                >
                    <div class="w-5 h-5">{Icons.chevronUp}</div>
                </button>
            </div>

            {/* --- Search Input (Creative: Using full rounded pill style) --- */}
            <div class="w-full p-3 mb-6 bg-gray-50 border border-gray-300 rounded-full flex items-center gap-3 flex-shrink-0">
                <div class="w-5 h-5 text-gray-500">{Icons.search}</div>
                <input
                    type="text"
                    placeholder="Search files or links..."
                    class="text-base text-gray-700 focus:outline-none w-full bg-transparent"
                />
            </div>

            {/* --- Tab Navigation --- */}
            <div class="flex w-full border-b border-gray-300 mb-6 flex-shrink-0">
                <TabButton
                    label="All"
                    active={activeTab() === 'all'}
                    onClick={() => setActiveTab('all')}
                />
                <TabButton
                    label="Files"
                    active={activeTab() === 'files'}
                    onClick={() => setActiveTab('files')}
                />
                <TabButton
                    label="Links"
                    active={activeTab() === 'links'}
                    onClick={() => setActiveTab('links')}
                />
            </div>

            {/* --- Results List (Scrollable Area) --- */}
            <div class="flex flex-col gap-4 overflow-y-auto flex-grow pb-4">
                <For each={filteredResults()}>
                    {(item) => (
                        <Show
                            when={item.type === 'link'}
                            fallback={<FileItemCard {...item} />}
                        >
                            <LinkItemCard {...item} />
                        </Show>
                    )}
                </For>
            </div>
        </div>
    );
};
