import { Component, For } from 'solid-js';

// --- Data Structure ---
interface Artisan {
    name: string;
    role: string;
    location: string;
    rating: number;
    reviewCount: number;
    hourlyRate: number;
    imageUrl: string;
}

const ARTISANS_DATA: Artisan[] = [
    {
        name: 'Eleanor Pena',
        role: 'Electrician, Plumber Home Services',
        location: 'Lagos, Nigeria',
        rating: 4.5,
        reviewCount: 234,
        hourlyRate: 12,
        imageUrl: 'https://placehold.co/158x181/1376A1/ffffff?text=Eleanor',
    },
    {
        name: 'Wade Warren',
        role: 'Electrician, Plumber Home Services',
        location: 'Lagos, Nigeria',
        rating: 4.5,
        reviewCount: 234,
        hourlyRate: 12,
        imageUrl: 'https://placehold.co/158x181/1376A1/ffffff?text=Wade',
    },
    {
        name: 'Jane Cooper',
        role: 'Electrician, Plumber Home Services',
        location: 'Lagos, Nigeria',
        rating: 4.5,
        reviewCount: 234,
        hourlyRate: 12,
        imageUrl: 'https://placehold.co/158x181/1376A1/ffffff?text=Jane',
    },
    {
        name: 'Cameron Williamson',
        role: 'Carpenter, Furniture Maker',
        location: 'Abuja, Nigeria',
        rating: 4.8,
        reviewCount: 198,
        hourlyRate: 15,
        imageUrl: 'https://placehold.co/158x181/1376A1/ffffff?text=Cameron',
    },
    {
        name: 'Jerome Bell',
        role: 'Lawn Care Specialist',
        location: 'Enugu, Nigeria',
        rating: 4.2,
        reviewCount: 112,
        hourlyRate: 10,
        imageUrl: 'https://placehold.co/158x181/1376A1/ffffff?text=Jerome',
    },
    {
        name: 'Jenny Wilson',
        role: 'Interior Designer',
        location: 'Lagos, Nigeria',
        rating: 4.9,
        reviewCount: 301,
        hourlyRate: 20,
        imageUrl: 'https://placehold.co/158x181/1376A1/ffffff?text=Jenny',
    },
];

// --- Sub-Components ---

const ArtisanStarIcon: Component = () => (
    <svg
        class="w-5 h-5"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M10 0L13.09 6.55L20 7.5L15 12.5L16.18 20L10 16.55L3.82 20L5 12.5L0 7.5L6.91 6.55L10 0Z"
            fill="#FDAD34"
        />
    </svg>
);

const ArtisanCard: Component<Artisan> = (props) => (
    // Added min-w-[300px] and max-w-[320px] for consistent sizing and scroll behavior
    // <div style="padding: 32px; background: white; border-radius: 8px; outline: 1px #E3E8EF solid; outline-offset: -1px; justify-content: flex-start; align-items: center; gap: 24px; display: inline-flex">
    <div class="flex-shrink-0 p-8 bg-white border border-[#E3E8EF] rounded-lg flex justify-start items-center gap-6">
        {/* Image */}
        <img
            class="w-[158px] h-[181px] object-cover rounded-lg border-2 border-[#1376A1] flex-shrink-0"
            src={props.imageUrl}
            alt={props.name}
        />

        {/* Content */}
        <div class="flex-1 flex flex-col justify-start items-start gap-10">
            <div class="flex flex-col justify-start items-start gap-2.5">
                {/* Name & Role */}
                <div class="flex flex-col justify-start items-start gap-1">
                    <div class="text-xl font-semibold text-[#0F0F0F] leading-loose">
                        {props.name}
                    </div>
                    <div class="text-base font-medium text-[#5D6B78] leading-6">
                        {props.role}
                    </div>
                </div>

                {/* Location & Rating */}
                <div class="flex flex-col sm:flex-row justify-start items-start sm:items-center gap-2 sm:gap-3 flex-wrap">
                    <div class="text-sm font-semibold text-[#4B5560] leading-normal">
                        {props.location}
                    </div>
                    <div class="text-sm font-normal text-[#9AA4B2] leading-normal">
                        |
                    </div>
                    <div class="flex justify-start items-center gap-2">
                        <ArtisanStarIcon />
                        <span class="text-sm font-semibold text-[#4B5560] leading-normal">
                            {props.rating.toFixed(1)}
                            <span class="font-medium">
                                ({props.reviewCount} reviews)
                            </span>
                        </span>
                    </div>
                </div>
            </div>

            {/* Rate & Button */}
            <div class="self-stretch flex justify-between items-center">
                <div class="text-base font-semibold text-[#5D6B78] leading-6">
                    Start from ${props.hourlyRate}/hr
                </div>
                <button class="px-4 py-2 bg-[#F5F5F5] border border-[#EEF2F6] rounded-full text-base font-medium text-[#1376A1] hover:bg-[#EEF2F6]">
                    Book now
                </button>
            </div>
        </div>
    </div>
);

