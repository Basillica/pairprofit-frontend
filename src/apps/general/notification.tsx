import {
    createSignal,
    For,
    Show,
    type Component,
    createEffect,
    onCleanup,
} from 'solid-js';

type NotificationType = 'proposal' | 'message';

interface Notification {
    id: number;
    type: NotificationType;
    title: string;
    time: string;
    isNew: boolean;
}

// --- Utility Icons (Replacing FA and colored blocks) ---
const Icons = {
    Bell: (props: { class?: string }) => (
        // Simple Bell icon for the trigger button
        <svg
            width="18"
            height="19"
            viewBox="0 0 18 19"
            class={props.class}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M9.01501 2.68262C6.53251 2.68262 4.515 4.70012 4.515 7.18262V9.35012C4.515 9.80762 4.32 10.5051 4.0875 10.8951L3.225 12.3276C2.6925 13.2126 3.06 14.1951 4.035 14.5251C7.2675 15.6051 10.755 15.6051 13.9875 14.5251C14.895 14.2251 15.2925 13.1526 14.7975 12.3276L13.935 10.8951C13.71 10.5051 13.515 9.80762 13.515 9.35012V7.18262C13.515 4.70762 11.49 2.68262 9.01501 2.68262Z"
                stroke="#697586"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
            />
            <path
                d="M10.4025 2.90008C10.17 2.83258 9.93 2.78008 9.6825 2.75008C8.9625 2.66008 8.2725 2.71258 7.6275 2.90008C7.845 2.34508 8.385 1.95508 9.015 1.95508C9.645 1.95508 10.185 2.34508 10.4025 2.90008Z"
                stroke="#697586"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M11.265 14.7949C11.265 16.0324 10.2525 17.0449 9.01501 17.0449C8.40001 17.0449 7.83001 16.7899 7.42501 16.3849C7.02001 15.9799 6.76501 15.4099 6.76501 14.7949"
                stroke="#697586"
                stroke-width="1.5"
                stroke-miterlimit="10"
            />
        </svg>
    ),
    Proposal: (props: { class?: string }) => (
        // Green square for Proposal (Var(--Green, #34A853))
        <svg
            width="32"
            height="33"
            viewBox="0 0 32 33"
            class={props.class}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M26 8.5H21.3333V7.16667C21.3323 6.45975 21.051 5.78208 20.5511 5.28222C20.0512 4.78235 19.3736 4.50106 18.6667 4.5H13.3333C12.6264 4.50106 11.9487 4.78235 11.4489 5.28222C10.949 5.78208 10.6677 6.45975 10.6667 7.16667V8.5H5.99999C5.11593 8.5 4.26809 8.85119 3.64297 9.47631C3.01785 10.1014 2.66666 10.9493 2.66666 11.8333V25.1667C2.66666 26.0507 3.01785 26.8986 3.64297 27.5237C4.26809 28.1488 5.11593 28.5 5.99999 28.5H26C26.884 28.5 27.7319 28.1488 28.357 27.5237C28.9821 26.8986 29.3333 26.0507 29.3333 25.1667V11.8333C29.3333 10.9493 28.9821 10.1014 28.357 9.47631C27.7319 8.85119 26.884 8.5 26 8.5ZM12 7.16667C12 6.81304 12.1405 6.47391 12.3905 6.22386C12.6406 5.97381 12.9797 5.83333 13.3333 5.83333H18.6667C19.0203 5.83333 19.3594 5.97381 19.6095 6.22386C19.8595 6.47391 20 6.81304 20 7.16667V8.5H12V7.16667ZM28 25.1667C28 25.6971 27.7893 26.2058 27.4142 26.5809C27.0391 26.956 26.5304 27.1667 26 27.1667H5.99999C5.46956 27.1667 4.96085 26.956 4.58578 26.5809C4.2107 26.2058 3.99999 25.6971 3.99999 25.1667V16.536L11.7893 19.1333C11.8573 19.1557 11.9284 19.1669 12 19.1667H20C20.0715 19.1669 20.1427 19.1557 20.2107 19.1333L28 16.536V25.1667ZM28 15.1747C27.9288 15.1722 27.8577 15.1812 27.7893 15.2013L19.892 17.8333H12.108L4.21066 15.2C4.14231 15.1799 4.07119 15.1709 3.99999 15.1733V11.8333C3.99999 11.3029 4.2107 10.7942 4.58578 10.4191C4.96085 10.044 5.46956 9.83333 5.99999 9.83333H26C26.5304 9.83333 27.0391 10.044 27.4142 10.4191C27.7893 10.7942 28 11.3029 28 11.8333V15.1747Z"
                fill="#34A853"
            />
        </svg>
    ),
    Message: (props: { class?: string }) => (
        // Purple circle for Message (Var(--Purple, #9E07DF))
        <svg
            width="32"
            height="33"
            class={props.class}
            viewBox="0 0 32 33"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M3.99999 27.9533L8.78666 23.1667H24C24.7072 23.1667 25.3855 22.8857 25.8856 22.3856C26.3857 21.8855 26.6667 21.2072 26.6667 20.5V8.5C26.6667 7.79276 26.3857 7.11448 25.8856 6.61438C25.3855 6.11428 24.7072 5.83333 24 5.83333H6.66666C5.95941 5.83333 5.28114 6.11428 4.78104 6.61438C4.28094 7.11448 3.99999 7.79276 3.99999 8.5V27.9533ZM3.99999 29.8333H2.66666V8.5C2.66666 7.43913 3.08808 6.42172 3.83823 5.67157C4.58838 4.92143 5.60579 4.5 6.66666 4.5H24C25.0609 4.5 26.0783 4.92143 26.8284 5.67157C27.5786 6.42172 28 7.43913 28 8.5V20.5C28 21.5609 27.5786 22.5783 26.8284 23.3284C26.0783 24.0786 25.0609 24.5 24 24.5H9.33332L3.99999 29.8333Z"
                fill="#9E07DF"
            />
        </svg>
    ),
};

