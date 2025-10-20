import { createSignal, For, onMount, type Component } from 'solid-js';
import L from 'leaflet';
import { MarkJobCompleteModal } from '../../../modals/CompleteJob';
import { PromoteJobModal } from '../../../modals/PromoteJob';
// --- 1. Data Structures and Sample Data ---

type JobStatus = 'Completed' | 'Active' | 'Pending';

interface Job {
    title: string;
    status: JobStatus;
    location: string;
    dueDate: string;
    budget: string;
    description: string;
    timeline: string;
    attachment: string;
    postedDate: string;
    applicantCount: number;
}

interface Artisan {
    id: number;
    name: string;
    profession: string;
    quote: string;
    experience: string;
    rating: number;
}

const SAMPLE_JOB: Job = {
    title: 'Fix leaking kitchen sink',
    status: 'Active',
    location: 'Surulere, Lagos',
    dueDate: '15th Sept, 2025',
    budget: 'N25,000',
    description:
        'Kitchen sink leaking from the pipe underneath: Water drips when tap is off. Need diagnosis and fix. Prefer experience with household plumbing and installation of new seals if necessary.',
    timeline: 'Within 3 days',
    attachment: 'Sink.jpg',
    postedDate: 'September 12, 2025',
    applicantCount: 2,
};

const SAMPLE_ARTISANS: Artisan[] = [
    {
        id: 1,
        name: 'Peter Williams',
        profession: 'Plumber',
        quote: '$240',
        experience:
            '10 years experience. Quick and tidy work. Includes 1-month guarantee.',
        rating: 4.9,
    },
    {
        id: 2,
        name: 'Charles Roland',
        profession: 'Plumber',
        quote: '$170',
        experience:
            'Fast response. Will bring necessary parts. Reviewed by 120 clients.',
        rating: 4.8,
    },
];

// Define a custom Tailwind color for the primary blue
// Equivalent to #1376A1
const TAILWIND_PRIMARY_BLUE = 'text-[#1376A1] bg-[#1376A1] border-[#1376A1]';
const TAILWIND_DARK_TEXT = 'text-[#0D121C]'; // Geist 500/600

// --- 2. Reusable Components (Icons and Status Pill) ---

const Icons = {
    // SVG for the edit button
    Edit: (props: { class?: string }) => (
        <svg
            width="20"
            height="20"
            class={props.class}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M11.0504 3.00002L4.20878 10.2417C3.95045 10.5167 3.70045 11.0584 3.65045 11.4334L3.34211 14.1333C3.23378 15.1083 3.93378 15.775 4.90045 15.6084L7.58378 15.15C7.95878 15.0834 8.48378 14.8084 8.74211 14.525L15.5838 7.28335C16.7671 6.03335 17.3004 4.60835 15.4588 2.86668C13.6254 1.14168 12.2338 1.75002 11.0504 3.00002Z"
                stroke="#1376A1"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M9.9082 4.20825C10.2665 6.50825 12.1332 8.26659 14.4499 8.49992"
                stroke="#1376A1"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M2.5 18.3333H17.5"
                stroke="#1376A1"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
    ),
    // Placeholder for Star/Rating Icon
    Star: (props: { class?: string }) => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class={props.class || 'w-3 h-3 text-yellow-500'}
            viewBox="0 0 24 24"
            fill="currentColor"
        >
            <path
                fill-rule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                clip-rule="evenodd"
            />
        </svg>
    ),
};

const StatusPill: Component<{ status: JobStatus }> = (props) => {
    let colorClass = '';
    switch (props.status) {
        case 'Completed':
            colorClass = 'bg-green-100 text-green-700';
            break;
        case 'Active':
            // The design uses a unique light blue for 'Active'
            colorClass = 'bg-[#4285F424] text-[#697586]';
            break;
        case 'Pending':
            colorClass = 'bg-yellow-100 text-yellow-700';
            break;
    }
    return (
        <div
            class={`inline-flex items-center justify-center h-7 px-3 rounded-full ${colorClass}`}
        >
            <div class="text-sm font-medium leading-none">{props.status}</div>
        </div>
    );
};

// --- 3. Artisan Applicant Card Component ---

