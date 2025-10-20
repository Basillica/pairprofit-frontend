import {
    createEffect,
    createSignal,
    For,
    onCleanup,
    Show,
    type Component,
} from 'solid-js';

// --- 1. TYPESCRIPT INTERFACES ---
interface Artisan {
    id: number;
    name: string;
    job: string;
    location: string;
    specialty: string;
    rating: number;
    price: string;
    active: boolean; // For the highlighted card
}

interface FilterOption {
    label: string;
    options: string[];
}

// --- 2. PLACEHOLDER DATA ---
const ARTISANS_DATA: Artisan[] = [
    {
        id: 1,
        name: 'Peter Williams',
        job: 'Plumber',
        location: 'Lekki, Lagos',
        specialty: 'Wiring & earthing',
        rating: 4.9,
        price: '$120',
        active: false,
    },
    {
        id: 2,
        name: 'Sophie Mark',
        job: 'Plumber',
        location: 'Lekki, Lagos',
        specialty: 'Wiring & earthing',
        rating: 4.9,
        price: '$120',
        active: true,
    }, // Highlighted as per original
    {
        id: 3,
        name: 'Amy Joe',
        job: 'Plumber',
        location: 'Lekki, Lagos',
        specialty: 'Wiring & earthing',
        rating: 4.9,
        price: '$120',
        active: false,
    },
    {
        id: 4,
        name: 'Susan Hussain',
        job: 'Plumber',
        location: 'Lekki, Lagos',
        specialty: 'Wiring & earthing',
        rating: 4.9,
        price: '$120',
        active: false,
    },
    {
        id: 5,
        name: 'John Smith',
        job: 'Plumber',
        location: 'Lekki, Lagos',
        specialty: 'Wiring & earthing',
        rating: 4.9,
        price: '$120',
        active: false,
    },
    {
        id: 6,
        name: 'Sarah Lee',
        job: 'Plumber',
        location: 'Lekki, Lagos',
        specialty: 'Wiring & earthing',
        rating: 4.9,
        price: '$120',
        active: false,
    },
    {
        id: 7,
        name: 'Tom Hardy',
        job: 'Plumber',
        location: 'Lekki, Lagos',
        specialty: 'Wiring & earthing',
        rating: 4.9,
        price: '$120',
        active: false,
    },
    {
        id: 8,
        name: 'Emma Stone',
        job: 'Plumber',
        location: 'Lekki, Lagos',
        specialty: 'Wiring & earthing',
        rating: 4.9,
        price: '$120',
        active: false,
    },
    {
        id: 9,
        name: 'Emma Stone',
        job: 'Plumber',
        location: 'Lekki, Lagos',
        specialty: 'Wiring & earthing',
        rating: 4.9,
        price: '$120',
        active: false,
    },
    {
        id: 10,
        name: 'Emma Stone',
        job: 'Plumber',
        location: 'Lekki, Lagos',
        specialty: 'Wiring & earthing',
        rating: 4.9,
        price: '$120',
        active: false,
    },
];

const FILTER_DATA: FilterOption[] = [
    {
        label: 'Services',
        options: ['Services', 'Plumbing', 'Electrical', 'Carpentry', 'Hvac'],
    },
    {
        label: 'Sub Category',
        options: ['Services', 'Plumbing', 'Electrical', 'Carpentry', 'Hvac'],
    },
    {
        label: 'Location',
        options: ['Location', 'Lekki, Lagos', 'Ikeja, Lagos', 'Abuja, FCT'],
    },
    {
        label: 'Prices',
        options: ['All prices', '$0-$100', '$100-$200', '$200+'],
    },
    {
        label: 'Timeline',
        options: ['Any time', 'Next 24 Hours', 'Next Week', 'Next Month'],
    },
];

// --- 3. ICON COMPONENTS ---
const Icons = {
    ChevronDown: (props: { class?: string }) => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class={props.class}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
            />
        </svg>
    ),
    Star: (props: { class?: string }) => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class={props.class}
            viewBox="0 0 20 20"
            fill="currentColor"
        >
            <path d="M9.049 2.927c.3-.921 1.635-.921 1.935 0l3.07 9.499h-6.14l3.07-9.499z" />
        </svg>
    ),
    Search: (props: { class?: string }) => (
        <svg
            width="29"
            height="29"
            class={props.class}
            viewBox="0 0 29 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M10.3926 9.47661C14.8153 10.4432 17.8097 14.0117 17.9936 18.5351"
                stroke="#1376A1"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M11.0555 5.75491C17.2891 7.11656 21.5101 12.1469 21.7686 18.5223"
                stroke="#1376A1"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M9.06958 12.6319C12.3145 13.3357 14.5161 15.9594 14.6458 19.2773"
                stroke="#1376A1"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M8.13122 16.2587C9.75637 16.6138 10.8545 17.9225 10.922 19.5846"
                stroke="#1376A1"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
    ),
    ArrowLeft: (props: { class?: string }) => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class={props.class}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
            />
        </svg>
    ),
};

