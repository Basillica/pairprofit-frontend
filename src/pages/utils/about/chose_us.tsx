import { Component, For, JSX } from 'solid-js';
import choose_us from './../../../assets/general/choose_us.svg';

// --- Data Structure ---
interface Feature {
    title: string;
    description: string;
    // Icon components are represented by a background color and a placeholder SVG
    iconBgColor: string;
    iconPlaceholder: JSX.Element;
}

// Icon SVG placeholders based on the provided wireframes
// The icons are outlines on colored circles.

const WideRangeIcon: JSX.Element = (
    <svg
        width="24"
        height="23"
        viewBox="0 0 24 23"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M11.333 14v3.333q0 .286.191.476.19.19.476.191.285 0 .476-.19a.65.65 0 0 0 .19-.477V14H16q.285 0 .476-.19a.65.65 0 0 0 .19-.477.65.65 0 0 0-.19-.476.65.65 0 0 0-.476-.19h-3.333V9.333A.65.65 0 0 0 12 8.667a.653.653 0 0 0-.667.666v3.334H8a.65.65 0 0 0-.667.666A.653.653 0 0 0 8 14zm-9.178 8.667q-.922 0-1.538-.616-.615-.616-.617-1.538V6.153q0-.92.617-1.536.618-.615 1.536-.617H8V2.153q0-.92.617-1.537.617-.618 1.538-.616h3.692q.92 0 1.537.616.618.616.616 1.537V4h5.847q.92 0 1.536.617.615.617.617 1.538v14.358q0 .92-.617 1.538-.618.617-1.536.616zm0-1.334h19.692q.306 0 .564-.256t.256-.565V6.155q0-.309-.256-.566-.257-.257-.564-.256H2.153q-.306 0-.564.256-.257.257-.256.566v14.358q0 .307.256.564.256.258.564.256M9.333 4h5.334V2.153q0-.306-.256-.564t-.564-.256h-3.694q-.306 0-.564.256t-.256.564z"
            fill="#0E0D13"
        />
    </svg>
);

const VerifiedIcon: JSX.Element = (
    <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M14.676 28h-1.87c-4.78 0-7.169 0-8.654-1.514-1.485-1.513-1.485-3.948-1.485-8.82 0-4.87 0-7.306 1.485-8.82 1.485-1.513 3.875-1.513 8.655-1.513h5.07c4.78 0 7.171 0 8.656 1.513 1.143 1.164 1.406 2.875 1.467 5.82"
            stroke="#fff"
            stroke-width="1.5"
            stroke-linecap="round"
        />
        <path
            d="M21.333 7.333 21.2 6.92c-.66-2.053-.99-3.08-1.775-3.667-.786-.586-1.829-.586-3.918-.586h-.351c-2.087 0-3.13 0-3.916.586-.787.587-1.116 1.614-1.776 3.667l-.13.413m13.48 10.34c.247-.226.37-.34.52-.34.149 0 .271.114.518.34l.95.876c.115.105.173.159.243.184.072.027.15.024.307.017l1.283-.05c.33-.014.496-.019.609.076s.136.259.18.587l.176 1.314c.021.152.03.227.068.294.037.064.097.11.217.205l1.035.813c.256.203.384.303.41.447s-.062.282-.233.56l-.701 1.13c-.08.128-.12.194-.133.266s.002.148.034.297l.279 1.304c.067.32.101.48.028.608s-.23.179-.54.28l-1.235.401c-.146.049-.221.073-.278.12-.058.05-.094.12-.164.256l-.603 1.162c-.153.297-.23.445-.37.496s-.294-.014-.603-.142l-1.184-.49c-.146-.06-.218-.09-.294-.09s-.148.03-.293.09l-1.184.49c-.31.128-.463.192-.603.142s-.217-.2-.37-.496l-.603-1.162c-.072-.137-.107-.206-.164-.254s-.132-.073-.279-.12l-1.234-.403c-.311-.101-.467-.152-.54-.28s-.04-.287.028-.608l.28-1.304c.03-.15.046-.224.033-.296a.8.8 0 0 0-.133-.267l-.7-1.13c-.174-.277-.259-.416-.234-.56.026-.144.154-.244.41-.445l1.034-.814c.12-.096.18-.142.218-.208.037-.065.046-.14.066-.293l.178-1.313c.044-.327.066-.492.18-.587s.278-.09.609-.076l1.284.05c.156.007.233.01.305-.017s.128-.079.243-.184z"
            stroke="#fff"
            stroke-width="1.5"
        />
    </svg>
);

