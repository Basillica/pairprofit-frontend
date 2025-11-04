import { Component, createSignal, Setter } from 'solid-js';

// --- Icon Components ---

// Close/X Icon for the Header
const CloseIcon: Component = () => (
    <svg
        class="w-7 h-7 text-gray-900"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M18 6L6 18M6 6L18 18"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
    </svg>
);

// --- Main Component ---

/**
 * A responsive slide-over/modal component for editing the display name.
 * On desktop, it appears as a fixed panel on the right.
 * On mobile, it appears as a full-width action sheet from the bottom.
 */
export const DisplayNameEditor: Component<{
    setProfileName: Setter<boolean>;
}> = (props) => {
    const [isOpen, setIsOpen] = createSignal(true); // Control the visibility of the panel
    const [displayName, setDisplayName] = createSignal('Email, name'); // Placeholder for input value

    const handleSave = () => {
        console.log('Saving display name:', displayName());
        // Add save logic here (API call, state update)
        setIsOpen(false);
    };

    return (
        <div
            class="fixed inset-0 z-40 bg-gray-200 bg-opacity-50 transition-opacity duration-300"
            // style="position: relative; background: var(--Transparent, rgba(30, 30, 30, 0.20)); overflow: hidden"
            onClick={() => props.setProfileName(false)}
        >
            {/* Panel Container - Fixed to the right/bottom */}
            <div
                // Positioning & Size:
                // Mobile: w-full, fixed-bottom (action sheet style)
                // Desktop: max-w-[600px] (original width), fixed-right, full height
                class="fixed z-50 transition-transform duration-300 
                       bottom-0 left-0 right-0 sm:left-auto sm:right-0 sm:top-0 sm:bottom-0 
                       w-full sm:max-w-[600px] sm:h-full h-[80vh] bg-white rounded-t-2xl sm:rounded-none shadow-2xl"
                // Slide-in/Slide-out animation
                style={{
                    transform: isOpen()
                        ? 'translateY(0) translateX(0)'
                        : 'translateY(100%) translateX(0) sm:translateY(0) sm:translateX(100%)',
                }}
            >
                {/* Scrollable Content Wrapper */}
                <div class="flex flex-col h-full">
                    {/* Content Area (Scrollable part) */}
                    <div class="flex-grow flex flex-col justify-start items-start gap-8 sm:gap-10 overflow-y-auto">
                        {/* 1. Header */}
                        <div class="sticky top-0 w-full px-4 sm:px-10 py-4 sm:py-6 border-b border-gray-200 bg-white flex justify-between items-center z-10">
                            <h2 class="text-xl sm:text-2xl font-semibold text-gray-900 leading-9">
                                Display Name
                            </h2>
                            <button
                                onClick={() => props.setProfileName(false)}
                                aria-label="Close"
                            >
                                <CloseIcon />
                            </button>
                        </div>

                        <div class="w-full px-4 sm:px-10 flex flex-col gap-10 sm:gap-12">
                            {/* 2. Instructions */}
                            <p class="text-base font-normal text-gray-700 leading-6">
                                We strongly recommend using your first name and
                                first initial of your last name—or another name
                                that represents you. Do not include the name of
                                your service, profession, level, or any
                                adjectives.
                            </p>

                            {/* 3. Input Field */}
                            <div class="w-full flex flex-col justify-start items-start gap-3">
                                <input
                                    type="text"
                                    value={displayName()}
                                    onInput={(e) =>
                                        setDisplayName(e.currentTarget.value)
                                    }
                                    placeholder="Email, name"
                                    class="w-full h-12 px-3 py-3 border border-gray-300 rounded-lg text-gray-600 text-sm focus:border-sky-700 focus:ring-1 focus:ring-sky-700 outline-none transition"
                                    aria-label="Enter your display name"
                                />
                                <p class="text-sm font-normal text-gray-500 leading-5">
                                    Use only English letters, periods and
                                    apostrophes are all allowed.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 4. Footer/Save Button */}
                    <div class="sticky bottom-0 w-full px-4 sm:px-10 py-4 border-t border-gray-300 bg-white flex justify-end items-center z-10">
                        <button
                            onClick={handleSave}
                            class="px-5 py-3 bg-[#1376A1] rounded-lg text-white font-semibold text-base transition hover:bg-sky-800"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
