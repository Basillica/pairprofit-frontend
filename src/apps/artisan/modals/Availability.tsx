import {
    Accessor,
    Component,
    createMemo,
    createSignal,
    For,
    onCleanup,
    onMount,
    Setter,
    Show,
} from 'solid-js';
import { Portal } from 'solid-js/web';

// Utility function to format YYYY-MM-DD to the desired display format
const formatDateDisplay = (dateStr: string) => {
    if (!dateStr) return 'Select date';
    try {
        const date = new Date(dateStr + 'T00:00:00');
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    } catch (e) {
        return dateStr;
    }
};

// Utility function to format HH:MM (24hr) to HH:MM AM/PM
const formatTimeDisplay = (timeStr: string) => {
    if (!timeStr) return 'Select time';
    try {
        const [hours, minutes] = timeStr.split(':').map(Number);
        const date = new Date(2000, 0, 1, hours, minutes);
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });
    } catch (e) {
        return timeStr;
    }
};

const parseTime = (time24: string) => {
    try {
        const [h, m] = time24.split(':').map(Number);
        const period = h >= 12 ? 'PM' : 'AM';
        const hour12 = h % 12 || 12;
        return {
            hour: String(hour12).padStart(2, '0'),
            minute: String(m).padStart(2, '0'),
            period: period,
            hour24: h,
        };
    } catch {
        return { hour: '12', minute: '00', period: 'AM', hour24: 0 };
    }
};

const formatTime24 = (hour12: string, minute: string, period: string) => {
    let h = parseInt(hour12, 10);
    const m = parseInt(minute, 10);

    if (period === 'PM' && h !== 12) {
        h += 12;
    } else if (period === 'AM' && h === 12) {
        h = 0;
    }

    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
};

const CalendarIcon: Component = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-5 h-5 text-slate-500"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
    >
        <rect x="3" y="4" width="14" height="14" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="4" y1="2" x2="4" y2="6" />
        <line x1="3" y1="9" x2="17" y2="9" />
    </svg>
);

const ClockIcon: Component = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-5 h-5 text-slate-500"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
    >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 15 15" />
    </svg>
);

// --- 2. Custom Date Picker Components (Retained Logic) ---
const NavigationButton: Component<{
    onClick: () => void;
    direction: 'prev' | 'next';
}> = (props) => (
    <button
        onClick={props.onClick}
        style={{
            padding: '8px',
            'border-radius': '4px',
            outline: '0.50px #E3E8EF solid',
            'outline-offset': '-0.50px',
        }}
        class="flex justify-center items-center gap-2 cursor-pointer hover:bg-gray-50 transition"
        aria-label={
            props.direction === 'prev' ? 'Previous month' : 'Next month'
        }
    >
        <ArrowIcon direction={props.direction === 'prev' ? 'left' : 'right'} />
    </button>
);

interface DayCellData {
    day: number;
    date: string; // YYYY-MM-DD
    isCurrentMonth: boolean;
}

const DayCell: Component<
    DayCellData & { onSelect: (date: string) => void; isSelected: boolean }
> = (props) => (
    <button
        class="flex justify-center items-center flex-shrink-0 cursor-pointer transition-colors"
        classList={{
            'opacity-50 cursor-default hover:bg-white': !props.isCurrentMonth,
            'hover:bg-gray-100': props.isCurrentMonth && !props.isSelected,
        }}
        onClick={() => props.isCurrentMonth && props.onSelect(props.date)}
        disabled={!props.isCurrentMonth}
        style={{
            padding: '9.60px',
            'border-radius': props.isSelected ? '68.19px' : '3.07px',
            background: props.isSelected ? '#1376A1' : 'white',
            width: '38.41px',
            height: '38.41px',
            'font-size': '12px',
            'font-weight': '600',
            'line-height': '19.20px',
            color: !props.isCurrentMonth
                ? '#9AA4B2'
                : props.isSelected
                ? 'white'
                : '#364152',
        }}
    >
        {props.day}
    </button>
);

const WeekdayHeader: Component<{ day: string }> = (props) => (
    <div
        style={{
            padding: '9.60px',
            'border-radius': '68.19px',
            width: '38.41px',
            height: '38.41px',
            'font-size': '12px',
            'font-weight': '600',
            'line-height': '19.20px',
            color: '#1376A1',
        }}
        class="flex justify-center items-center flex-shrink-0"
    >
        {props.day}
    </div>
);

