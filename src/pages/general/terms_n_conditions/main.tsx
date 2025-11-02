import { Component, onMount } from 'solid-js';
import { useAppContext } from '../../../state';
import { TermsAndConditionsHeader } from './terms';
import { LegalContentLayout } from './content';

export const TermsNConditionsPage: Component = () => {
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
            <TermsAndConditionsHeader />
            <LegalContentLayout />
        </main>
    );
};
