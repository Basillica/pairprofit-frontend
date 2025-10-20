import { createSignal, For } from 'solid-js';
import { JobItemCard } from './utils/dropdown';
import { PostJobForm } from '../../modals/NewJob';

interface Job {
    id: number;
    title: string;
    category: string;
    location: string;
    dueDate: string;
    budget: string;
    status: 'Completed' | 'In progress' | 'Ongoing';
}

// --- Dummy Data ---
const JOB_DATA: Job[] = [
    {
        id: 101,
        title: 'Plumber needed for leaking pipe',
        category: 'Construction',
        location: 'Ikeja',
        dueDate: '15th Sept, 2025',
        budget: 'N25,000',
        status: 'Completed',
    },
    {
        id: 102,
        title: 'Painter for apartment renovation',
        category: 'Decoration',
        location: 'Ikoyi',
        dueDate: '20th Sept, 2025',
        budget: 'N80,000',
        status: 'In progress',
    },
    {
        id: 103,
        title: 'Electrician for house wiring',
        category: 'Construction',
        location: 'Lekki Phase 1',
        dueDate: '10th Oct, 2025',
        budget: 'N55,000',
        status: 'Ongoing',
    },
    {
        id: 104,
        title: 'Carpenter to fix roof damage',
        category: 'Repairs',
        location: 'Yaba',
        dueDate: '25th Sept, 2025',
        budget: 'N45,000',
        status: 'Ongoing',
    },
];

