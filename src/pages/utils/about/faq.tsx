import { Component, For, JSX, createSignal } from 'solid-js';

// --- Data Structure ---
interface Faq {
    id: number;
    question: string;
    answer: JSX.Element;
}

// JSX for the complex answers (using Solid's JSX type)
const Answer1: JSX.Element = (
    <p class="text-xl font-normal text-[#E3E8EF] leading-loose">
        Posting a services request as a customer is completely free. **Artisans
        pay a small service fee** on completed jobs or a subscription fee for
        premium features which helps us maintain and improve the platforms.
    </p>
);

const Answer2: JSX.Element = (
    <p class="text-xl font-normal text-[#E3E8EF] leading-loose">
        Our platform uses **escrow services** to ensure secure payments.
        Customers fund the job upfront, and the payment is released to the
        artisan only after the customer confirms the job is completed to
        satisfaction.
    </p>
);

const Answer3: JSX.Element = (
    <p class="text-xl font-normal text-[#E3E8EF] leading-loose">
        We encourage open communication between customers and artisans. If
        issues arise, try to resolve them directly. If a resolution isn't found,
        our dispute resolution team can mediate. Please refer to our{' '}
        <a
            href="#"
            class="text-[#1376A1] font-medium underline hover:text-[#0E5B7C] transition-colors"
        >
            Dispute Resolution Policy
        </a>{' '}
        for more details.
    </p>
);

const Answer4: JSX.Element = (
    <p class="text-xl font-normal text-[#E3E8EF] leading-loose">
        To increase your chances, ensure your profile is complete with detailed
        services, a **strong portfolio**, and **competitive pricing**. Prompt
        communication and excellent reviews for completed jobs significantly
        boost your visibility and trustworthiness.
    </p>
);

const Answer5: JSX.Element = (
    <p class="text-xl font-normal text-[#E3E8EF] leading-loose">
        Customers can cancel a request before accepting a proposal. Once a
        proposal is accepted, cancellation terms depend on the agreement and our{' '}
        <a
            href="#"
            class="text-[#1376A1] font-medium underline hover:text-[#0E5B7C] transition-colors"
        >
            Cancellation Policy
        </a>
        . Artisans can also decline or cancel jobs under certain circumstances.
    </p>
);

const FAQS_DATA: Faq[] = [
    { id: 1, question: 'Is PairProfit free to use?', answer: Answer1 },
    { id: 2, question: 'How do payment work?', answer: Answer2 },
    {
        id: 3,
        question: 'What if I’m not satisfied with the services?',
        answer: Answer3,
    },
    {
        id: 4,
        question: 'How can I get more jobs as artisans?',
        answer: Answer4,
    },
    {
        id: 5,
        question: 'What if I need to cancel a service request?',
        answer: Answer5,
    },
];

// --- Sub-Components (Accordion Item) ---

// Icon: Plus/Minus for expansion/collapse
const ToggleIcon: Component<{ isOpen: boolean }> = (props) => (
    <div class="relative w-9 h-9 bg-[#093B50] rounded-full flex items-center justify-center flex-shrink-0">
        <svg
            class="w-4 h-4 transition-transform duration-300"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Horizontal line (always visible) */}
            <path
                d="M4 12H20"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
            />
            {/* Vertical line (hidden when open, visible when closed) */}
            <path
                d="M12 4V20"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                classList={{ hidden: props.isOpen }}
            />
        </svg>
    </div>
);

const FaqItem: Component<{ faq: Faq }> = (props) => {
    const [isOpen, setIsOpen] = createSignal(false);

    const toggleOpen = () => setIsOpen(!isOpen());

    return (
        <div
            class="self-stretch p-6 border-b border-[#697586] cursor-pointer transition-all duration-300"
            onClick={toggleOpen}
        >
            <div class="flex justify-between items-center gap-8">
                {/* Question */}
                <div class="flex-1 flex flex-col justify-center items-start">
                    <div class="text-xl md:text-2xl font-semibold text-white leading-relaxed md:leading-loose">
                        {props.faq.question}
                    </div>
                </div>

                {/* Icon */}
                <ToggleIcon isOpen={isOpen()} />
            </div>

            {/* Answer (Collapsible Content) */}
            <div
                class="overflow-hidden transition-all duration-300"
                style={{
                    'max-height': isOpen() ? '300px' : '0', // Adjust max-height if content is much longer
                    'padding-top': isOpen() ? '16px' : '0',
                }}
            >
                {props.faq.answer}
            </div>
        </div>
    );
};

// --- Main Component ---

export const FaqSection: Component = () => (
    <section class="w-full flex justify-center px-4 md:px-16 lg:px-[100px] py-16 md:py-24 lg:py-[100px] bg-white">
        <div class="w-full">
            {/* Inner Dark Container */}
            <div class="self-stretch p-8 md:p-12 lg:p-16 xl:px-12 bg-[#041820] overflow-hidden rounded-[48px] flex flex-col justify-start items-center gap-16">
                {/* Header Block */}
                <div class="self-stretch flex flex-col justify-center items-center gap-3">
                    {/* Tag */}
                    <div class="p-1 rounded-lg flex justify-center items-center gap-2">
                        <div class="text-2xl font-semibold text-[#E3E8EF] leading-loose">
                            |
                        </div>
                        <div class="text-xl font-medium text-[#E3E8EF] tracking-wider uppercase">
                            FAQ’S
                        </div>
                    </div>
                    {/* Title */}
                    <h2 class="text-3xl sm:text-4xl md:text-[48px] font-semibold text-white leading-tight text-center capitalize">
                        Curios about how to Start?
                    </h2>
                </div>

                {/* FAQ Items */}
                <div class="self-stretch flex flex-col justify-start items-start gap-0">
                    <For each={FAQS_DATA}>{(faq) => <FaqItem faq={faq} />}</For>
                </div>

                {/* Footer Button/Link */}
                <div class="px-6 py-4 rounded-lg flex justify-center items-center gap-2 cursor-pointer hover:bg-white/10 transition-colors">
                    <div class="text-xl font-semibold text-white leading-loose text-center">
                        Show less questions
                    </div>
                    {/* Placeholder for an Up-Arrow icon */}
                    <svg
                        class="w-5 h-5 text-white transform rotate-180"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M17 14L12 9L7 14"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                </div>
            </div>
        </div>
    </section>
);
