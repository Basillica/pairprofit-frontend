import { Component, For, createSignal } from 'solid-js';
import styles from './styles.module.css';

// --- Data Structure ---
interface Testimonial {
    quote: string;
    name: string;
    role: string;
    rating: number; // 1-5
    avatar: string; // Placeholder image URL
}

const TESTIMONIAL_DATA: Testimonial[] = [
    {
        quote: 'Finding quality artisans used to be a headache. Now I just use the app and get quotes instantly. Highly recommended for busy homeowners.',
        name: 'Sarah Chen',
        role: 'Homeowner',
        rating: 2,
        avatar: 'https://placehold.co/64x64/FFC0CB/FF69B4',
    },
    {
        quote: 'The platform is intuitive and the selection of verified craftsmen is excellent. My recent plumbing job was done perfectly and on budget.',
        name: 'David Lee',
        role: 'Tenant',
        rating: 4,
        avatar: 'https://placehold.co/64x64/ADD8E6/00008B',
    },
    {
        quote: 'Excellent service and great value for money. The support team is also very responsive if you ever need help with a booking.',
        name: 'Emily Carter',
        role: 'Realtor',
        rating: 5,
        avatar: 'https://placehold.co/64x64/90EE90/006400',
    },
    {
        quote: 'As a property manager, I need reliable artisans quickly. PairProfit has been a game changer. The quality of professionals and customer service is outstanding',
        name: 'Herbert Kunkle',
        role: 'Property Manager',
        rating: 4,
        avatar: 'https://placehold.co/64x64/D0E4EC/1376A1',
    }, // Active in the visual
    {
        quote: 'I use PairProfit for all my rental property maintenance. It saves me hours of searching and vetting contractors every month.',
        name: 'Michael Brown',
        role: 'Investor',
        rating: 3,
        avatar: 'https://placehold.co/64x64/E6E6FA/483D8B',
    },
    {
        quote: 'Switched from a competitor and never looked back. PairProfit’s pricing transparency and quality guarantees are unmatched.',
        name: 'Jessica Alba',
        role: 'Designer',
        rating: 4,
        avatar: 'https://placehold.co/64x64/FFA07A/CD5C5C',
    },
    {
        quote: 'From small fixes to major renovations, this is the only tool I need. The filtering by artisan type is a life saver.',
        name: 'Ryan Gosling',
        role: 'Developer',
        rating: 5,
        avatar: 'https://placehold.co/64x64/F0E68C/B8860B',
    },
];

// --- Sub-Components ---
const StarRating: Component<{ rating: number }> = (props) => {
    // Generate an array of indices to iterate over
    const starIndices = Array.from({ length: props.rating }, (_, i) => i);
    console.log(props.rating, 'ääääääääääääääää');
    // This is the correct way to generate multiple, distinct JSX elements in a loop
    return (
        <div class="flex justify-start items-start gap-1">
            <For each={starIndices}>
                {() => (
                    <svg
                        class="w-8 h-8" // Using class for styling
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M12.203 7.211c1.69-3.03 2.534-4.544 3.796-4.544s2.107 1.515 3.796 4.544l.438.784c.48.861.72 1.292 1.093 1.576s.84.39 1.773.6l.848.192c3.28.743 4.919 1.113 5.31 2.368.389 1.253-.728 2.561-2.964 5.176l-.579.676c-.635.743-.953 1.115-1.096 1.573-.143.46-.095.956.001 1.947l.088.903c.338 3.489.507 5.233-.514 6.008-1.022.776-2.558.068-5.627-1.346l-.796-.365c-.872-.403-1.308-.603-1.77-.603-.463 0-.9.2-1.771.603l-.795.365c-3.07 1.414-4.607 2.12-5.627 1.347-1.022-.776-.853-2.52-.516-6.01l.088-.9c.096-.993.144-1.489 0-1.947-.141-.46-.46-.832-1.094-1.574l-.579-.677c-2.236-2.613-3.353-3.921-2.964-5.176s2.03-1.627 5.31-2.368l.849-.192c.932-.21 1.397-.316 1.772-.6.373-.284.613-.715 1.093-1.576z"
                            fill="#FDAD34"
                        />
                    </svg>
                )}
            </For>
        </div>
    );
};

