import { createSignal, For, Show } from 'solid-js';

// --- ICONS ---
const Icons = {
    // Search Icon (used in search bar)
    search: (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="#697586"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
    ),
    // Expand/Collapse Icon (used in FAQ)
    chevronDown: (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="#292D32"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
    ),
    chevronUp: (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="#292D32"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
    ),
    // Chat Icon (for support action)
    chat: (
        <svg
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="m18.47 17.33.39 3.16c.1.83-.79 1.41-1.5.98l-4.19-2.49q-.69 0-1.35-.09A4.86 4.86 0 0 0 13 15.73c0-2.84-2.46-5.14-5.5-5.14-1.16 0-2.23.33-3.12.91-.03-.25-.04-.5-.04-.76 0-4.55 3.95-8.24 8.83-8.24S22 6.19 22 10.74c0 2.7-1.39 5.09-3.53 6.59"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M13 15.73c0 1.19-.44 2.29-1.18 3.16-.99 1.2-2.56 1.97-4.32 1.97l-2.61 1.55c-.44.27-1-.1-.94-.61l.25-1.97C2.86 18.9 2 17.41 2 15.73c0-1.76.94-3.31 2.38-4.23.89-.58 1.96-.91 3.12-.91 3.04 0 5.5 2.3 5.5 5.14"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
    ),
    // Phone Icon (for support action)
    phone: (
        <svg
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M21.97 18.83c0 .36-.08.73-.25 1.09s-.39.7-.68 1.02c-.49.54-1.03.93-1.64 1.18-.6.25-1.25.38-1.95.38-1.02 0-2.11-.24-3.26-.73s-2.3-1.15-3.44-1.98a29 29 0 0 1-3.28-2.8 28.4 28.4 0 0 1-2.79-3.27c-.82-1.14-1.48-2.28-1.96-3.41Q2 8.6 2 7.04c0-.68.12-1.33.36-1.93.24-.61.62-1.17 1.15-1.67.64-.63 1.34-.94 2.08-.94.28 0 .56.06.81.18.26.12.49.3.67.56l2.32 3.27c.18.25.31.48.4.7.09.21.14.42.14.61 0 .24-.07.48-.21.71-.13.23-.32.47-.56.71l-.76.79c-.11.11-.16.24-.16.4 0 .08.01.15.03.23.03.08.06.14.08.2.18.33.49.76.93 1.28.45.52.93 1.05 1.45 1.58.54.53 1.06 1.02 1.59 1.47.52.44.95.74 1.29.92.05.02.11.05.18.08.08.03.16.04.25.04.17 0 .3-.06.41-.17l.76-.75c.25-.25.49-.44.72-.56.23-.14.46-.21.71-.21.19 0 .39.04.61.13s.45.22.7.39l3.31 2.35c.26.18.44.39.55.64.1.25.16.5.16.78Z"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-miterlimit="10"
            />
        </svg>
    ),
};

// --- DATA MOCKUP ---
const popularTopics = [
    'Posting a job',
    'Payment Issues',
    'Account Settings',
    'Hiring Tips',
    'Safety Guidelines',
];

const faqs = [
    {
        id: 1,
        question: 'How do I post a job?',
        answer: "You can post a job by navigating to the 'Jobs' section and clicking 'New Job'. Follow the prompts to describe your task, set a budget, and specify your requirements.",
    },
    {
        id: 2,
        question: 'How can I hire the right artisan?',
        answer: 'Review their profile, check their ratings and reviews from previous jobs, and look for ID verification. You can also message them directly to discuss the project details before hiring.',
    },
    {
        id: 3,
        question: 'What payment methods are available?',
        answer: 'We accept all major credit cards, debit cards, and bank transfers via our secure payment portal.',
    },
    {
        id: 4,
        question: 'How do I reset my password?',
        answer: "Click on 'Forgot Password' on the login screen and enter your email address. We will send you a link to securely reset your password.",
    },
];

// --- REUSABLE COMPONENTS ---

// 1. Interactive FAQ Item
const FAQItem = (props: { question: string; answer: string; id: string }) => {
    const [expanded, setExpanded] = createSignal(false);
    const toggleExpand = () => setExpanded(!expanded());

    // Card Container: [padding: 16px; background: white; border-radius: 12px]
    return (
        <div
            class="w-full bg-white rounded-xl shadow-sm border border-gray-100 transition-all duration-300 overflow-hidden"
            id={props.id}
        >
            <button
                onClick={toggleExpand}
                class="w-full p-5 flex justify-between items-center text-left"
            >
                {/* Question: [font-size: 18px; font-weight: 500] */}
                <div class="text-lg font-medium text-gray-900 pr-4">
                    {props.question}
                </div>
                {/* Icon */}
                <div
                    class="w-6 h-6 text-gray-700 flex-shrink-0 transition-transform duration-300"
                    classList={{ 'rotate-180': expanded() }}
                >
                    {/* {Icons.chevronDown} */}
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#292D32"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </div>
            </button>

            {/* Answer Content (Dynamically shown) */}
            <Show when={expanded()}>
                <div class="px-5 pb-5 pt-0 text-base text-gray-600 border-t border-gray-100 mt-2">
                    {props.answer}
                </div>
            </Show>
        </div>
    );
};

