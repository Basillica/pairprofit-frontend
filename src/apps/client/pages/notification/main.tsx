import { createSignal, For } from 'solid-js';

// --- ICONS ---
const Icons = {
    // Dropdown Arrow (for the filter)
    chevronDown: (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="#292D32"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
    ),
    // Notification Icon (for the component header)
    bell: (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
        </svg>
    ),
    // Action Arrow (for the far right of each item)
    arrowRight: (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="#0D121C"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
    ),

    // Notification Type Icons (Color-coded based on your styles)
    proposalBag: (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="#34A853"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
        </svg>
    ), // Green
    message: (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="#9E07DF"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
    ), // Purple
    money: (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FBBC05"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <path d="M12 1v22"></path>
            <path d="M17 5H9.5a3.5 3.5 0 1 0 0 7h5a3.5 3.5 0 1 1 0 7H6"></path>
        </svg>
    ), // Yellow
    check: (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="#4285F4"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
    ), // Blue
};

// --- DATA MOCKUP ---
const notifications = [
    {
        type: 'proposal',
        icon: Icons.proposalBag,
        color: 'text-green-600',
        message:
            "Your job post 'Fix kitchen sink leak' has received 3 new proposals.",
        actionText: 'View job',
        time: '1:27 PM',
    },
    {
        type: 'proposal',
        icon: Icons.proposalBag,
        color: 'text-green-600',
        message:
            "Artisan James Carter applied to your job: 'Paint 2-bedroom apartment.'",
        actionText: 'View Proposal',
        time: '12:28 PM',
    },
    {
        type: 'message',
        icon: Icons.message,
        color: 'text-purple-600',
        message:
            "Mary Johnson sent you a message regarding 'Bathroom Renovation.'",
        actionText: 'Reply',
        time: '2h ago',
    },
    {
        type: 'payment',
        icon: Icons.money,
        color: 'text-yellow-600',
        message:
            "A payment of $500.00 has been confirmed for 'Plumbing Repair'.",
        actionText: 'View payment',
        time: 'Oct 19',
    },
    {
        type: 'system',
        icon: Icons.bell,
        color: 'text-gray-600',
        message: 'New terms and conditions are now effective. Please review.',
        actionText: 'Learn more',
        time: 'Yesterday',
    },
    {
        type: 'approval',
        icon: Icons.check,
        color: 'text-blue-600',
        message: 'Your profile verification is complete and approved.',
        actionText: 'Review now',
        time: '1:27 PM',
    },
];

// --- 2. Notification Item Component ---
const NotificationItem = (props: (typeof notifications)[0]) => (
    // Clickable Container: hover background for interactivity
    // [padding-top: 24px; padding-bottom: 24px; border-bottom: 1px #CDD5DF solid]
    <div class="w-full py-6 px-4 border-b border-gray-300 hover:bg-gray-50 transition-colors cursor-pointer flex justify-between items-center">
        {/* Left Side: Icon and Message */}
        <div class="flex items-center gap-6 flex-grow min-w-0">
            {/* Icon: [width: 32px; height: 32px] */}
            <div class={`w-8 h-8 ${props.color} flex-shrink-0`}>
                {props.icon}
            </div>

            {/* Message and Time */}
            <div class="flex flex-col gap-2 min-w-0 pr-4">
                {/* Message: [font-size: 18px; font-weight: 500] */}
                <div class="text-lg font-medium text-gray-700 leading-snug break-words">
                    {props.message}
                </div>
                {/* Time: [font-size: 18px; font-weight: 500] */}
                <div class="text-lg font-medium text-gray-600 leading-snug">
                    {props.time}
                </div>
            </div>
        </div>

        {/* Right Side: Action and Arrow */}
        <div class="flex items-center gap-10 flex-shrink-0">
            {/* Action Text: [color: #1376A1; font-size: 18px; font-weight: 600] */}
            <div class="text-lg font-semibold text-blue-700 hover:text-blue-800">
                {props.actionText}
            </div>
            {/* Arrow Icon: [width: 28px; height: 28px] */}
            <div class="w-7 h-7 text-gray-900">{Icons.arrowRight}</div>
        </div>
    </div>
);

// --- 3. Main NotificationFeed Component ---
export const ClientNotificationPage = () => {
    const [filter, setFilter] = createSignal('Recent');
    // Mock filter options for the dropdown
    const filterOptions = ['Recent', 'Unread', 'All', 'Proposals', 'Messages'];

    return (
        // Main Container: Responsive width, fixed-size content card
        <div class="w-full max-w-5xl mx-auto flex flex-col gap-6">
            {/* --- Header --- */}
            <div class="flex items-center gap-4">
                {/* Title: [font-size: 24px; font-weight: 500] */}
                <div class="text-2xl font-medium text-gray-900">
                    All Notifications
                </div>

                {/* Filter Dropdown (Placeholder) */}
                <div class="relative group">
                    <button class="flex items-center gap-2 p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                        <span class="text-gray-900 text-sm font-medium">
                            {filter()}
                        </span>
                        <div class="w-4 h-4 text-gray-700">
                            {Icons.chevronDown}
                        </div>
                    </button>
                    {/* Dropdown Menu (hidden, for demonstration) */}
                    <div class="absolute right-0 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10 hidden group-hover:block">
                        <For each={filterOptions}>
                            {(option) => (
                                <div
                                    class="p-3 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => setFilter(option)}
                                >
                                    {option}
                                </div>
                            )}
                        </For>
                    </div>
                </div>
            </div>

            {/* --- Notifications Card --- */}
            {/* [padding-top: 16px; padding-bottom: 16px; border-radius: 20px; outline: 1px #CDD5DF solid] */}
            <div class="w-full py-4 border border-gray-300 rounded-xl flex flex-col">
                {/* Section Title: Most Recent */}
                <div class="px-4 py-2 mb-2">
                    {/* [font-size: 20px; font-weight: 500] */}
                    <div class="text-xl font-medium text-gray-900">
                        Most Recent
                    </div>
                </div>

                {/* List of Notifications */}
                <div class="flex flex-col">
                    <For each={notifications}>
                        {(item) => <NotificationItem {...item} />}
                    </For>
                </div>
            </div>
        </div>
    );
};
