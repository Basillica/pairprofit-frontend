import { createSignal, For } from 'solid-js';
import css_module from './style.module.css';
import { AddEditEventModal } from './edit'; // Import the new modal component
import { v4 as uuidv4 } from 'uuid'; // For unique IDs, install if you haven't: npm install uuid @types/uuid

interface CalendarEvent {
    id: string; // Now always present after creation
    name: string;
    date: string; // YYYY-MM-DD
    time?: string; // HH:MM AM/PM (e.g., "10 AM")
    color: string; // Tailwind color class (e.g., "bg-green-200")
    textColor: string; // Tailwind color class (e.g., "text-green-800")
    durationDays?: number; // For multi-day events, default to 1
    hasUrl?: boolean; // For "Event With Url"
}

export const Calendar = () => {
    const today = new Date();
    const [currentDate, setCurrentDate] = createSignal(new Date(2025, 4, 1)); // Start at May 2025 as per image
    const [events, setEvents] = createSignal<CalendarEvent[]>([
        {
            id: uuidv4(),
            name: 'Boot Camp',
            date: '2025-05-01',
            color: 'bg-green-200',
            textColor: 'text-green-800',
        },
        {
            id: uuidv4(),
            name: '10 AM Meeting',
            date: '2025-05-07',
            time: '10 AM',
            color: 'bg-blue-200',
            textColor: 'text-blue-800',
        },
        {
            id: uuidv4(),
            name: "Craint's New York Business",
            date: '2025-05-11',
            durationDays: 1,
            color: 'bg-blue-200',
            textColor: 'text-blue-800',
        },
        {
            id: uuidv4(),
            name: '10 AM Meeting',
            date: '2025-05-14',
            time: '10 AM',
            color: 'bg-blue-200',
            textColor: 'text-blue-800',
        },
        {
            id: uuidv4(),
            name: 'ICT Expo 2025 - Product Release',
            date: '2025-05-16',
            durationDays: 2,
            color: 'bg-orange-200',
            textColor: 'text-orange-800',
        },
        {
            id: uuidv4(),
            name: 'ICT Expo 2025 - Product Release',
            date: '2025-05-18',
            durationDays: 1,
            color: 'bg-orange-200',
            textColor: 'text-orange-800',
        },
        {
            id: uuidv4(),
            name: 'Event With Url',
            date: '2025-05-23',
            hasUrl: true,
            color: 'bg-green-200',
            textColor: 'text-green-800',
        },
        {
            id: uuidv4(),
            name: 'Meeting',
            date: '2025-05-26',
            color: 'bg-red-200',
            textColor: 'text-red-800',
        },
        {
            id: uuidv4(),
            name: 'Conference',
            date: '2025-05-29',
            color: 'bg-green-200',
            textColor: 'text-green-800',
        },
        {
            id: uuidv4(),
            name: '11 AM Reporting',
            date: '2025-05-29',
            time: '11 AM',
            color: 'bg-blue-200',
            textColor: 'text-blue-800',
        },
    ]);

    // --- Modal State ---
    const [showAddEditModal, setShowAddEditModal] = createSignal(false);
    const [editingEvent, setEditingEvent] = createSignal<CalendarEvent | null>(
        null
    );
    const [initialDateForNewEvent, setInitialDateForNewEvent] =
        createSignal<string>(''); // For clicking on empty day

    const getDaysInMonth = (year: number, month: number) =>
        new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year: number, month: number) =>
        new Date(year, month, 1).getDay(); // 0 for Sunday, 6 for Saturday

    const getCalendarDays = () => {
        const year = currentDate().getFullYear();
        const month = currentDate().getMonth(); // 0-indexed

        const numDays = getDaysInMonth(year, month);
        const firstDayIndex = getFirstDayOfMonth(year, month); // Day of week (0=Sun, 6=Sat)

        const prevMonthNumDays = getDaysInMonth(year, month - 1);

        const days = [];

        // Days from previous month
        for (let i = 0; i < firstDayIndex; i++) {
            const day = prevMonthNumDays - firstDayIndex + i + 1;
            const prevMonthDate = new Date(year, month - 1, day);
            days.push({
                date: prevMonthDate,
                isCurrentMonth: false,
                isToday: false,
                events: getEventsForDate(prevMonthDate),
            });
        }

        // Days of current month
        for (let i = 1; i <= numDays; i++) {
            const currentMonthDate = new Date(year, month, i);
            days.push({
                date: currentMonthDate,
                isCurrentMonth: true,
                isToday: isSameDay(currentMonthDate, today),
                events: getEventsForDate(currentMonthDate),
            });
        }

        // Days from next month (fill up to 6 weeks)
        const totalCells = days.length;
        const remainingCells =
            totalCells < 35 ? 35 - totalCells : 42 - totalCells; // Ensure at least 5 rows, up to 6 rows

        for (let i = 1; i <= remainingCells; i++) {
            const nextMonthDate = new Date(year, month + 1, i);
            days.push({
                date: nextMonthDate,
                isCurrentMonth: false,
                isToday: false,
                events: getEventsForDate(nextMonthDate),
            });
        }

        return days;
    };

    const isSameDay = (d1: Date, d2: Date) => {
        return (
            d1.getFullYear() === d2.getFullYear() &&
            d1.getMonth() === d2.getMonth() &&
            d1.getDate() === d2.getDate()
        );
    };

    const getEventsForDate = (date: Date): CalendarEvent[] => {
        const dateString = date.toISOString().slice(0, 10);
        return events()
            .filter((event) => {
                const eventDate = new Date(event.date);
                // Adjust eventDate to start of day in local timezone for accurate comparison
                eventDate.setHours(0, 0, 0, 0);
                const comparisonDate = new Date(date);
                comparisonDate.setHours(0, 0, 0, 0);

                if (event.durationDays && event.durationDays > 1) {
                    const endDate = new Date(eventDate);
                    endDate.setDate(
                        eventDate.getDate() + event.durationDays - 1
                    );
                    endDate.setHours(0, 0, 0, 0);
                    return (
                        comparisonDate >= eventDate && comparisonDate <= endDate
                    );
                }
                return event.date === dateString;
            })
            .sort((a, b) => {
                if (a.time && b.time) return a.time.localeCompare(b.time);
                if (a.time) return -1;
                if (b.time) return 1;
                return 0;
            });
    };

    const navigateMonth = (direction: 'prev' | 'next') => {
        setCurrentDate((prev) => {
            const newDate = new Date(prev);
            newDate.setMonth(
                newDate.getMonth() + (direction === 'next' ? 1 : -1)
            );
            return newDate;
        });
    };

    const goToToday = () => {
        setCurrentDate(new Date());
    };

    const getMonthName = (date: Date) => {
        return date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
    };

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // --- Event Handlers for Modal ---
    const handleAddScheduleClick = () => {
        setEditingEvent(null); // No event selected for editing
        setInitialDateForNewEvent(today.toISOString().slice(0, 10)); // Default to today
        setShowAddEditModal(true);
    };

    const handleDayCellClick = (date: Date) => {
        setEditingEvent(null); // No event selected for editing
        setInitialDateForNewEvent(date.toISOString().slice(0, 10));
        setShowAddEditModal(true);
    };

    const handleEventClick = (event: CalendarEvent, e: Event) => {
        e.stopPropagation(); // Prevent handleDayCellClick from firing
        setEditingEvent(event);
        setShowAddEditModal(true);
    };

    const handleSaveEvent = (
        eventData: Omit<CalendarEvent, 'id'> & { id?: string }
    ) => {
        if (eventData.id) {
            // Update existing event
            setEvents((prev) =>
                prev.map((e) =>
                    e.id === eventData.id
                        ? ({ ...eventData, id: e.id } as CalendarEvent)
                        : e
                )
            );
        } else {
            // Add new event
            setEvents((prev) => [
                ...prev,
                { ...eventData, id: uuidv4() } as CalendarEvent,
            ]);
        }
    };

    const handleDeleteEvent = (id: string) => {
        setEvents((prev) => prev.filter((e) => e.id !== id));
    };

    const handleCloseModal = () => {
        setShowAddEditModal(false);
        setEditingEvent(null); // Clear editing event state
        setInitialDateForNewEvent(''); // Clear initial date
    };

    return (
        <div class="min-h-screen bg-gray-100 p-4 font-sans antialiased">
            <div class="mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
                <div class="p-4 border-b border-gray-200 flex flex-wrap justify-between items-center bg-gray-50">
                    <div class="flex items-center space-x-3 mb-3 md:mb-0">
                        <button
                            class="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-sm"
                            onClick={handleAddScheduleClick}
                        >
                            <i class="fas fa-plus mr-2"></i> Add Schedule
                        </button>
                        <div class="flex items-center text-gray-700 text-xl font-semibold">
                            <button
                                class="p-2 hover:bg-gray-200 rounded-full text-gray-500"
                                onClick={() => navigateMonth('prev')}
                            >
                                <i class="fas fa-arrow-left"></i>
                            </button>
                            <span class="mx-3">
                                {getMonthName(currentDate())}
                            </span>
                            <button
                                class="p-2 hover:bg-gray-200 rounded-full text-gray-500"
                                onClick={() => navigateMonth('next')}
                            >
                                <i class="fas fa-arrow-right"></i>
                            </button>
                        </div>
                    </div>
                    <div class="flex items-center space-x-2">
                        <button class="px-3 py-1.5 border border-gray-300 rounded-md text-gray-700 text-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                            Month View
                        </button>
                        <button
                            class="px-3 py-1.5 border border-gray-300 rounded-md text-blue-500 font-semibold text-sm hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                            onClick={goToToday}
                        >
                            Today
                        </button>
                    </div>
                </div>

                {/* Day Headers */}
                <div class="grid grid-cols-7 text-center font-medium text-gray-600 border-b border-gray-200">
                    <For each={daysOfWeek}>
                        {(day) => (
                            <div class="py-2.5 px-1 bg-gray-50 text-sm">
                                {day}
                            </div>
                        )}
                    </For>
                </div>

                {/* Calendar Grid */}
                <div class="grid grid-cols-7 min-h-[calc(100vh-200px)]">
                    {' '}
                    {/* Adjust height based on header/footer */}
                    <For each={getCalendarDays()}>
                        {(day) => (
                            <div
                                class={`${css_module.calendar_day_cell} ${
                                    day.isCurrentMonth
                                        ? ''
                                        : 'bg-gray-50 text-gray-400'
                                } ${
                                    day.isToday ? css_module.today_cell : ''
                                } relative`}
                                onClick={() => handleDayCellClick(day.date)}
                            >
                                <div
                                    class={`absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-full text-sm font-semibold ${
                                        day.isToday && day.isCurrentMonth
                                            ? 'bg-blue-500 text-white'
                                            : ''
                                    }`}
                                >
                                    {day.date.getDate()}
                                </div>
                                <div class="mt-8 px-2 pb-2 overflow-hidden flex-grow text-xs space-y-1">
                                    <For each={day.events.slice(0, 3)}>
                                        {(event) => (
                                            <div
                                                class={`${event.color} ${event.textColor} rounded px-1 py-0.5 whitespace-nowrap overflow-hidden text-ellipsis cursor-pointer hover:shadow-md`}
                                                title={`${
                                                    event.time
                                                        ? event.time + ' '
                                                        : ''
                                                }${event.name}`}
                                                onClick={(e) =>
                                                    handleEventClick(event, e)
                                                }
                                            >
                                                {event.time && (
                                                    <span class="mr-1">
                                                        {event.time}
                                                    </span>
                                                )}
                                                {event.name}
                                            </div>
                                        )}
                                    </For>
                                    {day.events.length > 3 && (
                                        <div class="text-blue-500 font-medium cursor-pointer">
                                            +{day.events.length - 3} more
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </For>
                </div>
            </div>

            <AddEditEventModal
                show={showAddEditModal()}
                event={
                    editingEvent() ||
                    (initialDateForNewEvent()
                        ? {
                              date: initialDateForNewEvent(),
                              color: 'bg-blue-200',
                              textColor: 'text-blue-800',
                          }
                        : null)
                }
                onSave={handleSaveEvent}
                onDelete={handleDeleteEvent}
                onClose={handleCloseModal}
            />
        </div>
    );
};
