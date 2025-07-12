import { A } from '@solidjs/router';
import { Component } from 'solid-js';

interface PublicNavBarProps {
    companyName: string;
}

export const PublicNavBar: Component<PublicNavBarProps> = (props) => {
    return (
        <nav class="bg-blue-600 p-4 shadow-md flex items-center justify-between z-100">
            {/* Company Name / Logo (clickable to home) */}
            <A href="/" class="text-white text-2xl font-bold tracking-wide">
                {props.companyName}
            </A>

            <div class="space-x-4">
                <A href="/about" class="text-white hover:text-blue-200">
                    About
                </A>
                <A
                    href="/login"
                    class="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
                >
                    Login
                </A>
            </div>
        </nav>
    );
};