const getCalendarGrid = (date: Date): DayCellData[][] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const startWeekDay = (firstDayOfMonth.getDay() + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days: DayCellData[] = [];
    const prevMonthDays = new Date(year, month, 0).getDate();

    // Previous Month Days (Padding)
    for (let i = startWeekDay - 1; i >= 0; i--) {
        const day = prevMonthDays - i;
        const prevMonthDate = new Date(year, month - 1, day);
        days.push({
            day,
            date: prevMonthDate.toISOString().split('T')[0],
            isCurrentMonth: false,
        });
    }

    // Current Month Days
    for (let day = 1; day <= daysInMonth; day++) {
        const currentMonthDay = new Date(year, month, day);
        days.push({
            day,
            date: currentMonthDay.toISOString().split('T')[0],
            isCurrentMonth: true,
        });
    }

    // Next Month Days (Padding)
    let dayCount = 1;
    while (days.length % 7 !== 0) {
        const nextMonthDate = new Date(year, month + 1, dayCount);
        days.push({
            day: dayCount,
            date: nextMonthDate.toISOString().split('T')[0],
            isCurrentMonth: false,
        });
        dayCount++;
    }

    const weeks = [];
    for (let i = 0; i < days.length; i += 7) {
        weeks.push(days.slice(i, i + 7));
    }
    return weeks;
};

const CustomDatePickerDropdown: Component<{
    dateValue: string;
    onSelect: (date: string) => void;
    onClose: () => void;
}> = (props) => {
    const initialDate = props.dateValue
        ? new Date(props.dateValue)
        : new Date();
    initialDate.setDate(1);
    const [currentDate, setCurrentDate] = createSignal(initialDate);
    const WEEKDAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
    const calendarGrid = createMemo(() => getCalendarGrid(currentDate()));
    const monthYearDisplay = createMemo(() =>
        currentDate().toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric',
        })
    );

    const goToPreviousMonth = () => {
        setCurrentDate((prev) => {
            const newDate = new Date(prev);
            newDate.setMonth(newDate.getMonth() - 1);
            return newDate;
        });
    };

    const goToNextMonth = () => {
        setCurrentDate((prev) => {
            const newDate = new Date(prev);
            newDate.setMonth(newDate.getMonth() + 1);
            return newDate;
        });
    };

    const handleDaySelect = (date: string) => {
        props.onSelect(date);
        props.onClose(); // Close picker on selection
    };

    return (
        <div
            class="absolute z-30 mt-2 right-0 bg-white shadow-xl rounded-xl flex flex-col items-center"
            style={{
                padding: '16px 24px',
                'box-shadow': '0px 12px 32px rgba(117, 117, 117, 0.16)',
                gap: '16px',
            }}
        >
            <div class="flex justify-center items-center gap-4">
                <NavigationButton
                    direction="prev"
                    onClick={goToPreviousMonth}
                />
                <div class="text-[#1376A1] text-base font-medium leading-loose">
                    {monthYearDisplay()}
                </div>
                <NavigationButton direction="next" onClick={goToNextMonth} />
            </div>

            <div class="flex flex-col items-center self-stretch">
                <div
                    class="flex justify-start items-center"
                    style={{
                        gap: '11.53px',
                        'padding-top': '5.76px',
                        'padding-bottom': '5.76px',
                    }}
                >
                    <For each={WEEKDAYS}>
                        {(day) => <WeekdayHeader day={day} />}
                    </For>
                </div>

                <Show when={calendarGrid()}>
                    <For each={calendarGrid()!}>
                        {(week) => (
                            <div
                                class="flex justify-start items-center"
                                style={{
                                    gap: '11.53px',
                                    'padding-top': '5.76px',
                                    'padding-bottom': '5.76px',
                                }}
                            >
                                <For each={week}>
                                    {(dayData) => (
                                        <DayCell
                                            day={dayData.day}
                                            date={dayData.date}
                                            isCurrentMonth={
                                                dayData.isCurrentMonth
                                            }
                                            isSelected={
                                                dayData.date === props.dateValue
                                            }
                                            onSelect={handleDaySelect}
                                        />
                                    )}
                                </For>
                            </div>
                        )}
                    </For>
                </Show>
            </div>
        </div>
    );
};

// --- 3. Custom Time Picker Dropdown (Retained Logic) ---

const TimeSegment: Component<{
    value: string;
    isSelected: boolean;
    onSelect: () => void;
}> = (props) => (
    <button
        onClick={props.onSelect}
        class="w-[39px] px-2.5 py-1 flex flex-col justify-center items-center cursor-pointer transition-colors"
        style={{
            background: props.isSelected ? '#1376A1' : 'transparent',
            'border-radius': '2px',
        }}
    >
        <div
            class="self-stretch text-sm font-normal leading-normal"
            style={{
                color: props.isSelected ? 'white' : '#202939',
            }}
        >
            {props.value}
        </div>
    </button>
);