export const ClientsDashboardPage = () => {
    const [postNewJob, setPostNewJob] = createSignal(false);
    return (
        <main class="p-6">
            <PostJobForm isOpen={postNewJob} closeModal={setPostNewJob} />
            {/* Welcome Header and Post Job Button */}
            <div class="flex justify-between items-start mb-6">
                <div>
                    <h1 class="text-2xl font-bold text-gray-900">
                        Welcome back, Stanley!
                    </h1>
                    <p class="text-gray-500 mt-1">
                        Ready to get things done today?
                    </p>
                </div>
                <button
                    class="bg-[#1376A1] hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md flex items-center whitespace-nowrap text-sm transition-colors duration-200"
                    onClick={() => setPostNewJob(true)}
                >
                    {' '}
                    <i class="fas fa-plus mr-2 text-xs"></i> Post a Job
                </button>
            </div>

            {/* Stats Cards (Hover Effects Added) */}
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                <div class="bg-white p-5 rounded-xl shadow-sm flex items-start justify-between border border-gray-100 cursor-pointer transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-[1.01]">
                    <div style="flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 4px; display: inline-flex">
                        <div style="color: #364152; font-size: 20px; font-weight: 400; line-height: 32px; word-wrap: break-word">
                            Completed Jobs
                        </div>
                        <div style="color: #0D121C; font-size: 32px; font-weight: 600; line-height: 51.20px; word-wrap: break-word">
                            6
                        </div>
                    </div>
                    <svg
                        width="44"
                        height="44"
                        viewBox="0 0 44 44"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <rect
                            width="44"
                            height="44"
                            rx="12"
                            fill="#9E07DF"
                            fill-opacity="0.14"
                        />
                        <path
                            d="M19.31 24.7L20.81 26.2L24.81 22.2"
                            stroke="#9E07DF"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M20 16H24C26 16 26 15 26 14C26 12 25 12 24 12H20C19 12 18 12 18 14C18 16 19 16 20 16Z"
                            stroke="#9E07DF"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M26 14.02C29.33 14.2 31 15.43 31 20V26C31 30 30 32 25 32H19C14 32 13 30 13 26V20C13 15.44 14.67 14.2 18 14.02"
                            stroke="#9E07DF"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                </div>
                <div class="bg-white p-5 rounded-xl shadow-sm flex items-start justify-between border border-gray-100 cursor-pointer transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-[1.01]">
                    <div style="flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 4px; display: inline-flex">
                        <div style="align-self: stretch; color: #364152; font-size: 20px; font-weight: 400; line-height: 32px; word-wrap: break-word">
                            Active Jobs
                        </div>
                        <div style="color: #0D121C; font-size: 32px; font-weight: 600; line-height: 51.20px; word-wrap: break-word">
                            2
                        </div>
                    </div>
                    <svg
                        width="44"
                        height="44"
                        viewBox="0 0 44 44"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <rect
                            width="44"
                            height="44"
                            rx="12"
                            fill="#4285F4"
                            fill-opacity="0.14"
                        />
                        <path
                            d="M22 16.4399V19.7699"
                            stroke="#4285F4"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                        />
                        <path
                            d="M22.02 12C18.34 12 15.36 14.98 15.36 18.66V20.76C15.36 21.44 15.08 22.46 14.73 23.04L13.46 25.16C12.68 26.47 13.22 27.93 14.66 28.41C19.44 30 24.61 30 29.39 28.41C30.74 27.96 31.32 26.38 30.59 25.16L29.32 23.04C28.97 22.46 28.69 21.43 28.69 20.76V18.66C28.68 15 25.68 12 22.02 12Z"
                            stroke="#4285F4"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                        />
                        <path
                            d="M25.33 28.8201C25.33 30.6501 23.83 32.1501 22 32.1501C21.09 32.1501 20.25 31.7701 19.65 31.1701C19.05 30.5701 18.67 29.7301 18.67 28.8201"
                            stroke="#4285F4"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                        />
                    </svg>
                </div>
                <div class="bg-white p-5 rounded-xl shadow-sm flex items-start justify-between border border-gray-100 cursor-pointer transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-[1.01]">
                    <div style="flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 4px; display: inline-flex">
                        <div style="color: #364152; font-size: 20px; font-weight: 400; line-height: 32px; word-wrap: break-word">
                            Pending Requests{' '}
                        </div>
                        <div style="color: #0D121C; font-size: 32px; font-weight: 600; line-height: 51.20px; word-wrap: break-word">
                            1
                        </div>
                    </div>
                    <svg
                        width="44"
                        height="44"
                        viewBox="0 0 44 44"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <rect
                            width="44"
                            height="44"
                            rx="12"
                            fill="#EA4335"
                            fill-opacity="0.14"
                        />
                        <path
                            d="M32 22C32 27.52 27.52 32 22 32C16.48 32 12 27.52 12 22C12 16.48 16.48 12 22 12C27.52 12 32 16.48 32 22Z"
                            stroke="#EA4335"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M25.71 25.18L22.61 23.33C22.07 23.01 21.63 22.24 21.63 21.61V17.51"
                            stroke="#EA4335"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                </div>
            </div>

            {/* Active Jobs List */}
            <h2 class="text-xl font-semibold text-gray-900 mb-4">
                Active Jobs
            </h2>
            <div class="space-y-4 mb-8">
                <For each={JOB_DATA}>{(job) => <JobItemCard job={job} />}</For>
            </div>

            {/* Recommended Artisans */}
            <h2 class="text-xl font-semibold text-gray-900 mb-4">
                Recommended Artisans
            </h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Artisan Cards (Hover Effects Added) */}
                <div class="bg-white p-5 rounded-lg shadow-sm text-center border border-gray-100 cursor-pointer transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-[1.01]">
                    <img
                        class="h-20 w-20 rounded-full mx-auto object-cover border-2 border-primary-blue"
                        src="https://i.pravatar.cc/150?img=5"
                        alt="Peter Williams"
                    />
                    <h3 class="text-lg font-semibold text-gray-900 mt-3">
                        Peter Williams
                    </h3>
                    <p class="text-sm text-gray-500">Plumber</p>
                    <div class="flex justify-center items-center text-yellow-500 text-sm mt-1">
                        <i class="fas fa-star text-xs"></i>
                        <span class="ml-1 text-gray-600">4.3</span>
                    </div>
                    <button class="mt-4 bg-primary-blue hover:bg-blue-600 text-white font-semibold py-2 px-8 rounded-lg text-sm transition-colors">
                        Hire
                    </button>
                </div>
                {/* Artisan Card 2 (Rehire) */}
                <div class="bg-white p-5 rounded-lg shadow-sm text-center border border-gray-100 cursor-pointer transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-[1.01]">
                    <img
                        class="h-20 w-20 rounded-full mx-auto object-cover border-2 border-gray-300"
                        src="https://i.pravatar.cc/150?img=33"
                        alt="Sarah Johnson"
                    />
                    <h3 class="text-lg font-semibold text-gray-900 mt-3">
                        Sarah Johnson
                    </h3>
                    <p class="text-sm text-gray-500">Mechanic</p>
                    <div class="flex justify-center items-center text-yellow-500 text-sm mt-1">
                        <i class="fas fa-star text-xs"></i>
                        <span class="ml-1 text-gray-600">4.9</span>
                    </div>
                    <button class="mt-4 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg text-sm transition-colors">
                        Rehire
                    </button>
                </div>
                {/* Artisan Card 3 */}
                <div class="bg-white p-5 rounded-lg shadow-sm text-center border border-gray-100 cursor-pointer transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-[1.01]">
                    <img
                        class="h-20 w-20 rounded-full mx-auto object-cover border-2 border-primary-blue"
                        src="https://i.pravatar.cc/150?img=18"
                        alt="David Lee"
                    />
                    <h3 class="text-lg font-semibold text-gray-900 mt-3">
                        David Lee
                    </h3>
                    <p class="text-sm text-gray-500">Electrician</p>
                    <div class="flex justify-center items-center text-yellow-500 text-sm mt-1">
                        <i class="fas fa-star text-xs"></i>
                        <span class="ml-1 text-gray-600">4.7</span>
                    </div>
                    <button class="mt-4 bg-primary-blue hover:bg-blue-600 text-white font-semibold py-2 px-8 rounded-lg text-sm transition-colors">
                        Hire
                    </button>
                </div>
                {/* Artisan Card 4 */}
                <div class="bg-white p-5 rounded-lg shadow-sm text-center border border-gray-100 cursor-pointer transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-[1.01]">
                    <img
                        class="h-20 w-20 rounded-full mx-auto object-cover border-2 border-primary-blue"
                        src="https://i.pravatar.cc/150?img=12"
                        alt="Maria Garcia"
                    />
                    <h3 class="text-lg font-semibold text-gray-900 mt-3">
                        Maria Garcia
                    </h3>
                    <p class="text-sm text-gray-500">Painter</p>
                    <div class="flex justify-center items-center text-yellow-500 text-sm mt-1">
                        <i class="fas fa-star text-xs"></i>
                        <span class="ml-1 text-gray-600">4.5</span>
                    </div>
                    <button class="mt-4 bg-primary-blue hover:bg-blue-600 text-white font-semibold py-2 px-8 rounded-lg text-sm transition-colors">
                        Hire
                    </button>
                </div>
                {/* Artisan Card 5 */}
                <div class="bg-white p-5 rounded-lg shadow-sm text-center border border-gray-100 cursor-pointer transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-[1.01]">
                    <img
                        class="h-20 w-20 rounded-full mx-auto object-cover border-2 border-primary-blue"
                        src="https://i.pravatar.cc/150?img=22"
                        alt="John Smith"
                    />
                    <h3 class="text-lg font-semibold text-gray-900 mt-3">
                        John Smith
                    </h3>
                    <p class="text-sm text-gray-500">Carpenter</p>
                    <div class="flex justify-center items-center text-yellow-500 text-sm mt-1">
                        <i class="fas fa-star text-xs"></i>
                        <span class="ml-1 text-gray-600">4.2</span>
                    </div>
                    <button class="mt-4 bg-primary-blue hover:bg-blue-600 text-white font-semibold py-2 px-8 rounded-lg text-sm transition-colors">
                        Hire
                    </button>
                </div>
                {/* Artisan Card 6 */}
                <div class="bg-white p-5 rounded-lg shadow-sm text-center border border-gray-100 cursor-pointer transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-[1.01]">
                    <img
                        class="h-20 w-20 rounded-full mx-auto object-cover border-2 border-primary-blue"
                        src="https://i.pravatar.cc/150?img=29"
                        alt="Emily White"
                    />
                    <h3 class="text-lg font-semibold text-gray-900 mt-3">
                        Emily White
                    </h3>
                    <p class="text-sm text-gray-500">Welder</p>
                    <div class="flex justify-center items-center text-yellow-500 text-sm mt-1">
                        <i class="fas fa-star text-xs"></i>
                        <span class="ml-1 text-gray-600">4.6</span>
                    </div>
                    <button class="mt-4 bg-primary-blue hover:bg-blue-600 text-white font-semibold py-2 px-8 rounded-lg text-sm transition-colors">
                        Hire
                    </button>
                </div>
                {/* Artisan Card 7 */}
                <div class="bg-white p-5 rounded-lg shadow-sm text-center border border-gray-100 cursor-pointer transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-[1.01]">
                    <img
                        class="h-20 w-20 rounded-full mx-auto object-cover border-2 border-primary-blue"
                        src="https://i.pravatar.cc/150?img=40"
                        alt="Robert Brown"
                    />
                    <h3 class="text-lg font-semibold text-gray-900 mt-3">
                        Robert Brown
                    </h3>
                    <p class="text-sm text-gray-500">Tiler</p>
                    <div class="flex justify-center items-center text-yellow-500 text-sm mt-1">
                        <i class="fas fa-star text-xs"></i>
                        <span class="ml-1 text-gray-600">4.1</span>
                    </div>
                    <button class="mt-4 bg-primary-blue hover:bg-blue-600 text-white font-semibold py-2 px-8 rounded-lg text-sm transition-colors">
                        Hire
                    </button>
                </div>
                {/* Artisan Card 8 */}
                <div class="bg-white p-5 rounded-lg shadow-sm text-center border border-gray-100 cursor-pointer transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-[1.01]">
                    <img
                        class="h-20 w-20 rounded-full mx-auto object-cover border-2 border-primary-blue"
                        src="https://i.pravatar.cc/150?img=50"
                        alt="Linda Green"
                    />
                    <h3 class="text-lg font-semibold text-gray-900 mt-3">
                        Linda Green
                    </h3>
                    <p class="text-sm text-gray-500">Plumber</p>
                    <div class="flex justify-center items-center text-yellow-500 text-sm mt-1">
                        <i class="fas fa-star text-xs"></i>
                        <span class="ml-1 text-gray-600">4.8</span>
                    </div>
                    <button class="mt-4 bg-primary-blue hover:bg-blue-600 text-white font-semibold py-2 px-8 rounded-lg text-sm transition-colors">
                        Hire
                    </button>
                </div>
            </div>

            {/* Recent Job History Table */}
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-xl font-semibold text-gray-900">
                    Recent Job History
                </h2>
                <a
                    href="#"
                    class="text-sm text-primary-blue font-medium hover:text-blue-600"
                >
                    View All
                </a>
            </div>

            <div class="bg-white rounded-lg shadow-sm overflow-x-auto border border-gray-100">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                        <tr>
                            <th
                                scope="col"
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                            >
                                Job Title
                            </th>
                            <th
                                scope="col"
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                            >
                                Location
                            </th>
                            <th
                                scope="col"
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                            >
                                Date
                            </th>
                            <th
                                scope="col"
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                            >
                                Amount
                            </th>
                            <th
                                scope="col"
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                            >
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        {/* Table Rows */}
                        <tr class="hover:bg-gray-50 cursor-pointer transition-colors">
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                Carpenter for door repair
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                Ikeja
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                31st August, 2025
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                $100
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-custom-green/10 text-custom-green">
                                    Completed
                                </span>
                            </td>
                        </tr>
                        <tr class="hover:bg-gray-50 cursor-pointer transition-colors">
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                Plumber for burst pipe
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                Lekki
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                30th June, 2025
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                $200
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-custom-red/10 text-custom-red">
                                    Cancelled
                                </span>
                            </td>
                        </tr>
                        <tr class="hover:bg-gray-50 cursor-pointer transition-colors">
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                Electrician for wiring
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                Victoria Island
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                22nd July, 2025
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                $100
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-custom-green/10 text-custom-green">
                                    Completed
                                </span>
                            </td>
                        </tr>
                        <tr class="hover:bg-gray-50 cursor-pointer transition-colors">
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                Tiler for bathroom floor
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                Ikeja
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                30th June, 2025
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                $100
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-custom-red/10 text-custom-red">
                                    Cancelled
                                </span>
                            </td>
                        </tr>
                        <tr class="hover:bg-gray-50 cursor-pointer transition-colors">
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                Painter for exterior wall
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                Lekki
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                1st May, 2025
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                $300
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-custom-green/10 text-custom-green">
                                    Completed
                                </span>
                            </td>
                        </tr>
                        <tr class="hover:bg-gray-50 cursor-pointer transition-colors">
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                AC Repair and service
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                Ikoyi
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                10th April, 2025
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                $150
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-custom-green/10 text-custom-green">
                                    Completed
                                </span>
                            </td>
                        </tr>
                        <tr class="hover:bg-gray-50 cursor-pointer transition-colors">
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                Gardener for lawn mowing
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                Victoria Island
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                5th March, 2025
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                $50
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-custom-green/10 text-custom-green">
                                    Completed
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </main>
    );
};