const ArtisanCard: Component<{ artisan: Artisan }> = (props) => (
    <div class="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-8 p-4 sm:p-6 border border-gray-300 rounded-xl w-full">
        <img
            class="w-16 h-16 sm:w-[70px] sm:h-[70px] rounded-full flex-shrink-0"
            src={`https://picsum.photos/200?random=${Math.random()}`}
            // src={`https://placehold.co/70x70?text=${props.artisan.name
            //     .split(' ')
            //     .map((n) => n[0])
            //     .join('')}`}
            alt={props.artisan.name}
        />

        <div class="flex-grow flex flex-col gap-3 sm:gap-4">
            {/* Name and Quote (Top Row) */}
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full">
                <div class="flex items-center gap-2">
                    <span
                        class={`${TAILWIND_DARK_TEXT} text-base font-semibold`}
                    >
                        {props.artisan.name}
                    </span>
                    <div class="w-1 h-1 bg-gray-400 rounded-full hidden sm:block"></div>
                    <span class="text-gray-600 text-sm font-medium">
                        {props.artisan.profession}
                    </span>
                </div>
                <div class="text-gray-900 text-lg font-semibold mt-1 sm:mt-0">
                    {props.artisan.quote}
                </div>
            </div>

            {/* Details and Actions (Bottom Row) */}
            <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                {/* Details: Experience and Rating */}
                <div class="flex flex-col gap-1 w-full md:w-3/5">
                    <div class="text-gray-700 text-sm font-normal">
                        {props.artisan.experience}
                    </div>
                    <div class="flex items-center gap-1">
                        <Icons.Star />
                        <span class="text-gray-600 text-sm font-medium">
                            {props.artisan.rating}
                        </span>
                    </div>
                </div>

                {/* Action Buttons (Stacked on small, side-by-side on medium/large) */}
                <div class="flex flex-col sm:flex-row gap-2 mt-2 md:mt-0 w-full md:w-auto">
                    <button
                        class={`py-2 px-4 rounded-lg font-semibold text-base bg-white border ${TAILWIND_PRIMARY_BLUE} border-opacity-100 hover:bg-blue-50 transition cursor-pointer`}
                    >
                        View profile
                    </button>
                    <button
                        class={`py-2 px-4 rounded-lg font-semibold text-base cursor-pointer text-white ${TAILWIND_PRIMARY_BLUE.replace(
                            'text-',
                            'bg-'
                        )} hover:bg-opacity-90 transition`}
                    >
                        Hire
                    </button>
                </div>
            </div>
        </div>
    </div>
);

// --- 4. Main JobDetailPage Component ---