// --- 4. FILTER DROPDOWN COMPONENT (INTERACTIVE) ---
const FilterDropdown: Component<FilterOption> = (props) => {
    const [isOpen, setIsOpen] = createSignal(false);
    const [selectedValues, setSelectedValues] = createSignal<string[]>([]);
    const [buttonText, setButtonText] = createSignal(props.options[0]);

    // 1. Create a variable to hold the reference to the component's root DOM element
    let containerRef: HTMLDivElement | undefined;

    // 2. Click-Away Logic: Set up an event listener when the dropdown is open
    createEffect(() => {
        if (isOpen()) {
            const handleClickOutside = (e: MouseEvent) => {
                // Check if the click target is OUTSIDE the dropdown container
                if (containerRef && !containerRef.contains(e.target as Node)) {
                    setIsOpen(false);
                }
            };

            // Add the global listener. Use 'mousedown' as it fires before 'click'
            // and can prevent focus issues.
            document.addEventListener('mousedown', handleClickOutside);

            // 3. Clean up the listener when the component unmounts or the effect re-runs
            onCleanup(() => {
                document.removeEventListener('mousedown', handleClickOutside);
            });
        }
    });

    // Effect to update the button text (as defined previously)
    createEffect(() => {
        const selections = selectedValues();
        const allLabel = props.options[0];

        if (selections.length === 0) {
            setButtonText(allLabel);
        } else if (selections.length === 1) {
            setButtonText(selections[0]);
        } else {
            setButtonText(`${selections.length} Selected`);
        }
    });

    const toggleDropdown = () => setIsOpen(!isOpen());

    // Function to add or remove an item (as defined previously)
    const toggleItem = (item: string) => {
        if (item === props.options[0]) return;

        setSelectedValues((prev) => {
            if (prev.includes(item)) {
                return prev.filter((v) => v !== item);
            } else {
                return [...prev, item];
            }
        });
    };

    const containerClass = () => `
    relative w-full md:w-[197px] shrink-0
    ${isOpen() ? 'z-50' : 'z-10'}
  `;

    return (
        // 4. Attach the ref to the root element of the component
        <div ref={containerRef} class={containerClass()}>
            <label class="block mb-1 text-sm font-normal text-gray-700">
                {props.label}
            </label>
            <button
                onClick={toggleDropdown}
                class="flex justify-between items-center w-full px-4 py-2 bg-white border border-gray-300 rounded-full text-sm font-medium text-gray-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                aria-expanded={isOpen()}
            >
                <span
                    class={
                        selectedValues().length === 0
                            ? 'text-gray-400'
                            : 'text-gray-800'
                    }
                >
                    {buttonText()}
                </span>
                {/* Placeholder for Icons.ChevronDown */}
                <div class="w-5 h-5 text-gray-600 transition-transform flex items-center justify-center">
                    {/* Icon */}
                </div>
            </button>

            <Show when={isOpen()}>
                <div class="absolute mt-1 w-full rounded-lg shadow-xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none max-h-60 overflow-y-auto">
                    <div class="py-1">
                        <For each={props.options}>
                            {(option) => {
                                const isSelected =
                                    selectedValues().includes(option);
                                const isDisabled = option === props.options[0];

                                return (
                                    <div
                                        onClick={() => toggleItem(option)}
                                        class={`flex items-center gap-3 px-4 py-2 text-sm cursor-pointer transition-colors
                            ${
                                isDisabled
                                    ? 'text-gray-400 bg-gray-50 cursor-default'
                                    : 'text-gray-700 hover:bg-gray-100'
                            }`}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={isSelected}
                                            disabled={isDisabled}
                                            onClick={(e) => e.stopPropagation()} // Keep this fix for the checkbox
                                            onChange={() => {
                                                /* No-op */
                                            }}
                                            class="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 disabled:opacity-50"
                                        />
                                        <span class="truncate">{option}</span>
                                    </div>
                                );
                            }}
                        </For>
                    </div>
                </div>
            </Show>
        </div>
    );
};