const NOTIFICATIONS_DATA: Notification[] = [
    {
        id: 1,
        type: 'proposal',
        title: "Your job post 'Fix kitchen sink leak' has received 3 new proposals.",
        time: '1:27 PM',
        isNew: true,
    },
    {
        id: 2,
        type: 'message',
        title: "Mary Johnson sent you a message regarding 'Bathroom Renovation.'",
        time: '2h ago',
        isNew: false,
    },
    {
        id: 3,
        type: 'message',
        title: "Your electrician proposal for 'House Wiring' was accepted.",
        time: '5h ago',
        isNew: false,
    },
];

const NotificationItem: Component<{ notification: Notification }> = (props) => {
    const isNew = props.notification.isNew;

    const IconComponent = () => {
        if (props.notification.type === 'proposal') {
            return <Icons.Proposal />;
        }
        return <Icons.Message />;
    };

    return (
        <div
            // Added hover state and border to match separation, used padding from original
            class={`
        flex items-start gap-6 p-5 border-b border-gray-200 cursor-pointer z-50
        ${
            isNew
                ? 'bg-indigo-50 hover:bg-indigo-100'
                : 'bg-white hover:bg-gray-50'
        }
      `}
            onClick={() =>
                console.log(`Viewing notification ${props.notification.id}`)
            }
        >
            <div class="shrink-0 pt-1">
                <IconComponent />
            </div>
            <div class="flex flex-col justify-start items-start gap-1 flex-1 min-w-0">
                <div
                    class={`text-base font-medium leading-relaxed ${
                        isNew ? 'text-gray-900' : 'text-gray-700'
                    }`}
                >
                    {props.notification.title}
                </div>
                <div class="text-sm text-gray-500 font-medium leading-relaxed">
                    {props.notification.time}
                </div>
            </div>
        </div>
    );
};

export const NotificationDropdown: Component<{
    app: string;
}> = (props) => {
    const [isOpen, setIsOpen] = createSignal(false);
    let containerRef: HTMLDivElement | undefined;

    const toggleMenu = () => setIsOpen((prev) => !prev);
    const unreadCount = NOTIFICATIONS_DATA.filter((n) => n.isNew).length;

    // --- Click-Away Logic (Reused) ---
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
        // 1. RELATIVE container for the button and the absolute menu
        <div ref={containerRef} class="relative inline-block z-40">
            {/* The Notification Button */}
            <button
                onClick={toggleMenu}
                class="relative p-2 text-gray-600 hover:text-gray-800 transition rounded-full hover:bg-gray-100"
                aria-expanded={isOpen()}
            >
                <Icons.Bell class="w-6 h-6" />
                {/* Unread Badge */}
                {unreadCount > 0 && (
                    <span class="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
                )}
            </button>

            {/* 2. The Dropdown Menu */}
            <Show when={isOpen()}>
                <div
                    // Positioning: Absolute, right-0 to align right edge with button. Wider width.
                    class="absolute right-0 mt-3 w-80 sm:w-96 bg-white rounded-xl shadow-2xl ring-1 ring-black ring-opacity-5 
                 focus:outline-none origin-top-right overflow-hidden z-50"
                >
                    {/* 3. The Triangular Caret/Arrow */}
                    <div
                        class="absolute -top-3 right-5 h-3 w-3 overflow-hidden inline-block"
                        aria-hidden="true"
                    >
                        {/* Inner div rotated 45deg to form a diamond shape */}
                        <div class="h-full w-full bg-white rotate-45 transform origin-bottom-left border-t border-l border-gray-200 shadow-lg"></div>
                    </div>

                    {/* Menu Header (Optional, but good practice) */}
                    <div class="p-4 border-b border-gray-200">
                        <h3 class="text-lg font-semibold text-gray-900">
                            Notifications
                        </h3>
                    </div>

                    {/* Notification List */}
                    <div class="max-h-96 overflow-y-auto">
                        <For each={NOTIFICATIONS_DATA}>
                            {(notification) => (
                                <NotificationItem notification={notification} />
                            )}
                        </For>
                    </div>

                    {/* Menu Footer (Optional) */}
                    <div style="padding: 12px 20px; border-top: 1px solid #e9eceb; text-align: center;">
                        <a
                            href={`/${props.app}/notifications`}
                            style="
                            color: #4f46e5; /* Adjusted indigo color */
                            font-size: 14px;
                            font-weight: 500;
                            text-decoration: none;
                            /* Optional: Make it an inline-block if needed for padding */
                            display: inline-block; 
                        "
                        >
                            View All Notifications
                        </a>
                    </div>
                </div>
            </Show>
        </div>
    );
};
