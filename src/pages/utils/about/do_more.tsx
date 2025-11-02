import { Component, For } from 'solid-js';
import our_values_1 from './../../../assets/general/our_values_1.svg';
import our_values_2 from './../../../assets/general/our_values_2.svg';
import our_values_3 from './../../../assets/general/our_values_3.svg';

// --- Data Structure ---
interface Feature {
    name: string;
}

const PLUMBING_FEATURES: Feature[] = [
    { name: 'Emergency leak Repairs' },
    { name: 'Pipe Installations' },
    { name: 'Cleaning & Unclogging' },
    { name: 'Water Heater Services' },
];

// --- Sub-Components (Utilities) ---

// Icon component based on the provided wireframe (circle with a small inner shape)
const CheckmarkCircleIcon: Component = () => (
    <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="m10.5 11.667 3.801 2.851a1.167 1.167 0 0 0 1.579-.166l7.453-8.518"
            stroke="#000"
            stroke-width="2"
            stroke-linecap="round"
        />
        <path
            d="M24.5 14a10.5 10.5 0 1 1-7.782-10.142"
            stroke="#000"
            stroke-width="2"
            stroke-linecap="round"
        />
    </svg>
);

const FeatureItem: Component<Feature> = (props) => (
    <div class="flex justify-start items-center gap-4">
        <CheckmarkCircleIcon />
        <div class="flex-1 text-xl font-semibold text-[#252525] leading-loose">
            {props.name}
        </div>
    </div>
);

const PrimaryButton: Component<{ text: string }> = (props) => (
    <button
        class="px-4 py-3 bg-[#1376A1] rounded-lg text-base font-semibold text-white hover:bg-[#0E5B7C] transition-colors cursor-pointer"
        aria-label={props.text}
    >
        {props.text}
    </button>
);

// --- Main Component ---

export const DoMoreWithUsSection: Component = () => (
    <section class="w-full flex justify-center px-4 md:px-16 lg:px-[100px] py-16 md:py-24 lg:py-[100px] bg-white">
        <div class="w-full flex flex-col lg:flex-row justify-start items-center gap-12 lg:gap-16 xl:gap-24">
            {/* Left Column: Text and Features */}
            <div class="w-full lg:w-[652px] flex flex-col justify-center items-start gap-8 lg:gap-12 min-w-0">
                {/* Header Block */}
                <div class="self-stretch flex flex-col justify-start items-start gap-6">
                    {/* Tag */}
                    <div class="p-1 rounded-lg flex justify-center items-center gap-2">
                        <div class="text-2xl font-semibold text-[#0F322E] leading-loose">
                            |
                        </div>
                        <div class="text-xl font-medium text-[#0F322E] tracking-wider uppercase">
                            DO MORE WITH US
                        </div>
                    </div>

                    {/* Title and Subtitle */}
                    <div class="self-stretch flex flex-col justify-start items-start gap-10">
                        <div class="self-stretch flex flex-col justify-start items-start gap-4">
                            <h2 class="text-4xl sm:text-5xl md:text-[48px] font-bold text-[#0E0D13] leading-tight capitalize">
                                Getting Work done should be easier and faster
                            </h2>
                            <p class="self-stretch text-xl font-normal text-[#4B5565] leading-loose">
                                From minor leaks to complete installations, our
                                licensed plumbers handle it all with precision
                                and care
                            </p>
                        </div>
                    </div>
                </div>

                {/* Features Grid */}
                {/* On mobile, the grid-cols-1 ensures the features stack naturally. */}
                <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <For each={PLUMBING_FEATURES}>
                        {(feature) => <FeatureItem {...feature} />}
                    </For>
                </div>

                {/* Button */}
                <div class="mt-4">
                    <PrimaryButton text="Book now" />
                </div>
            </div>

            {/* Right Column: Image Grid (FIXED FOR MOBILE) */}
            <div class="flex-1 w-full lg:w-auto flex flex-col justify-center items-start gap-6">
                {/* Top Row: Two Images - STACK on mobile (flex-col), ROW on tablet+ (md:flex-row) */}
                <div class="self-stretch flex flex-col md:flex-row justify-start items-center gap-6">
                    {/* Image 1 */}
                    <img
                        class="w-full md:flex-1 h-auto object-cover rounded-xl"
                        src={our_values_1}
                        alt="Artisan working detail 1"
                    />
                    {/* Image 2 */}
                    <img
                        class="w-full md:flex-1 h-auto object-cover rounded-xl"
                        src={our_values_2}
                        alt="Artisan working detail 2"
                    />
                </div>

                {/* Bottom Image */}
                <img
                    class="self-stretch w-full h-auto object-cover rounded-xl"
                    src={our_values_3}
                    alt="Artisan at a job site"
                />
            </div>
        </div>
    </section>
);
