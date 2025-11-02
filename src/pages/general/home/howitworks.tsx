import { Component, For } from 'solid-js';
import painter from './../.././../assets/landing_painter.svg';
import p2 from './../../../assets/client/two.svg';

// --- Icon & Data Setup ---

const howItWorksSteps = [
    {
        number: '01',
        title: 'Post A Request',
        description:
            'Describe the services you need, it’s location, urgency and any specific requirements. It’s free and takes just a few minutes.',
        progress: 'full',
    },
    {
        number: '02',
        title: 'Receive Proposal',
        description:
            'Interested artisans will send proposals with their offers, estimated cost and timelines',
        progress: 'empty',
    },
    {
        number: '03',
        title: 'Compare & Choose',
        description:
            'Review artisans profiles, ratings and past reviews. Chat directly with them to clarify details',
        progress: 'empty',
    },
    {
        number: '04',
        title: 'Hire & Collaborate',
        description:
            'Accept the best proposal. Track progress and communicate securely through our platform',
        progress: 'empty',
    },
    {
        number: '05',
        title: 'Review & Rate',
        description:
            'Once the job is done, leave a review and rating to help other users make informed decisions',
        progress: 'empty',
    },
];

// --- Step Item Component ---

const StepItem: Component<{ step: (typeof howItWorksSteps)[number] }> = (
    props
) => (
    <div class="self-stretch px-4 flex flex-col justify-center items-start gap-4">
        {/* Number Badge */}
        <div class="w-[47px] px-3 py-1 bg-[#D0E4EC]/40 flex justify-center items-center rounded">
            <div class="text-xl font-semibold text-[#1376A1] leading-relaxed">
                {props.step.number}
            </div>
        </div>

        {/* Title and Description */}
        <div class="self-stretch flex flex-col justify-start items-start">
            <div class="self-stretch py-3">
                <div class="text-2xl font-semibold text-[#191919] leading-relaxed">
                    {props.step.title}
                </div>
            </div>
            <div class="self-stretch text-xl font-normal text-[#4B5565] leading-loose">
                {props.step.description}
            </div>
        </div>

        {/* Progress/Separator Line */}
        <div class="self-stretch h-[3px] relative bg-[#EEF2F6] rounded-xl overflow-hidden">
            {/* The first step has a partial fill, others are empty, matching the HTML logic */}
            {props.step.progress === 'full' && (
                <div class="w-1/3 h-full absolute top-0 left-0 bg-[#1376A1] rounded-xl"></div>
            )}
        </div>
    </div>
);

// --- Main Component ---

export const HowItWorksSection: Component = () => (
    <section class="w-full flex justify-center py-16 px-4 md:px-[100px] bg-white">
        <div class="w-full flex flex-col items-start gap-24">
            {/* 1. Heading Block and Decorative Element */}
            <div class="self-stretch relative flex flex-col items-start gap-6">
                {/* Section Title Badge */}
                <div class="p-1 rounded-lg flex items-center gap-2">
                    <span class="text-2xl font-semibold text-[#0F322E]">|</span>
                    <h2 class="text-xl font-medium text-[#0F322E]">
                        HOW IT WORKS
                    </h2>
                </div>

                {/* Main Headline and Subtitle */}
                <div class="w-full lg:max-w-[760px] flex flex-col justify-center items-start gap-3">
                    {/* Headline */}
                    <div class="flex flex-col justify-center items-start gap-3">
                        <div class="flex flex-wrap items-center gap-4 text-4xl sm:text-5xl font-bold">
                            <h1 class="text-[#0E0D13] capitalize">guiding &</h1>
                            <div class="px-4 h-15 bg-gradient-to-r from-[#2196F3] to-[#1A7AA0]/72 rounded-lg text-[#FCFCFD] capitalize">
                                Connecting
                            </div>
                            <h1 class="text-[#0E0D13] capitalize">You</h1>
                        </div>
                        <h1 class="text-4xl sm:text-5xl font-bold text-[#0E0D13] capitalize">
                            To get your task done
                        </h1>
                    </div>
                    {/* Subtitle */}
                    <p class="text-lg sm:text-xl font-normal text-[#4B5565] leading-loose">
                        Follow these three straightforward steps to connect with
                        skilled service providers and complete your tasks
                        effortlessly
                    </p>
                </div>

                {/* Decorative Artisan Badge (Absolute Positioned - Hidden on Mobile) */}
                <div class="hidden lg:inline-flex px-4 py-3 absolute right-0 top-[133px] backdrop-blur border border-white/50 rounded-tl-2xl rounded-tr-xl rounded-br-2xl rounded-bl-xl items-center gap-4">
                    <img
                        class="w-12 h-12 rounded-full"
                        src={p2}
                        alt="Artisan Profile"
                    />
                </div>
            </div>

            {/* 2. Main Content: Image/CTA (Left) and Steps (Right) */}
            <div class="self-stretch flex flex-col lg:flex-row justify-start items-start gap-10">
                {/* Left Column: Image and CTA - Stacks on mobile */}
                <div class="flex-1 w-full lg:w-1/2 flex flex-col justify-between items-start gap-6">
                    <img
                        class="self-stretch w-full h-[500px] lg:h-[900px] object-cover rounded-xl bg-gray-100"
                        src={painter}
                        alt="Mobile app screenshot showing the process"
                    />
                    <button class="w-full lg:w-auto px-4 py-3 bg-[#1376A1] text-xl font-semibold text-white rounded-lg hover:bg-[#106283] transition">
                        Get started now
                    </button>
                </div>

                {/* Right Column: Steps */}
                <div class="flex-1 w-full lg:w-1/2 flex flex-col justify-start items-start gap-8">
                    <div class="self-stretch flex flex-col justify-start items-start gap-9">
                        <For each={howItWorksSteps}>
                            {(step) => <StepItem step={step} />}
                        </For>
                    </div>
                </div>
            </div>
        </div>
    </section>
);
