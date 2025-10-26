import { Component, createSignal, Show } from 'solid-js';

// --- 1. Helper Components: Icons & Star Rating ---

// A helper for the common yellow star icon
const StarIcon: Component<{ size?: string }> = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        class={`fill-current ${props.size || 'w-5 h-5'} text-yellow-500`}
        viewBox="0 0 24 24"
    >
        <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.92-7.416 3.92 1.48-8.279-6.064-5.828 8.332-1.151z" />
    </svg>
);

// Renders a sequence of stars based on the rating
const StarRating: Component<{
    rating: number;
    maxRating?: number;
    size?: string;
}> = (props) => {
    const max = props.maxRating || 5;
    return (
        <div class="flex">
            {[...Array(max)].map((_, i) => (
                <div
                    class="mr-1 last:mr-0"
                    style={{ opacity: i < props.rating ? 1 : 0.3 }}
                >
                    <StarIcon size={props.size} />
                </div>
            ))}
        </div>
    );
};

const BackArrowIcon: Component = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-6 h-6 text-gray-900"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
    >
        <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
        />
    </svg>
);

const DropdownIcon: Component<{ classList?: any }> = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-4 h-4 text-slate-500 transition-transform duration-200"
        classList={props.classList}
        viewBox="0 0 20 20"
        fill="currentColor"
    >
        <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
        />
    </svg>
);

// --- 2. Data Structures (Mock) ---

interface Review {
    clientName: string;
    date: string;
    rating: number;
    comment: string;
    job: string;
    avatarUrl: string;
}

interface RatingBarData {
    stars: number;
    count: number;
    breakdownLabel?: string;
    breakdownScore?: number;
}

// Mock Data
const MOCK_REVIEWS: Review[] = [
    {
        clientName: 'Danni M',
        date: 'Sept 2025',
        rating: 5,
        comment: 'Excellent work, fixed our wiring the same day.',
        job: 'Plumber - leaking pipe repair',
        avatarUrl: 'https://placehold.co/70x70?text=DM',
    },
    {
        clientName: 'Jose Williams',
        date: '1 month ago',
        rating: 5,
        comment:
            'PairProfit connected me with a reliable plumber the same day. Professional and skilled',
        job: 'Plumber - leaking pipe repair',
        avatarUrl: 'https://placehold.co/70x70?text=JW',
    },
    {
        clientName: 'Joe Mike',
        date: '2 months ago',
        rating: 5,
        comment:
            'PairProfit connected me with a reliable plumber the same day. Professional and skilled',
        job: 'Electrician - House wiring',
        avatarUrl: 'https://placehold.co/70x70?text=JM',
    },
];

const MOCK_BREAKDOWN: RatingBarData[] = [
    { stars: 5, count: 10, breakdownLabel: 'Rating breakdown' },
    {
        stars: 4,
        count: 2,
        breakdownLabel: 'Seller communication level',
        breakdownScore: 5,
    },
    {
        stars: 3,
        count: 0,
        breakdownLabel: 'Quality of delivery',
        breakdownScore: 5,
    },
    {
        stars: 2,
        count: 0,
        breakdownLabel: 'Value of delivery',
        breakdownScore: 5,
    },
    { stars: 1, count: 0 },
];
const totalReviews = 12;
const averageRating = 4.9;

// --- 3. Review Bar Component ---

