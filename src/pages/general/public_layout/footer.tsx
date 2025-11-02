import { Component, JSX } from 'solid-js';
import pairprofit_logo from './../../../assets/pairprofit.svg';

// Generic Social Icon Button (using placeholders for complex SVGs)
const SocialIcon: Component<{ iconSvg: JSX.Element }> = (props) => (
    <a
        href="#" // Placeholder link
        class="w-[39px] h-[39px] p-2 relative bg-[#1376A1] rounded-full flex justify-center items-center hover:bg-[#0E5B7C] transition-colors"
        aria-label="Social media link"
    >
        {props.iconSvg}
    </a>
);

// SVGs to match the general shape/purpose of the HTML structure
const PhoneIcon: Component = () => (
    <svg
        class="w-6 h-6"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M5 4H9L11 9L8.5 10.5C9.5 12.5 11.5 14.5 13.5 15.5L15 13L20 15L19 19C19 20.1046 18.1046 21 17 21C11.6667 21 5 14.3333 5 9C5 7.89543 5.89543 7 7 7L11 4V4Z"
            stroke="#FCFCFD"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
    </svg>
);

const GalleryIcon: Component = () => (
    <svg
        class="w-6 h-6"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <rect
            x="3"
            y="3"
            width="18"
            height="18"
            rx="2"
            stroke="#FCFCFD"
            stroke-width="1.5"
        />
        <circle cx="8.5" cy="8.5" r="1.5" stroke="#FCFCFD" stroke-width="1.5" />
        <path
            d="M21 15L16 10L5 21"
            stroke="#FCFCFD"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
    </svg>
);

const LocationIcon: Component = () => (
    <svg
        class="w-6 h-6"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M12 21C15.5 17 19 13.667 19 10C19 6.13401 15.866 3 12 3C8.13401 3 5 6.13401 5 10C5 13.667 8.5 17 12 21Z"
            stroke="#FCFCFD"
            stroke-width="1.5"
        />
        <circle cx="12" cy="10" r="3" stroke="#FCFCFD" stroke-width="1.5" />
    </svg>
);

const InstagramIcon: Component = () => (
    <svg
        class="w-6 h-6"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <rect
            x="2"
            y="2"
            width="20"
            height="20"
            rx="4"
            stroke="#FCFCFD"
            stroke-width="1.5"
        />
        <circle cx="12" cy="12" r="4" stroke="#FCFCFD" stroke-width="1.5" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="#FCFCFD" />
    </svg>
);

// --- Main Component ---

export const FooterSection: Component = () => (
    <footer
        class="w-full flex justify-center bg-white border-t border-[#E3E8EF] px-4 lg:px-[100px] py-16"
        data-property-1="Default"
    >
        <div class="w-full flex flex-col justify-start items-start gap-16">
            {/* Top Section: Logo & Links/Contact */}
            <div class="self-stretch flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12 lg:gap-16">
                {/* Left Side: Logo, Mission Statement, Socials */}
                <div class="flex-1 flex flex-col justify-start items-start gap-8 min-w-0">
                    <div class="flex flex-col justify-start items-start gap-6">
                        {/* Complex Logo Block */}
                        <div class="flex flex-col justify-center items-start gap-5">
                            <img src={pairprofit_logo} />
                        </div>

                        {/* Mission Statement */}
                        <p class="w-full max-w-xs text-base font-normal text-[#364152] leading-relaxed">
                            We connect you to professional artisans world-wide
                            easily and fund secured
                        </p>
                    </div>

                    {/* Social Icons */}
                    <div class="flex justify-start items-center gap-3.5">
                        <SocialIcon iconSvg={<PhoneIcon />} />
                        <SocialIcon iconSvg={<GalleryIcon />} />
                        <SocialIcon iconSvg={<LocationIcon />} />
                        <SocialIcon iconSvg={<InstagramIcon />} />
                    </div>
                </div>

                {/* Right Side: Links and Contact Info */}
                {/* Right side aligns content to the end on desktop, left on mobile */}
                <div class="flex flex-col justify-start items-start lg:items-end gap-8">
                    {/* Legal/Utility Links */}
                    <nav class="flex flex-wrap justify-start items-center gap-4 lg:gap-6 text-base font-medium">
                        <a
                            href="#"
                            class="text-[#0D121C] hover:text-[#1376A1] transition-colors"
                        >
                            Become an Artisan
                        </a>
                        <span class="text-[#4B5565] font-normal hidden sm:block">
                            |
                        </span>
                        <a
                            href="#"
                            class="text-[#0D121C] hover:text-[#1376A1] transition-colors"
                        >
                            Privacy Policy
                        </a>
                        <span class="text-[#4B5565] font-normal hidden sm:block">
                            |
                        </span>
                        <a
                            href="#"
                            class="text-[#0D121C] hover:text-[#1376A1] transition-colors"
                        >
                            Terms & Conditions
                        </a>
                        <span class="text-[#4B5565] font-normal hidden sm:block">
                            |
                        </span>
                        <a
                            href="/contact"
                            class="text-[#0D121C] hover:text-[#1376A1] transition-colors"
                        >
                            Contact Us
                        </a>
                    </nav>

                    {/* Contact Info */}
                    <div class="flex flex-wrap justify-start items-center gap-4 lg:gap-6 text-base">
                        <div class="flex justify-start items-center gap-2">
                            <span class="text-[#4B5565] font-medium">
                                Phone contact:
                            </span>
                            <a
                                href="tel:+491234567890"
                                class="text-[#1376A1] font-medium hover:underline"
                            >
                                +49 123 4567 890
                            </a>
                        </div>
                        <span class="text-[#4B5565] font-normal hidden sm:block">
                            |
                        </span>
                        <div class="flex justify-start items-center gap-2">
                            <span class="text-[#4B5565] font-medium">
                                Email us:
                            </span>
                            <a
                                href="mailto:support@Pairprofit.com"
                                class="text-[#1376A1] font-medium hover:underline"
                            >
                                support@Pairprofit.com
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Section: Copyright */}
            <div class="self-stretch pt-3 pb-3 border-t border-[#E3E8EF] flex justify-start items-center gap-8">
                <div class="text-[#5D6B78] text-base font-normal leading-relaxed">
                    @PairProfit Platform. All rights reserved
                </div>
            </div>
        </div>
    </footer>
);
