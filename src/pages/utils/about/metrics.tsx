import { Component, For } from 'solid-js';

// --- Data Structure ---
interface Metric {
    value: string;
    description: string;
}

const METRICS_DATA: Metric[] = [
    { value: '4+', description: 'Years of Growing and Connecting' },
    { value: '246K', description: 'Moving Tasks Completed' },
    { value: '500', description: 'Job Posted Daily' },
    { value: '1,484', description: 'Professional Artisans' },
];

// Recreates the complex, rotated shape icon
const AbstractIcon: Component = () => (
    <svg
        width="45"
        height="45"
        viewBox="0 0 45 45"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M30.502 25.23a1 1 0 0 1-1.185-.769l-1.85-8.705-10.305 15.867a1 1 0 0 1-1.677-1.089l10.304-15.868-8.705 1.851a1 1 0 1 1-.416-1.955l11.066-2.353a1 1 0 0 1 1.186.77l2.352 11.067a1 1 0 0 1-.77 1.185"
            fill="#1376A1"
        />
    </svg>
);

const MetricCard: Component<Metric & { isFirst: boolean }> = (props) => (
    // Card styling: Padding, min-width for layout consistency, flex-shrink to prevent squishing
    // Conditional border: Only apply border-l from large screens (lg) onwards,
    // and skip it if it's the first card in the row.
    <div
        classList={{
            'flex-1 min-w-full sm:min-w-[45%] lg:min-w-0 p-6 bg-white overflow-hidden flex flex-col justify-between items-start h-auto':
                true,
            'lg:border-l border-[#E3E8EF]': !props.isFirst,
        }}
    >
        {/* Metric Value */}
        <div class="text-4xl lg:text-[40px] font-bold text-[#1376A1] leading-snug lg:leading-[48px] mb-4">
            {props.value}
        </div>

        {/* Description and Icon */}
        <div class="self-stretch flex justify-start items-start gap-6">
            <div class="flex-1 text-xl font-medium text-[#364152] leading-loose">
                {props.description}
            </div>
            <AbstractIcon />
        </div>
    </div>
);

// --- Main Component ---

export const MetricsSection: Component = () => (
    <section class="w-full flex justify-center px-4 md:px-16 lg:px-[100px] py-16 md:py-24 bg-white">
        <div class="w-full">
            {/* Metric Row: Uses flex-wrap for mobile stacking, gap for spacing */}
            <div class="self-stretch flex flex-wrap justify-start items-stretch gap-y-8">
                <For each={METRICS_DATA}>
                    {(metric, index) => (
                        <MetricCard {...metric} isFirst={index() === 0} />
                    )}
                </For>
            </div>
        </div>
    </section>
);