// --- 5. ARTISAN CARD COMPONENT (RESPONSIVE) ---
const ArtisanCard: Component<{ artisan: Artisan }> = (props) => {
    const isActive = props.artisan.active;

    return (
        <div
            class={`
        p-5 md:p-6 flex items-center gap-4 w-full rounded-xl border transition-all duration-200  cursor-pointer
        ${
            isActive
                ? 'bg-gray-100 border-indigo-200 shadow-md'
                : 'bg-white border-gray-200 hover:shadow-lg'
        }
      `}
        >
            <img
                class="w-20 h-20 rounded-full object-cover shrink-0"
                // src={`https://api.dicebear.com/8.x/initials/svg?seed=${props.artisan.name}&backgroundType=gradient`}
                src={`https://picsum.photos/200?random=${Math.random()}`}
                alt={`${props.artisan.name}'s profile picture`}
            />
            <div class="flex-grow flex justify-between items-start">
                <div class="space-y-1">
                    <h3 class="text-base font-semibold text-gray-900 leading-snug">
                        {props.artisan.name}
                    </h3>
                    <div class="flex items-center gap-2 text-sm text-gray-600 font-medium">
                        <span>{props.artisan.job}</span>
                        {/* Rating */}
                        <div class="flex items-center gap-1">
                            {/* <Icons.Star class="w-3 h-3 text-yellow-500 fill-yellow-500" /> */}
                            <svg
                                width="14"
                                height="15"
                                viewBox="0 0 14 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M7.44304 1.46754L8.91522 4.82535C8.97063 4.9517 9.05892 5.06087 9.17088 5.14148C9.28285 5.22208 9.41439 5.27118 9.55179 5.28363L13.1382 5.6052C13.544 5.66426 13.7058 6.16191 13.4116 6.44848L10.7101 8.71801C10.4913 8.90176 10.3918 9.19051 10.4519 9.46941L11.2373 13.1455C11.3062 13.5491 10.8829 13.8575 10.5198 13.6661L7.38944 11.833C7.27139 11.7637 7.13697 11.7271 7.00007 11.7271C6.86316 11.7271 6.72874 11.7637 6.61069 11.833L3.48038 13.665C3.11835 13.8554 2.69397 13.548 2.76288 13.1444L3.54819 9.46832C3.60725 9.18941 3.50882 8.90066 3.29007 8.71691L0.587411 6.44957C0.294286 6.1641 0.456161 5.66535 0.860849 5.60629L4.44725 5.28473C4.58465 5.27227 4.71619 5.22318 4.82816 5.14257C4.94012 5.06196 5.02841 4.95279 5.08382 4.82645L6.556 1.46863C6.73866 1.10113 7.26147 1.10113 7.44304 1.46754Z"
                                    fill="#FDD835"
                                />
                                <path
                                    d="M7.33573 5.02659L7.08636 2.55253C7.07651 2.41472 7.04808 2.17847 7.26901 2.17847C7.44401 2.17847 7.53917 2.54269 7.53917 2.54269L8.28729 4.52894C8.56948 5.28472 8.45354 5.54394 8.1812 5.69706C7.86839 5.87206 7.40683 5.73534 7.33573 5.02659Z"
                                    fill="#FFFF8D"
                                />
                                <path
                                    d="M10.4213 8.49827L12.5672 6.82374C12.6733 6.73515 12.8647 6.59405 12.7116 6.43327C12.5902 6.3064 12.2621 6.48905 12.2621 6.48905L10.3841 7.22296C9.82409 7.41655 9.45222 7.70311 9.41941 8.06405C9.37675 8.5453 9.80878 8.91608 10.4213 8.49827Z"
                                    fill="#F4B400"
                                />
                            </svg>

                            <span class="text-sm font-medium text-gray-600">
                                {props.artisan.rating}
                            </span>
                        </div>
                    </div>
                    <p class="text-sm text-gray-600">
                        {props.artisan.location}
                    </p>
                    <p class="text-sm text-gray-500">
                        {props.artisan.specialty}
                    </p>
                </div>
                <div class="ml-4 text-xl font-medium text-gray-900 shrink-0">
                    {props.artisan.price}
                </div>
            </div>
        </div>
    );
};

