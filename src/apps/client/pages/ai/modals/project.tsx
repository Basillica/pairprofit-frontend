import { Accessor, For, Setter, Show } from 'solid-js';
import { Portal } from 'solid-js/web';

// --- ICONS ---
// Close Icon for Modal Header
const CloseIcon = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="w-7 h-7 text-gray-900"
    >
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

// Informational Icon for Project Info Box
const InfoIcon = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="#364152"
        stroke-width="0.67"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="w-6 h-6"
    >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm0-8a1 1 0 0 1 1 1v4a1 1 0 0 1-2 0V10a1 1 0 0 1 1-1z"></path>
    </svg>
);

// --- CATEGORY ICONS (Simplified from user's provided structure) ---

const GeneralServicesIcon = () => (
    <div class="relative w-6 h-6">
        <div class="absolute w-4 h-2.5 left-[3.77px] top-[2.5px] bg-[#CD8200] opacity-25"></div>
        <div class="absolute w-2.5 h-3.5 left-[3.5px] top-[7.24px] bg-[#CD8200] opacity-50"></div>
        <div class="absolute w-2.5 h-3.5 left-[12px] top-[7.24px] bg-[#CD8200]"></div>
    </div>
);

const HomeRepairsIcon = () => (
    <div class="relative w-6 h-6">
        <div class="absolute w-5 h-2.5 left-[1.83px] top-[2.12px] bg-[#ED6C31]"></div>
        <div class="absolute w-4.5 h-4 left-[3.5px] top-[4.37px] bg-[#FFF3E1]"></div>
        <div class="absolute w-4.5 h-1.5 left-[3.18px] top-[12.75px] bg-[#5F4E47]"></div>
    </div>
);

const RenovationsIcon = () => (
    <div class="relative w-6 h-6">
        <div class="absolute w-full h-full left-[0.96px] top-[1.1px] bg-gray-900 rounded-full"></div>
    </div>
);

const EventPlanningIcon = () => (
    <div class="relative w-6 h-6">
        <div class="absolute w-5 h-2.5 left-[1.2px] top-[4.31px] bg-[#42ADE2]"></div>
        <div class="absolute w-2 h-2 left-[2.69px] top-[7.64px] bg-[#FF8736] rounded-full"></div>
        <div class="absolute w-3 h-3 left-[9.41px] top-[7.65px] bg-[#FF8736] rounded-full"></div>
    </div>
);

const OthersIcon = () => (
    <div class="relative w-6 h-6">
        <div class="absolute w-4 h-4 left-[4px] top-[4px] bg-gray-900 rounded-full"></div>
    </div>
);

// --- MODAL COMPONENTS ---

const CategoryChip = (props: { icon: any; label: string }) => (
    <div class="flex-shrink-0 py-3 px-4 border border-gray-300 rounded-full flex items-center gap-2 hover:bg-gray-50 transition-colors cursor-pointer">
        {props.icon}
        <div class="text-sm font-normal text-gray-900">{props.label}</div>
    </div>
);

export const CreateProjectModal = (props: {
    onClose: () => void;
    onCreate: () => void;
    isOpen: Accessor<boolean>;
    closeModal: Setter<boolean>;
}) => {
    if (!props.isOpen) return null;

    const categories = [
        { icon: <GeneralServicesIcon />, label: 'General services' },
        { icon: <HomeRepairsIcon />, label: 'Home repairs' },
        { icon: <RenovationsIcon />, label: 'Renovations' },
        { icon: <EventPlanningIcon />, label: 'Event planning' },
        { icon: <OthersIcon />, label: 'Others' },
        // Added extra items to test horizontal scroll
        { icon: <GeneralServicesIcon />, label: 'Landscaping' },
        { icon: <HomeRepairsIcon />, label: 'Plumbing' },
    ];

    return (
        // Modal Backdrop: Fixed, full screen, dark overlay
        <Portal>
            <Show when={props.isOpen()}>
                <div
                    class="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 p-4 transition-opacity"
                    classList={{
                        'modal-overlay': true,
                        active: props.isOpen(),
                    }}
                >
                    {/* Modal Content: Responsive sizing and scroll handling */}
                    <div
                        class="w-full max-w-sm md:max-w-xl bg-white rounded-2xl flex flex-col max-h-[90vh] overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Scrollable Modal Body */}
                        <div class="flex flex-col gap-6 p-6 md:p-8 overflow-y-auto">
                            {/* Header */}
                            <div class="flex justify-between items-center w-full">
                                <h2 class="text-2xl font-medium text-gray-900">
                                    Project name
                                </h2>
                                <button
                                    class="p-1 rounded-full hover:bg-gray-100"
                                    onClick={props.onClose}
                                >
                                    <CloseIcon />
                                </button>
                            </div>

                            {/* Content Section */}
                            <div class="flex flex-col gap-8 w-full">
                                {/* 1. Project Name Input and Category Chips */}
                                <div class="flex flex-col gap-4 w-full">
                                    {/* Input Field */}
                                    <input
                                        type="text"
                                        placeholder="Office renovation"
                                        class="w-full py-3 px-4 border border-gray-300 rounded-lg text-base text-gray-700 placeholder-gray-500 focus:border-blue-700 focus:ring-1 focus:ring-blue-700 outline-none transition-shadow"
                                    />

                                    {/* Scrollable Category List */}
                                    <div class="flex flex-row gap-3 overflow-x-auto pb-2 -mr-8 pr-8">
                                        <For each={categories}>
                                            {(category) => (
                                                <CategoryChip
                                                    icon={category.icon}
                                                    label={category.label}
                                                />
                                            )}
                                        </For>
                                    </div>
                                </div>

                                {/* 2. Informational Box */}
                                <div class="flex flex-col gap-5 w-full">
                                    <div class="flex items-center gap-4 p-3 md:p-4 bg-gray-50 rounded-lg">
                                        <div class="flex-shrink-0">
                                            <InfoIcon />
                                        </div>
                                        <div class="text-sm font-normal text-gray-600">
                                            Projects keep chats, and custom
                                            instructions in one place. Use them
                                            for ongoing work just to keep things
                                            tidy.
                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    <div class="flex justify-end w-full">
                                        <button
                                            onClick={props.onCreate}
                                            class="py-3 px-6 bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:bg-blue-800 transition-colors text-base"
                                        >
                                            Create project
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Show>
        </Portal>
    );
};
