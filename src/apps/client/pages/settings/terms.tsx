const LegalText = () => (
    <div class="text-sm text-[#1376A1] space-y-4">
        <p>
            <strong>Last Updated: October 22, 2025</strong>
        </p>
        <p>
            Welcome to PairProfit. By using our services, you agree to these
            Terms and Conditions. Please read them carefully. These terms cover
            your use and access to our products, services, and website
            (collectively, the "Services").
        </p>
        <p>
            <b>1. Service Use:</b> Our Services are intended for business use
            and professional data management. You agree not to misuse the
            Services. For example, you must not interfere with our Services or
            try to access them using a method other than the interface and the
            instructions that we provide.
        </p>
        <p>
            <b>2. Account Security:</b> You are responsible for safeguarding the
            password that you use to access the Services and for any activities
            or actions under your password. PairProfit encourages you to use
            "strong" passwords (passwords that use a combination of upper and
            lower case letters, numbers and symbols) with your account.
        </p>
        <p>
            <b>3. Termination:</b> We may suspend or terminate your access to
            the Services at any time, for any reason, without notice. Upon
            termination, you continue to be bound by Sections 2 and 4 of these
            Terms.
        </p>
    </div>
);

export const TermsConditionsView = () => {
    return (
        <div class="flex flex-col gap-8 w-full max-w-4xl">
            {/* Header */}
            <div class="flex items-center gap-4 pb-2 border-b border-gray-300">
                {/* <ScrollIcon /> */}
                <i class="fa-solid fa-gavel" style={'color: #1376A1;'}></i>
                <h2 class="text-2xl font-medium text-gray-900">
                    Terms & Conditions
                </h2>
            </div>

            {/* Subtitle */}
            <p class="text-base font-normal text-gray-700">
                Review the legal agreement governing the use of the PairProfit
                services.
            </p>

            {/* Legal Content Card */}
            <div class="flex flex-col gap-6 p-6 border border-gray-200 rounded-xl bg-white shadow-sm">
                <LegalText />
            </div>

            {/* Need Help CTA */}
            <div class="flex flex-col gap-4 p-6 border border-gray-200 rounded-xl bg-gray-50 text-center items-center">
                <div class="text-lg font-medium text-gray-900">
                    Have a legal question?
                </div>
                <p class="text-base font-normal text-gray-700">
                    If you require clarification on any part of our Terms,
                    please reach out to our legal team.
                </p>
                <a
                    href="mailto:legal@pairprofit.com"
                    class="py-3 px-6 border border-[#1376A1] text-[#1376A1] font-semibold rounded-lg hover:bg-blue-100 transition-colors text-base"
                >
                    Contact Legal Support
                </a>
            </div>
        </div>
    );
};
