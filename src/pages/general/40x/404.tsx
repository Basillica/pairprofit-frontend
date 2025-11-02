import { Component } from 'solid-js';
import not_found_404 from './../../../assets/404.png';

export const Page404: Component = () => (
    <div class="min-h-screen bg-white flex flex-col justify-center items-center text-center p-4 md:p-12">
        <div class="max-w-xl w-full flex flex-col items-center justify-center space-y-8">
            {/* 404 Code */}
            <div
                class="text-8xl sm:text-9xl font-extrabold"
                style={{
                    // Using a rich gradient or outline to make the 404 stand out
                    color: '#1376A1',
                    'text-shadow': '0 0 5px rgba(19, 118, 161, 0.5)',
                }}
            >
                404
            </div>

            {/* Title and Message */}
            <div class="flex flex-col space-y-4">
                <h1 class="text-4xl sm:text-5xl font-bold text-[#0D121C] capitalize">
                    Oops! Page Not Found
                </h1>
                <p class="text-lg text-[#4B5565] font-normal leading-relaxed">
                    We can't seem to find the page you're looking for. It might
                    have been moved, deleted, or you might have mistyped the
                    address.
                </p>
            </div>

            {/* Action Buttons */}
            <div class="flex flex-col sm:flex-row justify-center items-center gap-4 w-full max-w-sm">
                {/* Primary Button: Go Home */}
                <a
                    href="/"
                    class="w-full sm:w-auto px-6 py-3 bg-[#1376A1] text-base font-semibold text-white rounded-lg hover:bg-[#106283] transition shadow-md"
                    aria-label="Go to Homepage"
                >
                    Go to Homepage
                </a>

                {/* Secondary Button: Contact Support */}
                <a
                    href="/contact"
                    class="w-full sm:w-auto px-6 py-3 border border-[#CDD5DF] text-base font-semibold text-[#1376A1] rounded-lg hover:bg-[#F0F4F8] transition"
                    aria-label="Contact Support"
                >
                    Contact Support
                </a>
            </div>

            {/* Optional Illustration Placeholder */}
            <div class="pt-8">
                {/* Replace this with a proper 404 illustration or animation */}
                <img
                    src={not_found_404}
                    alt="A friendly illustration indicating the page is lost"
                    class="rounded-xl mx-auto"
                />
            </div>
        </div>
    </div>
);
