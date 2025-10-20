import { createSignal, Show, type Component } from 'solid-js';
import { createEffect, onCleanup } from 'solid-js';

type JobStatus = 'Completed' | 'In progress' | 'Ongoing';
type JobAction = 'View' | 'Message' | 'Cancel';

interface Job {
    id: number;
    title: string;
    category: string;
    location: string;
    dueDate: string;
    budget: string;
    status: JobStatus;
}
const STATUS_COLORS: Record<
    JobStatus,
    { text: string; bg: string; border: string }
> = {
    Completed: {
        // Custom green color used for text
        text: 'text-[#34A853]',
        // Custom light green alpha background
        bg: 'bg-[#34a85324]',
        // Custom border color (using a lighter primary green for simplicity)
        border: 'border-[#34A853]',
    },
    'In progress': {
        // Custom yellow color used for text
        text: 'text-[#FBBC05]',
        // Custom light yellow alpha background
        bg: 'bg-[#fbbc051f]',
        // Custom border color (using a lighter primary yellow for simplicity)
        border: 'border-[#FBBC05]',
    },
    Ongoing: {
        // Custom primary blue color used for text
        text: 'text-[#1E90FF]',
        // Using a light blue background for ongoing, despite the user's HTML suggesting green
        bg: 'bg-blue-50',
        // Custom border color
        border: 'border-[#1E90FF]',
    },
};

// Optional: You can reuse an Icon component (like the ChevronDown or a simple three-dot icon) here
const Icons = {
    Location: (props: { class?: string }) => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class={props.class}
            viewBox="0 0 20 20"
            fill="currentColor"
        >
            <path
                fill-rule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clip-rule="evenodd"
            />
        </svg>
    ),
    Calendar: (props: { class?: string }) => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class={props.class}
            viewBox="0 0 20 20"
            fill="currentColor"
        >
            <path
                fill-rule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clip-rule="evenodd"
            />
        </svg>
    ),
    Money: (props: { class?: string }) => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class={props.class}
            viewBox="0 0 20 20"
            fill="currentColor"
        >
            <path d="M8.433 7.417c-.312-.112-.655-.167-1.025-.167-.84 0-1.52.336-1.52 1.393v.81c0 1.057.68 1.393 1.52 1.393.37 0 .713-.055 1.025-.167m-1.558-.002c-.08-.057-.152-.102-.218-.142-.315-.192-.477-.492-.477-.852 0-.36.162-.66.477-.852.066-.04.138-.085.218-.142.115-.082.253-.178.414-.298.158-.117.33-.23.513-.348.423-.27.88-.417 1.347-.417.88 0 1.58.337 1.58 1.394v.81c0 1.057-.7 1.393-1.58 1.393-.467 0-.924-.147-1.347-.417-.183-.118-.355-.23-.513-.348-.16-.12-.298-.216-.414-.298z" />
            <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" />
        </svg>
    ),
    MenuDots: (props: { class?: string }) => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class={props.class}
            viewBox="0 0 20 20"
            fill="currentColor"
        >
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
        </svg>
    ),
};

interface ActionButtonMenuProps {
    // Optional: Function to handle when an action is selected
    onActionSelect: (action: 'View' | 'Message' | 'Cancel') => void;
}

// --- Menu Button Sub-Component ---
interface MenuButtonProps {
    onClick: () => void;
    text: string;
    isDestructive?: boolean;
}

const MenuButton: Component<MenuButtonProps> = (props) => {
    return (
        <button
            onClick={props.onClick}
            // Styling matches the original HTML: full width, padding, rounded, with hover effect.
            class={`
        w-full text-left px-3 py-2 rounded-lg text-sm font-normal transition-colors
        ${
            props.isDestructive
                ? 'text-red-600 hover:bg-red-50'
                : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-700'
        }
      `}
        >
            {props.text}
        </button>
    );
};

