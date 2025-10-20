import {
    createSignal,
    For,
    Show,
    type Component,
    Accessor,
    createEffect,
    onCleanup,
} from 'solid-js';
import { PostJobForm } from '../../modals/NewJob';
import { useNavigate } from '@solidjs/router';

// --- 1. Data Structure and Sample Data (TypeScript) ---

type JobStatus = 'Completed' | 'Active' | 'Pending';

interface Job {
    id: number;
    title: string;
    location: string;
    date: string;
    amount: number;
    status: JobStatus;
}

const JOBS_DATA: Job[] = [
    {
        id: 1,
        title: 'Fix leaking kitchen sink',
        location: 'Ikeja',
        date: '31st Aug, 2025',
        amount: 250,
        status: 'Completed',
    },
    {
        id: 2,
        title: 'Paint 3-bedroom apartment',
        location: 'Lekki',
        date: '31st Aug, 2025',
        amount: 450,
        status: 'Active',
    },
    {
        id: 3,
        title: 'Custom wooden wardrobe',
        location: 'Ikoyi',
        date: '31st Aug, 2025',
        amount: 800,
        status: 'Pending',
    },
    {
        id: 4,
        title: 'Replace faulty electrical wiring',
        location: 'Victoria Island',
        date: '31st Aug, 2025',
        amount: 550,
        status: 'Completed',
    },
    {
        id: 5,
        title: 'Install new HVAC unit',
        location: 'Eko Hotels',
        date: '31st Aug, 2025',
        amount: 1200,
        status: 'Pending',
    },
];

const STATUS_OPTIONS: (JobStatus | 'All Status')[] = [
    'All Status',
    'Completed',
    'Active',
    'Pending',
];

// --- 2. Icons Component ---

const Icons = {
    Search: (props: { class?: string }) => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class={props.class || 'w-4 h-4 text-gray-500'}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m21 21-4.303-4.303m0 0A7.5 7.5 0 1 0 5.707 5.707a7.5 7.5 0 0 0 10.59 10.59Z"
            />
        </svg>
    ),
    ChevronDown: (props: { class?: string }) => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class={props.class || 'w-4 h-4 text-gray-500'}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
        </svg>
    ),
    ChevronLeft: (props: { class?: string }) => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class={props.class || 'w-5 h-5'}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
            />
        </svg>
    ),
    ChevronRight: (props: { class?: string }) => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class={props.class || 'w-5 h-5'}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
        </svg>
    ),
};

// --- 3. Reusable Components (Status Pill) ---

const StatusPill: Component<{ status: JobStatus }> = (props) => {
    let colorClass = '';
    switch (props.status) {
        case 'Completed':
            colorClass = 'bg-green-100 text-green-700';
            break;
        case 'Active':
            colorClass = 'bg-blue-100 text-blue-700';
            break;
        case 'Pending':
            colorClass = 'bg-yellow-100 text-yellow-700';
            break;
    }

    // The original HTML had the text color as #697586 (gray-600) for all,
    // but using color derived from the background is standard practice.
    // We'll use the background-derived text color for better status indication.
    return (
        <div
            class={`inline-flex items-center justify-center h-7 px-3 rounded-full ${colorClass}`}
        >
            <div class="text-sm font-medium leading-none">{props.status}</div>
        </div>
    );
};

// --- 4. Responsive Table Row / Card Components ---

// Desktop Table Row
const TableRow: Component<{
    job: Job;
    handleViewDetails: (jobID: string) => void;
}> = (props) => (
    <div class="grid grid-cols-6 border-b border-gray-100 last:border-b-0">
        {/* Job Title */}
        <div class="p-4 flex items-center col-span-1">
            <div class="text-gray-600 text-base">{props.job.title}</div>
        </div>
        {/* Location */}
        <div class="p-4 flex items-center col-span-1">
            <div class="text-gray-600 text-base">{props.job.location}</div>
        </div>
        {/* Date */}
        <div class="p-4 flex items-center col-span-1">
            <div class="text-gray-600 text-base">{props.job.date}</div>
        </div>
        {/* Amount */}
        <div class="p-4 flex items-center col-span-1">
            <div class="text-gray-600 text-base">${props.job.amount}</div>
        </div>
        {/* Status */}
        <div class="p-4 flex items-center col-span-1">
            <StatusPill status={props.job.status} />
        </div>
        {/* Action */}
        <div class="p-4 flex items-center col-span-1">
            <button
                class="text-[#1376A1] font-semibold text-base hover:text-opacity-80 transition cursor-pointer"
                onClick={() => props.handleViewDetails(props.job.id.toString())}
            >
                View details
            </button>
        </div>
    </div>
);

