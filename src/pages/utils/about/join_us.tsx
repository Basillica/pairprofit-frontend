import { Component, For } from 'solid-js';
import electrician from './../../../assets/general/about_electrician.svg';

// --- Data Structure ---
interface Step {
    number: string;
    title: string;
    description: string;
    // The first step has a partially filled progress bar, others are empty.
    isProgressActive?: boolean;
}

const ARTISAN_STEPS: Step[] = [
    {
        number: '01',
        title: 'Create Your Profile',
        description:
            'Showcase your skills, experience, portfolio and services. Set your pricing and availability.',
        isProgressActive: true,
    },
    {
        number: '02',
        title: 'Browse Request & Submit Proposal',
        description:
            'Discover new services requests in your area that match your expertise. Send tailored proposals to customers, outlining your approach and cost.',
    },
    {
        number: '03',
        title: 'Get Hire & Manage Your Work',
        description:
            'Communicate with potential clients, answer their questions and get selected for jobs. Use our tools to communicate, manage milestones and receive payment.',
    },
    {
        number: '04',
        title: 'Build Reputation',
        description:
            'Deliver excellent services, earn great reviews and grow your clientele.',
    },
];

// --- Sub-Components (Utilities) ---

const StepCard: Component<Step> = (props) => (
    <div class="self-stretch p-4 md:p-6 flex flex-col justify-center items-start gap-4 md:gap-6">
        {/* Step Number Badge */}
        <div class="w-12 px-3 py-1 bg-sky-100/40 flex justify-center items-center rounded-lg">
            <div class="text-xl font-semibold text-[#1376A1] leading-loose">
                {props.number}
            </div>
        </div>

        {/* Content */}
        <div class="self-stretch flex flex-col justify-start items-start gap-4">
            <div class="text-2xl font-semibold text-[#191919] leading-loose">
                {props.title}
            </div>
            <p class="text-xl font-normal text-[#4B5565] leading-loose">
                {props.description}
            </p>
        </div>

        {/* Progress Bar (simplified to a line) */}
        <div class="self-stretch h-[3px] relative bg-[#EEF2F6] rounded-xl overflow-hidden">
            <div
                class="h-[3px] absolute top-0 left-0 bg-[#1376A1] rounded-xl transition-all duration-500"
                classList={{
                    'w-1/3': props.isProgressActive,
                    'w-0': !props.isProgressActive,
                }}
            />
        </div>
    </div>
);

const PrimaryButton: Component<{ text: string }> = (props) => (
    <button
        class="px-4 py-3 bg-[#1376A1] rounded-lg text-base font-semibold text-white hover:bg-[#0E5B7C] transition-colors"
        aria-label={props.text}
    >
        {props.text}
    </button>
);

// --- Main Component ---

export const JoinAsArtisansSection: Component = () => (
    <section class="w-full flex justify-center px-4 md:px-16 lg:px-[100px] py-16 md:py-24 lg:py-[100px] bg-[#F8FAFC]">
        <div class="w-full flex flex-col justify-start items-start gap-16 lg:gap-24">
            {/* Header Block */}
            <div class="self-stretch flex flex-col justify-start items-start gap-12">
                {/* Tag */}
                <div class="p-1 rounded-lg flex justify-center items-center gap-2">
                    <div class="text-2xl font-semibold text-[#0F322E] leading-loose">
                        |
                    </div>
                    <div class="text-xl font-medium text-[#0F322E] tracking-wider uppercase">
                        JOIN US AS ARTISANS
                    </div>
                </div>

                {/* Title & CTA Row */}
                <div class="self-stretch flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
                    {/* Title */}
                    <div class="flex-1 flex flex-col justify-center items-start gap-3">
                        <div class="flex flex-wrap justify-start items-center gap-3 lg:gap-4">
                            <h2 class="text-4xl sm:text-5xl md:text-[48px] font-semibold text-[#0E0D13] leading-tight capitalize">
                                Build,
                            </h2>
                            <span class="px-4 bg-gradient-to-r from-[#0961F5] to-[#2992D2] rounded-lg text-4xl sm:text-5xl md:text-[48px] font-semibold text-[#FCFCFD] leading-tight capitalize">
                                find
                            </span>
                            <h2 class="text-4xl sm:text-5xl md:text-[48px] font-semibold text-[#0E0D13] leading-tight capitalize">
                                &
                            </h2>
                            <span class="px-4 bg-gradient-to-r from-green-600 to-green-600 rounded-lg text-4xl sm:text-5xl md:text-[48px] font-semibold text-[#FCFCFD] leading-tight capitalize">
                                Earn
                            </span>
                        </div>
                        <h2 class="text-4xl sm:text-5xl md:text-[48px] font-semibold text-[#0E0D13] leading-tight capitalize">
                            with your expertise
                        </h2>
                    </div>

                    {/* Description and Button */}
                    <div class="flex-1 flex flex-col justify-center items-start lg:items-end gap-6 w-full lg:w-auto">
                        <p class="self-stretch text-xl font-normal text-[#364152] leading-loose">
                            Join our growing community and connect with clients
                            looking for your expertise. Take control of your
                            work, set your own rates and expand your reach.
                        </p>
                        <PrimaryButton text="Create provider profile" />
                    </div>
                </div>
            </div>

            {/* Content Row: Image and Steps */}
            <div class="self-stretch flex flex-col lg:flex-row justify-start items-start gap-12 w-full">
                {/* Left: Placeholder Image */}
                {/* Image has max width/height on mobile, full width on desktop */}
                <div class="flex-1 w-full lg:w-auto self-stretch min-h-[300px] lg:min-h-[700px]">
                    <img
                        class="w-full h-full object-cover rounded-xl bg-white"
                        src={electrician}
                        alt="Image showing the artisan platform interface"
                    />
                </div>

                {/* Right: Steps Guide */}
                <div class="flex-1 self-stretch flex flex-col justify-start items-start gap-8 w-full">
                    <div class="grid grid-cols-1 gap-4 w-full">
                        <For each={ARTISAN_STEPS}>
                            {(step) => <StepCard {...step} />}
                        </For>
                    </div>
                </div>
            </div>
        </div>
    </section>
);