const ActionButtonMenu: Component<ActionButtonMenuProps> = (props) => {
    const [isOpen, setIsOpen] = createSignal(false);

    // Ref to the root container of the button and menu
    let containerRef: HTMLDivElement | undefined;

    // Toggle function for the button
    const toggleMenu = () => setIsOpen((prev) => !prev);

    // Action handler that closes the menu
    const handleAction = (action: 'View' | 'Message' | 'Cancel') => {
        props.onActionSelect(action);
        setIsOpen(false);
    };

    // --- Click-Away Logic ---
    createEffect(() => {
        if (isOpen()) {
            const handleClickOutside = (e: MouseEvent) => {
                if (containerRef && !containerRef.contains(e.target as Node)) {
                    setIsOpen(false);
                }
            };
            document.addEventListener('mousedown', handleClickOutside);
            onCleanup(() => {
                document.removeEventListener('mousedown', handleClickOutside);
            });
        }
    });

    return (
        // 1. RELATIVE container for the button and absolutely positioned menu
        <div ref={containerRef} class="relative inline-block z-30">
            {/* The Trigger Button */}
            <button
                onClick={toggleMenu}
                class="p-2 rounded-full text-gray-700 bg-white hover:bg-gray-100 border border-gray-300 transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-expanded={isOpen()}
            >
                <Icons.MenuDots class="w-5 h-5" />
            </button>

            {/* 2. The Dropdown Menu */}
            <Show when={isOpen()}>
                <div
                    // 3. Absolute positioning relative to the RELATIVE parent.
                    // right-0: aligns the right edge of the menu with the right edge of the button.
                    // mt-2: margin from the button.
                    // origin-top-right: sets the transform origin for scaling (optional but nice for animations).
                    // z-40: ensures it sits above most page content.
                    class="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl ring-1 ring-black ring-opacity-5 
                 focus:outline-none p-2 space-y-1 origin-top-right"
                >
                    {/* Menu Items */}
                    <MenuButton
                        onClick={() => handleAction('View')}
                        text="View"
                    />
                    <MenuButton
                        onClick={() => handleAction('Message')}
                        text="Message"
                    />
                    <MenuButton
                        onClick={() => handleAction('Cancel')}
                        text="Cancel"
                        isDestructive
                    />
                </div>
            </Show>
        </div>
    );
};

export const JobItemCard: Component<{ job: Job }> = (props) => {
    const color = STATUS_COLORS[props.job.status];

    const handleAction = (action: JobAction) => {
        console.log(`Job ID ${props.job.id}: ${action} selected.`);
        alert(`Job ${props.job.id} - Action: ${action}`);
    };

    return (
        <div
            class={`
        w-full bg-white p-5 rounded-lg shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center 
        cursor-pointer hover:shadow-md transition-shadow border-l-4 ${color.border}
      `}
        >
            <div class="flex-1 min-w-0 pr-4 mb-3 md:mb-0">
                <div class="mb-2">
                    <div class="text-lg font-semibold text-slate-800 leading-snug truncate">
                        {props.job.title}
                    </div>
                    <div class="text-sm text-gray-500 font-normal leading-snug">
                        {props.job.category}
                    </div>
                </div>

                {/* Job Metadata (Location, Due Date, Budget) */}
                <div class="flex flex-wrap items-center text-sm text-gray-600 gap-x-4 gap-y-1">
                    <div class="flex items-center space-x-2">
                        <Icons.Location class="w-4 h-4 text-gray-400" />
                        <span class="font-medium text-slate-800">
                            {props.job.location}
                        </span>
                    </div>

                    <div class="flex items-center space-x-2">
                        <Icons.Calendar class="w-4 h-4 text-gray-400" />
                        <span class="text-gray-500 font-normal">Due date:</span>
                        <span class="font-medium text-slate-800">
                            {props.job.dueDate}
                        </span>
                    </div>

                    <div class="flex items-center space-x-2">
                        <Icons.Money class="w-4 h-4 text-gray-400" />
                        <span class="text-gray-500 font-normal">Budget:</span>
                        <span class="font-medium text-slate-800">
                            {props.job.budget}
                        </span>
                    </div>
                </div>
            </div>

            {/* Status Badge and Action Menu */}
            <div class="flex items-center space-x-4 ml-auto mt-3 md:mt-0">
                {/* Status Badge */}
                <div
                    class={`py-1 px-3 ${color.bg} rounded-full inline-flex justify-center items-center`}
                >
                    <div
                        class={`text-xs font-semibold leading-snug ${color.text}`}
                    >
                        {props.job.status}
                    </div>
                </div>

                {/* Action Menu */}
                <ActionButtonMenu onActionSelect={handleAction} />
            </div>
        </div>
    );
};
