import { Component, createSignal, For, Match, Setter, Switch } from 'solid-js';
import { ArtisanProfile } from './preview';
import { DisplayNameEditor } from './name';
import { LanguagesEditor } from './language';

// --- 1. Reusable Icon Components (Styled placeholders) ---

// Placeholder for the Pencil/Edit Icon
const EditIcon: Component = () => (
    <div class="w-7 h-7 rounded-full border border-slate-300 flex items-center justify-center p-1.5 cursor-pointer">
        {/* Placeholder for actual icon content */}
        <svg
            class="w-4 h-4 text-black"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
        </svg>
    </div>
);

// Placeholder for the More/Menu Icon
const MoreIcon: Component = () => (
    <div class="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center p-2 cursor-pointer">
        {/* Placeholder for actual icon content */}
        <svg
            class="w-5 h-5 text-black"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <circle cx="12" cy="12" r="1" />
            <circle cx="19" cy="12" r="1" />
            <circle cx="5" cy="12" r="1" />
        </svg>
    </div>
);

// Placeholder for the Location Icon
const LocationIcon: Component = () => (
    <svg
        class="w-5 h-5 text-slate-600"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
    >
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
    </svg>
);

// Placeholder for the Preview/Eye Icon
const PreviewIcon: Component = () => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0"
            stroke="#697586"
            stroke-width="1.333"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
        <path
            d="M2 12c1.6-4.097 5.336-7 10-7s8.4 2.903 10 7c-1.6 4.097-5.336 7-10 7s-8.4-2.903-10-7"
            stroke="#697586"
            stroke-width="1.333"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
    </svg>
);

// Placeholder for the Share Icon
const ShareIcon: Component = () => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M19.59 12 15 7.41v2.46l-.86.13c-4.31.61-7.23 2.87-8.9 6.33 2.32-1.64 5.2-2.43 8.76-2.43h1v2.69m-2-1.67c-4.47.21-7.67 1.82-10 5.08 1-5 4-10 11-11V5l7 7-7 7v-4.1c-.33 0-.66.01-1 .02"
            fill="#697586"
        />
    </svg>
);

// Placeholder for Favorite/Heart Icon on Portfolio Card
const FavoriteIcon: Component = () => (
    <div class="w-8 h-8 absolute top-4 right-4 bg-gray-900/30 rounded-full flex items-center justify-center p-1.5">
        <svg
            class="w-5 h-5 text-white"
            viewBox="0 0 24 24"
            fill="white"
            stroke="white"
            stroke-width="1"
        >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
    </div>
);

// Placeholder for Star Icon in Testimonials
const StarIcon: Component = () => (
    <svg class="w-5 h-5 text-yellow-500 fill-current" viewBox="0 0 24 24">
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
);

// Placeholder for Dropdown Icon
const DropdownIcon: Component<{ isToggled: boolean }> = (props) => (
    <svg
        class="w-5 h-5 transition-transform duration-200"
        classList={{ 'rotate-180': props.isToggled }}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        {/* Down arrow/chevron path */}
        <path
            d="M7 10L12 15L17 10"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
    </svg>
);

// --- 2. Data Structures (Mock data extracted from HTML) ---

const mockProfile = {
    name: 'Stanley Agu',
    location: 'Lagos, Nigeria',
    languages: 'Speaks English, German, Spanish',
    followers: 2368,
    following: 364,
    listings: 3,
    title: 'Professional Electrician - Residential & commercial',
    description:
        'Certified electrician with 6+ years of experience. I specialize in safe wiring, fault diagnosis, and efficient installations. I bring own tools and ensure compliance with local safety rules.',
};

const mockPortfolio = [
    {
        title: 'Socket installation',
        imageUrl: `https://picsum.photos/200?random=${Math.random()}`,
    },
    {
        title: 'Home rewiring',
        imageUrl: `https://picsum.photos/200?random=${Math.random()}`,
    },
    {
        title: 'Home rewiring',
        imageUrl: `https://picsum.photos/200?random=${Math.random()}`,
    },
    {
        title: 'Home rewiringere',
        imageUrl: `https://picsum.photos/200?random=${Math.random()}`,
    },
    {
        title: 'Home rewiringwerewrew',
        imageUrl: `https://picsum.photos/200?random=${Math.random()}`,
    },
];

