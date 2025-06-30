import { Accessor, Component, createEffect, onCleanup, Show } from "solid-js";
import { Portal } from "solid-js/web";

interface LogoutModalProps {
  isOpen: Accessor<boolean>;
  onConfirm: () => void;
  onCancel: () => void;
}

export const LogoutModal: Component<LogoutModalProps> = (props) => {
  createEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && props.isOpen()) {
        props.onCancel();
      }
    };
    window.addEventListener("keydown", handleEscape);
    onCleanup(() => {
      window.removeEventListener("keydown", handleEscape);
    });
  });

  if (!props.isOpen) {
    return null;
  }

  return (
    <Portal>
      <Show when={props.isOpen()}>
        <div
          class="fixed inset-0 bg-gray-400 bg-opacity-75 flex items-center justify-center p-4 transition-opacity duration-300 ease-out z-[9999]"
          onClick={props.onCancel}
        >
          <div
            class="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm transform transition-all duration-300 ease-out scale-100 opacity-100"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 class="text-xl font-bold text-gray-800 mb-4">Confirm Logout</h2>
            <p class="text-gray-700 mb-6">Are you sure you want to log out?</p>

            <div class="flex justify-end space-x-3">
              <button
                onClick={props.onCancel}
                class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 transition duration-150 ease-in-out"
              >
                Cancel
              </button>
              <button
                onClick={props.onConfirm}
                class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75 transition duration-150 ease-in-out"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </Show>
    </Portal>
  );
};
