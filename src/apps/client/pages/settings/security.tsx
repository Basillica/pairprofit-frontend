import { Component, createSignal, For, JSX } from 'solid-js';

// --- ICONS & REUSABLE COMPONENTS ---

// 1. Reusable Toggle Switch Component (for 2FA and Recovery Codes)
const ToggleSwitch = (props: {
    enabled: boolean;
    onChange: (v: boolean) => void;
}) => (
    <button
        onClick={() => props.onChange(!props.enabled)}
        // The main container for the toggle switch
        class={`relative inline-flex flex-shrink-0 h-7 w-14 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            props.enabled
                ? 'bg-blue-700 focus:ring-blue-700'
                : 'bg-gray-200 focus:ring-gray-500'
        }`}
        role="switch"
        aria-checked={props.enabled}
    >
        {/* The moving circle (switch handle) */}
        <span
            aria-hidden="true"
            class={`pointer-events-none inline-block h-6 w-6 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${
                props.enabled ? 'translate-x-7' : 'translate-x-0'
            }`}
        />
    </button>
);

// 2. Mockup Browser Icons (Simplified representation of the original SVGs)
const BrowserIcon = (props: { type: string }) => {
    let colorClass = 'bg-gray-200';
    let iconContent: JSX.Element;

    switch (props.type) {
        case 'arc':
            colorClass = 'bg-blue-500/10'; // Light blue tint
            iconContent = (
                <div class="w-full h-full text-blue-700" title="Arc">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.21 16.48a6 6 0 0 1-2.42 0A6.08 6.08 0 0 1 8 12c0-3.32 2.69-6 6-6s6 2.68 6 6-2.68 6-6 6z" />
                        <path
                            fill="#fff"
                            d="M14 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
                        />
                    </svg>
                </div>
            );
            break;
        case 'chrome':
            colorClass = 'bg-gray-500/10'; // Light gray tint
            iconContent = (
                <div class="w-full h-full text-red-600" title="Chrome">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                        <circle cx="12" cy="12" r="5" fill="#4285F4" />
                        <path
                            d="M17.9 6.1C16.36 4.5 14.28 3.5 12 3.5c-4.69 0-8.5 3.81-8.5 8.5h2a6.5 6.5 0 0 1 11.5-4.5z"
                            fill="#EA4335"
                        />
                        <path
                            d="M17.9 6.1c1.55 1.6 2.4 3.7 2.4 5.9 0 4.69-3.81 8.5-8.5 8.5v-2c3.58 0 6.5-2.92 6.5-6.5 0-2.22-.85-4.3-2.4-5.9z"
                            fill="#0F9D58"
                        />
                        <path
                            d="M12 3.5c-2.28 0-4.36 1-5.9 2.6-.08.08-.16.15-.24.23a8.5 8.5 0 0 0 5.64 15.67c4.69 0 8.5-3.81 8.5-8.5 0-2.22-.85-4.3-2.4-5.9z"
                            fill="#FBC116"
                        />
                    </svg>
                </div>
            );
            break;
        case 'safari':
            colorClass = 'bg-gray-500/10'; // Light gray tint
            iconContent = (
                <div class="w-full h-full text-blue-500" title="Safari">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                        <path d="M12 5.5l5 10L7 10.5z" fill="#fff" />
                    </svg>
                </div>
            );
            break;
        case 'firefox':
            colorClass = 'bg-orange-500/10'; // Light orange tint
            iconContent = (
                <div class="w-full h-full text-orange-600" title="Firefox">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                        <path
                            d="M14 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
                            fill="#fff"
                        />
                    </svg>
                </div>
            );
            break;
        default:
            iconContent = (
                <div class="w-full h-full text-gray-500">
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="2" y1="12" x2="22" y2="12"></line>
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                    </svg>
                </div>
            );
    }

    return (
        // [width: 60px; height: 60px; background: rgba(208, 228, 236, 0.16); border-radius: 8px]
        <div
            class={`w-15 h-15 p-3 ${colorClass} overflow-hidden rounded-lg flex items-center justify-center`}
        >
            {/* Inner icon container [width: 32px; height: 32px] */}
            <div class="w-8 h-8">{iconContent}</div>
        </div>
    );
};

// 3. Mock Data for Login Sessions
const loginSessions = [
    {
        id: 1,
        browser: 'Arc on MacOS',
        status: 'Current sessions',
        location: 'Berlin, DE',
        isCurrent: true,
        icon: 'arc',
    },
    {
        id: 2,
        browser: 'Chrome on Windows',
        status: 'Last seen 4 hours ago',
        location: 'Berlin, DE',
        isCurrent: false,
        icon: 'chrome',
    },
    {
        id: 3,
        browser: 'Safari on iPhone',
        status: 'Last seen 1 day ago',
        location: 'London, UK',
        isCurrent: false,
        icon: 'safari',
    },
];