const mockWorkHistory = [
    {
        title: 'Residential Wiring & Installation',
        description:
            'Installed complete electrical wiring for a 3-bedroom apartment, including lighting fixtures, sockets, and safety breakers. Completed within 5 days and ensured compliance with safety standards.',
    },
    {
        title: 'Office Lighting Upgrade',
        description:
            'Upgraded outdated fluorescent lights to energy-efficient LED panels for a small office complex. Improved lighting quality while reducing energy consumption by 35%.',
    },
    {
        title: 'Electrical Troubleshooting & Repair',
        description:
            'Diagnosed and fixed recurring power outages in a client’s home. Replaced faulty wiring and stabilized the circuit board, ensuring uninterrupted electricity supply.',
    },
];

const mockTestimonials = [
    {
        client: 'Danni M',
        date: 'Sept 2025',
        rating: 4,
        reviewTitle: 'Excellent work, fixed our wiring the same day.',
        jobTitle: 'Job: Plumber - leaking pipe repair',
    },
    {
        client: 'Jose Williams',
        date: '1 month ago',
        rating: 5,
        reviewTitle:
            'PairProfit connected me with a reliable plumber the same day. Professional and skilled',
        jobTitle: 'Job: Plumber - leaking pipe repair',
    },
    {
        client: 'Joe Mike',
        date: '2 months ago',
        rating: 5,
        reviewTitle:
            'PairProfit connected me with a reliable plumber the same day. Professional and skilled',
        jobTitle: 'Job: Electrician - House wiring',
    },
    {
        client: 'Joe Mike2',
        date: '2 months ago',
        rating: 5,
        reviewTitle:
            'PairProfit connected me with a reliable plumber the same day. Professional and skilled',
        jobTitle: 'Job: Electrician - House wiring',
    },
];

// --- 3. Modular Components ---

const ProfileMetrics: Component<{ count: number; label: string }> = (props) => (
    <div class="flex flex-col items-center w-16 sm:w-auto">
        <div class="text-xl font-semibold text-gray-900 leading-8">
            {props.count}
        </div>
        <div class="text-sm font-normal text-slate-600 leading-tight">
            {props.label}
        </div>
    </div>
);

// --- Dropdown Menu Item Component ---
const MenuItemIcon: Component<{ color: string }> = (props) => (
    // Converted the checkmark/select icon from the original CSS styles
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M6 12L10 16L18 8"
            stroke={props.color}
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
    </svg>
);

const ProfileDropdown: Component = () => {
    const PROFILE_OPTIONS = [
        { id: 1, name: 'Profile 1' },
        { id: 2, name: 'Profile 2' },
        { id: 3, name: 'Profile 3' },
    ];
    const [showDropdown, setShowDropdown] = createSignal(false);
    const [activeProfile, setActiveProfile] = createSignal(
        PROFILE_OPTIONS[0].name
    );
    const toggleDropdown = () => setShowDropdown(!showDropdown());

    const handleSelect = (profileName: string) => {
        setActiveProfile(profileName);
        setShowDropdown(false);
    };

    return (
        // The container must be 'relative' for the dropdown content to be 'absolute'
        <div class="relative inline-block text-left mt-4">
            {/* The Toggle Button */}
            <button
                onClick={toggleDropdown}
                class="flex items-center gap-3 px-4 py-3 bg-[#1376A1] rounded-lg text-white font-semibold text-base transition hover:bg-sky-800"
                aria-expanded={showDropdown()}
                aria-haspopup="true"
            >
                <span>{activeProfile()}</span>
                <DropdownIcon isToggled={showDropdown()} />
            </button>

            {/* The Dropdown Content */}
            <div
                // Positioning and Visibility
                class="absolute right-0 z-10 mt-2 w-[169px] p-2 bg-white shadow-xl rounded-xl flex flex-col justify-start items-start transition-opacity duration-200 origin-top-right"
                // Conditional visibility logic
                classList={{
                    'opacity-100 scale-100 pointer-events-auto': showDropdown(),
                    'opacity-0 scale-95 pointer-events-none': !showDropdown(),
                }}
            >
                <For each={PROFILE_OPTIONS}>
                    {(profile) => {
                        const isActive = profile.name === activeProfile();
                        return (
                            <div
                                onClick={() => handleSelect(profile.name)}
                                class="w-full p-2 rounded-lg flex justify-start items-center gap-2 cursor-pointer transition-colors duration-150"
                                classList={{
                                    // Active style: Background/Text from user's example
                                    'bg-[#1376A1] text-white': isActive,
                                    // Inactive style: Hover from user's example, but keeping text color consistent
                                    'text-[#202939] hover:bg-gray-100':
                                        !isActive,
                                }}
                            >
                                {/* Active Icon (Only visible when active) */}
                                {isActive && <MenuItemIcon color="white" />}

                                {/* Placeholder icon/space for alignment when inactive */}
                                {!isActive && <div class="w-6 h-6"></div>}

                                <div class="text-sm font-normal leading-5">
                                    {profile.name}
                                </div>
                            </div>
                        );
                    }}
                </For>
            </div>
        </div>
    );
};

