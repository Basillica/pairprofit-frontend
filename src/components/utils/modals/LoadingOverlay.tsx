import { Show, Component } from 'solid-js';
import { Portal } from 'solid-js/web';

interface LoadingOverlayProps {
    isLoading: boolean;
}

export const LoadingOverlay: Component<LoadingOverlayProps> = (props) => {
    return (
        <Portal>
            <Show when={props.isLoading}>
                <div
                    class="
            fixed inset-0 z-[9999]
            flex items-center justify-center
            bg-white-200
        "
                    aria-modal="true"
                    role="dialog"
                >
                    <div
                        class="
                w-[300px] h-[300px]
                flex items-center justify-center
                pointer-events-auto
            "
                    >
                        <svg
                            class="animate-spin h-20 w-20 text-blue-500"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                class="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                stroke-width="4"
                            ></circle>
                            <path
                                class="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                        </svg>
                    </div>
                </div>
            </Show>
        </Portal>
    );
};