// --- MAIN COMPONENT ---
export const SecurityView: Component<{
    handleOpenModal: () => boolean;
}> = (props) => {
    // State for toggles
    const [twoFactorEnabled, setTwoFactorEnabled] = createSignal(false);
    const [recoveryCodesEnabled, setRecoveryCodesEnabled] = createSignal(true);

    const handleSignOutAll = () => {
        alert('All other sessions signed out!');
        // In a real application, you would make an API call here.
    };

    const handleSignOutSession = (sessionId: number) => {
        alert(`Session ID ${sessionId} signed out!`);
    };

    return (
        // Main Content Container
        <div class="flex flex-col gap-8 w-full">
            {/* --- Header Section --- */}
            <div class="flex flex-col gap-1">
                {/* Title: [font-size: 18px; font-weight: 500] */}
                <h2 class="text-xl font-medium text-gray-700">Security</h2>
                {/* Subtitle: [font-size: 14px; font-weight: 400] */}
                <p class="text-sm font-normal text-gray-600">
                    Set up security measure for better protection
                </p>
            </div>

            {/* --- Security Settings Group --- */}
            <div class="flex flex-col gap-8">
                {/* 1. Change Password */}
                {/* [padding-bottom: 24px; border-bottom: 1px #CDD5DF solid] */}
                <div class="flex flex-col md:flex-row justify-between items-start md:items-center pb-6 border-b border-gray-300 gap-4">
                    <div class="flex flex-col gap-1">
                        {/* Title: [font-size: 18px; font-weight: 500] */}
                        <div class="text-lg font-medium text-gray-900">
                            Change password
                        </div>
                        {/* Subtitle: [font-size: 16px; font-weight: 400] */}
                        <div class="text-base font-normal text-gray-600">
                            Update your account password
                        </div>
                    </div>
                    {/* Button: [padding: 14px 16px; border-radius: 24px] */}
                    <button
                        onClick={() =>
                            console.log(props.handleOpenModal(), '...........')
                        }
                        class="py-3.5 px-4 rounded-full border border-gray-500 text-sm font-normal text-gray-700 hover:bg-gray-50 transition-colors flex-shrink-0"
                    >
                        Change password
                    </button>
                </div>

                {/* 2. Two-factor authentication */}
                <div class="flex flex-col md:flex-row justify-between items-start md:items-center pb-6 border-b border-gray-300 gap-4">
                    <div class="flex flex-col gap-1">
                        <div class="text-lg font-medium text-gray-900">
                            Two-factor authentication
                        </div>
                        <div class="text-base font-normal text-gray-600">
                            Add extra security to your account
                        </div>
                    </div>
                    <ToggleSwitch
                        enabled={twoFactorEnabled()}
                        onChange={setTwoFactorEnabled}
                    />
                </div>

                {/* 3. Recovery codes */}
                <div class="flex flex-col md:flex-row justify-between items-start md:items-center pb-6 border-b border-gray-300 gap-4">
                    <div class="flex flex-col gap-1">
                        <div class="text-lg font-medium text-gray-900">
                            Recovery codes
                        </div>
                        {/* Note: Recovery codes are often "generated" not just enabled/disabled, but for simplicity, the toggle pattern is maintained. */}
                        <div class="text-base font-normal text-gray-600">
                            {recoveryCodesEnabled()
                                ? 'Generated Aug 24, 2025'
                                : 'Not generated'}
                        </div>
                    </div>
                    <ToggleSwitch
                        enabled={recoveryCodesEnabled()}
                        onChange={setRecoveryCodesEnabled}
                    />
                </div>
            </div>

            {/* --- Login Activity Group --- */}
            <div class="flex flex-col gap-8">
                {/* Login Activity Header and Button */}
                <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div class="flex flex-col gap-1">
                        {/* Title: [font-size: 18px; font-weight: 500] */}
                        <div class="text-xl font-medium text-gray-700">
                            Login Activity
                        </div>
                        {/* Subtitle: [font-size: 14px; font-weight: 400] */}
                        <div class="text-sm font-normal text-gray-600">
                            Places where you're logged into PairProfit
                        </div>
                    </div>
                    {/* Button: [padding: 14px 16px; border-radius: 24px] */}
                    <button
                        onClick={handleSignOutAll}
                        class="py-3.5 px-4 rounded-full border border-gray-500 text-sm font-normal text-gray-700 hover:bg-gray-50 transition-colors flex-shrink-0"
                    >
                        Sign out all other sessions
                    </button>
                </div>

                {/* Login Sessions List */}
                <div class="flex flex-col gap-4">
                    <div class="flex flex-col gap-4">
                        <For each={loginSessions}>
                            {(sessionElement) => (
                                <div class="flex justify-between items-center p-4 md:p-6 border border-gray-300 rounded-xl bg-white transition-shadow hover:shadow-sm">
                                    <div class="flex items-center gap-6">
                                        <BrowserIcon
                                            type={sessionElement.icon}
                                        />
                                        <div class="flex flex-col gap-1">
                                            {/* Browser Name: [font-size: 18px; font-weight: 500] */}
                                            <div class="text-lg font-medium text-gray-900">
                                                {sessionElement.browser}
                                            </div>
                                            <div class="flex flex-wrap items-center gap-x-5 text-sm font-normal">
                                                {/* Status: Current/Last Seen */}
                                                <div
                                                    class={`flex items-center gap-2 ${
                                                        sessionElement.isCurrent
                                                            ? 'text-blue-700'
                                                            : 'text-gray-600'
                                                    }`}
                                                >
                                                    {/* Current Session Dot */}
                                                    {sessionElement.isCurrent && (
                                                        <div class="w-2 h-2 bg-blue-700 rounded-full"></div>
                                                    )}
                                                    {sessionElement.status}
                                                </div>
                                                {/* Separator Dot (Only if not current session) */}
                                                {!sessionElement.isCurrent && (
                                                    <div class="hidden md:block w-2 h-2 bg-gray-400 rounded-full"></div>
                                                )}
                                                {/* Location */}
                                                <div class="text-gray-600">
                                                    {sessionElement.location}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {!sessionElement.isCurrent && (
                                        <button
                                            onClick={() =>
                                                handleSignOutSession(
                                                    sessionElement.id
                                                )
                                            }
                                            class="text-sm font-normal text-gray-700 hover:text-red-600 transition-colors flex-shrink-0"
                                        >
                                            Sign out
                                        </button>
                                    )}
                                </div>
                            )}
                        </For>
                    </div>
                </div>
            </div>
        </div>
    );
};