const TimeColumn: Component<{
    label: 'hour' | 'minute' | 'period';
    currentValue: string;
    options: string[];
    onSelect: (value: string) => void;
}> = (props) => (
    <div
        class="flex flex-col justify-start items-center gap-1 overflow-y-scroll h-[220px] scroll-smooth"
        style={{ '-ms-overflow-style': 'none', 'scrollbar-width': 'none' }}
        classList={{
            'w-[59px]': props.label !== 'period',
            'w-[50px]': props.label === 'period',
        }}
    >
        <For each={props.options}>
            {(option) => (
                <TimeSegment
                    value={option}
                    isSelected={option === props.currentValue}
                    onSelect={() => props.onSelect(option)}
                />
            )}
        </For>
    </div>
);

const CustomTimePickerDropdown: Component<{
    timeValue: string;
    onSelect: (time24: string) => void;
    onClose: () => void;
}> = (props) => {
    const parsed = createMemo(() => parseTime(props.timeValue));
    const [selectedHour, setSelectedHour] = createSignal(parsed().hour);
    const [selectedMinute, setSelectedMinute] = createSignal(parsed().minute);
    const [selectedPeriod, setSelectedPeriod] = createSignal(parsed().period);

    const hours = Array.from({ length: 12 }, (_, i) =>
        String((i % 12) + 1).padStart(2, '0')
    );
    const minutes = Array.from({ length: 60 }, (_, i) =>
        String(i).padStart(2, '0')
    );
    const periods = ['AM', 'PM'];

    const updateTime = (
        hour = selectedHour(),
        minute = selectedMinute(),
        period = selectedPeriod()
    ) => {
        const time24 = formatTime24(hour, minute, period);
        props.onSelect(time24);
    };

    const handleHourSelect = (h: string) => {
        setSelectedHour(h);
        updateTime(h);
    };

    const handleMinuteSelect = (m: string) => {
        setSelectedMinute(m);
        updateTime(undefined, m);
    };

    const handlePeriodSelect = (p: string) => {
        setSelectedPeriod(p);
        updateTime(undefined, undefined, p);
        // Note: Closing immediately upon period selection is a clean UX, but the user requested
        // explicit closing on outside click, which is handled by InputField now.
    };

    return (
        <div
            class="absolute z-30 mt-2 right-0 bg-white rounded-xl flex flex-col justify-start items-start"
            style={{
                padding: '12px',
                'box-shadow': '0px 4px 12px rgba(0, 0, 0, 0.1)',
                gap: '8px',
            }}
        >
            <div class="flex justify-start items-center gap-1">
                <TimeColumn
                    label="hour"
                    currentValue={selectedHour()}
                    options={hours}
                    onSelect={handleHourSelect}
                />
                <div class="text-2xl font-bold text-gray-700">:</div>
                <TimeColumn
                    label="minute"
                    currentValue={selectedMinute()}
                    options={minutes}
                    onSelect={handleMinuteSelect}
                />
                <TimeColumn
                    label="period"
                    currentValue={selectedPeriod()}
                    options={periods}
                    onSelect={handlePeriodSelect}
                />
            </div>
        </div>
    );
};

// --- 4. InputField Component (Refactored to Handle Closing) ---

type PickerID = 'date' | 'time-from' | 'time-to';

interface InputFieldProps {
    label: string;
    type: 'date' | 'time';
    value: string;
    onInput: (value: string) => void;
    // State lifted from parent
    pickerId: PickerID;
    activePicker: Accessor<PickerID | null>;
    setActivePicker: (id: PickerID | null) => void;
}

const InputField: Component<InputFieldProps> = (props) => {
    const Icon = props.type === 'date' ? CalendarIcon : ClockIcon;
    let containerRef: HTMLDivElement | undefined; // Ref for the main relative container

    const isPickerOpen = createMemo(
        () => props.activePicker() === props.pickerId
    );

    const displayValue =
        props.type === 'date'
            ? () => formatDateDisplay(props.value)
            : () => formatTimeDisplay(props.value);

    const togglePicker = () => {
        // Toggle state: If this is currently active, close it. Otherwise, open this one.
        props.setActivePicker(isPickerOpen() ? null : props.pickerId);
    };

    const handleSelect = (value: string) => {
        props.onInput(value);
    };

    // --- CLOSING LOGIC ---
    const handleDocumentClick = (event: MouseEvent) => {
        // Only run logic if *this* component's picker is open
        if (isPickerOpen()) {
            // Check if the click target is OUTSIDE the component's container
            if (containerRef && !containerRef.contains(event.target as Node)) {
                props.setActivePicker(null); // Close the picker
            }
        }
    };

    onMount(() => {
        document.addEventListener('mousedown', handleDocumentClick);
    });

    onCleanup(() => {
        document.removeEventListener('mousedown', handleDocumentClick);
    });

    return (
        <div class="flex flex-col justify-start items-start gap-3 w-full">
            <label
                class="text-sm font-normal text-gray-900 leading-tight"
                for={`input-${props.label}`}
            >
                {props.label}
            </label>

            {/* Assign ref to the relative container */}
            <div ref={containerRef} class="relative w-full">
                {/* Clickable Wrapper: Triggers the custom picker */}
                <div
                    class="w-full h-11 border border-slate-300 rounded-lg flex items-center p-3 cursor-pointer hover:border-sky-600 transition-colors"
                    onClick={togglePicker}
                >
                    <div class="text-sm text-slate-500 flex-grow">
                        {displayValue()}
                    </div>
                    <div class="flex-shrink-0">
                        <Icon />
                    </div>
                </div>

                {/* Custom Picker Dropdown */}
                <Show when={isPickerOpen()}>
                    {props.type === 'date' ? (
                        <CustomDatePickerDropdown
                            dateValue={props.value}
                            onSelect={handleSelect}
                            onClose={() => props.setActivePicker(null)}
                        />
                    ) : (
                        <CustomTimePickerDropdown
                            timeValue={props.value}
                            onSelect={handleSelect}
                            onClose={() => props.setActivePicker(null)}
                        />
                    )}
                </Show>
            </div>
        </div>
    );
};

