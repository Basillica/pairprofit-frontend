import { Component, For, createSignal, onMount } from 'solid-js';

const LEGAL_CONTENT_DATA = [
    {
        id: 'acceptance',
        title: 'Acceptance of Terms',
        number: '1.0',
        content:
            'By accessing or using PairProfit platform, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, you may not use our services. These terms constitute a legally binding agreement between you and HandyPro Inc.',
    },
    {
        id: 'definition',
        title: 'Definition',
        number: '2.0',
        content:
            '“Platform” refers to PairProfit website, mobile applications, and related services. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    {
        id: 'user-accounts',
        title: 'User Accounts',
        number: '3.0',
        content:
            'To access certain features of the Platform, you must create an account. You are responsible for maintaining the security and confidentiality of your account credentials.',
    },
    {
        id: 'account-creation',
        title: 'Account Creations',
        number: '4.0',
        content:
            'You must provide accurate, current, and complete information during registration. You must be at least 18 years old to create an account. Each person may only maintain one account. Accounts created through automated means or under false pretenses will be terminated.',
    },
    {
        id: 'security',
        title: 'Security',
        number: '5.0',
        content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    {
        id: 'platform-services-main',
        title: 'Platform Services',
        number: '5.0',
        content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    {
        id: 'booking-services',
        title: 'Booking Services',
        number: '6.0',
        content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    {
        id: 'artisans-services',
        title: 'Artisans Services',
        number: '7.0',
        content: 'Content for Artisans Services...',
    },
    {
        id: 'user-conduct',
        title: 'User Conduct',
        number: '8.0',
        content: 'Content for User Conduct...',
    },
    {
        id: 'intellectual-property',
        title: 'Intellectual Property',
        number: '9.0',
        content: 'Content for Intellectual Property...',
    },
    {
        id: 'dispute-resolution',
        title: 'Dispute Resolution',
        number: '10.0',
        content: 'Content for Dispute Resolution...',
    },
    {
        id: 'terminations',
        title: 'Terminations',
        number: '11.0',
        content: 'Content for Terminations...',
    },
    {
        id: 'change-of-terms',
        title: 'Change of Terms',
        number: '12.0',
        content: 'Content for Change of Terms...',
    },
    {
        id: 'contact-information',
        title: 'Contact Information',
        number: '13.0',
        content: 'Content for Contact Information...',
    },
];

const TOC_STRUCTURE = [
    { title: 'Acceptance Of Terms', id: 'acceptance', sub: [] },
    { title: 'Definition', id: 'definition', sub: [] },
    {
        title: 'User Accounts',
        id: 'user-accounts',
        sub: [
            {
                number: '1.0',
                title: 'Account Creation',
                id: 'account-creation',
            },
            { number: '1.1', title: 'Security', id: 'security' },
        ],
    },
    {
        title: 'Platform Services',
        id: 'platform-services-main',
        sub: [
            {
                number: '1.0',
                title: 'Booking Services',
                id: 'booking-services',
            },
            { number: '1.1', title: 'Payments', id: 'payments' },
            {
                number: '1.2',
                title: 'Cancelation & Refunds',
                id: 'cancellation-refunds',
            },
        ],
    },
    {
        title: 'Artisans Services',
        id: 'artisans-services',
        sub: [
            {
                number: '1.0',
                title: 'Verification Requirements',
                id: 'verification-requirements',
            },
            {
                number: '1.1',
                title: 'Services Standard',
                id: 'services-standard',
            },
        ],
    },
    { title: 'User Conduct', id: 'user-conduct', sub: [] },
    { title: 'Intellectual Property', id: 'intellectual-property', sub: [] },
    { title: 'Dispute Resolution', id: 'dispute-resolution', sub: [] },
    { title: 'Terminations', id: 'terminations', sub: [] },
    { title: 'Change of Terms', id: 'change-of-terms', sub: [] },
    { title: 'Contact Information', id: 'contact-information', sub: [] },
];

const FLAT_TOC_OPTIONS = TOC_STRUCTURE.flatMap((section) => {
    const options: { id: string; title: string }[] = [];
    options.push({ id: section.id, title: section.title });
    section.sub.forEach((sub) => {
        if (LEGAL_CONTENT_DATA.some((data) => data.id === sub.id)) {
            options.push({
                id: sub.id,
                title: ` -- ${sub.number} ${sub.title}`,
            });
        }
    });
    return options;
});

const DocumentIcon: Component = () => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <g clip-path="url(#a)">
            <path
                d="M19.5 0v1.5H3V0zM12 7.066v6.493a5 5 0 0 1 1.793.586 5.3 5.3 0 0 1 1.43 1.16q.609.703.937 1.582t.34 1.863q0 1.09-.41 2.04a5.5 5.5 0 0 1-1.125 1.675A5.1 5.1 0 0 1 13.3 23.59a5.4 5.4 0 0 1-2.051.41 5.1 5.1 0 0 1-2.04-.41 5.5 5.5 0 0 1-1.675-1.125A5.1 5.1 0 0 1 6.41 20.8 5.4 5.4 0 0 1 6 18.75q0-.973.34-1.852a5.5 5.5 0 0 1 .937-1.582 5.1 5.1 0 0 1 1.418-1.16 5.2 5.2 0 0 1 1.805-.597V7.066l-3.973 3.961-1.054-1.054 5.777-5.778 5.777 5.778-1.054 1.054zm3 11.684q0-.774-.293-1.453a3.7 3.7 0 0 0-.809-1.184 4.1 4.1 0 0 0-1.195-.808A3.5 3.5 0 0 0 11.25 15q-.774 0-1.453.293a3.8 3.8 0 0 0-2.004 2.004A3.6 3.6 0 0 0 7.5 18.75q0 .774.293 1.453.292.68.797 1.195.504.516 1.195.809t1.465.293 1.453-.293a3.76 3.76 0 0 0 1.992-1.992Q15 19.523 15 18.75"
                fill="#000"
            />
        </g>
        <defs>
            <clipPath id="a">
                <path fill="#fff" d="M0 0h24v24H0z" />
            </clipPath>
        </defs>
    </svg>
);

const ClockIcon: Component = () => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M10.5 7.25a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zm-1 5.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0m0 3.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0m2.5-2.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2m1 2.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0m2.5-2.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2"
            fill="#000"
        />
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M8 3.5a.5.5 0 0 1 .5.5v1h7V4a.5.5 0 0 1 1 0v1.003q.367.002.654.026c.365.03.685.093.981.243a2.5 2.5 0 0 1 1.092 1.093c.151.296.214.616.244.98.029.355.029.792.029 1.334v7.642c0 .542 0 .98-.029 1.333-.03.365-.093.685-.244.981a2.5 2.5 0 0 1-1.092 1.092c-.296.151-.616.214-.98.244-.355.029-.792.029-1.333.029H8.179c-.542 0-.98 0-1.333-.029-.365-.03-.685-.093-.981-.244a2.5 2.5 0 0 1-1.093-1.092c-.15-.296-.213-.616-.243-.98C4.5 17.3 4.5 16.862 4.5 16.32V8.68c0-.475 0-.868.02-1.197l.009-.136c.03-.365.093-.685.243-.981a2.5 2.5 0 0 1 1.093-1.093c.296-.15.616-.213.98-.243a9 9 0 0 1 .655-.026V4a.5.5 0 0 1 .5-.5m-.5 3v-.497q-.287.003-.573.023c-.302.024-.476.07-.608.137a1.5 1.5 0 0 0-.656.656c-.067.132-.113.306-.137.608C5.5 7.736 5.5 8.132 5.5 8.7v.55h13V8.7c0-.568 0-.964-.026-1.273-.024-.302-.07-.476-.137-.608a1.5 1.5 0 0 0-.656-.656c-.132-.067-.306-.113-.608-.137a9 9 0 0 0-.573-.023V6.5a.5.5 0 0 1-1 0V6h-7v.5a.5.5 0 1 1-1 0m11 3.75h-13v6.05c0 .568 0 .965.026 1.273.024.302.07.476.137.608a1.5 1.5 0 0 0 .656.656c.132.067.306.113.608.137C7.236 19 7.632 19 8.2 19h7.6c.568 0 .965 0 1.273-.026.302-.024.476-.07.608-.137a1.5 1.5 0 0 0 .656-.656c.067-.132.113-.306.137-.608.026-.308.026-.705.026-1.273z"
            fill="#000"
        />
    </svg>
);

export const LegalContentLayout: Component = () => {
    // activeSectionId is ONLY updated by a click action (menu or paragraph).
    const [activeSectionId, setActiveSectionId] = createSignal(
        LEGAL_CONTENT_DATA[0].id
    );

    // Helper to find the main section ID when a sub-section is active
    const getActiveMainId = (id: string) => {
        const structure = TOC_STRUCTURE.find(
            (section) =>
                section.id === id || section.sub.some((sub) => sub.id === id)
        );
        return structure ? structure.id : id;
    };

    /**
     * Handles navigation (smooth scroll and state update) from the dropdown or sidebar links.
     * This is the only function that causes a scroll.
     */
    const handleNavigation = (id: string) => {
        let targetId = id;

        // Logic to redirect click from container headers (that have subs) to the first actual sub-section.
        const mainSection = TOC_STRUCTURE.find((s) => s.id === id);
        if (mainSection && mainSection.sub.length > 0) {
            const firstContentSub = mainSection.sub.find((sub) =>
                LEGAL_CONTENT_DATA.some((data) => data.id === sub.id)
            );
            if (firstContentSub) {
                targetId = firstContentSub.id;
            }
        }

        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            // 1. Immediately update state (Highlight the menu item)
            setActiveSectionId(targetId);

            // Update URL hash without causing a jump
            history.pushState(null, '', `#${targetId}`);

            // 2. Perform smooth scroll with fixed offset
            const headerHeight = 100;
            const elementPosition =
                targetElement.getBoundingClientRect().top + window.scrollY;

            window.scrollTo({
                top: elementPosition - headerHeight,
                behavior: 'smooth',
            });
        }
    };

    // Wrapper for sidebar/dropdown link clicks
    const handleClick = (e: Event | MouseEvent, id: string) => {
        e.preventDefault();
        handleNavigation(id);
    };

    // On mount, check URL hash and set initial highlight if available
    onMount(() => {
        const initialHash = window.location.hash.slice(1);
        if (
            initialHash &&
            LEGAL_CONTENT_DATA.some((item) => item.id === initialHash)
        ) {
            setActiveSectionId(initialHash);
        }
    });

    return (
        <div class="w-full flex justify-center bg-[#F8FAFC] py-16">
            <div class="w-full px-4 md:px-[100px] flex flex-col items-start gap-10">
                {/* --- 1. Policy & Navigation Header Row --- */}
                <div class="self-stretch flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    {/* Left Side: Policy Links and Section Selector */}
                    {/* BREAD CRUMB */}
                    <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
                        {/* Policy Links (T&C | Privacy Policy) */}
                        <div class="flex flex-wrap justify-start items-center gap-x-3 gap-y-2">
                            <div class="text-base font-medium text-[#1376A1] leading-6">
                                Terms & Conditions
                            </div>
                            <div class="text-lg font-semibold text-[#202939] leading-7">
                                |
                            </div>

                            <a
                                href="/terms"
                                class="flex justify-start items-center gap-2 relative"
                            >
                                <div class="text-base font-medium text-[#697586] leading-6">
                                    Privacy Policy
                                </div>
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="m9 19 7-7-7-7"
                                        stroke="#1376A1"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                            </a>
                        </div>

                        {/* Section Selector Dropdown (Universal Navigation Source) */}
                        <select
                            value={activeSectionId()}
                            onInput={(e) =>
                                handleNavigation(e.currentTarget.value)
                            }
                            class="w-full sm:w-64 md:w-80 px-4 py-2 bg-white rounded-lg border border-[#CDD5DF] text-base text-[#0D121C] font-medium focus:ring-[#1376A1] focus:border-[#1376A1] transition"
                            aria-label="Select Legal Document Section"
                        >
                            <For each={FLAT_TOC_OPTIONS}>
                                {(option) => (
                                    <option
                                        value={option.id}
                                        style={{
                                            'padding-left':
                                                option.title.startsWith(' -- ')
                                                    ? '20px'
                                                    : '5px',
                                        }}
                                    >
                                        {option.title}
                                    </option>
                                )}
                            </For>
                        </select>
                    </div>

                    {/* Right Side: Version & Update Info (Desktop Only) */}
                    <div class="hidden lg:flex flex-wrap justify-end items-center gap-4">
                        <div class="px-4 py-2 bg-white rounded-full border border-[#CDD5DF] flex justify-center items-center gap-2">
                            <DocumentIcon />
                            <div class="text-lg font-normal text-[#4B5565] leading-7">
                                Version 2.1
                            </div>
                        </div>
                        <div class="px-4 py-2 bg-white rounded-full border border-[#CDD5DF] flex justify-center items-center gap-2">
                            <ClockIcon />
                            <div class="text-lg font-normal text-[#4B5565] leading-7">
                                Last Updated October 8, 2025
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- 2. Content Body (TOC + Main) --- */}
                <div class="self-stretch flex justify-start items-start gap-12">
                    {/* Left Column: Table of Contents (Hidden on Mobile, Sticky on Desktop) */}
                    <nav class="w-full lg:w-[350px] flex-shrink-0 sticky top-24 self-start hidden lg:block">
                        <div class="px-4 border-r border-[#E3E8EF] flex flex-col justify-center items-start gap-4">
                            <For each={TOC_STRUCTURE}>
                                {(section) => {
                                    const isActiveMain =
                                        getActiveMainId(activeSectionId()) ===
                                        section.id;
                                    return (
                                        <div class="self-stretch flex flex-col justify-start items-start">
                                            {/* Main Section Title */}
                                            <a
                                                href={`#${section.id}`}
                                                onClick={(e) =>
                                                    handleClick(e, section.id)
                                                }
                                                class="self-stretch py-3 px-4 transition-all duration-150 rounded-lg"
                                                classList={{
                                                    'bg-[#D0E4EC] border-l-[3px] border-black hover:bg-[#D0E4EC]/80':
                                                        isActiveMain,
                                                    'hover:bg-[#F0F4F8]':
                                                        !isActiveMain,
                                                }}
                                            >
                                                <div class="text-xl font-semibold text-[#0D121C] leading-8">
                                                    {section.title}
                                                </div>
                                            </a>

                                            {/* Sub-sections */}
                                            <For each={section.sub}>
                                                {(sub) => (
                                                    <a
                                                        href={`#${sub.id}`}
                                                        onClick={(e) =>
                                                            handleClick(
                                                                e,
                                                                sub.id
                                                            )
                                                        }
                                                        class="self-stretch px-8 py-3 transition-colors duration-150 rounded-lg hover:text-[#1376A1]"
                                                        classList={{
                                                            'font-medium text-[#0F322E] bg-[#F0F4F8] hover:bg-[#F0F4F8]/80':
                                                                activeSectionId() ===
                                                                sub.id,
                                                            'font-medium text-[#364152] hover:bg-transparent':
                                                                activeSectionId() !==
                                                                sub.id,
                                                        }}
                                                    >
                                                        <div class="flex justify-start items-center gap-2">
                                                            <span class="text-base leading-6 text-[#0F322E]">
                                                                {sub.number}
                                                            </span>
                                                            <span class="text-lg leading-7">
                                                                {sub.title}
                                                            </span>
                                                        </div>
                                                    </a>
                                                )}
                                            </For>
                                        </div>
                                    );
                                }}
                            </For>
                        </div>
                    </nav>

                    {/* Right Column: Main Content */}
                    <div class="flex-1 flex flex-col justify-center items-start w-full">
                        <For each={LEGAL_CONTENT_DATA}>
                            {(item) => (
                                <section
                                    id={item.id}
                                    style={`${
                                        activeSectionId() === item.id
                                            ? 'border-left: 3px #1376a1 solid'
                                            : ''
                                    }`}
                                    onClick={() => setActiveSectionId(item.id)}
                                    class="self-stretch p-8 flex flex-col justify-center items-start gap-8 border-l-[3px] border-transparent transition-all duration-100 cursor-pointer"
                                    classList={{
                                        'bg-[rgba(208,228,236,0.25)] border-[#1376A1]':
                                            item.id === activeSectionId(),
                                        'bg-transparent':
                                            item.id !== activeSectionId(),
                                    }}
                                >
                                    <div class="flex flex-col justify-start items-start gap-4 w-full">
                                        {/* Section Heading */}
                                        <div class="flex justify-center items-center gap-3 rounded-lg">
                                            <div class="text-xl font-medium text-[#0F322E] leading-8">
                                                {item.number}
                                            </div>
                                            <h2 class="text-2xl font-medium text-[#0F322E] leading-9">
                                                {item.title}
                                            </h2>
                                        </div>

                                        {/* Content Paragraph */}
                                        <p class="text-lg font-medium text-[#4B5565] leading-7">
                                            {item.content}
                                        </p>
                                    </div>
                                </section>
                            )}
                        </For>
                    </div>
                </div>
            </div>
        </div>
    );
};