const ProfileHeader: Component<{
    setProfilePreview: Setter<boolean>;
    setProfileName: Setter<boolean>;
    setProfileLanguage: Setter<boolean>;
}> = (props) => {
    return (
        <div class="flex flex-col gap-6 sm:gap-4 bg-white rounded-xl border border-slate-300 p-6">
            {/* Row 1: Profile Title (Hidden on mobile for space, or smaller, kept 24px per HTML) */}
            <div class="text-2xl font-medium text-gray-900 leading-10">
                Profile
            </div>

            {/* Row 2: Profile Info and Action Buttons */}
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                {/* Left: Avatar & Info */}
                <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <img
                        class="w-32 h-32 rounded-full flex-shrink-0"
                        src={`https://picsum.photos/200?random=${Math.random()}`}
                        alt="Stanley Agu profile"
                    />
                    <div class="flex flex-col gap-1">
                        {/* Name and Edit Icon */}
                        <div class="flex items-center gap-3">
                            <h2 class="text-2xl font-semibold text-gray-900 leading-10">
                                {mockProfile.name}
                            </h2>
                            <button onClick={() => props.setProfileName(true)}>
                                <EditIcon />
                            </button>
                        </div>
                        {/* Location, Languages, and Actions (Mobile: stacked, Desktop: inline) */}
                        <div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                            <div class="flex items-center gap-2">
                                <LocationIcon />
                                <span class="text-lg font-normal text-slate-600 leading-7">
                                    {mockProfile.location}
                                </span>
                            </div>
                            <div class="hidden sm:block w-2 h-2 bg-slate-400 rounded-full flex-shrink-0"></div>
                            <div class="flex flex-col sm:flex-row sm:items-center gap-3">
                                <span class="text-lg font-medium text-slate-600 leading-7">
                                    {mockProfile.languages}
                                </span>
                                {/* Language Edit Icons (Placeholder structure maintained from HTML) */}
                                <div class="flex items-center gap-3">
                                    <button
                                        onClick={() =>
                                            props.setProfileLanguage(true)
                                        }
                                    >
                                        <EditIcon />
                                    </button>
                                    <MoreIcon />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Preview & Share Buttons */}
                <div class="flex-shrink-0 flex items-center gap-3 mt-4 sm:mt-0">
                    <button
                        class="flex items-center gap-2 px-4 py-3 border border-slate-400 rounded-lg text-slate-600 font-semibold text-base hover:bg-slate-50 transition"
                        onClick={() => props.setProfilePreview(true)}
                    >
                        <PreviewIcon />
                        <span>Preview</span>
                    </button>
                    <button class="flex items-center gap-2 px-4 py-3 border border-slate-400 rounded-lg text-slate-600 font-semibold text-base hover:bg-slate-50 transition">
                        <ShareIcon />
                        <span>Share</span>
                    </button>
                </div>
            </div>

            {/* Row 3: Metrics and Profile Selector */}
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-3 border-t border-slate-200">
                {/* Left: Metrics */}
                <div class="flex items-start sm:items-center gap-5 sm:gap-6">
                    <ProfileMetrics
                        count={mockProfile.followers}
                        label="Followers"
                    />
                    <ProfileMetrics
                        count={mockProfile.following}
                        label="Following"
                    />
                    <ProfileMetrics
                        count={mockProfile.listings}
                        label="Listing"
                    />
                </div>

                {/* Right: Profile Selector Button */}
                {/* <button class="flex items-center gap-3 px-4 py-3 bg-sky-700 rounded-lg text-white font-semibold text-base mt-4 sm:mt-0 hover:bg-sky-800 transition">
                    <span>Profile 1</span>
                    <DropdownIcon />
                </button> */}
                <ProfileDropdown />
            </div>
        </div>
    );
};

