import { Component, For } from 'solid-js';

interface Value {
    title: string;
    description: string;
}

const VALUES_DATA: Value[] = [
    {
        title: 'Customer First',
        description:
            'Every decision we make is guided by what’s best for our customers and artisans',
    },
    {
        title: 'Excellence',
        description:
            'We set high standards and continuously improve to deliver exceptional service',
    },
    {
        title: 'Trust & Safety',
        description:
            'Building a safe, reliable platform where everyone feels secure and valued exchanging services',
    },
];

// Placeholder Icon based on the abstract black-over-yellow structure provided
const ValueIcon: Component = () => (
    <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <g clip-path="url(#a)" fill-rule="evenodd" clip-rule="evenodd">
            <path
                d="M43.859 6.234h-7.152v-2.09A3.96 3.96 0 0 0 32.754.188H4.14A3.96 3.96 0 0 0 .187 4.143v25.34a3.956 3.956 0 0 0 3.952 3.947h3.975v7.022a1.33 1.33 0 0 0 .713 1.175c.186.094.391.141.6.138.272 0 .537-.083.762-.237l3.387-2.414.096.04c.498.211 1.032.32 1.572.323H26.46l11.348 8.088a1.312 1.312 0 0 0 2.076-1.066v-7.022h3.974a3.957 3.957 0 0 0 3.953-3.956v-25.34a3.955 3.955 0 0 0-3.953-3.948"
                fill="#FFC107"
            />
            <path
                d="M5.548 10.219a1.503 1.503 0 0 1 1.5-1.5h12.244a1.5 1.5 0 0 1 0 3H7.048a1.5 1.5 0 0 1-1.5-1.5M29.846 24.9H7.048a1.5 1.5 0 1 1 0-3h22.798a1.5 1.5 0 1 1 0 3M5.548 16.81a1.5 1.5 0 0 1 1.5-1.5h19.567a1.5 1.5 0 1 1 0 3H7.048a1.5 1.5 0 0 1-1.5-1.5M45 35.521v-25.34a1.136 1.136 0 0 0-1.14-1.135h-6.964v20.437a4.143 4.143 0 0 1-4.14 4.135H21.597l-4.267 3.047h9.551c.313-.002.618.096.871.28l9.32 6.638v-5.418a1.5 1.5 0 0 1 1.5-1.5h5.288A1.144 1.144 0 0 0 45 35.522M9.427 30.619a1.5 1.5 0 0 1 1.5 1.5v5.428l9.32-6.647c.254-.18.558-.279.87-.281h11.638a1.14 1.14 0 0 0 1.14-1.135V4.144A1.145 1.145 0 0 0 32.755 3H4.14A1.145 1.145 0 0 0 3 4.144v25.34a1.136 1.136 0 0 0 1.14 1.135zM43.859 6.047h-6.964V4.144A4.145 4.145 0 0 0 32.755 0H4.14A4.146 4.146 0 0 0 0 4.144v25.34a4.143 4.143 0 0 0 4.14 4.135h3.787v6.834a1.52 1.52 0 0 0 .813 1.34 1.54 1.54 0 0 0 1.558-.112l3.303-2.353c.52.22 1.079.335 1.643.338h11.158l11.3 8.053a1.5 1.5 0 0 0 2.37-1.219v-6.834h3.787A4.144 4.144 0 0 0 48 35.522v-25.34a4.14 4.14 0 0 0-4.14-4.135"
                fill="#000"
            />
        </g>
        <defs>
            <clipPath id="a">
                <path fill="#fff" d="M0 0h48v48H0z" />
            </clipPath>
        </defs>
    </svg>
);

const ValueCard: Component<Value> = (props) => (
    <div class="flex-1 w-full p-6 bg-white border border-[#E3E8EF] rounded-xl flex flex-col justify-center items-center gap-8 text-center min-h-[300px] hover:shadow-md hover:-translate-y-1">
        <ValueIcon />

        <div class="self-stretch flex flex-col justify-center items-center gap-4">
            <div class="text-2xl font-semibold text-[#191919] leading-loose">
                {props.title}
            </div>
            <p class="self-stretch text-xl font-normal text-[#4B5565] leading-loose">
                {props.description}
            </p>
        </div>
    </div>
);

// --- Main Component ---

export const OurValuesSection: Component = () => (
    <section class="w-full flex justify-center px-4 md:px-16 lg:px-[100px] md:py-24 bg-[#FCFCFD]">
        <div class="w-full flex flex-col justify-start items-start gap-16 lg:gap-24">
            {/* Header Block */}
            <div class="flex flex-col justify-start items-start gap-4">
                {/* Tag */}
                <div class="p-1 rounded-lg flex justify-center items-center gap-2">
                    <div class="text-2xl font-semibold text-[#0F322E] leading-loose">
                        |
                    </div>
                    <div class="text-xl font-medium text-[#0F322E] tracking-wider uppercase">
                        OUR VALUES
                    </div>
                </div>

                {/* Title and Subtitle */}
                <div class="w-full max-w-lg flex flex-col justify-start items-start gap-4">
                    <h2 class="text-4xl sm:text-5xl md:text-[48px] font-bold text-[#0E0D13] leading-tight capitalize">
                        Our Value
                    </h2>
                    <p class="text-xl font-normal text-[#4B5565] leading-loose">
                        The principle that guide everything we do at PairProfit
                    </p>
                </div>
            </div>

            {/* Value Cards Container */}
            {/* flex-col on mobile, flex-row on large screens, with a gap of 24px */}
            <div class="self-stretch flex flex-col lg:flex-row justify-start items-stretch gap-6 w-full">
                <For each={VALUES_DATA}>
                    {(value) => <ValueCard {...value} />}
                </For>
            </div>
        </div>
    </section>
);
