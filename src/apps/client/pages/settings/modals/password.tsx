import { Accessor, createSignal, Setter, Show } from 'solid-js';
import { Portal } from 'solid-js/web';

// --- ICONS & REUSABLE COMPONENTS ---

// 1. Close Icon (X)
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

// 2. Eye/Eye-off Icons (for password visibility toggle)
const EyeIcon = (props: { isVisible: boolean }) => (
    <Show
        when={props.isVisible}
        fallback={
            // Eye-off (Hidden)
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="#697586"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="w-5 h-5"
            >
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.46m-1.25-1.25A10.07 10.07 0 0 1 12 4c7 0 11 8 11 8a18.45 18.45 0 0 1-5.06 5.46"></path>
                <line x1="1" y1="1" x2="23" y2="23"></line>
            </svg>
        }
    >
        {/* Eye (Visible) - simplified to match the basic shape in the mockup */}
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="#697586"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="w-5 h-5"
        >
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
        </svg>
    </Show>
);

// 3. Specialized Password Input Field
const PasswordInputField = (props: {
    label: string;
    value: string;
    placeholder: string;
    onChange: (v: string) => void;
}) => {
    const [isVisible, setIsVisible] = createSignal(false);

    return (
        // [height: 80px; gap: 8px]
        <div class="flex flex-col gap-2 w-full">
            {/* Label: [font-size: 16px; font-weight: 500] */}
            <label class="text-base font-medium text-gray-800">
                {props.label}
            </label>

            {/* Input Field Container: [height: 46px; padding: 12px; border-radius: 8px; outline: 1px #CDD5DF solid] */}
            <div class="h-11 w-full p-3 border border-gray-300 rounded-lg flex items-center justify-between transition-shadow focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
                {/* Input element */}
                <input
                    type={isVisible() ? 'text' : 'password'}
                    value={props.value}
                    onInput={(e) => props.onChange(e.currentTarget.value)}
                    placeholder={props.placeholder}
                    // [font-size: 14px; color: #697586]
                    class="w-full bg-transparent outline-none text-sm text-gray-700 placeholder-gray-500"
                />

                {/* Visibility Toggle Button */}
                <button
                    onClick={() => setIsVisible(!isVisible())}
                    type="button"
                    class="ml-2 flex-shrink-0 text-gray-600 hover:text-gray-900 transition-colors"
                    aria-label={isVisible() ? 'Hide password' : 'Show password'}
                >
                    <EyeIcon isVisible={isVisible()} />
                </button>
            </div>
        </div>
    );
};

// --- MAIN MODAL COMPONENT ---
/**
 * @param props.isOpen - Signal indicating if the modal should be visible.
 * @param props.onClose - Function to call when the modal needs to be dismissed.
 */
export const ChangePasswordModal = (props: {
    onClose: () => void;
    isOpen: Accessor<boolean>;
    closeModal: Setter<boolean>;
}) => {
    const [currentPassword, setCurrentPassword] = createSignal('');
    // In a real implementation, you would need New and Confirm Password fields.
    // const [newPassword, setNewPassword] = createSignal('');
    // const [confirmPassword, setConfirmPassword] = createSignal('');

    const handleSave = () => {
        // Implement password change logic here
        if (currentPassword().length < 8) {
            alert('Please enter your current password.');
            return;
        }
        // Save logic...
        alert('Password change initiated (not yet implemented).');
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
                    {/* [width: 592px; padding: 32px 32px 24px 24px; border-radius: 12px] */}
                    <div
                        class="w-full max-w-xl bg-white rounded-xl shadow-2xl flex flex-col gap-8 p-6 md:p-8"
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
                    >
                        {/* --- Header --- */}
                        <div class="flex justify-between items-center w-full">
                            {/* Title: [font-size: 24px; font-weight: 500] */}
                            <h2 class="text-2xl font-medium text-gray-900">
                                Change Password
                            </h2>

                            {/* Close Button: [width: 28px; height: 28px] */}
                            <button
                                onClick={props.onClose}
                                class="p-1 rounded-full text-gray-700 hover:bg-gray-100 transition-colors"
                                aria-label="Close modal"
                            >
                                <CloseIcon />
                            </button>
                        </div>

                        {/* --- Content / Form --- */}
                        <div class="flex flex-col gap-6 w-full">
                            {/* Password Input Field (Current Password in a real app) */}
                            {/* The mockup shows only one field labeled "Password" */}
                            <PasswordInputField
                                label="Password"
                                value={currentPassword()}
                                placeholder="Ayanfe1234"
                                onChange={setCurrentPassword}
                            />

                            {/* Note for the user that a full security implementation needs all three */}
                            <p class="text-xs text-gray-500 -mt-3">
                                **Note:** For a production environment, this
                                should be three fields: Current, New, and
                                Confirm Password.
                            </p>

                            {/* Save Button */}
                            <div class="flex justify-end pt-2">
                                {/* Button: [padding: 12px 16px; background: #1376A1; border-radius: 8px] */}
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
