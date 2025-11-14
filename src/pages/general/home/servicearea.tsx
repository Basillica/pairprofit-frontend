import { Component, For } from 'solid-js';
import catering from './../../../assets/profiles/catering.jpg';
import hvac from './../../../assets/profiles/hvac.jpg';
import it_support from './../../../assets/profiles/it_support.jpg';
import carpentary from './../../../assets/profiles/carpentary.jpg';
import plumbing from './../../../assets/profiles/plumbing.jpg';
import electrician from './../../../assets/profiles/electrician.jpg';

// Icon for the "View artisans" link (Right Arrow)
const RightArrowIcon: Component = (props) => (
    <svg
        class="w-[17.5px] h-[13.54px] text-[#1376A1] fill-current inline-block"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        {...props}
    >
        <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
);

// Mock data for the service cards
const serviceAreaCards = [
    {
        title: 'Plumbing',
        description:
            'Repairs installations, and maintenance for all plumbing needs',
        jobsCompleted: 893,
        imageUrl: plumbing,
    },
    {
        title: 'Electrical',
        description:
            'Licensed electricians for wiring, repairs and installations',
        jobsCompleted: 124,
        imageUrl: electrician,
    },
    {
        title: 'Carpentry',
        description: 'Custom furniture, repairs, and woodworking projects',
        jobsCompleted: 2943,
        imageUrl: carpentary,
    },
    {
        title: 'Expert IT & Tech Support',
        description: 'Need help with web design, software or network issues',
        jobsCompleted: 345,
        imageUrl: it_support,
    },
    {
        title: 'HVAC',
        description: 'Heating and cooling system installation and repair',
        jobsCompleted: 458,
        imageUrl: hvac,
    },
    {
        title: 'Chefs and Catering',
        description:
            'Elevate your events with gourmet meals and professional catering services',
        jobsCompleted: 1054,
        imageUrl: catering,
    },
];

// --- Card Component ---

const ServiceAreaCard: Component<{
    data: (typeof serviceAreaCards)[number];
}> = (props) => {
    // Format job count with a plus sign and comma separator
    const formattedJobs =
        new Intl.NumberFormat().format(props.data.jobsCompleted) +
        '+ jobs completed';

    return (
        <div class="flex-1 min-w-[300px] flex flex-col justify-start items-start gap-6">
            {/* Image Block */}
            <div
                class="self-stretch h-[336px] relative overflow-hidden rounded-2xl bg-cover bg-center"
                style={{ 'background-image': `url(${props.data.imageUrl})` }}
            >
                {/* Gradient Overlay */}
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-black/10 flex flex-col justify-end p-6">
                    {/* Jobs Completed Pill */}
                    <div class="flex justify-start items-center gap-5">
                        <div class="px-4 py-2 bg-white/20 rounded-lg flex items-center gap-2">
                            <div class="text-center text-white text-base font-medium leading-relaxed">
                                {formattedJobs}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Text Content */}
            <div class="self-stretch px-4 flex flex-col justify-start items-start gap-4">
                {/* Title and Description */}
                <div class="self-stretch flex flex-col justify-start items-start gap-2">
                    <h3 class="text-2xl font-semibold text-[#0F0F0F] leading-relaxed">
                        {props.data.title}
                    </h3>
                    <p class="self-stretch text-lg font-normal text-[#5D6B78] leading-relaxed">
                        {props.data.description}
                    </p>
                </div>

                {/* View Artisans Link */}
                <a
                    href="/login" // TODO: Update with actual link to artisans listing
                    class="inline-flex justify-start items-center gap-3 group"
                >
                    <span class="text-base font-semibold text-[#1376A1] leading-relaxed group-hover:underline">
                        View artisans
                    </span>
                    <RightArrowIcon />
                </a>
            </div>
        </div>
    );
};

// --- Main Component ---

export const ServicesInYourArea: Component = () => {
    return (
        <section class="w-full flex justify-center py-16 px-4 md:px-[100px] bg-white">
            <div class="w-full flex flex-col items-center gap-16">
                {/* Heading Block */}
                <div class="flex flex-col items-center gap-3 text-center max-w-4xl">
                    <div class="p-1 rounded-lg flex items-center gap-2">
                        <span class="text-2xl font-semibold text-[#0F322E]">
                            |
                        </span>
                        <h2 class="text-xl font-medium text-[#0F322E]">
                            SERVICES IN YOUR AREA
                        </h2>
                    </div>
                    <h1 class="text-4xl sm:text-5xl md:text-[48px] font-bold text-[#0E0D13] leading-tight md:leading-[74px] capitalize">
                        Popular services near you
                    </h1>
                    <p class="text-lg md:text-xl font-normal text-[#4B5565] leading-8">
                        Explore our most in-demand services trusted by customers
                        for
                    </p>
                </div>

                {/* Service Cards Grid */}
                <div class="self-stretch grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-10">
                    <For each={serviceAreaCards}>
                        {(card) => <ServiceAreaCard data={card} />}
                    </For>
                </div>

                {/* Navigation Arrows (for future pagination/slider) */}
                {/* <div class="self-stretch flex justify-center items-center gap-6">
                    <div class="flex justify-start items-center gap-6">
                        <button
                            class="w-12 h-12 bg-[#EEF2F6] rounded-full flex items-center justify-center border border-[#E2E6E9] cursor-not-allowed transition"
                            disabled
                        >
                            <ArrowLeftIcon />
                        </button>

                        <button class="w-12 h-12 bg-[#E3E8EF] rounded-full flex items-center justify-center hover:bg-gray-300 transition">
                            <ArrowRightIcon />
                        </button>
                    </div>
                </div> */}
            </div>
        </section>
    );
};
