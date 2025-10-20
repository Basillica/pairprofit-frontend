import {
    Accessor,
    createSignal,
    For,
    Setter,
    Show,
    type Component,
} from 'solid-js';
import { Portal } from 'solid-js/web';

interface PromotionTier {
    id: 'basic' | 'standard' | 'premium';
    title: string;
    description: string;
    price: number;
    duration: string;
}

const PROMOTION_TIERS: PromotionTier[] = [
    {
        id: 'basic',
        title: 'Basic Boost',
        description: 'Highlight your job for 24 hours with a Boosted badge.',
        price: 20,
        duration: '24 hours',
    },
    {
        id: 'standard',
        title: 'Standard Feature',
        description:
            'Feature your job at the top of artisan job feeds for 7 days.',
        price: 70,
        duration: '7 days',
    },
    {
        id: 'premium',
        title: 'Premium Reach',
        description:
            'Get extended reach and priority notifications for 14 days.',
        price: 100,
        duration: '14 days',
    },
];

// --- Icons (Close Button) ---
const Icons = {
    // Simple 'X' icon for the close button
    Close: (props: { class?: string }) => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class={props.class || 'w-7 h-7 text-gray-900'}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18 18 6M6 6l12 12"
            />
        </svg>
    ),
};

// --- Reusable Tier Card Component ---
const PromotionCard: Component<{
    tier: PromotionTier;
    isSelected: boolean;
    onClick: () => void;
}> = (props) => {
    const blueColor = '#1376A1';

    // Conditional classes for selected vs. unselected
    const containerClasses = () => ({
        // Base classes
        'p-6 sm:p-7 md:p-8 rounded-xl flex flex-col gap-4 w-full cursor-pointer transition-all':
            true,
        // Outline style for selected
        'ring-2 ring-inset ring-[#1376A1]': props.isSelected,
        // Outline style for unselected
        'border border-gray-300 hover:border-gray-400': !props.isSelected,
    });

    return (
        <div onClick={props.onClick} classList={containerClasses()}>
            <div class="flex flex-col gap-1 w-full">
                <h3 class="text-xl sm:text-2xl font-semibold text-gray-900 leading-normal">
                    {props.tier.title}
                </h3>
                <p class="text-base sm:text-lg font-medium text-gray-600 leading-relaxed">
                    {props.tier.description}
                </p>
            </div>

            <div class="flex justify-between items-center w-full mt-2">
                {/* Price */}
                <span
                    class={`text-xl sm:text-2xl font-medium`}
                    style={{ color: blueColor }}
                >
                    ${props.tier.price}
                </span>
                {/* Duration */}
                <span class="text-base sm:text-lg font-normal text-gray-600">
                    {props.tier.duration}
                </span>
            </div>
        </div>
    );
};

// --- Main Component ---
export const PromoteJobModal: Component<{
    isOpen: Accessor<boolean>;
    closeModal: Setter<boolean>;
}> = (props) => {
    const [selectedTier, setSelectedTier] = createSignal<PromotionTier['id']>(
        PROMOTION_TIERS[0].id
    );
    const blueBg = 'bg-[#1376A1]';

    return (
        // Max width of 620px on desktop, adjusts down for mobile, uses auto margin for centering
        <Portal>
            <Show when={props.isOpen()}>
                <div
                    class="flex justify-center p-4 pt-20 h-screen overflow-y-auto" // <-- ADDED h-screen and overflow-y-auto
                    classList={{
                        'modal-overlay': true,
                        active: props.isOpen(),
                    }}
                >
                    <div class="w-full max-w-xl lg:max-w-[620px] mx-auto p-6 sm:p-8 md:p-10 bg-white rounded-2xl shadow-xl flex flex-col gap-8 sm:gap-10">
                        {/* Header: Title and Close Button */}
                        <div class="flex flex-col gap-4 w-full">
                            <div class="flex justify-between items-start w-full">
                                <h2 class="text-2xl sm:text-3xl font-semibold text-gray-900 leading-tight">
                                    Promote Job
                                </h2>
                                <button
                                    onClick={() =>
                                        props.closeModal(!props.isOpen())
                                    }
                                    aria-label="Close modal"
                                    class="p-1 rounded-full hover:bg-gray-100 transition"
                                >
                                    <Icons.Close />
                                </button>
                            </div>
                            <p class="text-lg sm:text-xl font-medium text-gray-600 leading-relaxed">
                                Boost your job to reach more artisans faster.
                            </p>
                        </div>

                        {/* Promotion Tiers and Action */}
                        <div class="flex flex-col gap-8 w-full">
                            {/* Tier Selection */}
                            <div class="flex flex-col gap-6 sm:gap-8 w-full">
                                <For each={PROMOTION_TIERS}>
                                    {(tier) => (
                                        <PromotionCard
                                            tier={tier}
                                            isSelected={
                                                selectedTier() === tier.id
                                            }
                                            onClick={() =>
                                                setSelectedTier(tier.id)
                                            }
                                        />
                                    )}
                                </For>
                            </div>

                            {/* Action Button */}
                            <button
                                // You would wire up the payment logic here
                                class={`w-full h-[52px] py-3 sm:py-4 text-white font-semibold text-base rounded-lg ${blueBg} hover:opacity-90 transition flex justify-center items-center cursor-pointer`}
                                onClick={() =>
                                    props.closeModal(!props.isOpen())
                                }
                            >
                                Continue to payment
                            </button>
                        </div>
                    </div>
                </div>
            </Show>
        </Portal>
    );
};
