import { Component, createEffect } from 'solid-js';
import { LoginStore } from './types';
import { useNavigate } from '@solidjs/router';

// This is the component for your success page
export const SuccessPage: Component<{
    loginStore: LoginStore;
}> = () => {
    let checkmarkRef: SVGPathElement; // Reference to the SVG path for animation
    const navigate = useNavigate();

    // createEffect runs after initial render and when dependencies change.
    // We want to trigger the animation once when the component mounts.
    createEffect(() => {
        if (checkmarkRef!) {
            // Get the total length of the SVG path
            const pathLength = checkmarkRef!.getTotalLength();

            // Set initial state for animation
            checkmarkRef!.style.strokeDasharray = `${pathLength}`;
            checkmarkRef!.style.strokeDashoffset = `${pathLength}`;

            // Trigger animation after a slight delay to ensure rendering
            setTimeout(() => {
                checkmarkRef!.style.transition =
                    'stroke-dashoffset 0.8s ease-out';
                checkmarkRef!.style.strokeDashoffset = '0'; // Animate to draw the checkmark
            }, 100);
        }
    });

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <div class="bg-light-bg flex justify-center items-center min-h-screen m-0 font-sans bg-[#FCFCFD]">
            <div class="bg-white rounded-xl shadow-lg shadow-card-shadow p-10 w-full max-w-md text-center">
                {/* Animated Checkmark Icon */}
                <div class="flex justify-center mb-6">
                    <svg
                        width="80"
                        height="80"
                        viewBox="0 0 80 80"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        class="block"
                    >
                        {/* Circle Background */}
                        <circle cx="40" cy="40" r="40" fill="#1376A1" />

                        {/* Checkmark Path - this is what we'll animate */}
                        <path
                            ref={checkmarkRef!}
                            d="M25 40.5L35.5 51L55 31"
                            stroke="white"
                            stroke-width="5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="checkmark-path"
                        />
                    </svg>
                </div>

                {/* Title and Subtitle */}
                <h1 class="text-2xl font-semibold text-gray-800 mb-2">
                    You're all set!
                </h1>
                <p class="text-sm text-gray-600 mb-8">
                    Start discovering, connecting, or getting hired now.
                </p>

                {/* Go to Home Button */}
                <button
                    onClick={handleGoHome}
                    class="w-full py-3 bg-[#1376A1] text-white rounded-lg font-semibold
                           hover:bg-[#1376A1] cursor-pointer transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-200"
                >
                    Go to Home
                </button>
            </div>
        </div>
    );
};