const BookingIcon: JSX.Element = (
    <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M26.53 21.333h-16c-1.24 0-1.86 0-2.369.136a4 4 0 0 0-2.828 2.83"
            stroke="#fff"
            stroke-width="1.5"
        />
        <path
            d="M10.667 9.333h10.666M10.667 14h6.666m-4 15.333c-3.77 0-5.657 0-6.828-1.172-1.172-1.17-1.172-3.057-1.172-6.828V10.667c0-3.771 0-5.658 1.172-6.828 1.171-1.172 3.058-1.172 6.828-1.172h5.334c3.77 0 5.657 0 6.828 1.172 1.172 1.17 1.172 3.057 1.172 6.827m-8 18.667c3.77 0 5.657 0 6.828-1.172 1.172-1.17 1.172-3.057 1.172-6.828V16"
            stroke="#fff"
            stroke-width="1.5"
            stroke-linecap="round"
        />
    </svg>
);

const SupportIcon: JSX.Element = (
    <svg
        width="20"
        height="28"
        viewBox="0 0 20 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M10 21.997a3 3 0 0 1-2.948-2.44 10 10 0 0 1-6.855-7.594 10 10 0 1 1 19.755-2.964c.054.55-.4.998-.952.998s-.994-.45-1.06-.998a8 8 0 1 0-10.57 8.556A3 3 0 1 1 10 21.997m-8-3v-.054a12 12 0 0 1-1.496-1.61A3 3 0 0 0 0 18.997v1c0 3.942 3.72 8 10 8s10-4.058 10-8v-1a3 3 0 0 0-3-3h-3c.438.58.75 1.26.9 2H17a1 1 0 0 1 1 1v1c0 2.876-2.864 6-8 6s-8-3.124-8-6zm8-5a5 5 0 0 0-3.144 1.112A5.98 5.98 0 0 1 4 9.997a6 6 0 1 1 9.144 5.112A5 5 0 0 0 10 13.997m-4-4a4 4 0 1 0 8 0 4 4 0 0 0-8 0"
            fill="#E3E8EF"
        />
    </svg>
);

const FEATURES_DATA: Feature[] = [
    {
        title: 'Wide Rage of Services',
        description:
            'From home services to tech support, find experts for every need.',
        iconBgColor: 'bg-[#FBBC05]',
        iconPlaceholder: WideRangeIcon,
    },
    {
        title: 'Verified Professionals',
        description:
            'We ensure all service providers are vetted for quality and reliability.',
        iconBgColor: 'bg-[#9E07DF]',
        iconPlaceholder: VerifiedIcon,
    },
    {
        title: 'Easy Booking',
        description:
            'Find and book services with just a few clicks, hassle free.',
        iconBgColor: 'bg-[#293CB5]',
        iconPlaceholder: BookingIcon,
    },
    {
        title: 'Dedicated Support',
        description: 'Our team is here to assist you every step of the way.',
        iconBgColor: 'bg-[#34A853]',
        iconPlaceholder: SupportIcon,
    },
];

const FeatureCard: Component<Feature & { isFirst: boolean }> = (props) => (
    // Card Container: flex-1 ensures equal width on desktop, padding matches HTML.
    // Conditional border-l ensures separation only from tablet/desktop screens onward,
    // and skips the first card.
    <div
        classList={{
            'flex-1 w-full lg:w-auto p-6 md:p-6 lg:p-6 bg-white flex flex-col justify-start items-start gap-8':
                true,
            'lg:border-l border-[#E3E8EF]': !props.isFirst,
        }}
    >
        {/* Icon */}
        <div
            class={`w-[60px] h-[60px] ${props.iconBgColor} shadow-lg rounded-full flex items-center justify-center p-2`}
        >
            {props.iconPlaceholder}
        </div>

        {/* Content */}
        <div class="self-stretch flex flex-col justify-start items-start gap-4">
            <div class="self-stretch text-2xl font-semibold text-[#0D121C] leading-loose">
                {props.title}
            </div>
            <p class="self-stretch text-lg font-normal text-[#4B5565] leading-relaxed">
                {props.description}
            </p>
        </div>
    </div>
);

// --- Main Component ---
export const WhyChoosePairProfitSection: Component = () => (
    <section class="w-full flex justify-center px-4 md:px-16 lg:px-[100px] py-16 md:py-24 lg:py-[100px] bg-white">
        <div class="w-full flex flex-col justify-start items-start gap-16">
            {/* Title */}
            <h2 class="text-3xl sm:text-4xl md:text-[48px] font-semibold text-[#0D121C] leading-tight md:leading-[64px] capitalize">
                Why Choose PairProfit
            </h2>

            {/* Image and Features Block */}
            <div class="self-stretch flex flex-col justify-start items-start w-full border border-transparent">
                {/* Image */}
                <img
                    class="w-full h-auto object-cover rounded-xl lg:rounded-b-none"
                    src={choose_us}
                    alt="Platform screenshot showcasing features"
                />

                {/* Features Row Container */}
                <div class="self-stretch p-4 md:p-6 lg:px-6 lg:py-10 bg-white border-t border-[#E2E6E9] flex flex-col lg:flex-row justify-start items-start gap-6 lg:gap-4 w-full">
                    <For each={FEATURES_DATA}>
                        {(feature, index) => (
                            <FeatureCard {...feature} isFirst={index() === 0} />
                        )}
                    </For>
                </div>
            </div>
        </div>
    </section>
);
