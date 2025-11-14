import { Component, JSX } from 'solid-js';
import artisan_images from './../../../assets/profiles/artisans.png';

export const JoinHomeServicesCTA: Component<{
    currentContent: () => JSX.Element;
}> = (props) => {
    return (
        <section class="w-full flex justify-center px-4 md:px-16 lg:px-[100px] py-16 bg-white">
            <div class="w-full">
                {/* Dark Container */}
                <div class="self-stretch bg-[#041820] overflow-hidden rounded-3xl flex flex-col lg:flex-row justify-start items-center gap-8 lg:gap-0 w-full">
                    {/* Left Column: Text and Buttons */}
                    <div class="flex-1 p-8 md:p-12 lg:p-12 xl:p-16 flex flex-col justify-start items-start gap-8 lg:gap-10 xl:gap-12 w-full lg:w-1/2">
                        {/* Text Block */}
                        <div class="self-stretch flex flex-col justify-center items-start gap-4">
                            {props.currentContent()}
                            <div class="self-stretch flex justify-start items-center">
                                <p class="flex-1 text-lg font-medium text-[#FCFCFD] leading-relaxed">
                                    Whether you’re a homeowner or an artisan,
                                    there’s a place for you at PairProfit
                                </p>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div class="flex flex-wrap justify-start items-center gap-3">
                            <a
                                class="px-4 py-3 bg-[#1376A1] rounded-lg text-base font-semibold text-white hover:bg-[#0E5B7C] transition-colors flex-shrink-0 cursor-pointer"
                                aria-label={'Find Artisans'}
                                href="/login?type=client"
                            >
                                {'Find Artisans'}
                            </a>
                            <a
                                class="px-4 py-3 rounded-lg border border-[#1376A1] text-base font-semibold text-[#1376A1] hover:bg-[#1376A1]/10 transition-colors flex-shrink-0 cursor-pointer"
                                aria-label={'Become a provider'}
                                href="/login?type=artisan"
                            >
                                {'Become a provider'}
                            </a>
                        </div>
                    </div>

                    {/* Right Column: Images */}
                    <div style="align-self: stretch; align-self: stretch; padding-top: 32px; justify-content: flex-start; align-items: center; display: inline-flex">
                        <img
                            src={artisan_images}
                            alt="Service demonstration image 2"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};
