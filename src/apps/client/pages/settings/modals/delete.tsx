import { Accessor, Setter, Show } from 'solid-js';
import { Portal } from 'solid-js/web';

/**
 * @param props.isOpen - Signal indicating if the modal should be visible.
 * @param props.onConfirm - Function to call when the user confirms the delete action.
 * @param props.onClose - Function to call when the modal needs to be dismissed (Cancel/Backdrop Click).
 */
export const DeleteAccountConfirmationModal = (props: {
    onConfirm: () => void;
    onClose: () => void;
    isOpen: Accessor<boolean>;
    closeModal: Setter<boolean>;
}) => {
    // If modal is not open, return null to avoid rendering
    if (!props.isOpen) {
        return null;
    }

    // Handler for the delete button
    const handleDelete = () => {
        props.onConfirm();
    };

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
                    {/* [padding: 24px 32px; border-radius: 16px] - Simplified to a max width container */}
                    <div
                        class="w-full max-w-sm p-8 bg-white rounded-2xl shadow-2xl flex flex-col gap-10"
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
                    >
                        {/* --- Content / Text --- */}
                        <div class="flex flex-col gap-3 w-full">
                            {/* Title: [font-size: 20px; font-weight: 500] */}
                            <h2 class="text-xl font-medium text-gray-900 text-center">
                                Are you sure?
                            </h2>

                            {/* Subtitle: [font-size: 14px; font-weight: 400] */}
                            <p class="text-sm font-normal text-gray-700 text-center">
                                This will delete your entire **PairProfit**
                                account. This action cannot be undone.
                            </p>
                        </div>

                        {/* --- Buttons --- */}
                        <div class="flex flex-col sm:flex-row justify-between items-center gap-4 w-full">
                            {/* Cancel Button */}
                            {/* [background: #E3E8EF; color: #9AA4B2; border-radius: 8px] */}
                            <button
                                onClick={props.onClose}
                                class="w-full py-3 px-4 bg-gray-200 text-gray-500 font-semibold rounded-lg hover:bg-gray-300 transition-colors text-base"
                            >
                                Cancel
                            </button>

                            {/* Delete Button */}
                            {/* [background: #EA4335; color: white; border-radius: 8px] */}
                            <button
                                onClick={handleDelete}
                                class="w-full py-3 px-4 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition-colors text-base"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </Show>
        </Portal>
    );
};
