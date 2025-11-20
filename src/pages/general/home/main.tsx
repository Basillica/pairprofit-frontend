import {
    Component,
    For,
    Match,
    Switch,
    createSignal,
    onCleanup,
    onMount,
} from 'solid-js';
import p1 from './../../../assets/client/one.svg';
import p2 from './../../../assets/client/two.svg';
import p3 from './../../../assets/client/three.svg';
import baking from './../../../assets/profiles/baking.jpg';
import carwash from './../../../assets/profiles/carwash.jpg';
import catering from './../../../assets/profiles/catering.jpg';
import cleaning from './../../../assets/profiles/cleaning.jpg';
import cooking from './../../../assets/profiles/cooking.jpg';
import events from './../../../assets/profiles/events.jpg';
import officecleaning from './../../../assets/profiles/officecleaning.jpg';
import plumbing from './../../../assets/profiles/plumbing.jpg';
import tutoring from './../../../assets/profiles/tutoring.jpg';

import './styles.css';
import {
    Cleaning,
    Event,
    Painting,
    Personal,
    Repairs,
    Settings,
    Transport,
    Trending,
} from './icon';
import { HowItWorksSection } from './howitworks';
import { ServicesInYourArea } from './servicearea';
import { AiIntegrationSection } from './mrfixit';
import { ArtisanCategorySection } from './category_section';
import { TestimonialSection } from './testimonial';
import { ArtisanRecruitmentSection } from './artisan_recruitment';
import { useAppContext } from '../../../state';

// Placeholder for the Service Icon (Wrench, for mounting)
const ServiceIcon: Component<{
    active: boolean;
    iconTitle: string;
}> = (props) => (
    <Switch>
        <Match when={props.iconTitle === 'CleaningIcon'}>
            <Cleaning active={props.active} />
        </Match>
        <Match when={props.iconTitle === 'ServiceIcon'}>
            <Settings active={props.active} />
        </Match>
        <Match when={props.iconTitle === 'MovingIcon'}>
            <Transport active={props.active} />
        </Match>
        <Match when={props.iconTitle === 'SupportIcon'}>
            <Personal active={props.active} />
        </Match>
        <Match when={props.iconTitle === 'EventIcon'}>
            <Event active={props.active} />
        </Match>
        <Match when={props.iconTitle === 'PaintingIcon'}>
            <Painting active={props.active} />
        </Match>
        <Match when={props.iconTitle === 'RepairsIcon'}>
            <Repairs active={props.active} />
        </Match>
        <Match when={props.iconTitle === 'TrendingIcon'}>
            <Trending active={props.active} />
        </Match>
    </Switch>
);

// --- Mock Data ---
const serviceCategories = [
    { name: 'Cleaning', icon: 'CleaningIcon' },
    { name: 'Mounting', icon: 'ServiceIcon' },
    { name: 'Moving', icon: 'MovingIcon' },
    { name: 'Support/Assistance', icon: 'SupportIcon' },
    { name: 'Event Support', icon: 'EventIcon' },
    { name: 'Painting', icon: 'PaintingIcon' },
    { name: 'Repairs', icon: 'RepairsIcon' },
    { name: 'Trending', icon: 'TrendingIcon' },
];

