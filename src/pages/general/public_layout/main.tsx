import { Component, createEffect } from 'solid-js';
import { Header } from './header';
import { FooterSection } from './footer';
import { JoinHomeServicesCTA } from './join';
import { useAppContext } from '../../../state';

export const PublicLayout: Component = (props: any) => {
    const {
        public: { currentContent },
    } = useAppContext();

    createEffect(
        (prev) => {
            if (currentContent() !== prev && currentContent()) {
                console.log(currentContent(), 'currentContentcurrentContent');
            }
        },
        [currentContent()]
    );

    return (
        <div class="w-full min-h-screen bg-white font-sans flex flex-col items-center">
            <Header />

            <main class="w-full flex flex-col items-center">
                {props.children}
                <JoinHomeServicesCTA currentContent={currentContent} />
                <FooterSection />
            </main>
        </div>
    );
};