// Mobile Card View
const MobileCard: Component<{
    job: Job;
    handleViewDetails: (jobID: string) => void;
}> = (props) => (
    <div class="border border-gray-200 rounded-lg p-4 flex flex-col gap-3">
        <div class="flex justify-between items-start">
            <h3 class="text-lg font-medium text-gray-900">{props.job.title}</h3>
            <StatusPill status={props.job.status} />
        </div>
        <div class="grid grid-cols-2 gap-y-2 text-sm">
            <span class="text-gray-500 font-medium">Location:</span>
            <span class="text-gray-700 font-normal">{props.job.location}</span>

            <span class="text-gray-500 font-medium">Date:</span>
            <span class="text-gray-700 font-normal">{props.job.date}</span>

            <span class="text-gray-500 font-medium">Amount:</span>
            <span class="text-gray-700 font-normal">${props.job.amount}</span>
        </div>
        <div class="pt-2 border-t border-gray-100 flex justify-end">
            <button
                class="text-[#1376A1] font-semibold text-sm hover:text-opacity-80 transition cursor-pointer"
                onClick={() => props.handleViewDetails(props.job.id.toString())}
            >
                View details &rarr;
            </button>
        </div>
    </div>
);

// --- 5. Main Component ---

export const ClientsJobPage: Component = () => {
    const [searchTerm, setSearchTerm] = createSignal('');
    const [selectedStatus, setSelectedStatus] = createSignal<
        JobStatus | 'All Status'
    >('All Status');
    const [currentPage, setCurrentPage] = createSignal(1);
    const navigate = useNavigate();

    // Simple Filtering Logic
    const filteredJobs = () => {
        return JOBS_DATA.filter((job) => {
            const matchesSearch = job.title
                .toLowerCase()
                .includes(searchTerm().toLowerCase());
            const matchesStatus =
                selectedStatus() === 'All Status' ||
                job.status === selectedStatus();
            return matchesSearch && matchesStatus;
        });
    };

    // Pagination Data
    const totalPages = () => 5; // Fixed number for demo
    const pages = () => Array.from({ length: totalPages() }, (_, i) => i + 1);
    const [postNewJob, setPostNewJob] = createSignal(false);
    const handleViewDetails = (jobID: string) => {
        navigate(`/client/jobs/${jobID}`);
    };

    return (
        // <div class="w-full max-w-7xl min-h-screen mx-auto p-4 sm:p-6 lg:p-8">
        <main class="p-6">
            <PostJobForm isOpen={postNewJob} closeModal={setPostNewJob} />
            <div class="flex justify-between items-start mb-6">
                <div>
                    <h1 class="text-2xl font-bold text-gray-900">My Jobs</h1>
                </div>
                <button
                    class="bg-[#1376A1] hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md flex items-center whitespace-nowrap text-sm transition-colors duration-200"
                    onClick={() => setPostNewJob(true)}
                >
                    {' '}
                    <i class="fas fa-plus mr-2 text-xs"></i> Post new Job
                </button>
            </div>
            <div
                class="bg-white rounded-2xl border border-gray-200 flex flex-col gap-5 p-3 sm:p-5 lg:p-8 shadow-sm"
                style="min-height: 90%"
            >
                {/* Top Bar: Search and Filter */}
                <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-2 sm:px-0">
                    {/* Search Input */}
                    <div class="w-full sm:w-80 lg:w-96">
                        <div class="flex items-center w-full h-[46px] px-4 py-3 bg-gray-50 border border-gray-200 rounded-full focus-within:border-indigo-400 transition-colors">
                            <Icons.Search class="w-4 h-4 text-gray-500 flex-shrink-0" />
                            <input
                                type="text"
                                placeholder="Search jobs"
                                value={searchTerm()}
                                onInput={(e) =>
                                    setSearchTerm(e.currentTarget.value)
                                }
                                class="w-full bg-transparent text-sm text-gray-600 placeholder-gray-500 ml-2 focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Status Filter Dropdown */}
                    <StatusFilter
                        options={STATUS_OPTIONS}
                        selectedStatus={selectedStatus}
                        onSelect={setSelectedStatus}
                    />
                </div>

                {/* Job List/Table Container */}
                <div class="w-full flex flex-col">
                    {/* Desktop Table Header (visible on lg and up) */}
                    <div class="hidden lg:grid grid-cols-6 bg-white border-b border-gray-200 text-left rounded-t-xl overflow-hidden">
                        <div class="p-4 font-semibold text-gray-900 text-base col-span-1">
                            Job Title
                        </div>
                        <div class="p-4 font-semibold text-gray-900 text-base col-span-1">
                            Location
                        </div>
                        <div class="p-4 font-semibold text-gray-900 text-base col-span-1">
                            Date
                        </div>
                        <div class="p-4 font-semibold text-gray-900 text-base col-span-1">
                            Amount
                        </div>
                        <div class="p-4 font-semibold text-gray-900 text-base col-span-1">
                            Status
                        </div>
                        <div class="p-4 font-semibold text-gray-900 text-base col-span-1">
                            Action
                        </div>
                    </div>

                    {/* Content: Switches between Table Rows (lg+) and Mobile Cards (default/sm) */}
                    <div class="w-full min-h-[680px]">
                        {/* Desktop Table Body */}
                        <div class="hidden lg:block">
                            <For each={filteredJobs()}>
                                {(job) => (
                                    <TableRow
                                        job={job}
                                        handleViewDetails={handleViewDetails}
                                    />
                                )}
                            </For>
                        </div>

                        {/* Mobile Card List */}
                        <div class="lg:hidden flex flex-col gap-3 pt-3">
                            <For each={filteredJobs()}>
                                {(job) => (
                                    <MobileCard
                                        job={job}
                                        handleViewDetails={handleViewDetails}
                                    />
                                )}
                            </For>
                        </div>

                        <Show when={filteredJobs().length === 0}>
                            <div class="text-center p-8 text-gray-500">
                                No jobs match your search criteria.
                            </div>
                        </Show>
                    </div>
                </div>

                {/* Pagination */}
                <div class="flex justify-center sm:justify-end items-center mt-4">
                    <div class="flex items-center gap-3">
                        {/* Previous Button */}
                        <button
                            onClick={() =>
                                setCurrentPage((p) => Math.max(1, p - 1))
                            }
                            disabled={currentPage() === 1}
                            class="p-2 rounded-full disabled:opacity-50 hover:bg-gray-100 transition"
                            aria-label="Previous Page"
                        >
                            <Icons.ChevronLeft class="w-5 h-5 text-gray-900" />
                        </button>

                        {/* Page Numbers */}
                        <div class="flex items-center gap-1">
                            <For each={pages()}>
                                {(page) => (
                                    <button
                                        onClick={() => setCurrentPage(page)}
                                        class={`w-8 h-8 rounded-full text-base font-medium transition-all ${
                                            currentPage() === page
                                                ? 'bg-gray-900 text-white font-semibold'
                                                : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                    >
                                        {page}
                                    </button>
                                )}
                            </For>
                        </div>

                        {/* Next Button */}
                        <button
                            onClick={() =>
                                setCurrentPage((p) =>
                                    Math.min(totalPages(), p + 1)
                                )
                            }
                            disabled={currentPage() === totalPages()}
                            class="p-2 rounded-full disabled:opacity-50 hover:bg-gray-100 transition"
                            aria-label="Next Page"
                        >
                            <Icons.ChevronRight class="w-5 h-5 text-gray-900" />
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
};

// --- Status Filter Component (Custom Dropdown) ---

const StatusFilter: Component<{
    options: (JobStatus | 'All Status')[];
    selectedStatus: Accessor<JobStatus | 'All Status'>;
    onSelect: (value: JobStatus | 'All Status') => void;
}> = (props) => {
    const [isOpen, setIsOpen] = createSignal(false);
    let containerRef: HTMLDivElement | undefined;

    // Simple click-away logic
    createEffect(() => {
        if (isOpen()) {
            const handleClickOutside = (e: MouseEvent) => {
                if (containerRef && !containerRef.contains(e.target as Node)) {
                    setIsOpen(false);
                }
            };
            document.addEventListener('mousedown', handleClickOutside);
            onCleanup(() =>
                document.removeEventListener('mousedown', handleClickOutside)
            );
        }
    });

    const selectOption = (option: JobStatus | 'All Status') => {
        props.onSelect(option);
        setIsOpen(false);
    };

    return (
        // The z-index fix applied here ensures the dropdown menu appears over content below it.
        <div ref={containerRef} class={`relative w-full sm:w-auto z-50`}>
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                class="flex items-center justify-between w-full sm:w-auto h-[46px] px-4 py-3 bg-white border border-gray-300 rounded-lg text-base font-medium text-gray-600 transition-colors hover:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-expanded={isOpen()}
            >
                {props.selectedStatus()}
                <Icons.ChevronDown
                    class={`w-4 h-4 text-gray-500 ml-2 transition-transform ${
                        isOpen() ? 'rotate-180' : 'rotate-0'
                    }`}
                />
            </button>

            <Show when={isOpen()}>
                <div class="absolute right-0 mt-2 w-48 rounded-lg shadow-xl bg-white ring-1 ring-black ring-opacity-5 z-50">
                    <div class="py-1">
                        <For each={props.options}>
                            {(option) => (
                                <div
                                    onClick={() => selectOption(option)}
                                    class={`block px-4 py-2 text-sm cursor-pointer transition-colors
                                            ${
                                                props.selectedStatus() ===
                                                option
                                                    ? 'bg-indigo-50 text-indigo-700 font-semibold'
                                                    : 'text-gray-700 hover:bg-gray-100'
                                            }`}
                                >
                                    {option}
                                </div>
                            )}
                        </For>
                    </div>
                </div>
            </Show>
        </div>
    );
};
