// You may need to install and configure 'react-icons' or an equivalent icon library for the icons
// For simplicity, the icons are placeholders (JSX elements with Tailwind styles mimicking the original outlines).

import { Component, createSignal, Show } from 'solid-js';
import { RecentJobHistory, JobHistoryItem } from './RecentJob';
import { RevenueChart } from './RevenueChart';
import { ReviewsPage } from './Review';
import { PostAvailabilityModal } from '../../modals';

/**
 * Props for the DashboardComponent.
 * In a real application, data would be passed via props or fetched within the component.
 */
interface DashboardProps {
    userName: string;
    monthlyEarnings: string;
    completedJobs: number;
    activeJobs: number;
    pendingJobs: number;
    totalRevenue: string;
    dateRange: string;
}

// Helper component for the metric card icons
const MetricIcon: Component<{
    color: string;
    bgColor: string;
    iconType: 'earnings' | 'completed' | 'active' | 'pending';
}> = ({ bgColor, iconType }) => {
    // These JSX elements are simplified representations of the original SVG-like icons.
    const icons = {
        earnings: (
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M8.672 14.33c0 1.29.99 2.33 2.22 2.33h2.51c1.07 0 1.94-.91 1.94-2.03 0-1.22-.53-1.65-1.32-1.93l-4.03-1.4c-.79-.28-1.32-.71-1.32-1.93 0-1.12.87-2.03 1.94-2.03h2.51c1.23 0 2.22 1.04 2.22 2.33M12 6v12"
                    stroke="#34A853"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
                <path
                    d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10"
                    stroke="#34A853"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
            </svg>
        ),
        completed: (
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="m9.31 14.7 1.5 1.5 4-4"
                    stroke="#9E07DF"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
                <path
                    d="M10 6h4c2 0 2-1 2-2 0-2-1-2-2-2h-4C9 2 8 2 8 4s1 2 2 2"
                    stroke="#9E07DF"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
                <path
                    d="M16 4.02c3.33.18 5 1.41 5 5.98v6c0 4-1 6-6 6H9c-5 0-6-2-6-6v-6c0-4.56 1.67-5.8 5-5.98"
                    stroke="#9E07DF"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
            </svg>
        ),
        active: (
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M12 6.44v3.33M12.02 2C8.34 2 5.36 4.98 5.36 8.66v2.1c0 .68-.28 1.7-.63 2.28l-1.27 2.12c-.78 1.31-.24 2.77 1.2 3.25a23.34 23.34 0 0 0 14.73 0 2.22 2.22 0 0 0 1.2-3.25l-1.27-2.12c-.35-.58-.63-1.61-.63-2.28v-2.1C18.68 5 15.68 2 12.02 2Z"
                    stroke="#4285F4"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                />
                <path
                    d="M15.33 18.82c0 1.83-1.5 3.33-3.33 3.33-.91 0-1.75-.38-2.35-.98s-.98-1.44-.98-2.35"
                    stroke="#4285F4"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                />
            </svg>
        ),
        pending: (
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M22 12c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2s10 4.48 10 10"
                    stroke="#EA4335"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
                <path
                    d="m15.71 15.18-3.1-1.85c-.54-.32-.98-1.09-.98-1.72v-4.1"
                    stroke="#EA4335"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
            </svg>
        ),
    };

    return (
        <div
            class={`w-11 h-11 relative rounded-xl flex justify-center items-center ${bgColor}`}
        >
            <div class="w-6 h-6 relative">{icons[iconType]}</div>
        </div>
    );
};

// Helper component for the Job Request cards
const JobRequestCard: Component<{
    title: string;
    location: string;
    budget: string;
    urgency: 'Urgent' | 'Flexible';
}> = ({ title, location, budget, urgency }) => {
    const urgencyClass =
        urgency === 'Urgent' ? 'text-red-500' : 'text-green-600';

    return (
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border border-slate-300 rounded-xl">
            {/* Job Details */}
            <div class="flex flex-col gap-2 mb-4 md:mb-0">
                <div class="text-base font-semibold text-gray-900">{title}</div>
                <div class="flex flex-wrap items-center gap-2 text-sm text-gray-600">
                    <span>{location}</span>
                    <div class="w-1 h-1 bg-slate-300 rounded-full"></div>
                    <span class="text-gray-600">
                        Budget:{' '}
                        <span class="text-gray-900 font-semibold">
                            {budget}
                        </span>
                    </span>
                    <div class="w-1 h-1 bg-slate-300 rounded-full"></div>
                    <span class={`font-medium ${urgencyClass}`}>{urgency}</span>
                </div>
            </div>

            {/* Action Buttons */}
            <div class="flex flex-shrink-0 items-center gap-2">
                {/* Reject Button (Secondary Outline) */}
                <button
                    class="px-4 py-3 text-sm font-semibold text-sky-700 border border-sky-700 rounded-lg hover:bg-sky-50 transition-colors"
                    // SolisJS event handler
                    onClick={() => console.log('Reject clicked for:', title)}
                >
                    Reject
                </button>

                {/* Accept Button (Primary) */}
                <button
                    class="px-4 py-3 text-sm font-semibold text-white bg-sky-700 rounded-lg hover:bg-sky-800 transition-colors"
                    // SolisJS event handler
                    onClick={() => console.log('Accept clicked for:', title)}
                >
                    Accept
                </button>
            </div>
        </div>
    );
};

