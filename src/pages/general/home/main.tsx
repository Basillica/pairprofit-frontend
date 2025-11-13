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

// Placeholder for the Search Icon (Magnifying Glass)
const SearchIcon: Component<{
    class: string;
}> = (props: any) => (
    <svg
        class="w-5 h-5 text-gray-700"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        {...props}
    >
        <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M14.5833 14.5833L18.3333 18.3333"
        />
        <circle cx="9.16667" cy="9.16667" r="7.5" />
    </svg>
);

// Placeholder for the Down Arrow Icon (Country Selector)
const ChevronDownIcon: Component<{
    class: string;
}> = (props) => (
    <svg
        class={`${props.class ?? 'w-6 h-6 text-gray-700'}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        // {...props}
    >
        <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
        ></path>
    </svg>
);

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
    // <svg
    //     class={`w-6 h-6 ${props.active ? 'text-[#1376a1]' : 'text-gray-800'}`}
    //     viewBox="0 0 24 24"
    //     fill="none"
    //     stroke="currentColor"
    //     {...props}
    // >
    //     <circle cx="12" cy="12" r="2" fill="currentColor" />
    //     <path
    //         d="M14.83 14.83L17.66 17.66L20 20L22 22M2 2L4 4M22 2L2 22"
    //         stroke="currentColor"
    //         stroke-width="2"
    //     />
    // </svg>
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

    // Function to toggle the word
    const toggleWord = () => {
        setAnimationClass('fade-out'); // Start the fade-out animation

        // Schedule the word change and fade-in animation after 0.5 seconds
        setTimeout(() => {
            setWord((prev) => (prev === 'Artisans' ? 'Provider' : 'Artisans'));
            setAnimationClass('fade-in'); // Start the fade-in animation
        }, 500);
    };

    // Set up an interval to toggle the word every 5 seconds
    let intervalId: NodeJS.Timeout;
    onMount(() => {
        intervalId = setInterval(toggleWord, 5000);
    });

    // Clean up the interval when the component is unmounted
    onCleanup(() => clearInterval(intervalId));

    return (
        <section class="w-full flex justify-center relative overflow-hidden py-24 md:py-[130px] px-4 md:px-[100px]">
            {/* Background Blur Gradients */}
            <div
                class="absolute top-[-112px] left-[-260px] w-[956px] h-[643px] rounded-full blur-[200px] z-0"
                style={{
                    background:
                        'linear-gradient(148deg, rgba(218, 250, 126, 0.08) 0%, rgba(218, 250, 126, 0.1) 100%)',
                    'box-shadow': '400px 400px 400px',
                }}
            ></div>
            <div
                class="absolute top-0 right-[-260px] w-[956px] h-[597px] rounded-full blur-[200px] z-0"
                style={{
                    background:
                        'linear-gradient(148deg, rgba(26, 122, 160, 0.11) 0%, rgba(20, 119, 161, 0.18) 100%)',
                    'box-shadow': '400px 400px 400px',
                }}
            ></div>

            {/* Content Container */}
            <div class="relative z-10 w-full max-w-[1100px] flex flex-col items-center text-center gap-14">
                {/* Text Block */}
                <div class="flex flex-col items-center gap-10 max-w-4xl">
                    <h1 class="text-4xl sm:text-6xl md:text-[58px] font-bold text-[#0e0d13] leading-tight md:leading-[74px]">
                        Trusted
                        {/* <span class="inline-block mx-2 px-4 bg-gradient-to-r from-[#2196f3] to-[#1a7aa0] text-white rounded-lg"> */}
                        <span
                            class={`inline-block mx-2 px-4 bg-gradient-to-r from-[#2196f3] to-[#1a7aa0] text-white rounded-lg ${animationClass()}`}
                        >
                            {word()}
                        </span>
                        for all your
                        <span class="block">Home Needs and services</span>
                    </h1>
                    <p class="text-lg md:text-xl font-normal text-[#4b5565] leading-8 max-w-3xl">
                        We make your life easier and stress-free by connecting
                        you with verified professionals for your plumbing,
                        electrical, carpentry and more.
                    </p>
                </div>

                {/* Search Bar */}
                <div class="w-full max-w-4xl p-4 bg-white rounded-xl shadow-lg border border-[#e3e8ef] flex flex-col md:flex-row items-center gap-4 md:gap-6">
                    <div class="flex-1 w-full p-4 bg-[#f2f2f2] rounded-xl border border-[#e3e8ef] flex justify-between items-center">
                        <div class="flex items-center gap-3">
                            <SearchIcon class="w-5 h-5 text-[#4b5565]" />
                            <input
                                type="text"
                                placeholder="What services do you need?"
                                class="bg-transparent text-base font-medium text-[#4b5565] focus:outline-none w-full"
                            />
                        </div>
                        <div class="flex items-center gap-2">
                            <span class="text-base font-medium text-[#4b5565]">
                                Nigeria
                            </span>
                            <ChevronDownIcon class="w-6 h-6 text-[#4b5565]" />
                        </div>
                    </div>

                    <button class="w-full md:w-auto px-6 py-3 bg-[#1376a1] text-lg font-semibold text-white rounded-lg hover:bg-[#106283] transition">
                        Search
                    </button>
                </div>
            </div>

            {/* Deco Elements (Absolute Positioning) - Mobile hidden */}
            <div class="hidden lg:block">
                <div class="absolute p-4 left-[151px] top-[247px] rounded-tl-2xl rounded-tr-xl rounded-br-2xl rounded-bl-xl flex justify-start items-center gap-4">
                    <img
                        class="w-12 h-12 rounded-full"
                        src={p1}
                        alt="Artisan Profile"
                    />
                </div>
                <div class="absolute p-4 left-[1358px] top-[132px] rounded-tl-2xl rounded-tr-xl rounded-br-2xl rounded-bl-xl flex justify-start items-center gap-4">
                    <img
                        class="w-12 h-12 rounded-full"
                        src={p1}
                        alt="Artisan Profile"
                    />
                </div>
                <div class="absolute p-4 left-[60px] top-[477px] rounded-tl-2xl rounded-tr-xl rounded-br-2xl rounded-bl-xl flex justify-start items-center gap-4">
                    <img
                        class="w-12 h-12 rounded-full"
                        src={p2}
                        alt="Artisan Profile"
                    />
                </div>
                {/* The last deco element is yellow/orange themed and has no badge in the HTML, reproducing the unique style */}
                <div class="absolute p-4 left-[1458px] top-[341px] rounded-tl-2xl rounded-tr-xl rounded-br-2xl rounded-bl-xl flex justify-start items-center gap-4">
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
        imageUrl: 'https://placehold.co/527x550/093b50/white?text=Carpet',
    },
    {
        title: 'Office Cleaning',
        artisans: 2300,
        services: 1900,
        imageUrl: 'https://placehold.co/527x550/1376a1/white?text=Office+Clean',
    },
    {
        title: 'House Warming',
        artisans: 2300,
        services: 1900,
        imageUrl: 'https://placehold.co/527x550/fdad34/white?text=House+Warm',
    },
    {
        title: 'Deep Cleaning Services',
        artisans: 1500,
        services: 1200,
        imageUrl: 'https://placehold.co/527x550/5d6b78/white?text=Deep+Clean',
    },
    {
        title: 'Event Setup & Takedown',
        artisans: 1800,
        services: 1600,
        imageUrl: 'https://placehold.co/527x550/12cfae/white?text=Events',
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

export const ServicesCategory: Component = () => {
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
        <section class="w-full flex justify-center py-2 px-4 md:px-[1px] bg-white">
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
