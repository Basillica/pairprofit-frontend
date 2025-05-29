import { createSignal, createEffect, Show, For } from "solid-js";

interface AddEditEventModalProps {
  show: boolean;
  event: {
    id?: string; // Optional for new events
    name?: string;
    date?: string; // YYYY-MM-DD
    time?: string;
    color?: string; // Tailwind color class
    textColor?: string; // Tailwind text color class
    durationDays?: number;
    hasUrl?: boolean;
  } | null;
  onSave: (event: Omit<CalendarEvent, "id"> & { id?: string }) => void;
  onDelete?: (id: string) => void; // Optional for edit mode
  onClose: () => void;
}

// Define the CalendarEvent interface here or import it if defined globally
// For this example, let's keep it here for clarity
interface CalendarEvent {
  id: string;
  name: string;
  date: string; // YYYY-MM-DD
  time?: string; // HH:MM AM/PM
  color: string; // Tailwind color class (e.g., "bg-green-200")
  textColor: string; // Tailwind color class (e.g., "text-green-800")
  durationDays?: number;
  hasUrl?: boolean;
}

export const AddEditEventModal = (props: AddEditEventModalProps) => {
  const [eventName, setEventName] = createSignal(props.event?.name || "");
  const [eventDate, setEventDate] = createSignal(props.event?.date || "");
  const [eventTime, setEventTime] = createSignal(props.event?.time || "");
  const [eventDuration, setEventDuration] = createSignal(
    props.event?.durationDays || 1
  );
  const [eventColor, setEventColor] = createSignal(
    props.event?.color || "bg-blue-200"
  );

  // Reset form when modal opens or event prop changes
  createEffect(() => {
    if (props.show) {
      setEventName(props.event?.name || "");
      setEventDate(props.event?.date || "");
      setEventTime(props.event?.time || "");
      setEventDuration(props.event?.durationDays || 1);
      setEventColor(props.event?.color || "bg-blue-200");
    }
  });

  const handleSave = () => {
    if (!eventName() || !eventDate()) {
      alert("Please enter event name and date.");
      return;
    }

    const newEvent: Omit<CalendarEvent, "id"> & { id?: string } = {
      id: props.event?.id, // Keep ID if editing
      name: eventName(),
      date: eventDate(),
      time: eventTime() || undefined,
      durationDays: eventDuration(),
      color: eventColor(),
      textColor: getTextColor(eventColor()), // Derive text color
      hasUrl: false, // For simplicity, assume no URL for now
    };
    props.onSave(newEvent);
    props.onClose();
  };

  const handleDelete = () => {
    if (
      props.event?.id &&
      confirm("Are you sure you want to delete this event?")
    ) {
      props.onDelete?.(props.event.id);
      props.onClose();
    }
  };

  const getTextColor = (bgColor: string) => {
    // Simple logic to choose appropriate text color based on background
    if (bgColor.includes("blue-200")) return "text-blue-800";
    if (bgColor.includes("green-200")) return "text-green-800";
    if (bgColor.includes("red-200")) return "text-red-800";
    if (bgColor.includes("orange-200")) return "text-orange-800";
    if (bgColor.includes("purple-200")) return "text-purple-800";
    return "text-gray-800"; // Default
  };

  const availableColors = [
    { bg: "bg-blue-200", text: "text-blue-800", name: "Blue" },
    { bg: "bg-green-200", text: "text-green-800", name: "Green" },
    { bg: "bg-red-200", text: "text-red-800", name: "Red" },
    { bg: "bg-orange-200", text: "text-orange-800", name: "Orange" },
    { bg: "bg-purple-200", text: "text-purple-800", name: "Purple" },
  ];

  return (
    <Show when={props.show}>
      <div class="fixed inset-0 bg-gray-200 bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
          <h2 class="text-xl font-bold mb-4">
            {props.event ? "Edit Event" : "Add New Event"}
          </h2>
          <div class="space-y-4">
            <div>
              <label
                for="eventName"
                class="block text-sm font-medium text-gray-700 mb-1"
              >
                Event Name
              </label>
              <input
                type="text"
                id="eventName"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={eventName()}
                onInput={(e) => setEventName(e.currentTarget.value)}
                required
              />
            </div>
            <div>
              <label
                for="eventDate"
                class="block text-sm font-medium text-gray-700 mb-1"
              >
                Date
              </label>
              <input
                type="date"
                id="eventDate"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={eventDate()}
                onInput={(e) => setEventDate(e.currentTarget.value)}
                required
              />
            </div>
            <div>
              <label
                for="eventTime"
                class="block text-sm font-medium text-gray-700 mb-1"
              >
                Time (Optional)
              </label>
              <input
                type="text"
                id="eventTime"
                placeholder="e.g., 10 AM or 14:00"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={eventTime()}
                onInput={(e) => setEventTime(e.currentTarget.value)}
              />
            </div>
            <div>
              <label
                for="eventDuration"
                class="block text-sm font-medium text-gray-700 mb-1"
              >
                Duration (Days)
              </label>
              <input
                type="number"
                id="eventDuration"
                min="1"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={eventDuration()}
                onInput={(e) =>
                  setEventDuration(parseInt(e.currentTarget.value))
                }
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Color
              </label>
              <div class="flex flex-wrap gap-2">
                <For each={availableColors}>
                  {(colorOption: any) => (
                    <button
                      type="button"
                      class={`w-8 h-8 rounded-full border-2 ${
                        eventColor() === colorOption.bg
                          ? "border-blue-500 ring-2 ring-blue-200"
                          : "border-gray-300"
                      } ${colorOption.bg}`}
                      onClick={() => setEventColor(colorOption.bg)}
                      title={colorOption.name}
                    ></button>
                  )}
                </For>
              </div>
            </div>
          </div>
          <div class="mt-6 flex justify-end space-x-3">
            <Show when={props.event}>
              <button
                type="button"
                class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 text-sm"
                onClick={handleDelete}
              >
                Delete
              </button>
            </Show>
            <button
              type="button"
              class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 text-sm"
              onClick={props.onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-sm"
              onClick={handleSave}
            >
              Save Event
            </button>
          </div>
        </div>
      </div>
    </Show>
  );
};