// Helper component for the Review cards
const ReviewCard: Component<{
    name: string;
    date: string;
    comment: string;
    imgSrc: string;
}> = ({ name, date, comment, imgSrc }) => {
    return (
        <div class="flex items-center gap-3">
            <img
                class="w-[70px] h-[70px] rounded-full object-cover"
                src={imgSrc}
                alt={`${name}'s profile`}
            />
            <div class="flex flex-col gap-2 w-full">
                <div class="flex flex-wrap items-center gap-2">
                    <div class="text-base font-semibold text-gray-900">
                        {name}
                    </div>
                    <div class="w-1 h-1 bg-slate-300 rounded-full"></div>
                    <div class="text-sm font-medium text-slate-500">{date}</div>
                </div>
                <div class="text-sm text-slate-700">{comment}</div>
            </div>
        </div>
    );
};

const sampleJobs: JobHistoryItem[] = [
    {
        id: 1,
        title: 'Carpenter for door repair',
        location: 'Ikeja',
        date: '31st August, 2025',
        amount: '$100',
        status: 'Completed',
    },
    {
        id: 2,
        title: 'Painter for living room',
        location: 'Lekki',
        date: '30th June, 2025',
        amount: '$200',
        status: 'Cancelled',
    },
    {
        id: 3,
        title: 'Electrician - Socket fix',
        location: 'Victoria Island',
        date: '22nd July, 2025',
        amount: '$100',
        status: 'Completed',
    },
    {
        id: 4,
        title: 'Plumber needed for leaking pipe',
        location: 'Ikeja',
        date: '30th June, 2025',
        amount: '$150',
        status: 'Pending',
    },
    {
        id: 5,
        title: 'Roof repair and sealing',
        location: 'Yaba',
        date: '10th May, 2025',
        amount: '$350',
        status: 'Completed',
    },
    {
        id: 6,
        title: 'Plumber needed for leaking pipe',
        location: 'Ikeja',
        date: '30th June, 2025',
        amount: '$150',
        status: 'Pending',
    },
    {
        id: 7,
        title: 'Roof repair and sealing',
        location: 'Yaba',
        date: '10th May, 2025',
        amount: '$350',
        status: 'Completed',
    },
];