const HeroSection: Component = () => {
    const [word, setWord] = createSignal('Artisans');
    const [animationClass, setAnimationClass] = createSignal('');

    const toggleWord = () => {
        setAnimationClass('fade-out');
        setTimeout(() => {
            setWord((prev) => (prev === 'Artisans' ? 'Providers' : 'Artisans'));
            setAnimationClass('fade-in');
        }, 500);
    };

    let intervalId: NodeJS.Timeout;
    onMount(() => {
        intervalId = setInterval(toggleWord, 5000);
    });

    onCleanup(() => clearInterval(intervalId));

    const [isOpen, setIsOpen] = createSignal(false);
    const [selectedCountry, setSelectedCountry] = createSignal('Nigeria');

    const countries = [
        { name: 'Nigeria' },
        { name: 'United States' },
        { name: 'Canada' },
    ];

    const toggleDropdown = () => {
        setIsOpen(!isOpen());
    };

    const selectCountry = (country: string) => {
        setSelectedCountry(country);
        setIsOpen(false);
    };

    return (
        // Add a base background/text color class to the section
        <section class="w-full flex justify-center relative overflow-hidden py-24 md:py-[130px] px-4 md:px-[100px] transition-colors bg-primary-bg text-default">
            {/* Background Blur Gradients - Keeping these fixed as they are decorative/accent colors */}
            <div
                class="absolute top-[-112px] left-[-260px] w-[956px] h-[643px] rounded-full blur-[200px]"
                style={{
                    background:
                        'linear-gradient(148deg, rgba(218, 250, 126, 0.08) 0%, rgba(218, 250, 126, 0.1) 100%)',
                    'box-shadow': '400px 400px 400px',
                }}
            ></div>
            <div
                class="absolute top-0 right-[-260px] w-[956px] h-[597px] rounded-full blur-[200px]"
                style={{
                    background:
                        'linear-gradient(148deg, rgba(26, 122, 160, 0.11) 0%, rgba(20, 119, 161, 0.18) 100%)',
                    'box-shadow': '400px 400px 400px',
                }}
            ></div>

            {/* Content Container */}
            <div class="relative w-full max-w-[1100px] flex flex-col items-center text-center gap-14">
                {/* Text Block */}
                <div class="flex flex-col items-center gap-10 max-w-4xl">
                    {/* Replaced hardcoded text-[#0e0d13] with text-default */}
                    <h1 class="text-4xl sm:text-6xl md:text-[58px] font-bold text-default leading-tight md:leading-[74px]">
                        Trusted
                        <span
                            class={`inline-block mx-2 px-4 bg-gradient-to-r from-[#2196f3] to-[#1a7aa0] text-white rounded-lg ${animationClass()}`}
                        >
                            {word()}
                        </span>
                        for all your
                        <span class="block">Home Needs and services</span>
                    </h1>
                    {/* Replaced hardcoded text-[#4b5565] with text-muted */}
                    <p class="text-lg md:text-xl font-normal text-muted leading-8 max-w-3xl">
                        We make your life easier and stress-free by connecting
                        you with verified professionals for your plumbing,
                        electrical, carpentry and more.
                    </p>
                </div>

                {/* Search Bar */}
                {/* Replaced bg-white and border-[#e3e8ef] with theme aliases */}
                <div class="w-full max-w-4xl p-4 bg-card-bg rounded-xl shadow-lg border border-secondary-bg flex flex-col md:flex-row items-center gap-4 md:gap-6">
                    {/* Replaced bg-[#f2f2f2] and border-[#e3e8ef] with theme aliases */}
                    <div class="flex-1 w-full p-4 bg-secondary-bg rounded-xl border border-secondary-bg flex justify-between items-center">
                        <div class="flex items-center gap-3 w-[50%]">
                            {/* Replaced text-[#4b5565] with text-muted */}
                            <svg
                                class="w-5 h-5 text-muted"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                            {/* Ensured input text also uses theme-aware classes */}
                            <input
                                type="text"
                                placeholder="What services do you need?"
                                class="bg-transparent text-base font-medium text-default focus:outline-none w-full"
                            />
                        </div>
                        <div class="relative flex items-center gap-2">
                            {/* Replaced text-[#4b5565] with text-muted */}
                            <span
                                class="text-base font-medium text-muted cursor-pointer"
                                onClick={toggleDropdown}
                            >
                                {selectedCountry()}
                            </span>
                            {/* Replaced text-[#4b5565] with text-muted */}
                            <svg
                                class="w-6 h-6 text-muted transition-transform duration-300"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                style={{
                                    transform: isOpen()
                                        ? 'rotate(180deg)'
                                        : 'rotate(0deg)',
                                }}
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                            {isOpen() && (
                                <div class="absolute top-full left-0 right-0 mt-1 w-[120px] bg-card-bg border border-secondary-bg rounded-b-lg shadow-lg z-10">
                                    <For each={countries}>
                                        {(country) => (
                                            <div
                                                class="px-4 py-2 text-base font-medium text-default cursor-pointer hover:bg-secondary-bg bg-white"
                                                onClick={() =>
                                                    selectCountry(country.name)
                                                }
                                            >
                                                {country.name}
                                            </div>
                                        )}
                                    </For>
                                </div>
                            )}
                        </div>
                    </div>
                    {/* The search button uses a fixed accent color, which is usually fine for primary CTAs */}
                    <button class="w-full md:w-auto px-6 py-3 bg-[#1376a1] text-lg font-semibold text-white rounded-lg hover:bg-[#106283] transition cursor-pointer">
                        Search
                    </button>
                </div>
            </div>

            {/* Deco Elements (Absolute Positioning) - Images must be imported */}
            <div class="hidden lg:block">
                {/* Note: In a real app, you must ensure p1, p2, p3 are valid image URLs */}
                <div class="absolute p-4 left-[151px] top-[247px] rounded-tl-2xl rounded-tr-xl rounded-br-2xl rounded-bl-xl flex justify-start items-center gap-4 bg-card-bg shadow-lg">
                    <img
                        class="w-12 h-12 rounded-full"
                        src={p1}
                        alt="Artisan Profile"
                    />
                </div>
                <div class="absolute p-4 left-[1358px] top-[132px] rounded-tl-2xl rounded-tr-xl rounded-br-2xl rounded-bl-xl flex justify-start items-center gap-4 bg-card-bg shadow-lg">
                    <img
                        class="w-12 h-12 rounded-full"
                        src={p1}
                        alt="Artisan Profile"
                    />
                </div>
                <div class="absolute p-4 left-[60px] top-[477px] rounded-tl-2xl rounded-tr-xl rounded-br-2xl rounded-bl-xl flex justify-start items-center gap-4 bg-card-bg shadow-lg">
                    <img
                        class="w-12 h-12 rounded-full"
                        src={p2}
                        alt="Artisan Profile"
                    />
                </div>
                <div class="absolute p-4 left-[1458px] top-[341px] rounded-tl-2xl rounded-tr-xl rounded-br-2xl rounded-bl-xl flex justify-start items-center gap-4 bg-card-bg shadow-lg">
                    <img
                        class="w-12 h-12 rounded-full"
                        src={p3}
                        alt="Artisan Profile"
                    />
                </div>
            </div>
        </section>
    );
};