const InfoCard: Component<{ title: string; description: string }> = (props) => (
    <div class="w-full p-6 rounded-xl border border-slate-300 flex flex-col gap-3 bg-white">
        <div class="flex justify-between items-center">
            <h1 class="text-xl font-semibold text-gray-900 leading-8">
                {props.title}
            </h1>
            <EditIcon />
        </div>
        <p class="text-base font-normal text-slate-600 leading-relaxed max-w-[95%]">
            {props.description}
        </p>
    </div>
);

const PortfolioItemCard: Component<{ title: string; imageUrl: string }> = (
    props
) => (
    <div class="flex flex-col gap-3 flex-shrink-0 w-[305px]">
        <div
            class="w-full h-64 relative overflow-hidden rounded-xl bg-gray-200"
            style={{
                'background-image': `url(${props.imageUrl})`,
                'background-size': 'cover',
            }}
        >
            <FavoriteIcon />
        </div>
        <p class="text-sm font-normal text-gray-800 leading-relaxed">
            {props.title}
        </p>
    </div>
);

const PortfolioSection: Component = () => (
    <div class="w-full p-6 rounded-xl bg-white border border-slate-200 flex flex-col gap-5">
        <div class="flex justify-between items-center">
            <h2 class="text-xl font-medium text-gray-900 leading-8">
                Portfolio
            </h2>
            <div class="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center p-2 cursor-pointer">
                <i class="fa-solid fa-plus"></i>
            </div>
        </div>
        {/* Adjusted: Added 'w-full' to ensure the scrolling area takes the full width */}
        <div class="flex w-full gap-6 overflow-x-auto pb-2">
            <For each={mockPortfolio}>
                {(item) => <PortfolioItemCard {...item} />}
            </For>
        </div>
    </div>
);

const WorkHistoryItem: Component<{ title: string; description: string }> = (
    props
) => (
    <div class="flex flex-col gap-3 pb-3 border-b border-slate-200 last:border-b-0">
        <div class="flex justify-between items-start gap-4">
            <h3 class="text-lg font-medium text-gray-900 leading-7 max-w-[90%]">
                {props.title}
            </h3>
            <EditIcon />
        </div>
        <p class="text-base font-normal text-slate-600 leading-relaxed">
            {props.description}
        </p>
    </div>
);

const WorkHistorySection: Component = () => (
    <div class="w-full p-6 rounded-xl border border-slate-300 flex flex-col gap-8 bg-white">
        <div class="flex justify-between items-center">
            <h2 class="text-xl font-medium text-gray-900 leading-8">
                Work History
            </h2>
            <MoreIcon />
        </div>
        <div class="flex flex-col gap-4 w-full">
            <For each={mockWorkHistory}>
                {(item) => <WorkHistoryItem {...item} />}
            </For>
        </div>
        <div class="text-base font-medium text-sky-700 leading-relaxed cursor-pointer hover:text-sky-800 transition">
            See more
        </div>
    </div>
);

const TestimonialCard: Component<(typeof mockTestimonials)[0]> = (props) => (
    <div class="w-full p-5 rounded-xl border border-slate-300 flex flex-col gap-3">
        <div class="flex items-center gap-4">
            <img
                class="w-[70px] h-[70px] rounded-full flex-shrink-0"
                src="https://placehold.co/70x70"
                alt={`Profile picture of ${props.client}`}
            />
            <div class="flex flex-col gap-0.5">
                <div class="text-lg font-medium text-gray-900 leading-7">
                    {props.client}
                </div>
                <div class="text-base font-normal text-slate-600 leading-relaxed">
                    {props.date}
                </div>
            </div>
        </div>
        <div class="flex flex-col gap-2">
            <div class="flex items-center gap-3">
                {/* Star Rating based on number of stars in HTML (4 or 5) */}
                <div class="flex items-center gap-3">
                    <For each={Array(props.rating).fill(null)}>
                        {() => <StarIcon />}
                    </For>
                </div>
                <div class="text-lg font-medium text-gray-900 leading-7">
                    {props.rating}
                </div>
            </div>
            <div class="flex flex-col gap-1">
                <div class="text-base font-medium text-gray-800 leading-relaxed">
                    {props.reviewTitle}
                </div>
                <div class="text-base font-normal text-slate-600 leading-relaxed">
                    {props.jobTitle}
                </div>
            </div>
        </div>
    </div>
);

