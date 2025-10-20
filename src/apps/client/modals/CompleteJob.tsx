import { Accessor, Setter, Show, type Component } from 'solid-js';
import { Portal } from 'solid-js/web';

const Icons = {
    // A simple Warning/Info Icon for the red banner
    Info: (props: { class?: string }) => (
        <svg
            // width="28"
            // height="32"
            // viewBox="0 0 28 32"
            class={props.class}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M10 8V12.1667"
                stroke="#EA4335"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M9.99986 18.3416H4.94986C2.0582 18.3416 0.849863 16.275 2.24986 13.75L4.84986 9.06665L7.29986 4.66665C8.7832 1.99165 11.2165 1.99165 12.6999 4.66665L15.1499 9.07498L17.7499 13.7583C19.1499 16.2833 17.9332 18.35 15.0499 18.35H9.99986V18.3416Z"
                stroke="#EA4335"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M9.99512 14.6667H10.0026"
                stroke="#EA4335"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
    ),
    // Small dot icon for list items
    Dot: (props: { class?: string }) => (
        <div
            class={
                props.class || 'w-5 h-5 bg-gray-900 rounded-full flex-shrink-0'
            }
        />
    ),
};

// Define custom colors
const TAILWIND_PRIMARY_BLUE = 'text-[#1376A1] bg-[#1376A1] border-[#1376A1]';
const TAILWIND_RED = 'border-[#EA4335] text-[#EA4335]';

// --- Main Component ---

export const MarkJobCompleteModal: Component<{
    onConfirm: () => void;
    onCancel: () => void;
    isOpen: Accessor<boolean>;
    closeModal: Setter<boolean>;
    // Note: Pass isOpen control from the parent Modal component
}> = (props) => {
    return (
        // Outer container: Responsive width and padding
        // Max width set to control size on web; padding adjusts for mobile/web
        <Portal>
            <Show when={props.isOpen()}>
                <div
                    class="flex justify-center p-4 h-screen overflow-y-auto"
                    classList={{
                        'modal-overlay': true,
                        active: props.isOpen(),
                    }}
                >
                    <div class="w-full max-w-sm sm:max-w-md lg:max-w-lg mx-auto p-6 sm:p-8 md:p-10 bg-white rounded-2xl shadow-xl flex flex-col gap-8 sm:gap-12">
                        {/* Title */}
                        <h2 class="text-xl sm:text-2xl font-semibold text-gray-900 text-center leading-normal">
                            Are you sure you want to mark this job as complete?
                        </h2>

                        {/* Content Section */}
                        <div class="flex flex-col gap-6 sm:gap-8 w-full">
                            {/* Warning Banner */}
                            <div
                                class={`flex items-start p-4 border-l-4 ${TAILWIND_RED} bg-red-50 border border-t border-r border-b rounded-lg w-full`}
                            >
                                <Icons.Info
                                    class={`mt-3 w-8 h-8 ${TAILWIND_RED}`}
                                />
                                <p class="ml-3 text-xs sm:text-sm text-gray-700 leading-relaxed">
                                    Once marked as complete, this job will be
                                    closed and payment will be released to the
                                    artisan.
                                </p>
                            </div>

                            {/* Consequences List */}
                            <div class="flex flex-col gap-3 sm:gap-4 w-full">
                                <h3 class="text-base sm:text-lg font-semibold text-gray-900 leading-relaxed">
                                    Marking this job as complete will:
                                </h3>

                                <ul class="flex flex-col gap-2 sm:gap-3 list-none p-0 m-0">
                                    {/* List Item 1 */}
                                    <li class="flex items-start gap-2">
                                        <div style="width: 6px; height: 6px; background: #121926; border-radius: 9999px; margin-top: 8px"></div>
                                        <p class="text-sm text-gray-700 leading-relaxed">
                                            Release the agreed payment to the
                                            artisan.
                                        </p>
                                    </li>
                                    {/* List Item 2 */}
                                    <li class="flex items-start gap-2">
                                        <div style="width: 6px; height: 6px; background: #121926; border-radius: 9999px; margin-top: 8px"></div>
                                        <p class="text-sm text-gray-700 leading-relaxed">
                                            Allow you to rate and review the
                                            artisan's work.
                                        </p>
                                    </li>
                                    {/* List Item 3 */}
                                    <li class="flex items-start gap-2">
                                        <div style="width: 6px; height: 6px; background: #121926; border-radius: 9999px; margin-top: 8px"></div>
                                        <p class="text-sm text-gray-700 leading-relaxed">
                                            Close the job so no further changes
                                            can be made.
                                        </p>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div class="flex flex-col gap-3 sm:gap-4 w-full">
                            {/* Cancel Button (Secondary Outline) */}
                            <button
                                onClick={props.onCancel}
                                class={`w-full py-3 sm:py-4 bg-white border ${TAILWIND_PRIMARY_BLUE} font-semibold rounded-lg hover:bg-blue-50 transition cursor-pointer`}
                            >
                                Cancel
                            </button>

                            {/* Confirm Button (Primary) */}
                            <button
                                onClick={props.onConfirm}
                                class={`w-full py-3 sm:py-4 text-white font-semibold rounded-lg ${TAILWIND_PRIMARY_BLUE.replace(
                                    'text-',
                                    'bg-'
                                )} hover:bg-opacity-90 transition cursor-pointer`}
                            >
                                Yes, Mark as Complete
                            </button>
                        </div>
                    </div>
                </div>
            </Show>
        </Portal>
    );
};