// Placeholder for the Left Arrow Button (Slider Navigation)
const ArrowLeftIcon: Component = (props) => (
    <svg
        class="w-6 h-6 transform rotate-180 text-black"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        {...props}
    >
        <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
);

// Placeholder for the Right Arrow Button (Slider Navigation)
const ArrowRightIcon: Component = () => (
    <svg
        class="w-6 h-6 text-black"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
    >
        <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
);

const mockServiceCards = [
    {
        title: 'Carpet & Car Washing',
        artisans: 2300,
        services: 1900,
        imageUrl: carwash,
    },
    {
        title: 'Office Cleaning',
        artisans: 2300,
        services: 1900,
        imageUrl: officecleaning,
    },
    {
        title: 'House Cleaning',
        artisans: 2300,
        services: 1900,
        imageUrl: cleaning,
    },
    {
        title: 'Baking Services',
        artisans: 1500,
        services: 1200,
        imageUrl: baking,
    },
    {
        title: 'Event Setup & Takedown',
        artisans: 1800,
        services: 1600,
        imageUrl: events,
    },
    {
        title: 'Cooking Services',
        artisans: 1800,
        services: 1600,
        imageUrl: cooking,
    },
    {
        title: 'Catering Services',
        artisans: 1800,
        services: 1600,
        imageUrl: catering,
    },
    {
        title: 'Plumbing Services',
        artisans: 1800,
        services: 1600,
        imageUrl: plumbing,
    },
    {
        title: 'Tutoring Services',
        artisans: 1800,
        services: 1600,
        imageUrl: tutoring,
    },
];