// 2. Clickable Popular Topic Chip
const PopularTopicChip = (props: { label: string }) => (
    // Chip Style: [padding: 10px; background: white; border-radius: 30px]
    <button
        class="py-2 px-4 bg-white rounded-full text-base text-gray-700 hover:bg-gray-100 transition-colors flex-shrink-0 shadow-sm border border-gray-200"
        onClick={() => console.log(`Navigating to topic: ${props.label}`)}
    >
        {props.label}
    </button>
);

// 3. Clickable Support Action Card
const SupportAction = (props: {
    icon: any;
    label: string;
    isPrimary: boolean;
}) => (
    // Card Style: [padding: 16px; background: white/blue; border-radius: 12px]
    <button
        class={`w-full p-5 flex justify-start items-center gap-4 rounded-xl transition-colors hover:shadow-md ${
            props.isPrimary
                ? 'bg-blue-100 hover:bg-blue-200' // Primary: Light Blue background
                : 'bg-white hover:bg-gray-50 border border-gray-200' // Secondary: White background
        }`}
        onClick={() => console.log(`Initiating support action: ${props.label}`)}
    >
        {/* Icon: [width: 24px; height: 24px] */}
        <div class="w-6 h-6 text-gray-900 flex-shrink-0">{props.icon}</div>
        {/* Label: [font-size: 18px; font-weight: 500] */}
        <div class="text-lg font-medium text-gray-900 text-left">
            {props.label}
        </div>
    </button>
);

// --- MAIN COMPONENT ---
export const HelpSupportPage = () => {
    return (
        // Main Container: Centered, responsive width
        // <div class="w-full max-w-5xl mx-auto p-4 md:p-8 flex flex-col gap-8">
        // <div class="w-full max-w-5xl mx-auto flex flex-col gap-6">
        <main class="p-6">
            {/* --- 1. Header & Search --- */}
            <div class="flex flex-col gap-4 border-b border-gray-200 pb-8">
                {/* Title & Subtitle */}
                <div class="flex flex-col gap-2">
                    {/* Title: [font-size: 24px; font-weight: 500] */}
                    <h1 class="text-3xl font-semibold text-gray-900">
                        Help & Support
                    </h1>
                    {/* Subtitle: [font-size: 16px; font-weight: 500] */}
                    <p class="text-lg font-medium text-gray-600">
                        Find answers, explore topics, or reach out to our team.
                    </p>
                </div>

                {/* Search Bar (Pill Style) */}
                <div
                    class="w-full max-w-2xl p-3 bg-white border border-gray-300 rounded-full flex items-center gap-2 shadow-sm cursor-pointer hover:border-gray-400 transition-colors"
                    onClick={() => console.log('Activating search input...')}
                >
                    <div class="w-5 h-5 text-gray-500">{Icons.search}</div>
                    {/* Placeholder: [font-size: 12px] */}
                    <div class="text-base text-gray-500 font-normal">
                        Search for help articles or topics...
                    </div>
                </div>
            </div>

            {/* --- 2. Popular Topics --- */}
            <div class="flex flex-col gap-4">
                {/* Title: [font-size: 20px; font-weight: 500] */}
                <h2 class="text-xl font-medium text-gray-900 pt-5">
                    Popular Topics
                </h2>

                {/* Topics: Horizontal scroll/wrap */}
                <div class="flex flex-wrap gap-4 overflow-x-auto pb-2">
                    <For each={popularTopics}>
                        {(topic) => <PopularTopicChip label={topic} />}
                    </For>
                </div>
            </div>

            {/* --- 3. FAQs --- */}
            <div class="flex flex-col gap-6 pt-5">
                {/* Title: [font-size: 20px; font-weight: 500] */}
                <h2 class="text-xl font-medium text-gray-900">FAQs</h2>
                {/* FAQ List */}
                <div class="flex flex-col gap-4">
                    <For each={faqs}>
                        {(faq, index) => (
                            <FAQItem
                                question={faq.question}
                                answer={faq.answer}
                                id={`notif-${index()}`}
                            />
                        )}
                    </For>
                </div>
            </div>

            {/* --- 4. Still Need Help? --- */}
            <div class="flex flex-col gap-6">
                {/* Title: [font-size: 20px; font-weight: 500] */}
                <h2 class="text-xl font-medium text-gray-900 pt-5">
                    Still need help?
                </h2>

                {/* Contact Actions */}
                {/* <div class="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl"> */}
                <SupportAction
                    icon={Icons.chat}
                    label="Chat with support"
                    isPrimary={true}
                />
                <SupportAction
                    icon={Icons.phone}
                    label="Request a call"
                    isPrimary={false}
                />
                {/* </div> */}
            </div>
        </main>
    );
};
