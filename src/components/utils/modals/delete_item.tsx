import { Accessor, Component, Setter, Show } from "solid-js";
import { Portal } from "solid-js/web";

export const DeleteItemModal: Component<{
  isOpen: Accessor<boolean>;
  continueDeletion: Setter<boolean>;
  deleteListing: () => Promise<void>;
  message?: string;
}> = (props) => {
  return (
    <Portal>
      <Show when={props.isOpen()}>
        <div
          // class="bg-white p-6 rounded-lg shadow-xl max-w-sm mx-auto"
          classList={{ "modal-overlay": true, active: props.isOpen() }}
          class="fixed inset-0 bg-gray-200 bg-opacity-75 flex items-center justify-center p-4 transition-opacity duration-300 ease-out z-[9999]"
        >
          <div class="text-center">
            <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
              <svg
                class="h-6 w-6 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                ></path>
              </svg>
            </div>
            <h3 class="text-lg leading-6 font-medium text-gray-900 mb-2">
              Confirm Deletion
            </h3>
            <p class="text-sm text-gray-500 mb-4">
              {props.message
                ? props.message
                : "Are you sure you want to delete this item? This action cannot be undone"}
            </p>

            <div class="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
              <button
                type="button"
                class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:col-start-2 sm:text-sm"
                onClick={() => props.deleteListing()}
              >
                Delete
              </button>
              <button
                type="button"
                class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                onClick={() => props.continueDeletion(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Show>
    </Portal>
  );
};