const HorizontalServiceCard: Component<{
    data: (typeof mockServiceCards)[number];
}> = (props) => {
    // Helper component for the Artisan/Service badge
    const InfoPill: Component<{
        count: number;
        label: string;
        iconType: 'artisans' | 'services';
    }> = (pillProps) => (
        <div class="px-4 py-2 bg-black/20 backdrop-blur-sm rounded-[100px] outline outline-1 outline-[#4B5565] flex items-center gap-2">
            <div class="w-6 h-6 relative overflow-hidden flex items-center justify-center">
                {/* Icon placeholders based on original dimensions */}
                {pillProps.iconType === 'artisans' ? (
                    <svg
                        width="24"
                        height="18"
                        viewBox="0 0 24 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M10.5 18S9 18 9 16.5s1.5-6 7.5-6 7.5 4.5 7.5 6-1.5 1.5-1.5 1.5zm6-9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9m-8.676 9a3.36 3.36 0 0 1-.324-1.5c0-2.033 1.02-4.125 2.904-5.58A9.5 9.5 0 0 0 7.5 10.5c-6 0-7.5 4.5-7.5 6S1.5 18 1.5 18zM6.75 9a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5"
                            fill="#fff"
                        />
                    </svg>
                ) : (
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M20 6H16V4C16 2.89 15.11 2 14 2H10C8.89 2 8 2.89 8 4V6H4C2.89 6 2.01 6.89 2.01 8L2 19C2 20.11 2.89 21 4 21H20C21.11 21 22 20.11 22 19V8C22 6.89 21.11 6 20 6ZM14 6H10V4H14V6Z"
                            fill="white"
                        />
                    </svg>
                )}
            </div>
            <div class="text-center text-white text-base font-medium leading-relaxed">
                {new Intl.NumberFormat().format(pillProps.count)}{' '}
                {pillProps.label}
            </div>
        </div>
    );

    return (
        // The container uses flex-shrink-0 and a fixed/large width to enable horizontal scrolling
        <div class="flex-shrink-0 w-[80vw] sm:w-[500px] lg:w-[527px] h-[550px] flex flex-col gap-6">
            <div
                class="relative w-full h-[550px] rounded-2xl overflow-hidden bg-cover"
                style={{ 'background-image': `url(${props.data.imageUrl})` }}
            >
                {/* Gradient Overlay */}
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-black/10 flex flex-col justify-between p-6">
                    {/* Top Title */}
                    <h3 class="text-white text-3xl font-semibold leading-relaxed max-w-[90%]">
                        {props.data.title}
                    </h3>

                    {/* Bottom Info Pills */}
                    <div class="flex flex-wrap justify-start items-center gap-5">
                        <InfoPill
                            count={props.data.artisans}
                            label="Artisans"
                            iconType="artisans"
                        />
                        <InfoPill
                            count={props.data.services}
                            label="services render"
                            iconType="services"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

const ServicesCategory: Component = () => {
    const [activeTab, setActiveTab] = createSignal('Mounting');

    // Ref for the scrolling container to allow button control
    let scrollContainerRef: HTMLDivElement | undefined;

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef) {
            const scrollAmount = 550; // Scroll by the width of one card + gap
            scrollContainerRef.scrollBy({
                left: direction === 'right' ? scrollAmount : -scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    return (
        // <section class="w-full flex justify-center py-20 px-4 md:px-[100px] bg-white">
        <section class="w-full flex justify-center py-2 px-4 md:px-[10px]">
            <div class="w-full flex flex-col items-center gap-16">
                {/* Heading Block */}
                <div class="flex flex-col items-center gap-3 text-center max-w-4xl">
                    <div class="p-1 rounded-lg flex items-center gap-2">
                        <span class="text-2xl font-semibold text-[#0F322E]">
                            |
                        </span>
                        <h2 class="text-xl font-medium text-[#0F322E]">
                            SERVICES CATEGORY
                        </h2>
                    </div>
                    <h1 class="text-4xl sm:text-5xl md:text-[48px] font-bold text-[#0E0D13] leading-tight md:leading-[74px] capitalize">
                        Discover Most Popular Services
                    </h1>
                    <p class="text-lg md:text-xl font-normal text-[#4B5565] leading-8">
                        Explore our most in-demand services trusted by customers
                        for
                    </p>
                </div>

                {/* Tab Navigation */}
                <div class="w-full overflow-x-auto">
                    <div class="flex justify-start md:justify-center items-center gap-6 pb-2 border-b border-[#e3e8ef] min-w-max">
                        <For each={serviceCategories}>
                            {(category) => (
                                <button
                                    onClick={() => setActiveTab(category.name)}
                                    class={`flex flex-col items-center justify-center gap-3 p-3 transition duration-200 cursor-pointer 
                                            ${
                                                activeTab() === category.name
                                                    ? 'border-b-2 border-[#2196f3] text-[#2196f3]'
                                                    : 'border-b-2 border-transparent text-[#5e6775] hover:text-[#0e0d13]'
                                            }`}
                                >
                                    {/* Icon Placeholder */}
                                    <ServiceIcon
                                        active={activeTab() === category.name}
                                        iconTitle={category.icon}
                                    />
                                    <span class="text-base font-semibold">
                                        {category.name}
                                    </span>
                                </button>
                            )}
                        </For>
                    </div>
                </div>

                {/* Service Cards (Horizontal Scroll Section) */}
                <div class="w-full flex flex-col items-center gap-9">
                    {/* Scrollable Card Container */}
                    <div
                        ref={scrollContainerRef}
                        class="w-full overflow-x-auto snap-x snap-mandatory flex justify-start gap-6"
                    >
                        <For each={mockServiceCards}>
                            {(card) => <HorizontalServiceCard data={card} />}
                        </For>
                    </div>

                    {/* Navigation Arrows */}
                    <div class="flex justify-center items-center gap-6">
                        <button
                            onClick={() => scroll('left')}
                            class="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition border border-gray-300"
                        >
                            <ArrowLeftIcon />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            class="w-12 h-12 bg-[#E3E8EF] rounded-full flex items-center justify-center hover:bg-gray-300 transition"
                        >
                            <ArrowRightIcon />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Combine all components into the final landing page
export const LandingPage: Component = () => {
    const {
        public: { setCurrentContent },
    } = useAppContext();
    onMount(() => {
        setCurrentContent(
            <h2 class="text-3xl sm:text-4xl lg:text-[48px] font-bold text-[#FCFCFD] leading-tight capitalize">
                Ready To Get project Started?
            </h2>
        );
    });

    return (
        <main class="w-full flex flex-col items-center">
            <HeroSection />
            <ServicesCategory />
            <HowItWorksSection />
            <ServicesInYourArea />
            <AiIntegrationSection />
            <ArtisanCategorySection />
            <TestimonialSection />
            <ArtisanRecruitmentSection />
        </main>
    );
};