// --- 6. PAGINATION COMPONENT (INTERACTIVE) ---

const Pagination: Component<{
    currentPage: () => number;
    setPage: (page: number) => void;
}> = (props) => {
    // Determine the total number of visible pages based on max Artisa/page
    const totalPages = 3; // Hardcoded to match original HTML's page count
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    const PageButton: Component<{ pageNumber: number }> = (p) => {
        const isActive = p.pageNumber === props.currentPage();
        const classes = `
            w-10 h-10 flex items-center justify-center rounded-full text-xl cursor-pointer transition
            ${
                isActive
                    ? 'bg-gray-900 text-white font-semibold'
                    : 'bg-transparent text-gray-600 font-normal hover:bg-gray-100'
            }
        `;

        return (
            <div class={classes} onClick={() => props.setPage(p.pageNumber)}>
                {p.pageNumber}
            </div>
        );
    };

    const ArrowButton: Component<{ direction: 'left' | 'right' }> = (p) => {
        const isLeft = p.direction === 'left';
        const disabled =
            (isLeft && props.currentPage() === 1) ||
            (!isLeft && props.currentPage() === totalPages);

        const pageChange = () => {
            if (isLeft) {
                props.setPage(Math.max(1, props.currentPage() - 1));
            } else {
                props.setPage(Math.min(totalPages, props.currentPage() + 1));
            }
        };

        return (
            <button
                onClick={pageChange}
                disabled={disabled}
                class={`p-2 rounded-full text-gray-900 hover:bg-gray-100 transition disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer`}
            >
                <Icons.ArrowLeft
                    class={`w-6 h-6 ${!isLeft ? 'transform rotate-180' : ''}`}
                />
            </button>
        );
    };

    return (
        <div class="flex items-center space-x-4">
            <ArrowButton direction="left" />
            <div class="flex items-center space-x-2">
                <For each={pages}>
                    {(page) => <PageButton pageNumber={page} />}
                </For>
            </div>
            <ArrowButton direction="right" />
        </div>
    );
};

// --- 7. MAIN SEARCH PAGE COMPONENT ---

export const ClientsJobSearchPage: Component = () => {
    // Active page starts at 2, matching the original HTML
    const [currentPage, setCurrentPage] = createSignal(2);
    const totalArtisans = 2986; // Placeholder count from original HTML

    return (
        // Full width container with centered, max-width content area
        // <div class="min-h-screen bg-white py-8 md:py-12">
        <main class="p-6">
            {/* <div class="mx-auto lg:px-8 space-y-10"> */}
            {/* Search Header and Filters */}
            <div class="space-y-6">
                <h1 class="text-3xl font-semibold text-gray-900">Search</h1>

                {/* Filters Container (Responsive Layout) */}
                <div class="flex flex-col md:flex-row md:items-start md:gap-8; pb-4">
                    <p class="text-base font-medium text-gray-700 shrink-0 mt-2 mb-4 md:mb-0 md:mt-4 pr-6">
                        Filter by
                    </p>
                    <div class="flex flex-wrap items-end gap-x-4 gap-y-6 flex-grow">
                        <For each={FILTER_DATA}>
                            {(filter) => <FilterDropdown {...filter} />}
                        </For>
                        <button class="bg-[#1376A1] hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md flex items-center whitespace-nowrap text-sm transition-colors duration-200">
                            {' '}
                            <i class="fas fa-plus mr-2 text-xs"></i> Search
                            Artisans
                        </button>
                    </div>
                </div>
            </div>

            {/* Results Count and Icon */}
            <div class="flex items-end gap-3 pb-2">
                <Icons.Search class="w-5 h-5 text-blue-700" />
                <p class="text-base font-medium">
                    <span class="text-gray-900">
                        {totalArtisans.toLocaleString()}{' '}
                    </span>
                    <span class="text-gray-600">artisans found</span>
                </p>
            </div>

            {/* Artisan Cards Grid (Responsive Grid) */}
            <div class="space-y-10">
                <div class="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    <For each={ARTISANS_DATA}>
                        {(artisan) => <ArtisanCard artisan={artisan} />}
                    </For>
                </div>

                {/* Pagination */}
                <div class="flex justify-center">
                    <Pagination
                        currentPage={currentPage}
                        setPage={setCurrentPage}
                    />
                </div>
            </div>
            {/* </div> */}
        </main>
    );
};
