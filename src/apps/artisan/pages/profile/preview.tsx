import { Component, For, Setter } from 'solid-js';

// --- Icon Components (Extracted from HTML styles) ---

// Location Icon
const LocationIcon: Component = () => (
    <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M10.206 17.474a24 24 0 0 0 2.652-2.827c1.7-2.136 2.734-4.241 2.804-6.114a5.667 5.667 0 1 0-11.325 0c.07 1.873 1.105 3.979 2.805 6.114A24 24 0 0 0 10 17.656zm-.821.97s-6.052-5.096-6.052-10.11a6.667 6.667 0 0 1 13.334 0c0 5.014-6.052 10.11-6.052 10.11a.93.93 0 0 1-1.23 0M10 10.668A2.333 2.333 0 1 0 10 6a2.333 2.333 0 0 0 0 4.666m0 1A3.333 3.333 0 1 1 10 5a3.333 3.333 0 0 1 0 6.666"
            fill="#4B5565"
        />
    </svg>
);

// Full Star Icon (Yellow)
const StarIcon: Component = () => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="m12.76 1.356 2.523 5.756a1.32 1.32 0 0 0 1.091.785l6.148.552a.847.847 0 0 1 .47 1.445l-4.632 3.891a1.32 1.32 0 0 0-.443 1.288l1.347 6.302a.847.847 0 0 1-1.23.892l-5.367-3.142a1.32 1.32 0 0 0-1.335 0l-5.366 3.14a.848.848 0 0 1-1.23-.892l1.346-6.302a1.32 1.32 0 0 0-.442-1.288L1.007 9.896a.848.848 0 0 1 .469-1.445l6.148-.552a1.32 1.32 0 0 0 1.09-.785l2.525-5.756a.849.849 0 0 1 1.52-.002"
            fill="#FDD835"
        />
        <path
            d="m12.576 7.457-.428-4.242c-.017-.236-.066-.64.313-.64.3 0 .463.624.463.624l1.283 3.405c.484 1.295.285 1.74-.182 2.002-.536.3-1.328.066-1.45-1.15"
            fill="#FFFF8D"
        />
        <path
            d="m17.865 13.408 3.679-2.87c.182-.153.51-.395.247-.67-.208-.218-.77.096-.77.096l-3.22 1.258c-.96.332-1.597.823-1.653 1.442-.074.825.667 1.46 1.717.744"
            fill="#F4B400"
        />
    </svg>
);

// Full Star Icon (For large review count)
const LargeStarIcon: Component = () => (
    <svg
        class="w-6 h-6 text-yellow-500 fill-current"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M12 2.6L14.7 9.4H22l-5.6 4.1 2.1 6.6L12 16.5l-6.5 4.6 2.1-6.6L2 9.4h7.3L12 2.6z"
            fill="#FDD835"
        />
    </svg>
);

// --- Mock Data Structures ---

const ARTISAN_DATA = {
    name: 'Stanley Agu',
    title: 'Certified Electrician',
    location: 'Lagos, Nigeria',
    languages: 'Speaks English, German, Spanish',
    response_time: 'Responds within an hour',
    rating: 4.9,
    reviews_count: 120,
    about: 'Certified electrician with 6+ years of experience. I specialize in safe wiring, fault diagnosis, and efficient installations. I bring own tools and ensure compliance with local safety rules.',
    reviews_total: 3,
};

const PORTFOLIO_DATA = [
    {
        title: 'Socket installation',
        img: `https://picsum.photos/200?random=${Math.random()}`,
    },
    {
        title: 'Home rewiring',
        img: `https://picsum.photos/200?random=${Math.random()}`,
    },
    {
        title: 'Home rewiring',
        img: `https://picsum.photos/200?random=${Math.random()}`,
    },
];

const AVAILABILITY_DATA = [
    { date: 'Sept 30, 2025', time: '9:00 AM - 1:30 PM', isAvailable: false },
    { date: 'Oct 1, 2025', time: '9:00 AM - 1:30 PM', isAvailable: true }, // Highlighted in original HTML
    { date: 'Oct 12, 2025', time: '9:00 AM - 1:30 PM', isAvailable: false },
    { date: 'Oct 20, 2025', time: '9:00 AM - 1:30 PM', isAvailable: false },
    { date: 'Oct 31, 2025', time: '9:00 AM - 1:30 PM', isAvailable: false },
];