const TestimonialsSection: Component = () => (
    <div class="w-full p-6 rounded-xl border border-slate-300 flex flex-col gap-5 bg-white">
        <div class="flex justify-start items-center">
            <h2 class="text-xl font-medium text-gray-900 leading-8">
                Testimonials
            </h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <For each={mockTestimonials}>
                {(testimonial) => <TestimonialCard {...testimonial} />}
            </For>
        </div>
    </div>
);

// The remaining sections (Certifications, Skills, Contact) are not fully present in the snippet but are inferred from the previous step.
// For a complete page, placeholder components are included to complete the layout structure.

const CertificationTag: Component<{ title: string }> = (props) => (
    <div class="px-4 py-1 rounded-3xl bg-amber-100 flex items-center justify-center">
        <div class="text-sm font-medium text-yellow-600 leading-relaxed">
            {props.title}
        </div>
    </div>
);

const SkillsSection: Component = () => (
    <div class="w-full lg:w-[320px] p-6 rounded-xl border border-slate-300 flex flex-col gap-5 bg-white">
        <div class="flex justify-between items-center">
            <h2 class="text-xl font-medium text-gray-900 leading-8">Skills</h2>
            <EditIcon />
        </div>
        <div class="flex flex-wrap gap-2">
            <CertificationTag title="Residential Wiring" />
            <CertificationTag title="Commercial Lighting" />
            <CertificationTag title="Fault Diagnosis" />
            <CertificationTag title="Panel Upgrades" />
        </div>
    </div>
);

const ContactDetailsSection: Component = () => (
    <div class="w-full lg:flex-1 p-6 rounded-xl border border-slate-300 flex flex-col gap-4 bg-white">
        <div class="flex items-center justify-between">
            <h2 class="text-xl font-medium text-gray-900 leading-8">
                Contact Details
            </h2>
            <EditIcon />
        </div>
        <div class="flex flex-col gap-2">
            <div class="flex items-center gap-2">
                <span class="text-lg font-normal text-slate-600 leading-7">
                    Email:
                </span>
                <span class="text-lg font-medium text-slate-600 leading-7">
                    info@pairprofit.com
                </span>
            </div>
            <div class="flex items-center gap-2">
                <span class="text-lg font-normal text-slate-600 leading-7">
                    Phone:
                </span>
                <span class="text-lg font-medium text-slate-600 leading-7">
                    015217086598
                </span>
            </div>
            <div class="flex items-start gap-2">
                <span class="text-lg font-normal text-slate-600 leading-7">
                    Address:
                </span>
                <span class="text-lg font-medium text-slate-600 leading-7">
                    No 2 Anidu str, Lagos
                </span>
            </div>
        </div>
    </div>
);

interface Certification {
    title: string;
    year: string;
}

const mockCertification: Certification[] = [
    {
        title: 'Electrical & Electronics School',
        year: '2019',
    },
    {
        title: 'Electrical & Electronics School',
        year: '2019',
    },
];

const CertificateSymbolIcon: Component = () => (
    <svg
        width="25"
        height="25"
        viewBox="0 0 25 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M11.646 7.523c.38-.683.57-1.023.854-1.023s.474.34.854 1.023l.098.176c.108.194.162.29.246.354.085.064.19.088.4.135l.19.044c.738.167 1.107.25 1.195.532s-.164.577-.667 1.165l-.13.152c-.143.167-.215.25-.247.354s-.021.215 0 .438l.02.203c.076.785.114 1.178-.115 1.352-.23.174-.576.015-1.267-.303l-.178-.082c-.197-.09-.295-.135-.399-.135s-.202.045-.399.135l-.178.082c-.691.319-1.037.477-1.267.303s-.191-.567-.115-1.352l.02-.203c.021-.223.032-.334 0-.438s-.104-.187-.247-.354l-.13-.152c-.503-.588-.755-.882-.667-1.165.088-.282.457-.365 1.195-.532l.19-.044c.21-.047.315-.07.4-.135.084-.064.138-.16.246-.354z"
            stroke="#000"
            stroke-width="2"
        />
        <path
            d="M19.5 9.5a7.001 7.001 0 0 1-11.95 4.95A7 7 0 1 1 19.5 9.5Z"
            stroke="#000"
            stroke-width="2"
        />
        <path
            d="m7.851 15.5-.637 2.323c-.628 2.292-.942 3.438-.523 4.065.147.22.344.396.573.513.652.332 1.66-.193 3.675-1.243.67-.35 1.006-.524 1.362-.562q.199-.02.398 0c.356.038.691.213 1.362.562 2.015 1.05 3.023 1.575 3.675 1.243.229-.117.426-.293.573-.513.42-.627.105-1.773-.523-4.065l-.637-2.323"
            stroke="#000"
            stroke-width="2"
            stroke-linecap="round"
        />
    </svg>
);

