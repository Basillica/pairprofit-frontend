import { Component, For } from 'solid-js';

// --- Data Structure ---
interface Category {
    name: string;
    count: number;
    variant: 'default' | 'active';
}

const CATEGORIES: Category[] = [
    { name: 'Plumbing', count: 143, variant: 'active' },
    { name: 'Lawn Care', count: 58, variant: 'default' },
    { name: 'Carpentry', count: 945, variant: 'default' },
    { name: 'Phone Repair', count: 248, variant: 'default' },
    { name: 'Appliances', count: 43, variant: 'default' },
    { name: 'Appliances', count: 90, variant: 'default' },
    { name: 'Plumbing', count: 57, variant: 'default' },
    { name: 'Yard work', count: 75, variant: 'default' },
    { name: 'Electrician', count: 12, variant: 'default' }, // Highlighted variant
    { name: 'Gift Wrapper', count: 18, variant: 'default' },
    { name: 'Cooking', count: 48, variant: 'default' },
    { name: 'Cooking', count: 48, variant: 'default' },
];

// --- Sub-Components ---

// Simplified placeholder for the complex, rotated arrow icon
const ChevronIcon: Component<{ color: string }> = (props) => (
    <svg
        class="w-7 h-7"
        viewBox="0 0 39 39"
        fill="none"
        stroke={props.color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
    >
        {/* A right arrow for navigation/link, styled to match the intent of the original arrow. */}
        {/* <path d="M5 12h14M12 5l7 7-7 7" /> */}
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M26.69 22.078a.875.875 0 0 1-1.038-.674l-1.619-7.617-9.016 13.884a.875.875 0 1 1-1.468-.953l9.016-13.884-7.617 1.619a.875.875 0 1 1-.364-1.71l9.683-2.06a.875.875 0 0 1 1.038.674l2.058 9.683a.875.875 0 0 1-.674 1.038"
            fill={props.color}
        />
    </svg>
);

const CategoryChip: Component<Category> = (props) => {
    const isDefault = props.variant === 'default';

    const chipClasses = () => ({
        // Base styling
        'flex justify-center items-center gap-4 p-3 md:px-8 md:py-3 rounded-full transition-colors duration-200 cursor-pointer min-w-[280px] hover:shadow-lg':
            true,

        // Default variant
        'bg-white border border-[#CDD5DF]': isDefault,

        // Active/Variant2 styling (using 'ring' for outline effect)
        'bg-[#D0E4EC] ring-[1.5px] ring-[#1376A1] ring-offset-[-1.5px]':
            !isDefault,
    });

    const iconColor = isDefault ? '#0D121C' : '#1376A1';

    return (
        <div
            classList={chipClasses()}
            role="button"
            tabindex="0"
            aria-label={`Find ${props.name} artisans`}
            onClick={() => console.log(props.count)}
        >
            {/* Image Placeholder */}
            <img
                class="w-12 h-12 rounded-full"
                src="https://placehold.co/48x48"
                alt={`${props.name} category icon`}
            />

            {/* Text Content */}
            <div class="flex-1 flex flex-col justify-center items-start gap-1">
                <div class="text-xl font-semibold text-[#0D121C] leading-loose">
                    {props.name}
                </div>
                <div class="text-base font-normal text-[#4B5565] leading-relaxed">
                    {props.count} Artisans
                </div>
            </div>

            {/* Arrow Icon */}
            <div class="flex items-center justify-center">
                <ChevronIcon color={iconColor} />
            </div>
        </div>
    );
};

// --- Main Component ---

export const ArtisanCategorySection: Component = () => (
    <section class="w-full flex justify-center py-16 md:py-24 lg:py-[100px] px-4 bg-white">
        <div class="w-full flex flex-col justify-center items-center gap-16">
            {/* Header */}
            <header class="flex flex-col justify-center items-center gap-3">
                <h1 class="text-4xl sm:text-5xl md:text-[48px] font-bold text-black leading-tight md:leading-[74px] capitalize text-center">
                    Get help Today!
                </h1>
                <p class="text-lg md:text-xl font-normal text-[#4B5560] leading-8 text-center">
                    Browse more artisans category for easy finds
                </p>
            </header>

            {/* Category Chips Grid */}
            <div class="self-stretch flex justify-center items-center gap-6 flex-wrap">
                <For each={CATEGORIES}>
                    {(category) => (
                        <CategoryChip
                            name={category.name}
                            count={category.count}
                            variant={category.variant}
                        />
                    )}
                </For>
            </div>
        </div>
    </section>
);
