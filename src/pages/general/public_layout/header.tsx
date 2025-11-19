import {
    Component,
    createEffect,
    createSignal,
    For,
    onCleanup,
    Show,
} from 'solid-js';
import logo from './../../../assets/pairprofit.svg';
import { useNavigate } from '@solidjs/router';

// Define the structure for the navigation links
const NAV_LINKS = [
    { name: 'About Us', href: '/about' },
    { name: 'Become an artisan', href: '/login' },
];

export const Header: Component = () => {
    // State to track if the mobile menu is open
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = createSignal(false);
    const toggleMenu = (path: string) => {
        setIsMenuOpen((prev) => !prev);
        navigate(path);
    };

    // --- EFFECT FOR SCROLL LOCK ---
    // This effect runs whenever isMenuOpen changes and manipulates the document body.
    createEffect(() => {
        if (isMenuOpen()) {
            // Locks scrolling on the <body> element when the menu is open.
            // We specifically include 'lg:overflow-auto' to ensure desktop scrolling isn't permanently broken
            // if the menu happens to open on a small viewport and then the screen is resized.
            document.body.classList.add('overflow-hidden', 'lg:overflow-auto');
        } else {
            // Restores scrolling when the menu is closed.
            document.body.classList.remove(
                'overflow-hidden',
                'lg:overflow-auto'
            );
        }
    });

    // Cleanup effect: Ensure scroll lock is removed if the component is unmounted.
    onCleanup(() => {
        document.body.classList.remove('overflow-hidden', 'lg:overflow-auto');
    });

    const MenuIcon: Component<{ open: boolean }> = (props) => (
        <button
            onClick={() => toggleMenu('')}
            class="p-2 lg:hidden text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#1376a1] rounded transition-transform"
            aria-label={props.open ? 'Close menu' : 'Open menu'}
        >
            <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <Show
                    when={props.open}
                    fallback={
                        // Hamburger Icon
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    }
                >
                    {/* X (Close) Icon */}
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                    />
                </Show>
            </svg>
        </button>
    );

    return (
        <header class="w-full flex justify-center sticky top-0 z-50 bg-white shadow-md">
            <div class="w-full max-w-[1440px] px-4 md:px-[100px]">
                {/* Desktop/Mobile Header Row */}
                <div class="flex justify-between items-center py-4 border-b border-[#e3e8ef] lg:border-none">
                    {/* Logo (Visible on all sizes) */}
                    <a
                        class="px-4 py-3 text-base font-semibold text-[#1376a1] rounded-lg border border-transparent hover:bg-slate-50 transition"
                        href="/"
                    >
                        <img
                            src={logo}
                            alt="PairProfit Logo"
                            class="h-7 w-auto"
                        />
                    </a>

                    {/* Desktop Navigation (Hidden on mobile/tablet) */}
                    <nav class="hidden lg:flex items-center gap-6">
                        <For each={NAV_LINKS}>
                            {(link) => (
                                <a
                                    href={link.href}
                                    class="px-2 py-3 text-base font-medium text-[#0d121c] hover:text-[#1376a1] transition"
                                >
                                    {link.name}
                                </a>
                            )}
                        </For>
                    </nav>

                    {/* Desktop Actions (Hidden on mobile/tablet) */}
                    <div class="hidden lg:flex items-center gap-4">
                        <a
                            class="px-4 py-3 text-base font-semibold text-[#1376a1] rounded-lg border border-transparent hover:bg-slate-50 transition"
                            href="/login"
                        >
                            Login
                        </a>
                        <a
                            class="px-4 py-3 bg-[#1376a1] text-base font-semibold  rounded-lg hover:bg-[#106283] transition"
                            href="/login"
                        >
                            Sign Up
                        </a>
                    </div>

                    {/* Mobile Menu Icon (Visible only on mobile/tablet) */}
                    {/* On mobile, we hide the desktop actions and show the hamburger menu button */}
                    <div class="flex lg:hidden items-center gap-4">
                        {/* We hide the Login/Sign Up buttons on mobile to only show Logo and Hamburger */}
                        <MenuIcon open={isMenuOpen()} />
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay (Conditional) */}
            <Show when={isMenuOpen()}>
                <div class="fixed inset-0 top-[70px] bg-white lg:hidden z-40 h-screen overflow-y-auto transition-transform duration-300 ease-in-out">
                    <div class="flex flex-col p-4 space-y-2 border-t border-[#e3e8ef]">
                        {/* Mobile Navigation Links */}
                        <For each={NAV_LINKS}>
                            {(link) => (
                                <button
                                    onClick={() => toggleMenu(link.href)} // Close menu on click
                                    class="w-full p-3 text-lg font-medium text-[#0d121c] hover:bg-[#f0f4f8] rounded transition"
                                >
                                    {link.name}
                                </button>
                            )}
                        </For>

                        {/* Divider */}
                        <div class="w-full border-t border-[#e3e8ef] pt-4 mt-4"></div>

                        {/* Mobile Actions */}
                        <button
                            class="w-full px-4 py-3 text-base font-semibold text-[#1376a1] rounded-lg border border-[#1376a1] hover:bg-slate-50 transition"
                            onClick={() => toggleMenu('/login')}
                        >
                            Login
                        </button>
                        <button
                            class="w-full px-4 py-3 bg-[#1376a1] text-base font-semibold  rounded-lg hover:bg-[#106283] transition"
                            onClick={() => toggleMenu('/login')}
                        >
                            Sign Up
                        </button>
                    </div>
                </div>
            </Show>
        </header>
    );
};
