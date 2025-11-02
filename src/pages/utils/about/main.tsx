import { Component, onMount } from 'solid-js';
import { AboutUsSection } from './hero';
import { MetricsSection } from './metrics';
import { OurValuesSection } from './values';
import { DoMoreWithUsSection } from './do_more';
import { FaqSection } from './faq';
import { JoinAsArtisansSection } from './join_us';
import { WhyChoosePairProfitSection } from './chose_us';
import { useAppContext } from '../../../state';

export const AboutPage: Component = () => {
    const {
        public: { setCurrentContent },
    } = useAppContext();
    onMount(() => {
        setCurrentContent(
            <h2 class="text-4xl sm:text-5xl md:text-[48px] font-bold text-[#FCFCFD] leading-tight capitalize">
                Join us in transforming <br class="hidden sm:block" />
                Home services
            </h2>
        );
    });

    return (
        <main class="w-full flex flex-col items-center">
            <AboutUsSection />
            <MetricsSection />
            <OurValuesSection />
            <DoMoreWithUsSection />
            <FaqSection />
            <JoinAsArtisansSection />
            <WhyChoosePairProfitSection />
        </main>
    );
};