const NavArrow: Component<{
    direction: 'prev' | 'next';
    onClick: () => void;
}> = (props) => {
    const isPrev = props.direction === 'prev';

    // Styling based on the provided HTML structure
    const containerClasses = isPrev
        ? 'bg-[#EEF2F6] border border-[#E2E6E9]'
        : 'bg-[#E3E8EF] border border-[#EEF2F6]';

    return (
        <button
            onClick={props.onClick}
            class="relative flex-shrink-0 w-[44.86px] h-[44.86px] rounded-full flex justify-center items-center cursor-pointer transition-transform duration-100 hover:scale-110"
            aria-label={isPrev ? 'Previous testimonial' : 'Next testimonial'}
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
                {/* Simplified inner arrow icon */}
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

const AvatarRing: Component<{
    testimonials: Testimonial[];
    currentIndex: number;
    onAvatarClick: (index: number) => void;
}> = (props) => (
    <div class={styles.container}>
        <For each={props.testimonials}>
            {(testimonial, index) => {
                const isActive = index() === props.currentIndex;
                return (
                    <button
                        onClick={() => props.onAvatarClick(index())}
                        classList={{
                            [styles.avatar]: true,
                            [styles.avatarNormal]: !isActive,
                            [styles.avatarActive]: isActive,
                            [styles.scale100]: isActive,
                        }}
                        aria-label={`View testimonial from ${testimonial.name}`}
                    >
                        <img
                            class={`${styles.avatar} ${styles.avatarImage}`}
                            src={testimonial.avatar}
                            alt={`Avatar of ${testimonial.name}`}
                        />
                    </button>
                );
            }}
        </For>
    </div>
);

// --- Main Component: Testimonial Section ---

export const TestimonialSection: Component = () => {
    // Start at index 3 to match the initially highlighted 4th avatar in the visual
    const [currentIndex, setCurrentIndex] = createSignal(3);

    const activeTestimonial = () => TESTIMONIAL_DATA[currentIndex()];

    const goToPrev = () => {
        setCurrentIndex(
            (prev) =>
                (prev - 1 + TESTIMONIAL_DATA.length) % TESTIMONIAL_DATA.length
        );
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % TESTIMONIAL_DATA.length);
    };

    const goToTestimonial = (index: number) => {
        setCurrentIndex(index);
    };

    return (
        <section class="w-full flex justify-center px-4 md:px-24 lg:px-[100px] py-16 md:py-32 bg-[#F8FAFC]">
            <div class="w-full max-w-6xl flex flex-col justify-center items-center gap-16">
                {/* Header */}
                <header class="flex flex-col justify-center items-center gap-4 text-center max-w-4xl">
                    <div class="flex justify-center items-center gap-2">
                        <span class="text-2xl font-semibold text-[#0F322E]">
                            |
                        </span>
                        <span class="text-xl font-medium text-[#0F322E] tracking-widest">
                            CUSTOMER TESTIMONIALS
                        </span>
                    </div>
                    <h2 class="text-4xl sm:text-5xl md:text-[48px] font-extrabold text-[#0E0D13] leading-tight">
                        See What Happy Customers Are Saying About PairProfit
                    </h2>
                    <p class="text-lg md:text-xl font-normal text-[#4B5560] leading-8">
                        Join thousands of satisfied customers who use PairProfit
                    </p>
                </header>

                {/* Content: Avatar Ring and Testimonial Card */}
                <div class="w-full flex flex-col justify-start items-center gap-6">
                    {/* Avatar Ring */}
                    <AvatarRing
                        testimonials={TESTIMONIAL_DATA}
                        currentIndex={currentIndex()}
                        onAvatarClick={goToTestimonial}
                    />

                    {/* Testimonial Card */}
                    <div class="w-full p-6 md:p-8 flex justify-center items-center">
                        <div class="w-full max-w-5xl p-6 sm:p-8 md:px-12 md:py-10 lg:px-24 lg:py-10 bg-white shadow-xl rounded-2xl flex flex-col md:flex-row justify-between items-center gap-8">
                            {/* Previous Arrow */}
                            <NavArrow direction="prev" onClick={goToPrev} />

                            {/* Quote Content */}
                            <div class="flex-1 flex flex-col justify-start items-center gap-6 transition-opacity duration-300">
                                <StarRating
                                    rating={activeTestimonial().rating}
                                />

                                <p class="text-xl md:text-2xl font-medium text-[#0D121C] leading-loose text-center">
                                    {activeTestimonial().quote}
                                </p>

                                {/* Reviewer Details */}
                                <div class="w-full pt-4 border-t-2 border-[#E3E8EF] flex justify-center items-center gap-2 md:gap-4">
                                    <span class="text-lg font-semibold text-[#0D121C] leading-7">
                                        {activeTestimonial().name}
                                    </span>
                                    <span class="text-lg font-semibold text-[#0D121C] leading-7">
                                        |
                                    </span>
                                    <div class="px-4 py-2 bg-[#FCFCFD] rounded-full border border-[#EEF2F6]">
                                        <span class="text-base font-medium text-[#0D121C] leading-6">
                                            {activeTestimonial().role}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Next Arrow */}
                            <NavArrow direction="next" onClick={goToNext} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