const ArrowIcon: Component<{ direction: 'left' | 'right' }> = (props) =>
    props.direction === 'left' ? (
        <svg
            width="15"
            height="14"
            viewBox="0 0 15 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M8.695 3.103 6.822 4.976l-1.15 1.143a1.243 1.243 0 0 0 0 1.756l3.023 3.022a.63.63 0 0 0 1.073-.444V3.547c0-.56-.677-.84-1.073-.444"
                fill="#1376A1"
            />
        </svg>
    ) : (
        <svg
            width="15"
            height="14"
            viewBox="0 0 15 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M9.406 6.12 8.257 4.97 6.384 3.097a.631.631 0 0 0-1.073.45v6.906c0 .56.677.84 1.073.444l3.022-3.022a1.243 1.243 0 0 0 0-1.756"
                fill="#1376A1"
            />
        </svg>
    );

// --- 5. Main Component: Post Availability Modal ---

export const PostAvailabilityModal: Component<{
    isOpen: Accessor<boolean>;
    closeModal: Setter<boolean>;
}> = (props) => {
    const [dateValue, setDateValue] = createSignal('2025-06-16');
    const [timeFromValue, setTimeFromValue] = createSignal('09:00');
    const [timeToValue, setTimeToValue] = createSignal('17:00');
    const [activePicker, setActivePicker] = createSignal<PickerID | null>(null);

    return (
        <Portal>
            <Show when={props.isOpen()}>
                <div
                    class="flex justify-center p-4 h-screen overflow-y-auto"
                    classList={{
                        'modal-overlay': true,
                        active: props.isOpen(),
                    }}
                >
                    <div class="w-full max-w-lg p-6 sm:p-10 bg-white rounded-2xl shadow-xl flex flex-col gap-8">
                        <h2 class="text-xl font-medium text-gray-900 leading-loose">
                            Post Availability
                        </h2>

                        <div class="flex flex-col justify-start items-start gap-6 w-full">
                            {/* Date Input */}
                            <div class="w-full">
                                <InputField
                                    label="Date range"
                                    type="date"
                                    pickerId="date" // Unique ID
                                    activePicker={activePicker}
                                    setActivePicker={setActivePicker}
                                    value={dateValue()}
                                    onInput={setDateValue}
                                />
                            </div>

                            {/* Time Inputs */}
                            <div class="flex flex-col sm:flex-row justify-start items-start gap-4 w-full">
                                <div class="w-full sm:w-1/2">
                                    <InputField
                                        label="From"
                                        type="time"
                                        pickerId="time-from" // Unique ID
                                        activePicker={activePicker}
                                        setActivePicker={setActivePicker}
                                        value={timeFromValue()}
                                        onInput={setTimeFromValue}
                                    />
                                </div>

                                <div class="w-full sm:w-1/2">
                                    <InputField
                                        label="To"
                                        type="time"
                                        pickerId="time-to" // Unique ID
                                        activePicker={activePicker}
                                        setActivePicker={setActivePicker}
                                        value={timeToValue()}
                                        onInput={setTimeToValue}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div class="flex justify-end items-center gap-2 w-full pt-4 border-t border-slate-100">
                            <button
                                class="px-4 py-3 border border-sky-700 text-sky-700 rounded-lg font-semibold text-base hover:bg-sky-50 transition-colors cursor-pointer"
                                onClick={() => {
                                    setActivePicker(null);
                                    props.closeModal(false);
                                }} // Close any picker
                            >
                                Cancel
                            </button>

                            <button
                                class="px-4 py-3 bg-sky-700 text-white rounded-lg font-semibold text-base hover:bg-sky-800 transition-colors cursor-pointer"
                                onClick={() => {
                                    console.log('Confirm clicked');
                                    setActivePicker(null);
                                }} // Close any picker
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            </Show>
        </Portal>
    );
};