const SKILL_TAGS = [
    'Wiring',
    'Socket',
    'Earthing',
    'Lighting',
    'Circuit Board Repair',
    'Fault Diagnosis',
];

const REVIEWS = [
    {
        name: 'Danni M',
        date: 'Sept 2025',
        stars: 4,
        comment: 'Excellent work, fixed our wiring the same day.',
        job: 'Electrician - House wiring',
    },
    {
        name: 'Sarah J',
        date: '1 month ago',
        stars: 5,
        comment:
            'PairProfit connected me with a reliable plumber the same day. Professional and skilled.',
        job: 'Plumber - leaking pipe repair',
    },
    {
        name: 'Joe Mike',
        date: '2 months ago',
        stars: 5,
        comment: 'Quick response and fair pricing. Highly recommend Stanley!',
        job: 'Electrician - Light installation',
    },
];

// --- Helper Components ---

const RatingStars: Component<{ count: number }> = (props) => (
    <div class="flex items-center gap-1">
        <For each={Array(props.count).fill(0)}>{() => <StarIcon />}</For>
    </div>
);

const ReviewSummaryBar: Component<{
    stars: number;
    count: number;
    total: number;
    label: string;
}> = (props) => {
    const percentage = (props.count / props.total) * 100;
    const isFiveStar = props.stars === 5;
    const barColor = isFiveStar ? 'bg-gray-900' : 'bg-gray-300';
    const textColor = isFiveStar ? 'text-gray-900' : 'text-gray-500';

    return (
        <div class="flex items-center gap-5 w-full">
            <div
                class={`text-lg font-medium ${textColor} w-[50px] sm:w-[65px]`}
            >
                {props.stars} {isFiveStar ? 'stars' : 'star'}
            </div>
            <div class="flex-grow flex items-center gap-5">
                <div class="relative w-full h-2 bg-gray-200 rounded-full">
                    <div
                        class={`h-2 ${barColor} rounded-full`}
                        style={{ width: `${percentage}%` }}
                    ></div>
                </div>
                <div class="flex justify-start items-center gap-2">
                    <div class={`text-lg font-normal ${textColor}`}>
                        ({props.count})
                    </div>
                    <div class="hidden sm:block text-lg font-medium text-gray-500 whitespace-nowrap">
                        {props.label}
                    </div>
                </div>
            </div>
            <For each={Array(props.stars).fill(0)}>
                {() => <LargeStarIcon />}
            </For>
        </div>
    );
};

// --- Main Artisan Profile Component ---