// Main Dashboard Component
export const ArtisanDashboardComponent = () => {
    // Simplified Revenue Chart - Since dynamic chart generation is not feasible in this environment,
    // this acts as a responsive placeholder maintaining the layout integrity.
    const [showReview, setShowReview] = createSignal(false);
    const [postAvailability, setPostAvailability] = createSignal(false);
    const [dashboardState] = createSignal<DashboardProps>({
        userName: 'anthony',
        monthlyEarnings: '4500',
        completedJobs: 30,
        activeJobs: 30,
        pendingJobs: 10,
        totalRevenue: '899',
        dateRange: 'thursday',
    });

    const closeReview = () => {
        setShowReview(false);
    };

    return (
        <main class="p-6">
            <PostAvailabilityModal
                isOpen={postAvailability}
                closeModal={setPostAvailability}
            />
            <Show when={!showReview()}>
                <div class="flex flex-col gap-4 border-b border-gray-200 pb-18">
                    {/* 1. Header and Call-to-Action Button */}
                    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        {/* Welcome Message (Text elements) */}
                        <div class="flex flex-col gap-1">
                            <h1 class="text-2xl font-medium text-gray-900 leading-normal">
                                Welcome back <b>{dashboardState().userName}</b>!
                            </h1>
                            <p class="text-base text-slate-600 leading-relaxed">
                                Ready to get things done today?
                            </p>
                        </div>

                        <button
                            class="px-4 py-3 text-base font-semibold text-white bg-sky-700 rounded-lg hover:bg-sky-800 transition-colors w-full md:w-auto cursor-pointer"
                            // SolisJS event handler
                            onClick={() => setPostAvailability(true)}
                        >
                            Post Availability
                        </button>
                    </div>

                    {/* 2. Metric Cards */}
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {/* Card 1: Monthly Earnings */}
                        <div class="flex justify-between items-end p-6 bg-white border border-slate-200 rounded-xl cursor-pointer border border-gray-100 transition-all duration-300 ease-in-out hover:shadow-md hover:-translate-y-1">
                            <div class="flex flex-col gap-1">
                                <div class="text-xl text-slate-700 font-normal">
                                    Monthly Earnings
                                </div>
                                <div class="text-3xl font-bold text-gray-900">
                                    {dashboardState().monthlyEarnings}
                                </div>
                            </div>
                            <MetricIcon
                                color="text-green-600"
                                bgColor="bg-green-100/70"
                                iconType="earnings"
                            />
                        </div>

                        {/* Card 2: Completed Jobs */}
                        <div class="flex justify-between items-end p-6 bg-white border border-slate-200 rounded-xl cursor-pointer border border-gray-100 transition-all duration-300 ease-in-out hover:shadow-md hover:-translate-y-1">
                            <div class="flex flex-col gap-1">
                                <div class="text-xl text-slate-700 font-normal">
                                    Completed Jobs
                                </div>
                                <div class="text-3xl font-bold text-gray-900">
                                    {dashboardState().completedJobs}
                                </div>
                            </div>
                            <MetricIcon
                                color="text-purple-600"
                                bgColor="bg-purple-100/70"
                                iconType="completed"
                            />
                        </div>

                        {/* Card 3: Active Jobs */}
                        <div class="flex justify-between items-end p-6 bg-white border border-slate-200 rounded-xl cursor-pointer border border-gray-100 transition-all duration-300 ease-in-out hover:shadow-md hover:-translate-y-1">
                            <div class="flex flex-col gap-1">
                                <div class="text-xl text-slate-700 font-normal">
                                    Active Jobs
                                </div>
                                <div class="text-3xl font-bold text-gray-900">
                                    {dashboardState().activeJobs}
                                </div>
                            </div>
                            <MetricIcon
                                color="text-blue-500"
                                bgColor="bg-blue-100/70"
                                iconType="active"
                            />
                        </div>

                        {/* Card 4: Pending Jobs */}
                        <div class="flex justify-between items-end p-6 bg-white border border-slate-200 rounded-xl cursor-pointer border border-gray-100 transition-all duration-300 ease-in-out hover:shadow-md hover:-translate-y-1">
                            <div class="flex flex-col gap-1">
                                <div class="text-xl text-slate-700 font-normal">
                                    Pending Jobs
                                </div>
                                <div class="text-3xl font-bold text-gray-900">
                                    {dashboardState().pendingJobs}
                                </div>
                            </div>
                            <MetricIcon
                                color="text-red-500"
                                bgColor="bg-red-100/70"
                                iconType="pending"
                            />
                        </div>
                    </div>

                    <RevenueChart
                        totalRevenue="$3000"
                        dateRange="23th Oct. 2025"
                    />

                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5">
                        {/* New Job Requests (W: 672px in original, now fills 2/3 width) */}
                        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-8">
                            <div class="flex justify-between items-center">
                                <h3 class="text-lg font-semibold text-gray-900">
                                    New Job Requests
                                </h3>
                                <p class="text-base text-slate-700">3 New</p>
                            </div>

                            <div class="flex flex-col gap-4">
                                <JobRequestCard
                                    title="Plumber needed for leaking pipe"
                                    location="Ikoyi"
                                    budget="$240"
                                    urgency="Urgent"
                                />
                                <JobRequestCard
                                    title="Electrician for house wiring"
                                    location="Ikoyi"
                                    budget="$240"
                                    urgency="Flexible"
                                />
                                <JobRequestCard
                                    title="Carpenter: wardrobe repair"
                                    location="Ikoyi"
                                    budget="$240"
                                    urgency="Urgent"
                                />
                            </div>
                        </div>

                        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-8">
                            <div class="flex justify-between items-center">
                                <h3 class="text-xl font-semibold text-gray-900">
                                    Latest Review
                                </h3>
                                <a
                                    href="#"
                                    class="text-sm font-medium text-sky-700 hover:text-sky-800 transition-colors"
                                    onClick={() => setShowReview(true)}
                                >
                                    See all
                                </a>
                            </div>

                            <div class="flex flex-col gap-6">
                                <ReviewCard
                                    name="Jose Williams"
                                    date="Sept, 2025"
                                    comment="Great work- punctual and skilled"
                                    imgSrc="https://placehold.co/70x70?text=JW"
                                />
                                <ReviewCard
                                    name="Sarah Connor"
                                    date="Aug, 2025"
                                    comment="Repaired the door quickly and professionally."
                                    imgSrc="https://placehold.co/70x70?text=SC"
                                />
                                <ReviewCard
                                    name="Mike Tyson"
                                    date="Aug, 2025"
                                    comment="Excellent service, highly recommended!"
                                    imgSrc="https://placehold.co/70x70?text=MT"
                                />
                            </div>
                        </div>
                    </div>

                    <RecentJobHistory jobs={sampleJobs} />
                </div>
            </Show>
            <Show when={showReview()}>
                <div class="flex flex-col gap-4 border-b border-gray-200 pb-18">
                    <ReviewsPage closeReview={closeReview} />
                </div>
            </Show>
        </main>
    );
};