const NavArrow: Component<{
    direction: 'prev' | 'next';
    onClick: () => void;
}> = (props) => {
    const isPrev = props.direction === 'prev';

    // Styling based on the provided HTML structure
    const containerClasses = isPrev
        ? 'bg-white border border-[#E2E6E9]'
        : 'bg-[#E3E8EF] border border-[#EEF2F6]';

    return (
        <button
            onClick={props.onClick}
            class="relative flex-shrink-0 w-[44.86px] h-[44.86px] rounded-full flex justify-center items-center cursor-pointer transition-transform duration-100 hover:scale-110"
            aria-label={isPrev ? 'Scroll left' : 'Scroll right'}
        >
            <div
                classList={{
                    [containerClasses]: true,
                    'w-full h-full rounded-full absolute top-0 left-0': true,
                }}
            ></div>

            <div
                class={`relative w-6 h-6 overflow-hidden flex items-center justify-center ${
                    isPrev ? 'rotate-180' : ''
                }`}
            >
                <svg
                    class="w-4 h-4"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M4.66675 8.00004L11.3334 8.00004M11.3334 8.00004L8.00008 4.66671M11.3334 8.00004L8.00008 11.3334"
                        stroke="black"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            </div>
        </button>
    );
};

// --- Main Component ---

export const ArtisanRecruitmentSection: Component = () => {
    let cardRowRef: HTMLDivElement | undefined;

    // Define the scroll step: Card width (~300px) + Gap (24px) = 324px
    const SCROLL_STEP = 324;

    const goToPrev = () => {
        if (cardRowRef) {
            cardRowRef.scrollBy({ left: -SCROLL_STEP, behavior: 'smooth' });
        }
    };

    const goToNext = () => {
        if (cardRowRef) {
            cardRowRef.scrollBy({ left: SCROLL_STEP, behavior: 'smooth' });
        }
    };

    return (
        <section class="w-full flex justify-center px-4 md:px-16 py-16 md:py-24 bg-[#041820]">
            <div class="w-full flex flex-col justify-start items-center gap-20">
                {/* Header / CTA Block */}
                <div class="self-stretch flex flex-col lg:flex-row justify-start items-start gap-16 md:gap-24">
                    {/* Left Column: Title */}
                    <div class="flex-1 flex flex-col justify-start items-start gap-4">
                        <div class="flex justify-center items-center gap-2">
                            <span class="text-2xl font-semibold text-[#E3E8EF]">
                                |
                            </span>
                            <span class="text-xl font-medium text-[#E3E8EF] tracking-widest">
                                FOR ARTISANS
                            </span>
                        </div>
                        <h2 class="text-4xl sm:text-5xl md:text-[48px] font-bold text-white leading-tight">
                            Earn more while doing what you love
                        </h2>
                    </div>

                    {/* Right Column: Description & Button */}
                    <div class="flex-1 flex flex-col justify-center items-start gap-10">
                        <p class="text-xl font-normal text-[#CFD5DA] leading-8">
                            Join our growing community and connect with clients
                            looking for your expertise. Take control of your
                            work, set your own rates and expand your reach.
                        </p>
                        <button
                            class="px-4 py-3 bg-[#1376A1] rounded-lg text-base font-semibold text-white hover:bg-[#0E5B7C] transition-colors"
                            aria-label="Create provider profile"
                        >
                            Create provider profile
                        </button>
                    </div>
                </div>

                {/* Artisan Carousel Block */}
                <div class="w-full p-6 md:p-8 lg:p-10 bg-[#F5F5F5] rounded-3xl flex flex-col justify-center items-start gap-10">
                    {/* Carousel Header & Nav */}
                    <div class="self-stretch flex flex-col gap-8">
                        <div class="self-stretch flex justify-start items-center gap-8">
                            <h3 class="text-2xl font-semibold text-[#0E0D13] leading-loose">
                                Our Top Artisans
                            </h3>
                        </div>

                        <div class="self-stretch flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                            {/* Filter/Category Selector */}
                            <div class="flex justify-start items-center gap-4 flex-wrap">
                                <button class="px-5 py-2 bg-[#D0E4EC4D] flex justify-center items-center gap-2 rounded-lg cursor-pointer">
                                    <div class="text-lg font-semibold text-[#0D121C] leading-7">
                                        Check for
                                    </div>
                                </button>
                                <button class="px-5 py-2 bg-[#1376A1] flex justify-center items-center gap-3 rounded-lg cursor-pointer">
                                    <div class="text-xl font-semibold text-white leading-8">
                                        Electricians
                                    </div>
                                    <svg
                                        class="w-6 h-6"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M11 12H19"
                                            stroke="white"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                        <path
                                            d="M15 16L19 12L15 8"
                                            stroke="white"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                        <path
                                            d="M5 12H11"
                                            stroke="white"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                    </svg>
                                </button>
                            </div>

                            {/* Navigation Arrows */}
                            <div class="flex justify-start items-center gap-6">
                                <NavArrow direction="prev" onClick={goToPrev} />
                                <NavArrow direction="next" onClick={goToNext} />
                            </div>
                        </div>
                    </div>

                    {/* Artisan Card Row/Slider */}
                    <div
                        ref={cardRowRef}
                        class="self-stretch flex justify-start items-start gap-6 overflow-x-auto pb-4 scroll-smooth hide-scrollbar"
                    >
                        <For each={ARTISANS_DATA}>
                            {(artisan) => <ArtisanCard {...artisan} />}
                        </For>
                    </div>
                </div>
            </div>
        </section>
    );
};
