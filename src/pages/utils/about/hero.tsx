import { Component } from 'solid-js';
import about_us_1 from './../../../assets/general/about_us_1.svg';
import about_us_2 from './../../../assets/general/about_us_2.svg';
import about_us_3 from './../../../assets/general/about_us_3.svg';
import about_us_4 from './../../../assets/general/about_us_4.svg';

// --- Sub-Components (Utilities) ---

const SectionHeader: Component<{ category: string; title: string }> = (
    props
) => (
    <div class="flex flex-col justify-start items-start gap-6">
        {/* Category Tag */}
        <div class="p-1 rounded-lg flex justify-center items-center gap-2">
            <div class="text-2xl font-semibold text-[#0F322E] leading-loose">
                |
            </div>
            <div class="text-xl font-medium text-[#0F322E] tracking-wider uppercase">
                {props.category}
            </div>
        </div>

        {/* Title */}
        <h2 class="text-4xl sm:text-5xl md:text-[48px] font-bold text-[#0E0D13] leading-tight capitalize">
            {props.title}
        </h2>
    </div>
);

// --- Main Component ---

export const AboutUsSection: Component = () => (
    <section
        class="w-full flex justify-center px-4 md:px-16 lg:px-[100px] pt-16 md:pt-24 pb-16 md:pb-24 lg:pb-[100px]"
        // Background Gradient: linear-gradient(148deg, rgba(26, 122, 160, 0.11) 0%, rgba(20, 119, 161, 0.18) 100%)
        style="background: linear-gradient(148deg, rgba(26, 122, 160, 0.11) 0%, rgba(20, 119, 161, 0.18) 100%);"
    >
        <div class="w-full flex flex-col lg:flex-row justify-center items-start gap-12 lg:gap-16 xl:gap-24">
            {/* Left Column: Text Content */}
            <div class="flex-1 flex flex-col justify-start items-start gap-8 md:gap-10 min-w-0">
                <SectionHeader
                    category="ABOUT US"
                    title="Cultivating a Space where Businesses Bloom"
                />

                <div class="self-stretch flex flex-col justify-center items-start gap-8">
                    {/* Sub-Header */}
                    <div class="flex flex-col justify-start items-start gap-4">
                        <div class="p-1 rounded-lg flex justify-center items-center gap-2">
                            <div class="text-2xl font-semibold text-[#0F322E] leading-loose">
                                |
                            </div>
                            <div class="text-xl font-medium text-[#0F322E] tracking-wider">
                                Things we tell everyone
                            </div>
                        </div>
                    </div>

                    {/* Paragraph 1 */}
                    <p class="text-lg md:text-xl font-normal text-[#4B5565] leading-8 md:leading-loose">
                        We strive to build a community founded on{' '}
                        <b>trust, transparency, and excellent service</b>. Our
                        platform simplifies the process of hiring and getting
                        hired, ensuring a smooth experience for both customers
                        and artisans.
                    </p>

                    {/* Paragraph 2 */}
                    <p class="text-lg md:text-xl font-normal text-[#4B5565] leading-8 md:leading-loose">
                        At PairProfit, we believe in{' '}
                        <b>empowering local talent</b>
                        and making quality service accessible to everyone. We
                        connect individuals and business with skilled to local
                        artisans and earn with what they know best.
                    </p>
                </div>
            </div>

            {/* Right Column: Image Grid */}
            <div class="flex-1 w-full flex justify-center items-center h-full min-h-[300px] lg:min-h-[521px] gap-4 md:gap-6">
                {/* Image 1 (Left Vertical) */}
                <img
                    class="w-[30%] lg:w-[203px] h-auto object-cover rounded-xl self-stretch"
                    src={about_us_1}
                    alt="Artisan working"
                />

                {/* Image Stack (Middle Two) */}
                <div class="flex flex-col w-[30%] h-full justify-center items-center gap-4 md:gap-6">
                    {/* Image 2 (Top Square/Rectangle) */}
                    <img
                        class="w-full h-auto object-cover rounded-xl"
                        src={about_us_2}
                        alt="Project in progress"
                    />
                    {/* Image 3 (Bottom Square/Rectangle) */}
                    <img
                        class="w-full h-auto object-cover rounded-xl"
                        src={about_us_3}
                        alt="Happy customer"
                    />
                </div>

                {/* Image 4 (Right Vertical) - Hidden on small screens to prevent crowding */}
                <img
                    class="w-[30%] lg:w-[168px] h-auto object-cover rounded-xl self-stretch hidden sm:block"
                    src={about_us_4}
                    alt="Tool closeup"
                />
            </div>
        </div>
    </section>
);
