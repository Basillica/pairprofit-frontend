import { Component } from 'solid-js';
import unauthorized from './../../../assets/401.png';

export const UnauthorizedPage: Component = () => (
    <div class="min-h-screen bg-white flex flex-col justify-center items-center text-center p-4 md:p-12">
        <div class="max-w-xl w-full flex flex-col items-center justify-center space-y-8">
            {/* 401 Code */}
            <div
                class="text-8xl sm:text-9xl font-extrabold"
                style={{
                    // Using the brand color for emphasis
                    color: '#1376A1',
                    'text-shadow': '0 0 5px rgba(19, 118, 161, 0.5)',
                }}
            >
                401
            </div>

            {/* Title and Message */}
            <div class="flex flex-col space-y-4">
                <h1 class="text-4xl sm:text-5xl font-bold text-[#0D121C] capitalize">
                    Access Denied
                </h1>
                <p class="text-lg text-[#4B5565] font-normal leading-relaxed">
                    You do not have the necessary permissions to view this page.
                    Please **log in** with an authorized account or **sign up**
                    to get access.
                </p>
            </div>

            {/* Action Buttons */}
            <div class="flex flex-col sm:flex-row justify-center items-center gap-4 w-full max-w-sm">
                {/* Primary Button: Login/Sign Up */}
                <a
                    href="/login"
                    class="w-full sm:w-auto px-6 py-3 bg-[#1376A1] text-base font-semibold text-white rounded-lg hover:bg-[#106283] transition shadow-md"
                    aria-label="Go to Login or Sign Up page"
                >
                    Login / Sign Up
                </a>

                {/* Secondary Button: Go Home */}
                <a
                    href="/"
                    class="w-full sm:w-auto px-6 py-3 border border-[#CDD5DF] text-base font-semibold text-[#1376A1] rounded-lg hover:bg-[#F0F4F8] transition"
                    aria-label="Go to Homepage"
                >
                    Go to Homepage
                </a>
            </div>

            {/* Optional Illustration Placeholder */}
            <div class="pt-8">
                {/* Placeholder for an icon or illustration related to security/lock */}
                <img
                    src={unauthorized}
                    alt="A friendly illustration indicating a secured area"
                    class="rounded-xl mx-auto"
                />
            </div>
        </div>
    </div>
);
