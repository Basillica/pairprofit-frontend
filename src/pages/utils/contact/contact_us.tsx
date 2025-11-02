import { Component } from 'solid-js';

export const ContactUsHeader: Component = () => (
    <section class="w-full flex justify-center px-4 md:px-16 lg:px-[100px] py-16 md:py-24 lg:py-[64px] bg-[#041820]">
        <div class="w-full flex flex-col justify-center items-center gap-12 md:gap-16">
            {/* Header Block */}
            <div class="flex flex-col justify-start items-center gap-3">
                {/* Tag */}
                <div class="p-1 rounded-lg flex justify-center items-center gap-2">
                    <div class="text-2xl font-semibold text-[#E3E8EF] leading-loose">
                        |
                    </div>
                    <div class="text-xl font-medium text-[#E3E8EF] tracking-wider uppercase">
                        CONTACT US
                    </div>
                </div>

                {/* Title and Subtitle */}
                <div class="flex flex-col justify-center items-center gap-3">
                    {/* Title */}
                    <h2 class="text-4xl sm:text-5xl md:text-[48px] font-extrabold text-[#FCFCFD] leading-tight text-center capitalize">
                        Get In touch
                    </h2>
                    {/* Subtitle */}
                    <p class="text-lg md:text-xl font-normal text-[#EEF2F6] leading-relaxed text-center">
                        Your safety and satisfaction are our top priorities
                    </p>
                </div>
            </div>
        </div>
    </section>
);
