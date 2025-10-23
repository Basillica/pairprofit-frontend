import { Accessor, createSignal, Setter, Show } from 'solid-js';
import { Portal } from 'solid-js/web';

// --- ICONS & REUSABLE COMPONENTS ---

// 1. Close Icon (X) - Reused from previous modal
const CloseIcon = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="w-5 h-5"
    >
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

// 2. Notification Toggle Switch (Customized to be blue/gray)
const NotificationToggle = (props: {
    label: string;
    enabled: boolean;
    onChange: (v: boolean) => void;
}) => (
    // [width: 32px; height: 32px] container for the switch
    <div class="flex items-center gap-3">
        <button
            onClick={() => props.onChange(!props.enabled)}
            // The main container for the toggle switch
            class={`relative inline-flex flex-shrink-0 h-8 w-14 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                props.enabled
                    ? 'bg-blue-700 focus:ring-blue-700'
                    : 'bg-gray-200 focus:ring-gray-500'
            }`}
            role="switch"
            aria-checked={props.enabled}
            aria-label={props.label}
        >
            {/* The moving circle (switch handle) */}
            <span
                aria-hidden="true"
                class={`pointer-events-none inline-block h-7 w-7 rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200 ${
                    props.enabled ? 'translate-x-6' : 'translate-x-0'
                }`}
            />
        </button>
        {/* The label/description (matching the mockup style) */}
        <div class="text-base font-normal text-gray-700">{props.label}</div>
    </div>
);

// --- MAIN MODAL COMPONENT ---
/**
 * @param props.isOpen - Signal indicating if the modal should be visible.
 * @param props.onClose - Function to call when the modal needs to be dismissed.
 */
export const NotificationSettingsModal = (props: {
    onClose: () => void;
    isOpen: Accessor<boolean>;
    closeModal: Setter<boolean>;
}) => {
    // State for notification preferences
    const [desktopEnabled, setDesktopEnabled] = createSignal(true);
    const [emailEnabled, setEmailEnabled] = createSignal(false);

    const handleSave = () => {
        console.log('Notification preferences saved:', {
            desktop: desktopEnabled(),
            email: emailEnabled(),
        });
        // Logic to submit the form data
        props.onClose();
    };

    // If modal is not open, return null to avoid rendering
    if (!props.isOpen) {
        return null;
    }

    return (
        // Modal Backdrop: Full screen, semi-transparent black
        <Portal>
            <Show when={props.isOpen()}>
                <div
                    class="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-70 transition-opacity p-4"
                    onClick={props.onClose} // Close on backdrop click
                    classList={{
                        'modal-overlay': true,
                        active: props.isOpen(),
                    }}
                >
                    {/* Modal Content Container */}
                    {/* [width: 736px; padding: 24px 32px; border-radius: 16px] */}
                    <div
                        class="w-full max-w-2xl bg-white rounded-2xl shadow-2xl flex flex-col gap-6 p-6 md:p-8"
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
                    >
                        {/* --- Close Button --- */}
                        {/* Placed at the top-right corner */}
                        <div class="flex justify-end w-full">
                            <button
                                onClick={props.onClose}
                                class="p-1 rounded-full text-gray-700 hover:bg-gray-100 transition-colors"
                                aria-label="Close modal"
                            >
                                <CloseIcon />
                            </button>
                        </div>

                        {/* --- Content / Settings --- */}
                        <div class="flex flex-col gap-6 w-full">
                            <div class="flex flex-col gap-8 w-full">
                                {/* 1. Desktop Notification Section */}
                                <div class="flex flex-col gap-3">
                                    {/* Title: [font-size: 20px; font-weight: 500] */}
                                    <h3 class="text-xl font-medium text-gray-900">
                                        Desktop notification
                                    </h3>

                                    {/* Toggle Row */}
                                    <NotificationToggle
                                        label="Send notifications to my computer"
                                        enabled={desktopEnabled()}
                                        onChange={setDesktopEnabled}
                                    />
                                </div>

                                {/* 2. Email Notification Section */}
                                <div class="flex flex-col gap-3">
                                    {/* Title: [font-size: 20px; font-weight: 500] */}
                                    <h3 class="text-xl font-medium text-gray-900">
                                        Email notification
                                    </h3>

                                    {/* Toggle Row */}
                                    <NotificationToggle
                                        label="Send all notification by email"
                                        enabled={emailEnabled()}
                                        onChange={setEmailEnabled}
                                    />
                                </div>
                            </div>

                            {/* --- Footer Buttons --- */}
                            {/* [padding-top: 20px; border-top: 1px #CDD5DF solid] */}
                            <div class="flex justify-end items-center gap-4 pt-5 border-t border-gray-300 w-full">
                                {/* Cancel Button */}
                                {/* [outline: 1px #1376A1 solid; color: #1376A1] */}
                                <button
                                    onClick={props.onClose}
                                    class="py-3 px-6 border border-blue-700 text-blue-700 font-semibold rounded-lg hover:bg-blue-50 transition-colors text-base"
                                >
                                    Cancel
                                </button>

                                {/* Save Button */}
                                {/* [background: #1376A1; color: white] */}
                                <button
                                    onClick={handleSave}
                                    class="py-3 px-6 bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:bg-blue-800 transition-colors text-base"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Show>
        </Portal>
    );
};
