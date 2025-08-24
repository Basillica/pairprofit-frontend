import { createSignal, For } from 'solid-js';

// Define types for better type safety
type Plan = {
    name: string;
    description: string;
    priceMonthly: string;
    priceAnnual?: string;
    features: string[];
    buttonText: string;
};

type FAQ = {
    question: string;
    answer: string;
};

const plans: Plan[] = [
    {
        name: 'Starter',
        description: 'Perfect for individuals and small teams.',
        priceMonthly: '$19',
        priceAnnual: '$15',
        features: [
            '5 Projects',
            'Unlimited Users',
            'Basic Analytics',
            'Standard Support',
        ],
        buttonText: 'Get Started',
    },
    {
        name: 'Pro',
        description: 'Everything you need for a growing business.',
        priceMonthly: '$49',
        priceAnnual: '$39',
        features: [
            '**Unlimited Projects**',
            'Advanced Analytics',
            'Custom Integrations',
            '24/7 Priority Support',
        ],
        buttonText: 'Choose Pro',
    },
    {
        name: 'Enterprise',
        description: 'Custom solutions for large organizations.',
        priceMonthly: 'Custom',
        features: [
            'Dedicated Account Manager',
            'Single Sign-On (SSO)',
            'Custom Security & Compliance',
            'On-premise Hosting',
        ],
        buttonText: 'Contact Sales',
    },
];

const faqs: FAQ[] = [
    {
        question: 'Can I change my plan later?',
        answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes will be prorated on your next bill.',
    },
    {
        question: 'Do you offer refunds?',
        answer: 'We do not offer refunds, but you can cancel your subscription at any time to prevent future charges.',
    },
    {
        question: 'Is my data secure?',
        answer: 'Yes, we use industry-standard security practices to protect your data, including encryption and regular security audits.',
    },
    {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards, including Visa, Mastercard, and American Express.',
    },
];

export const PricingPage = () => {
    const [isMonthly, setIsMonthly] = createSignal<boolean>(true);
    const [activeFAQIndex, setActiveFAQIndex] = createSignal<number | null>(
        null
    );

    const checkmarkSVG = (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="mr-2 text-green-500"
        >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-8.6"></path>
            <path d="M22 4L12 14.01l-3-3"></path>
        </svg>
    );

    return (
        <div class="bg-gray-50 font-sans text-gray-800">
            <div class="container mx-auto max-w-7xl px-4 py-16 text-center">
                <header class="mb-16">
                    <h1 class="text-5xl font-bold text-gray-900 mb-4">
                        Simple, Transparent Pricing
                    </h1>
                    <p class="text-xl text-gray-500 max-w-3xl mx-auto">
                        Choose a plan that fits your needs. Start free, then
                        upgrade as you grow.
                    </p>
                </header>

                <div class="inline-flex items-center p-1 rounded-full bg-gray-200 mb-8">
                    <span
                        class={`px-5 py-2.5 rounded-full cursor-pointer font-semibold transition-all duration-300 ${
                            isMonthly()
                                ? 'bg-blue-600 text-white shadow-lg'
                                : 'text-gray-700'
                        }`}
                        onClick={() => setIsMonthly(true)}
                    >
                        Monthly
                    </span>
                    <span
                        class={`px-5 py-2.5 rounded-full cursor-pointer font-semibold transition-all duration-300 ${
                            !isMonthly()
                                ? 'bg-blue-600 text-white shadow-lg'
                                : 'text-gray-700'
                        }`}
                        onClick={() => setIsMonthly(false)}
                    >
                        Annual{' '}
                        <span class="text-green-300 font-normal">
                            (20% off)
                        </span>
                    </span>
                </div>

                <section class="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                    <For each={plans}>
                        {(plan) => (
                            <div class="bg-white p-10 rounded-xl shadow-lg flex flex-col justify-between transition-transform transform hover:-translate-y-2 hover:shadow-2xl">
                                <div>
                                    <h3 class="text-3xl font-bold text-gray-900 mb-2">
                                        {plan.name}
                                    </h3>
                                    <p class="text-gray-500 mb-4">
                                        {plan.description}
                                    </p>
                                    <div class="mb-4">
                                        {plan.priceAnnual ? (
                                            <p class="text-6xl font-bold text-blue-600">
                                                {isMonthly()
                                                    ? plan.priceMonthly
                                                    : plan.priceAnnual}
                                                <small class="text-lg font-normal text-gray-500">
                                                    {isMonthly()
                                                        ? '/mo'
                                                        : '/yr'}
                                                </small>
                                            </p>
                                        ) : (
                                            <p class="text-5xl font-bold text-gray-900">
                                                Custom
                                            </p>
                                        )}
                                    </div>
                                    <ul class="list-none p-0 m-0">
                                        <For each={plan.features}>
                                            {(feature) => (
                                                <li class="flex items-center mb-2">
                                                    {checkmarkSVG} {feature}
                                                </li>
                                            )}
                                        </For>
                                    </ul>
                                </div>
                                <a
                                    href="#"
                                    class={`mt-8 w-full block text-center py-3 rounded-lg font-semibold transition-colors duration-300 
                                ${
                                    plan.buttonText === 'Choose Pro'
                                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                                }`}
                                >
                                    {plan.buttonText}
                                </a>
                            </div>
                        )}
                    </For>
                </section>

                <section class="mt-20 text-center">
                    <h2 class="text-4xl font-bold text-gray-900 mb-10">
                        Frequently Asked Questions
                    </h2>
                    <div class="max-w-4xl mx-auto text-left divide-y divide-gray-200">
                        <For each={faqs}>
                            {(faq, index) => (
                                <div
                                    class="py-6 cursor-pointer"
                                    onClick={() =>
                                        setActiveFAQIndex(
                                            activeFAQIndex() === index()
                                                ? null
                                                : index()
                                        )
                                    }
                                >
                                    <h4 class="text-lg font-semibold flex justify-between items-center text-gray-700">
                                        {faq.question}
                                    </h4>
                                    <div
                                        class={`overflow-hidden transition-all duration-300 ease-in-out ${
                                            activeFAQIndex() === index()
                                                ? 'max-h-40 pt-4'
                                                : 'max-h-0'
                                        }`}
                                    >
                                        <p class="text-gray-600">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </For>
                    </div>
                </section>
            </div>
        </div>
    );
};
