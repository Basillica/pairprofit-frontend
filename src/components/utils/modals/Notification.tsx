import {
  createSignal,
  createEffect,
  onCleanup,
  Show,
  Component,
  Accessor,
} from "solid-js";
import { Portal } from "solid-js/web"; // Correct import for createPortal

type NotificationType = "success" | "warning" | "error";

interface NotificationBarProps {
  type: Accessor<NotificationType | null>; // Accessor for dynamic type
  message: Accessor<string | null>; // Accessor for dynamic message
  duration?: number; // Optional duration in milliseconds
}

export const NotificationBar: Component<NotificationBarProps> = (props) => {
  const [isVisible, setIsVisible] = createSignal(false);
  let timeoutId: number | NodeJS.Timeout | undefined; // To store the timeout ID for clearing

  createEffect(() => {
    const currentType = props.type();
    const currentMessage = props.message();

    // If both type and message are provided, show the notification
    if (currentType && currentMessage) {
      // Clear any existing timeout to avoid conflicts
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      setIsVisible(true);

      // Set a new timeout to hide the notification
      timeoutId = setTimeout(() => {
        setIsVisible(false);
        // Optionally, reset parent state here if necessary after hiding
        // e.g., props.type(null); props.message(null);
      }, props.duration ?? 5000); // Default to 5 seconds
    } else {
      // If no type or message, ensure it's hidden
      setIsVisible(false);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    }
  });

  onCleanup(() => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  });

  const getIconSvg = (type: NotificationType) => {
    switch (type) {
      case "success":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="w-6 h-6 text-green-500"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        );
      case "warning":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="w-6 h-6 text-yellow-500"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        );
      case "error":
      default:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="w-6 h-6 text-red-500"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        );
    }
  };

  const getClasses = (type: NotificationType) => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-400 text-green-800";
      case "warning":
        return "bg-yellow-50 border-yellow-400 text-yellow-800";
      case "error":
      default:
        return "bg-red-50 border-red-400 text-red-800";
    }
  };

  return (
    <Portal>
      <Show when={isVisible() && props.type() && props.message()}>
        <div
          class={`
            fixed top-10 left-1/2 -translate-x-1/2 w-full max-w-lg
            border rounded-lg shadow-lg
            p-4 mt-4
            flex items-center space-x-3
            z-50
            transition-all duration-300 ease-in-out
            ${
              isVisible()
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-full"
            }
            ${getClasses(props.type()!)}
        `}
          role="alert"
          aria-live="polite"
        >
          <div class="flex-shrink-0">
            {getIconSvg(props.type()!)} {/* Render the specific icon */}
          </div>
          <div class="flex-grow text-sm font-medium">
            {props.message()} {/* Display the message */}
          </div>
        </div>
      </Show>
    </Portal>
  );
};