export const ArtisanProfile: Component<{
    setProfilePreview: Setter<boolean>;
}> = (props) => {
    return (
        <div class="w-full bg-gray-50 flex justify-center py-8 lg:py-12">
            <div class="w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-8 lg:gap-12">
                {/* --- 1. Header (Profile Details and Actions) --- */}
                <div class="w-full flex flex-col gap-6 lg:gap-8 bg-white shadow-sm rounded-xl border border-gray-200 p-6">
                    {/* Back Button (Simplified SVG) */}
                    <button
                        class="w-6 h-6 cursor-pointer"
                        onClick={() => props.setProfilePreview(false)}
                    >
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M9.57 5.93 3.5 12l6.07 6.07M20.5 12H3.67"
                                stroke="#121926"
                                stroke-width="1.5"
                                stroke-miterlimit="10"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                    </button>

                    <div class="w-full flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6 lg:gap-8">
                        {/* Avatar and Info Block */}
                        <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                            <img
                                class="w-20 h-20 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full object-cover"
                                src={`https://picsum.photos/200?random=${Math.random()}`}
                                alt={`${ARTISAN_DATA.name}'s profile`}
                            />
                            <div class="flex flex-col justify-start items-start gap-1">
                                <h1 class="text-2xl lg:text-3xl font-semibold text-gray-900 leading-9">
                                    {ARTISAN_DATA.name}
                                </h1>
                                <div class="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 flex-wrap">
                                    {/* Location */}
                                    <div class="flex items-center gap-1">
                                        <LocationIcon />
                                        <p class="text-base lg:text-lg font-normal text-gray-700">
                                            {ARTISAN_DATA.location}
                                        </p>
                                    </div>
                                    <div class="hidden sm:block w-2 h-2 bg-gray-400 rounded-full"></div>
                                    {/* Languages */}
                                    <p class="text-base lg:text-lg font-medium text-gray-700">
                                        {ARTISAN_DATA.languages}
                                    </p>
                                </div>
                                <div class="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 flex-wrap mt-1">
                                    {/* Response Time */}
                                    <p class="text-base lg:text-lg font-normal text-gray-600">
                                        {ARTISAN_DATA.response_time}
                                    </p>
                                    <div class="hidden sm:block w-2 h-2 bg-gray-400 rounded-full"></div>
                                    {/* Rating */}
                                    <div class="flex items-center gap-1">
                                        <RatingStars count={1} />
                                        <p class="text-base lg:text-lg font-normal text-gray-600">
                                            {ARTISAN_DATA.rating} (
                                            {ARTISAN_DATA.reviews_count}{' '}
                                            reviews)
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div class="flex items-center gap-4 mt-2 sm:mt-0">
                            <button class="px-5 py-3 bg-[#1376A1] rounded-lg text-white font-semibold text-base transition hover:bg-sky-800 cursor-pointer">
                                Contact Me
                            </button>
                            <button class="w-10 h-10 p-1.5 rounded-lg border border-gray-300 hover:bg-gray-100 transition flex items-center justify-center cursor-pointer">
                                <svg
                                    width="28"
                                    height="28"
                                    viewBox="0 0 28 28"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M4.947 14.292a4.9 4.9 0 0 1-1.447-3.5 4.958 4.958 0 0 1 9.263-2.462h1.307a4.95 4.95 0 0 1 4.305-2.497 4.96 4.96 0 0 1 4.958 4.958 5.04 5.04 0 0 1-1.446 3.5l-8.47 8.459zm17.756.828a6.122 6.122 0 0 0-4.328-10.453c-2.042 0-3.85.991-4.958 2.531a6.09 6.09 0 0 0-4.959-2.531 6.125 6.125 0 0 0-6.125 6.124c0 1.692.689 3.209 1.797 4.329l9.287 9.287z"
                                        fill="#364152"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* --- Content Sections --- */}
                <div class="w-full flex flex-col gap-8 lg:gap-10">
                    {/* --- 2. About Section --- */}
                    <div class="w-full p-6 bg-white shadow-sm rounded-xl border border-gray-200">
                        <h2 class="text-xl font-semibold text-gray-900 leading-8 mb-3">
                            About {ARTISAN_DATA.name}
                        </h2>
                        <p class="text-base font-normal text-gray-700 leading-relaxed">
                            {ARTISAN_DATA.about}
                        </p>
                    </div>

                    {/* --- 3. Portfolio Section --- */}
                    <div class="w-full p-6 bg-white shadow-sm rounded-xl border border-gray-200">
                        <h2 class="text-xl font-semibold text-gray-900 leading-8 mb-5">
                            Portfolio
                        </h2>

                        {/* Responsive Grid for Portfolio Images */}
                        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            <For each={PORTFOLIO_DATA}>
                                {(item) => (
                                    <div class="flex flex-col gap-3">
                                        <img
                                            class="w-full h-auto rounded-xl object-cover aspect-[4/3] sm:aspect-[305/258]"
                                            src={item.img}
                                            alt={item.title}
                                        />
                                        <p class="text-sm font-normal text-gray-800">
                                            {item.title}
                                        </p>
                                    </div>
                                )}
                            </For>
                        </div>
                    </div>

                    {/* --- 4. Artisan Availability Section --- */}
                    <div class="w-full p-6 bg-white rounded-xl border border-gray-200">
                        <div class="flex justify-between items-center mb-6">
                            <h2 class="text-xl font-semibold text-gray-900 leading-8">
                                Artisan Availability
                            </h2>
                            <button class="px-4 py-2 bg-[#1376A1] rounded-lg text-white font-semibold text-base transition hover:bg-sky-800 cursor-pointer">
                                Book
                            </button>
                        </div>

                        {/* Availability Chips (Responsive Wrap) */}
                        <div class="flex flex-wrap gap-3">
                            <For each={AVAILABILITY_DATA}>
                                {(slot) => (
                                    <div
                                        class="p-3 rounded-lg border flex flex-col justify-start items-start gap-1 cursor-pointer"
                                        classList={{
                                            'border-[#1376A1]':
                                                slot.isAvailable,
                                            'border-gray-300 hover:border-gray-400':
                                                !slot.isAvailable,
                                        }}
                                    >
                                        <p class="text-sm font-normal text-gray-700">
                                            {slot.date}
                                        </p>
                                        <p class="text-sm font-normal text-gray-700">
                                            {slot.time.replace('. ', '')}
                                        </p>
                                    </div>
                                )}
                            </For>
                        </div>
                    </div>

                    {/* --- 5. Skills Section --- */}
                    <div class="w-full p-6 bg-white rounded-xl border border-gray-200">
                        <h2 class="text-xl font-semibold text-gray-900 leading-8 mb-5">
                            Skills
                        </h2>

                        {/* Skill Tags (Responsive Wrap) */}
                        <div class="flex flex-wrap gap-4">
                            <For each={SKILL_TAGS}>
                                {(skill) => (
                                    <div class="px-4 py-1.5 bg-gray-200 rounded-full flex items-center gap-2">
                                        <p class="text-sm font-medium text-gray-600">
                                            {skill}
                                        </p>
                                        {/* Simple X icon for close/remove (as suggested by original HTML outline) */}
                                        <svg
                                            class="w-5 h-5 text-gray-700"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M18 6L6 18M6 6L18 18"
                                                stroke="currentColor"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                        </svg>
                                    </div>
                                )}
                            </For>
                        </div>
                    </div>

                    {/* --- 6. Reviews Section --- */}
                    <div class="w-full flex flex-col gap-6 lg:gap-8">
                        {/* Review Summary Header */}
                        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-6 border-b border-gray-200 pb-6">
                            <h2 class="text-2xl font-semibold text-gray-900">
                                {ARTISAN_DATA.reviews_total} Reviews
                            </h2>
                            <div class="flex items-center gap-4">
                                <For each={Array(5).fill(0)}>
                                    {() => <LargeStarIcon />}
                                </For>
                            </div>
                        </div>

                        {/* Rating Breakdown (Desktop-first style, adapts to stack on very small mobile) */}
                        <div class="w-full flex flex-col gap-4">
                            <ReviewSummaryBar
                                stars={5}
                                count={3}
                                total={3}
                                label="Rating breakdown"
                            />
                            <ReviewSummaryBar
                                stars={4}
                                count={0}
                                total={3}
                                label="Seller communication level"
                            />
                            <ReviewSummaryBar
                                stars={3}
                                count={0}
                                total={3}
                                label="Quality of delivery"
                            />
                            <ReviewSummaryBar
                                stars={2}
                                count={0}
                                total={3}
                                label="Value for money"
                            />
                            <ReviewSummaryBar
                                stars={1}
                                count={0}
                                total={3}
                                label=""
                            />
                        </div>

                        {/* Individual Reviews */}
                        <div class="w-full flex flex-col gap-5">
                            <For each={REVIEWS}>
                                {(review) => (
                                    <div class="w-full p-5 bg-white rounded-xl border border-gray-300 flex flex-col gap-4">
                                        {/* Reviewer Header */}
                                        <div class="flex items-center gap-4">
                                            <img
                                                class="w-14 h-14 rounded-full object-cover"
                                                src={`https://picsum.photos/200?random=${Math.random()}`}
                                                alt={`${review.name}'s avatar`}
                                            />
                                            <div class="flex flex-col gap-0.5">
                                                <p class="text-lg font-medium text-gray-900">
                                                    {review.name}
                                                </p>
                                                <p class="text-base font-normal text-gray-700">
                                                    {review.date}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Review Content */}
                                        <div class="flex flex-col gap-2">
                                            <div class="flex items-center gap-3">
                                                <RatingStars
                                                    count={review.stars}
                                                />
                                                <p class="text-lg font-medium text-gray-900">
                                                    {review.stars}
                                                </p>
                                            </div>
                                            <p class="text-base font-medium text-gray-800">
                                                {review.comment}
                                            </p>
                                            <p class="text-base font-normal text-gray-600">
                                                Job: {review.job}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </For>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