export const JobDetailPage: Component = () => {
    // Note: In a real app, data fetching logic would go here.
    const [completeJob, setCompleteJob] = createSignal(false);
    const [promoteJob, setPromoteJob] = createSignal(false);
    const onConfirm = () => {
        console.log('confirmed');
    };
    const onCancel = () => {
        console.log('job cancelled');
        setCompleteJob(!completeJob());
    };

    const job = SAMPLE_JOB;
    const artisans = SAMPLE_ARTISANS;

    // In a real app, this effect would run after the component mounts:
    let mapDiv: HTMLDivElement | undefined;
    onMount(() => {
        if (mapDiv) {
            const map = L.map(mapDiv).setView([6.5244, 3.3792], 13); // Lagos coordinates
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors',
            }).addTo(map);
            L.marker([6.5244, 3.3792])
                .addTo(map)
                .bindPopup(job.location)
                .openPopup();

            // Fix map display issue often seen with React/SolidJS
            setTimeout(() => {
                map.invalidateSize();
            }, 0);
        }
    });

    return (
        // <div class="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 min-h-screen">
        <main class="p-6">
            <MarkJobCompleteModal
                onCancel={onCancel}
                onConfirm={onConfirm}
                closeModal={setCompleteJob}
                isOpen={completeJob}
            />
            <PromoteJobModal isOpen={promoteJob} closeModal={setPromoteJob} />
            <div class="flex flex-col gap-8 lg:gap-10">
                {/* A. HEADER SECTION */}
                <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 pb-6 border-b border-gray-200">
                    {/* Job Title and Metadata */}
                    <div class="flex flex-col gap-2">
                        <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                            <h1
                                class={`${TAILWIND_DARK_TEXT} text-2xl font-semibold`}
                            >
                                {job.title}
                            </h1>
                            <StatusPill status={job.status} />
                        </div>

                        <div class="flex flex-wrap items-center gap-3 text-sm text-gray-700">
                            {/* Location */}
                            <div class="flex items-center gap-1">
                                <span class="font-medium text-gray-900">
                                    {job.location}
                                </span>
                                <div class="w-1 h-1 bg-gray-500 rounded-full"></div>
                            </div>
                            {/* Due Date */}
                            <div class="flex items-center gap-1">
                                <span class="font-medium text-gray-600">
                                    Due date:
                                </span>
                                <span class="font-medium text-gray-900">
                                    {job.dueDate}
                                </span>
                                <div class="w-1 h-1 bg-gray-500 rounded-full"></div>
                            </div>
                            {/* Budget */}
                            <div>
                                <span class="font-medium text-gray-600">
                                    Budget:
                                </span>
                                <span class="font-medium text-gray-900">
                                    {' '}
                                    {job.budget}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons (Stacked on mobile, row on web) */}
                    <div class="flex flex-wrap sm:flex-nowrap gap-3 w-full lg:w-auto">
                        {/* Edit Job */}
                        <button
                            class={`flex items-center bg-white gap-1 py-2 px-3 rounded-lg font-semibold text-base border ${TAILWIND_PRIMARY_BLUE} hover:bg-blue-50 hover:text-opacity-80 transition flex-shrink-0 cursor-pointer`}
                        >
                            <Icons.Edit class="w-5 h-5" />
                            Edit job
                        </button>

                        {/* Cancel Job (Outline Button) */}
                        <button
                            class={`py-3 px-4 rounded-lg font-semibold text-base bg-white border ${TAILWIND_PRIMARY_BLUE} hover:bg-blue-50 transition flex-shrink-0 cursor-pointer`}
                        >
                            Cancel job
                        </button>

                        {/* Mark as Completed (Primary Button) */}
                        <button
                            class={`py-3 px-4 rounded-lg font-semibold text-base text-white cursor-pointer ${TAILWIND_PRIMARY_BLUE.replace(
                                'text-',
                                'bg-'
                            )} hover:bg-opacity-90 transition flex-shrink-0`}
                            onClick={() => setCompleteJob(true)}
                        >
                            Mark as Completed
                        </button>
                    </div>
                </div>

                {/* B. MAIN CONTENT LAYOUT: TWO COLUMNS (Left 2/3, Right 1/3 on desktop) */}
                <div class="flex flex-col lg:grid lg:grid-cols-3 gap-8">
                    {/* LEFT COLUMN: Job Details, Applicants, Conversation (Span 2/3) */}
                    <div class="flex flex-col gap-8 lg:col-span-2">
                        {/* 1. Job Details Card */}
                        <div class="p-6 sm:p-8 bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col gap-8">
                            <div class="flex flex-col gap-3">
                                <h2
                                    class={`${TAILWIND_DARK_TEXT} text-xl font-semibold`}
                                >
                                    Job details
                                </h2>
                                <p class="text-gray-700 text-base font-normal">
                                    {job.description}
                                </p>
                            </div>

                            <div class="flex flex-col gap-6">
                                <div class="flex flex-col sm:flex-row justify-between gap-6">
                                    {/* Location Detail */}
                                    <div class="flex flex-col gap-1 w-full sm:w-1/2">
                                        <span class="text-gray-700 text-base font-normal">
                                            Location
                                        </span>
                                        <span class="text-gray-900 text-lg font-semibold">
                                            {job.location}
                                        </span>
                                    </div>
                                    {/* Timeline Detail */}
                                    <div class="flex flex-col gap-1 w-full sm:w-1/2">
                                        <span class="text-gray-700 text-base font-normal">
                                            Timeline
                                        </span>
                                        <span class="text-gray-900 text-lg font-semibold">
                                            {job.timeline}
                                        </span>
                                    </div>
                                </div>

                                {/* Attachments */}
                                <div class="flex flex-col gap-3">
                                    <span class="text-gray-700 text-base font-normal">
                                        Attachments
                                    </span>
                                    <div class="inline-block py-2 px-4 border border-gray-300 rounded-xl text-gray-900 text-lg font-semibold hover:bg-gray-50 transition cursor-pointer">
                                        {job.attachment}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 2. Applicant List Card */}
                        <div class="p-6 sm:p-8 bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col gap-6">
                            <div class="flex justify-between items-center border-b border-gray-100 pb-4">
                                <h2
                                    class={`${TAILWIND_DARK_TEXT} text-xl font-semibold`}
                                >
                                    Artisan Applicants
                                </h2>
                                <span class="text-gray-600 text-base">
                                    {job.applicantCount} artisans applied
                                </span>
                            </div>

                            <div class="flex flex-col gap-4">
                                <For each={artisans}>
                                    {(artisan) => (
                                        <ArtisanCard artisan={artisan} />
                                    )}
                                </For>
                            </div>
                        </div>

                        {/* 3. Conversation Card */}
                        <div class="p-6 sm:p-8 bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col gap-6">
                            <div class="flex flex-col gap-2">
                                <h2
                                    class={`${TAILWIND_DARK_TEXT} text-xl font-semibold`}
                                >
                                    Conversation
                                </h2>
                                <p class="text-gray-600 text-base">
                                    Message artisans you've shortlisted or ask
                                    for clarifications.
                                </p>
                            </div>

                            <div class="flex flex-col sm:flex-row gap-3">
                                <button
                                    class={`py-3 px-4 rounded-lg font-semibold text-base border ${TAILWIND_PRIMARY_BLUE} hover:bg-blue-50 transition w-full sm:w-auto bg-white cursor-pointer`}
                                >
                                    Open inbox
                                </button>
                                <button
                                    class={`py-3 px-4 rounded-lg font-semibold text-base text-white cursor-pointer ${TAILWIND_PRIMARY_BLUE.replace(
                                        'text-',
                                        'bg-'
                                    )} hover:bg-opacity-90 transition w-full sm:w-auto`}
                                >
                                    Message applicants
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Metadata, Map, Promos (Span 1/3) */}
                    <div class="flex flex-col gap-8 lg:col-span-1">
                        {/* 1. Job Metadata Card (Budget, Posted, Status) */}
                        <div class="p-6 sm:p-8 bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col gap-6">
                            <div class="flex flex-col gap-1">
                                <span class="text-gray-700 text-base font-normal">
                                    Budget
                                </span>
                                <span class="text-gray-900 text-lg font-semibold">
                                    ${job.budget}
                                </span>
                            </div>
                            <div class="flex flex-col gap-1">
                                <span class="text-gray-700 text-base font-normal">
                                    Posted
                                </span>
                                <span class="text-gray-900 text-lg font-semibold">
                                    {job.postedDate}
                                </span>
                            </div>
                            <div class="flex flex-col gap-1">
                                <span class="text-gray-700 text-base font-normal">
                                    Status
                                </span>
                                <span class="text-gray-900 text-lg font-semibold">
                                    {job.status}
                                </span>
                            </div>
                        </div>

                        {/* 2. Location/Map Card */}
                        <div class="p-6 sm:p-8 bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col gap-4">
                            <h2
                                class={`${TAILWIND_DARK_TEXT} text-xl font-semibold`}
                            >
                                Location
                            </h2>

                            {/* LEAFLET MAP CONTAINER */}
                            <div
                                id="leaflet-map-container"
                                ref={mapDiv} // Uncomment for SolidJS onMount initialization
                                class="w-full h-[220px] rounded-lg overflow-hidden border border-gray-300 bg-gray-100 flex items-center justify-center text-gray-500"
                            >
                                {/* Placeholder text, remove once Leaflet is initialized */}
                                Leaflet Map Will Be Here
                            </div>
                        </div>

                        {/* 3. Promote Job Card */}
                        <div class="p-6 sm:p-8 bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col gap-6 items-center text-center">
                            <p class="text-gray-600 text-lg font-normal">
                                Need more applicants? Boost your job to reach
                                more artisans.
                            </p>
                            <button
                                class={`py-3 px-4 rounded-lg font-semibold text-base text-white ${TAILWIND_PRIMARY_BLUE.replace(
                                    'text-',
                                    'bg-'
                                )} hover:bg-opacity-90 transition cursor-pointer`}
                                onClick={() => setPromoteJob(true)}
                            >
                                Promote Job
                            </button>
                        </div>

                        {/* 4. Support Card */}
                        <div class="p-6 sm:p-8 bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col gap-6 items-center text-center">
                            <p class="text-gray-600 text-lg font-normal">
                                Need help?
                            </p>
                            <button
                                class={`py-3 px-4 rounded-lg font-semibold text-base border ${TAILWIND_PRIMARY_BLUE} hover:bg-blue-50 transition bg-white cursor-pointer`}
                            >
                                Contact support
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        // </div>
    );
};
