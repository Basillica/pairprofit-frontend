import { Component, onMount } from 'solid-js';
import { ContactUsHeader } from './contact_us';
import { ContactSupportForm } from './contact_form';
import { useAppContext } from '../../../state';

// Combine all components into the final landing page
export const ContactPage: Component = () => {
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
            <ContactUsHeader />
            <ContactSupportForm />
        </main>
    );
};
