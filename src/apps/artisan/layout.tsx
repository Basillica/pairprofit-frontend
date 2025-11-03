import {
    Component,
    createSignal,
    For,
    onCleanup,
    onMount,
    Show,
} from 'solid-js';
import logo from './../../assets/pairprofit.svg';
import { useLocation } from '@solidjs/router';
import { Header } from './header';

const customStyles = `
    .active-nav-item::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 4px;
        background-color: #007bff;
        border-radius: 0 4px 4px 0;
    }
    .sidebar-hidden {
        transform: translateX(-100%);
    }
    
    .text-primary-teal {
        color: #12CFAE;
    }
    
    .bg-custom-light-blue {
        background-color: #e6f0ff;
    }

    .text-primary-blue {
        color: #007bff;
    }

    .bg-custom-red\\/10 {
        background-color: rgba(255, 0, 0, 0.1);
    }
    .text-custom-red { color: #ff0000; }
    .bg-custom-green\\/10 { background-color: rgba(0, 128, 0, 0.1); }
    .text-custom-green { color: #008000; }
    .bg-custom-yellow\\/10 { background-color: rgba(255, 191, 0, 0.1); }
    .text-custom-yellow { color: #ffbf00; }
`;

export const ArtisanLayout = (props: any) => {
    // State for managing the sidebar visibility on mobile
    const [isSidebarOpen, setIsSidebarOpen] = createSignal(
        window.innerWidth > 768 ? true : false
    );
    const [isSideMenuDropDown, setIsSideMenuDropDown] = createSignal(false);
    // State for managing the profile dropdown
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] =
        createSignal(false);
    const checkIsMobile = () => {
        const mobile = window.innerWidth >= 768;
        setIsSidebarOpen(mobile);
    };
    // Toggle mobile sidebar visibility and handle body overflow
    const toggleSidebar = () => {
        const newState = !isSidebarOpen();
        setIsSidebarOpen(newState);
        // Prevent body scrolling when the mobile sidebar is open
        document.body.classList.toggle('overflow-hidden', newState);
    };

    // Global click listener to close the dropdown when clicking outside
    const handleClickOutside = (event: any) => {
        // Close profile dropdown if clicking outside its container
        if (
            isProfileDropdownOpen() &&
            // !event.target.closest('#profile-menu-container') &&
            !event.target.closest('#profile-menu-button') &&
            // !event.target.closest('#sidebar-profile-button')
            !event.target.closest('#profile-menu')
        ) {
            setIsProfileDropdownOpen(false);
        }
    };

    onMount(() => {
        checkIsMobile(); // Set initial state
        window.addEventListener('resize', checkIsMobile);
        return () => window.removeEventListener('resize', checkIsMobile);
    });

    // Set up and clean up the global click listener
    document.addEventListener('click', handleClickOutside);
    onCleanup(() => {
        document.removeEventListener('click', handleClickOutside);
        document.body.classList.remove('overflow-hidden');
    });

    // Toggle profile dropdown visibility
    const toggleProfileDropdown = () => {
        setIsProfileDropdownOpen(!isProfileDropdownOpen());
    };

    const NAV_ITEMS = [
        {
            href: '/artisan/dashboard',
            iconClass: 'fas fa-th-large',
            text: 'Dashboard',
        },
        {
            href: '/artisan/profile',
            iconClass: 'fas fa-briefcase',
            text: 'Profile',
        },
        {
            href: '/artisan/jobs',
            iconClass: 'fas fa-briefcase',
            text: 'Job Requests',
        },
        {
            href: '/artisan/contacts',
            iconClass: 'fas fa-credit-card',
            text: 'Contacts',
        },
        {
            href: '/artisan/earnings',
            iconClass: 'fas fa-credit-card',
            text: 'Earnings',
        },
        {
            href: '/artisan/subscription',
            iconClass: 'fas fa-credit-card',
            text: 'Subscription',
        },
        { href: '/artisan/inbox', iconClass: 'fas fa-inbox', text: 'Inbox' },
        {
            href: '/artisan/calendar',
            iconClass: 'fas fa-bell',
            text: 'Calendar',
        },
        { href: '/artisan/ai', iconClass: 'fas fa-robot', text: 'MrFixit AI' },
        {
            href: '/artisan/help',
            iconClass: 'fas fa-question-circle',
            text: 'Help & Support',
        },
        {
            href: '/artisan/settings',
            iconClass: 'fas fa-cog',
            text: 'Settings',
        },
        {
            href: '/artisan/logout',
            iconClass: 'fas fa-credit-card',
            text: 'Logout',
        },
    ];

    // --- Nav Link Component ---
    const NavLink: Component<{
        href: string;
        iconClass: string;
        text: string;
    }> = (props) => {
        // 1. Get the current reactive location object
        const location = useLocation();

        // 2. Make the active check reactive by using a getter function
        const isActive = () => {
            // Check if the current path matches the link's href exactly
            return location.pathname === props.href;
        };

        // Define the common base classes
        const baseClasses =
            'flex items-center p-3 rounded-lg relative transition-colors';

        // Define classes for active and inactive states
        const activeClasses =
            'text-[#1376A1] bg-custom-light-blue font-semibold active-nav-item';
        const inactiveClasses = 'text-gray-600 hover:bg-gray-100';

        return (
            // 3. Use the Solid Router Link component for correct SPA navigation
            <a
                href={props.href}
                // Use classList for conditional class application
                classList={{
                    [baseClasses]: true,
                    [activeClasses]: isActive(), // Highlighted when active
                    [inactiveClasses]: !isActive(), // Default style when inactive
                }}
            >
                <i class={`${props.iconClass} mr-3 text-lg`}></i> {props.text}
            </a>
        );
    };

    return (
        <div class="bg-gray-50 min-h-screen">
            {/* Custom Styles */}
            <style>{customStyles}</style>

            {/* Backdrop Overlay (Visible only on mobile when sidebar is open) */}
            <Show when={isSidebarOpen()}>
                <div
                    class="fixed inset-0 bg-black/50 z-30 md:hidden transition-opacity duration-300"
                    onClick={toggleSidebar}
                ></div>
            </Show>

            {/* 1. Sidebar */}
            <aside
                id="sidebar"
                class={`w-64 bg-white h-screen border-r fixed top-0 left-0 z-40 transition-transform duration-300 ease-in-out overflow-y-auto 
                ${isSidebarOpen() ? 'translate-x-0' : 'sidebar-hidden'} 
                md:translate-x-0`}
            >
                <img
                    src={logo}
                    alt="Company Logo"
                    style={'width: 160px; margin: 20px'}
                />
                <nav class="mt-6 px-4 space-y-2 pb-10">
                    <For each={NAV_ITEMS}>
                        {(item) => (
                            <NavLink
                                href={item.href}
                                iconClass={item.iconClass}
                                text={item.text}
                            />
                        )}
                    </For>

                    <div class="border-t border-gray-200 my-4 mx-3"></div>
                    {/* Logout Link (handled separately as it has a different styling) */}
                    <a
                        href="#"
                        class="flex items-center p-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                        <i class="fas fa-sign-out-alt mr-3 text-lg"></i> Logout
                    </a>
                </nav>

                {/* Profile Button at the bottom of the sidebar */}
                <div class="absolute bottom-0 w-full p-4 border-t border-gray-200 bg-white">
                    <div
                        id="sidebar-profile-button"
                        class="flex items-center space-x-3 cursor-pointer p-2 hover:bg-gray-50 rounded-lg relative"
                        onClick={() => {
                            setIsSideMenuDropDown(!isSideMenuDropDown());
                        }}
                    >
                        <img
                            class="h-10 w-10 rounded-full object-cover"
                            src="https://i.pravatar.cc/150?img=68"
                            alt="Stanley Agu"
                        />
                        <div class="flex-1">
                            <p class="text-sm font-semibold text-gray-800">
                                Stanley Agu
                            </p>
                            <p class="text-xs text-gray-500">
                                stanleyagu@gmail.com
                            </p>
                        </div>
                        {/* FIX: Added 'inline-block' for stable rotation */}
                        <i
                            class={`fas fa-caret-down text-gray-400 text-sm transition-transform flex-shrink-0 origin-center inline-block ${
                                isSideMenuDropDown() ? 'rotate-180' : ''
                            }`}
                        ></i>

                        {/* Dropdown Menu (only visible if state is true) */}
                        <Show when={isSideMenuDropDown()}>
                            <div
                                id="profile-menu"
                                class="absolute bottom-full mb-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-1"
                            >
                                <a
                                    href="#"
                                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    Profile
                                </a>
                                <a
                                    href="#"
                                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    Settings
                                </a>
                                <div class="border-t border-gray-100"></div>
                                <a
                                    href="#"
                                    class="block px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                >
                                    Logout
                                </a>
                            </div>
                        </Show>
                    </div>
                </div>
            </aside>

            {/* Main Content Wrapper (shifted by 64px on desktop) */}
            <div class="w-full md:pl-64 pt-16 min-h-screen">
                {/* <div class="flex flex-col min-h-screen bg-gray-100"> */}
                {/* Header (fixed on top, but offset on desktop) */}
                <Header
                    toggleSidebar={toggleSidebar}
                    isSidebarOpen={isSidebarOpen}
                    toggleProfileDropdown={toggleProfileDropdown}
                    isProfileDropdownOpen={isProfileDropdownOpen}
                />
                {/* Main Content */}
                <main class="flex-grow">{props.children}</main>
                {/* <Footer /> */}
            </div>
        </div>
    );
};