const CertificationCard: Component<Certification[]> = (props) => (
    // <div
    //     class="inline-flex flex-col justify-start items-start gap-5 p-6 h-full w-full max-w-md"
    //     style={{
    //         'border-radius': '12px',
    //         outline: '1px #CDD5DF solid',
    //         'outline-offset': '-0.50px',
    //     }}
    // >
    <div class="w-full lg:flex-1 p-6 rounded-xl border border-slate-300 flex flex-col gap-4 bg-white">
        {/* Header: Title and Icons */}
        <div class="self-stretch flex justify-between items-center">
            <div class="text-gray-900 text-xl font-medium leading-loose">
                Certifications
            </div>
            <div class="flex justify-start items-center gap-3">
                {/* Edit Icon */}
                <EditIcon />
                {/* More Icon */}
                <div class="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center p-2 cursor-pointer">
                    <i class="fa-solid fa-plus"></i>
                </div>
            </div>
        </div>

        {/* Content: Certificate Details */}
        <For each={props}>
            {(certificate) => (
                <div class="flex flex-col justify-start items-start gap-1">
                    <div class="self-stretch flex justify-start items-center gap-3">
                        <CertificateSymbolIcon />
                        <div class="text-gray-900 text-lg font-semibold leading-7">
                            {certificate.title}
                        </div>
                    </div>
                    <div class="self-stretch text-slate-600 text-sm font-normal leading-relaxed ml-9">
                        {certificate.year}
                    </div>
                </div>
            )}
        </For>
    </div>
);
// --- 4. Main Page Component (Assembly) ---

export const ProfessionalProfilePage: Component = () => {
    const [showProfilePreview, setProfilePreview] = createSignal(false);
    const [editProfileName, setProfileName] = createSignal(false);
    const [editProfileLanauge, setProfileLanguage] = createSignal(false);

    return (
        <Switch
            fallback={
                <div class="w-full flex flex-col gap-10 mx-auto p-4 sm:p-6">
                    {editProfileName() && (
                        <DisplayNameEditor setProfileName={setProfileName} />
                    )}
                    {editProfileLanauge() && (
                        <LanguagesEditor
                            setProfileLanguage={setProfileLanguage}
                        />
                    )}

                    <ProfileHeader
                        setProfilePreview={setProfilePreview}
                        setProfileName={setProfileName}
                        setProfileLanguage={setProfileLanguage}
                    />
                    <div class="flex flex-col gap-9">
                        {/* Profile Description Card */}
                        <InfoCard
                            title={mockProfile.title}
                            description={mockProfile.description}
                        />
                        {/* Portfolio Section */}
                        <PortfolioSection />
                        {/* Work History Section */}
                        <WorkHistorySection />
                        {/* Testimonials Section */}
                        <TestimonialsSection />
                        {/* Bottom Row: Skills & Contact Details (Layout change: Stack on mobile, side-by-side on large screens) */}
                        {/* <div class="flex flex-col lg:flex-row justify-start items-start gap-6"> */}
                        <div class="flex flex-col lg:flex-row justify-start items-start gap-6 mb-20">
                            {/* Note: I'm combining the inferred 'Certifications' into the Skills or Contact section for simplicity,
                         or leaving space for two distinct cards that are flexible in width. */}
                            <CertificationCard {...mockCertification} />
                            <SkillsSection />
                            <ContactDetailsSection />
                        </div>
                    </div>
                </div>
            }
        >
            <Match when={showProfilePreview()}>
                <ArtisanProfile setProfilePreview={setProfilePreview} />
            </Match>
        </Switch>
    );
};