const RatingBar: Component<RatingBarData & { totalReviews: number }> = (
    props
) => {
    const barWidthPercentage =
        props.totalReviews > 0 ? (props.count / props.totalReviews) * 100 : 0;
    const starColor =
        props.stars === 5 && props.count > 0
            ? 'text-gray-900'
            : 'text-slate-500';
    const filledBarColor = 'bg-gray-900';
    const emptyBarColor = 'bg-slate-200';

    return (
        // Responsive container: uses flex-col on mobile, flex-row on desktop for alignment
        <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center w-full gap-2 lg:gap-4">
            {/* Left Section: Star Count, Bar, and Review Count (Fixed structure) */}
            <div class="flex items-center gap-4 w-full lg:w-[450px] flex-shrink-0">
                <div
                    class={`text-lg font-medium leading-loose ${starColor} w-16 flex-shrink-0`}
                >
                    {props.stars} {props.stars === 1 ? 'star' : 'stars'}
                </div>
                <div
                    class="flex-grow h-2 rounded-full overflow-hidden"
                    classList={{ [emptyBarColor]: true }}
                >
                    <div
                        class={`${filledBarColor} h-full rounded-full transition-all duration-300`}
                        style={{ width: `${barWidthPercentage}%` }}
                        aria-label={`${props.count} reviews for ${props.stars} stars`}
                    ></div>
                </div>
                <div
                    class={`text-xl font-normal leading-loose ${starColor} w-10 flex-shrink-0`}
                >
                    ({props.count})
                </div>
            </div>

            {/* Right Section: Breakdown Label and Score (Conditional/Flexible) */}
            {props.breakdownLabel && (
                // Stacks/aligns items differently on small vs large screens
                <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between flex-grow w-full lg:w-auto lg:pl-8">
                    <div
                        class={`text-lg font-medium leading-loose ${starColor} whitespace-nowrap`}
                    >
                        {props.breakdownLabel}
                    </div>
                    {props.breakdownScore !== undefined && (
                        <div class="flex items-center gap-1 mt-1 lg:mt-0 lg:ml-4 flex-shrink-0">
                            <StarIcon size="w-6 h-6" />{' '}
                            {/* Larger star for the metric score */}
                            <div class="text-xl font-medium text-gray-900 leading-loose">
                                {props.breakdownScore}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

// --- 4. Review Summary Card Component ---

interface ReviewSummaryCardProps {
    averageRating: number;
    totalReviews: number;
    ratingBreakdown: RatingBarData[];
}

const ReviewSummaryCard: Component<ReviewSummaryCardProps> = (props) => {
    return (
        <div class="w-full p-6 sm:p-8 lg:p-10 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col lg:flex-row justify-start items-start lg:items-center gap-8 lg:gap-16">
            {/* Left Section: Average Rating */}
            <div class="flex flex-col justify-center items-center gap-2 flex-shrink-0 w-full lg:w-40 border-b lg:border-b-0 lg:border-r border-slate-200 pb-6 lg:pb-0 lg:pr-10">
                <div class="text-yellow-500 text-4xl font-semibold leading-tight">
                    {props.averageRating.toFixed(1)}
                </div>
                <StarRating
                    rating={Math.round(props.averageRating)}
                    size="w-6 h-6"
                />
                <div class="flex flex-col gap-1 items-center">
                    <div class="text-sm font-medium text-gray-800 leading-loose">
                        Average Rating
                    </div>
                    <div class="text-sm font-bold text-slate-700">
                        {props.totalReviews} Reviews
                    </div>
                </div>
            </div>

            {/* Right Section: Rating Breakdown */}
            <div class="flex flex-col justify-start items-start gap-4 w-full flex-grow">
                {props.ratingBreakdown.map((data) => (
                    <RatingBar {...data} totalReviews={props.totalReviews} />
                ))}
            </div>
        </div>
    );
};

// --- 5. Individual Review Card Component ---

const ReviewCard: Component<{ review: Review }> = (props) => {
    return (
        <div class="w-full p-5 sm:p-6 bg-white rounded-xl border border-slate-300 flex flex-col justify-start items-start gap-4">
            {/* Header: User Info */}
            <div class="flex justify-start items-center gap-4 w-full">
                <img
                    class="w-16 h-16 rounded-full object-cover flex-shrink-0"
                    src={props.review.avatarUrl}
                    alt={`Avatar of ${props.review.clientName}`}
                />
                <div class="flex flex-col justify-start items-start gap-0.5">
                    <div class="text-lg font-medium text-gray-900 leading-snug">
                        {props.review.clientName}
                    </div>
                    <div class="text-base text-slate-700 font-normal">
                        {props.review.date}
                    </div>
                </div>
            </div>

            {/* Body: Rating and Comment */}
            <div class="flex flex-col justify-start items-start gap-2">
                <div class="flex items-center gap-3">
                    <StarRating rating={props.review.rating} size="w-5 h-5" />
                    <div class="text-lg font-medium text-gray-900">
                        {props.review.rating}
                    </div>
                </div>

                <div class="flex flex-col gap-1">
                    <p class="text-base font-medium text-gray-800 leading-relaxed">
                        {props.review.comment}
                    </p>
                    <p class="text-base text-slate-600 font-normal">
                        Job: {props.review.job}
                    </p>
                </div>
            </div>
        </div>
    );
};

interface DropdownOption {
    value: string;
    label: string;
}

interface FilterDropdownProps {
    label: string; // Used for accessibility/debugging
    options: DropdownOption[];
    currentValue: string; // The currently displayed/selected value
    onSelect?: (value: string) => void; // Placeholder for selection logic
}

const FilterDropdown: Component<FilterDropdownProps> = (props) => {
    const [isOpen, setIsOpen] = createSignal(false);
    const toggleDropdown = () => setIsOpen(!isOpen());

    return (
        // Relative positioning container for the absolute dropdown menu
        <div class="relative w-full sm:w-auto">
            {/* Dropdown Button (Always visible) */}
            <button
                onClick={toggleDropdown}
                // Responsive classes: w-full and justify-between on mobile; w-auto and justify-start on small screens (sm) and up
                class="flex items-center gap-2 p-3 border border-slate-300 rounded-lg cursor-pointer hover:border-slate-400 transition-colors w-full justify-between sm:w-auto sm:justify-start"
                aria-expanded={isOpen()}
                aria-label={`Current filter: ${props.currentValue}. Click to change.`}
            >
                <span class="text-base font-medium text-slate-600">
                    {props.currentValue}
                </span>
                <DropdownIcon classList={{ 'rotate-180': isOpen() }} />
            </button>

            {/* Dropdown Menu (Conditionally rendered when isOpen() is true) */}
            <Show when={isOpen()}>
                <div class="absolute z-20 top-full mt-2 w-full bg-white border border-slate-200 rounded-lg shadow-xl right-0 sm:left-0">
                    {props.options.map((option) => (
                        <button
                            class="w-full text-left px-4 py-2 text-base text-gray-700 hover:bg-slate-50 transition-colors"
                            onClick={() => {
                                // In a real application, you'd call props.onSelect here
                                console.log(`Selected: ${option.value}`);
                                setIsOpen(false);
                            }}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            </Show>
        </div>
    );
};

// --- 6. Main Reviews Page Component ---
export const ReviewsPage: Component<{
    closeReview: () => void;
}> = (props) => {
    // --- Mock Data for Dropdowns ---
    const sortOptions: DropdownOption[] = [
        { value: 'recent', label: 'Most recent' },
        { value: 'highest', label: 'Highest rated' },
        { value: 'lowest', label: 'Lowest rated' },
    ];

    const jobOptions: DropdownOption[] = [
        { value: 'all', label: 'All jobs' },
        { value: 'plumbing', label: 'Plumbing' },
        { value: 'electric', label: 'Electrician' },
        { value: 'carpentry', label: 'Carpentry' },
    ];

    return (
        // Max width and responsive padding
        // class="w-full max-w-6xl mx-auto p-4 sm:p-6 md:p-8 flex flex-col gap-11"
        <>
            {/* Header and Title Section */}
            <div class="flex flex-col gap-6">
                <button
                    class="w-6 h-6 p-1 text-gray-900 hover:text-sky-700 transition-colors cursor-pointer"
                    aria-label="Go back"
                    onClick={props.closeReview}
                >
                    <BackArrowIcon />
                </button>
                <div class="flex flex-col gap-1">
                    <h1 class="text-2xl font-medium text-gray-900">Reviews</h1>
                    <p class="text-sm text-slate-600">
                        See what clients are saying about your work.
                    </p>
                </div>
            </div>

            {/* --- Review Summary --- */}
            <ReviewSummaryCard
                averageRating={averageRating}
                totalReviews={totalReviews}
                ratingBreakdown={MOCK_BREAKDOWN}
            />

            {/* --- All Reviews Section --- */}
            <div class="flex flex-col gap-6 w-full pt-10">
                {/* Filter Bar: Responsive layout for filters */}
                <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h3 class="text-xl font-medium text-slate-700 whitespace-nowrap">
                        All Reviews
                    </h3>
                    <div class="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                        {/* Sort Filter */}
                        <FilterDropdown
                            label="Sort By"
                            options={sortOptions}
                            currentValue="Most recent"
                        />

                        {/* Job Filter */}
                        <FilterDropdown
                            label="Job Filter"
                            options={jobOptions}
                            currentValue="All jobs"
                        />
                    </div>
                </div>

                {/* Review List */}
                <div class="flex flex-col gap-5 w-full">
                    {MOCK_REVIEWS.map((review) => (
                        <ReviewCard review={review} />
                    ))}
                </div>
            </div>
        </>
    );
};
