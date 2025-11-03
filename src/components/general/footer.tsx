import { Component } from 'solid-js';

export const Footer: Component = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer
            class="w-full bg-[#0d2136] text-gray-300 py-2 sm:py-3 flex-shrink-0 mt-10"
            style={`
                position: fixed;
                bottom: 0px;
                margin-bottom: 0px;
            `}
        >
            <div class="px-4 mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0 text-xs sm:text-sm">
                <p class="order-3 md:order-1 text-center md:text-left">
                    &copy; {currentYear} PairProfit Platform. All rights
                    reserved.
                </p>

                <div class="order-2 md:order-3 flex space-x-4">
                    <a
                        href="https://facebook.com"
                        target="_blank"
                        aria-label="Facebook"
                        class="hover:text-white transition duration-150"
                    >
                        {/* Assuming you have font awesome or similar setup for icons */}
                        <i class="fab fa-facebook-f"></i>
                    </a>
                    <a
                        href="https://twitter.com"
                        target="_blank"
                        aria-label="Twitter"
                        class="hover:text-white transition duration-150"
                    >
                        <i class="fab fa-twitter"></i>
                    </a>
                    <a
                        href="https://linkedin.com"
                        target="_blank"
                        aria-label="LinkedIn"
                        class="hover:text-white transition duration-150"
                    >
                        <i class="fab fa-linkedin-in"></i>
                    </a>
                    <a
                        href="https://instagram.com"
                        target="_blank"
                        aria-label="Instagram"
                        class="hover:text-white transition duration-150"
                    >
                        <i class="fab fa-instagram"></i>
                    </a>
                </div>

                <ul class="order-1 md:order-2 flex space-x-4 justify-center md:justify-start">
                    <li>
                        <a
                            href="#privacy"
                            class="hover:text-white transition duration-150"
                        >
                            Privacy Policy
                        </a>
                    </li>
                    <li class="hidden sm:block">
                        <a
                            href="#terms"
                            class="hover:text-white transition duration-150"
                        >
                            Terms of Service
                        </a>
                    </li>
                    <li class="hidden sm:block">
                        <a
                            href="#sitemap"
                            class="hover:text-white transition duration-150"
                        >
                            Sitemap
                        </a>
                    </li>
                </ul>
            </div>
        </footer>
    );
};
