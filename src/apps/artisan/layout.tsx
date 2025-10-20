import { createSignal, onCleanup, onMount, Show } from 'solid-js';

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

export const ArtisanLayout = () => {
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
                <div class="p-6">
                    <div class="text-2xl font-bold text-gray-800 flex items-center space-x-2">
                        <svg
                            width="59"
                            height="59"
                            viewBox="0 0 59 59"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            version="1.1"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            class="h-7 w-7"
                        >
                            <path
                                d="M23.899 22.425v9.662a4.279 4.279 0 0 0 1.229 3.016 4.19 4.19 0 0 0 2.987 1.251h6.406v-4.668h-5.026c-0.279 0 -0.547 -0.112 -0.745 -0.311a1.068 1.068 0 0 1 -0.31 -0.75v-3.737h6.068v-4.464z"
                                fill="#12CFAE"
                            ></path>
                            <path
                                d="M36.015 36.354h10.369V26.655a4.264 4.264 0 0 0 -1.234 -3.005A4.205 4.205 0 0 0 42.17 22.405h-6.155v4.793h4.884c0.28 0 0.548 0.112 0.747 0.312 0.197 0.199 0.308 0.47 0.308 0.751v3.605h-5.94z"
                                fill="#373F63"
                            ></path>
                        </svg>
                        <span class="text-gray-900">PairProfit</span>
                    </div>
                </div>

                <nav class="mt-6 px-4 space-y-2 pb-10">
                    <a
                        href="#"
                        class="flex items-center p-3 text-primary-blue bg-custom-light-blue rounded-lg relative active-nav-item font-semibold transition-colors"
                    >
                        <i class="fas fa-th-large mr-3 text-lg"></i> Dashboard
                    </a>
                    <a
                        href="#"
                        class="flex items-center p-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <i class="fas fa-briefcase mr-3 text-lg"></i> My Jobs
                    </a>
                    <a
                        href="#"
                        class="flex items-center p-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <i class="fas fa-credit-card mr-3 text-lg"></i> Payments
                    </a>
                    <a
                        href="#"
                        class="flex items-center p-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <i class="fas fa-inbox mr-3 text-lg"></i> Inbox
                    </a>
                    <a
                        href="#"
                        class="flex items-center p-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <i class="fas fa-bell mr-3 text-lg"></i> Notification
                    </a>
                    <a
                        href="#"
                        class="flex items-center p-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <i class="fas fa-robot mr-3 text-lg"></i> MrFixit AI
                    </a>
                    <a
                        href="#"
                        class="flex items-center p-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <i class="fas fa-question-circle mr-3 text-lg"></i> Help
                        & Support
                    </a>
                    <a
                        href="#"
                        class="flex items-center p-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <i class="fas fa-cog mr-3 text-lg"></i> Settings
                    </a>
                    <div class="border-t border-gray-200 my-4 mx-3"></div>
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
                {/* Header (fixed on top, but offset on desktop) */}
                <header class="fixed top-0 left-0 right-0 z-20 flex justify-between items-center bg-white px-6 py-3 shadow-sm md:left-64 border-b border-gray-100">
                    {/* Mobile Menu Button - Moved inside the header flow */}
                    <button
                        class="md:hidden p-2 text-gray-500 hover:text-gray-700 rounded-md shadow-sm mr-3"
                        onClick={toggleSidebar}
                    >
                        <i
                            class={`text-lg fas ${
                                isSidebarOpen() ? 'fa-times' : 'fa-bars'
                            }`}
                        ></i>
                    </button>
                    {/* Search Bar - Takes up available space */}
                    <div class="relative w-full max-w-xs sm:max-w-sm md:max-w-lg">
                        <input
                            type="text"
                            placeholder="Search for artisans"
                            class="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-blue text-sm"
                        />
                        <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                    </div>

                    <div class="flex items-center space-x-2 sm:space-x-6 ml-auto">
                        {/* Switch to Artisan Button (Now visible on mobile, icon-only) */}
                        <button class="flex items-center text-gray-600 hover:text-gray-800 text-sm">
                            <i class="fas fa-sync-alt mr-0 sm:mr-2 pl-2"></i>
                            <span class="hidden sm:inline">
                                Switch to Artisan
                            </span>{' '}
                            {/* Text hidden on mobile */}
                        </button>

                        {/* Bookmark Icon (Now visible on mobile) */}
                        <button class="p-2 text-gray-500 hover:text-gray-700 relative">
                            <svg
                                width="18"
                                height="19"
                                viewBox="0 0 18 19"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M12.75 15.875H5.25C3 15.875 1.5 14.75 1.5 12.125V6.875C1.5 4.25 3 3.125 5.25 3.125H12.75C15 3.125 16.5 4.25 16.5 6.875V12.125C16.5 14.75 15 15.875 12.75 15.875Z"
                                    stroke="#697586"
                                    stroke-width="1.5"
                                    stroke-miterlimit="10"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                                <path
                                    d="M12.75 7.25L10.4025 9.125C9.63 9.74 8.3625 9.74 7.59 9.125L5.25 7.25"
                                    stroke="#697586"
                                    stroke-width="1.5"
                                    stroke-miterlimit="10"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </svg>
                            <span class="absolute top-2 right-1 block h-1 w-1 rounded-full bg-green-500 ring-1 ring-white"></span>
                        </button>
                        {/* Notification Icon */}
                        <button class="p-2 text-gray-500 hover:text-gray-700 relative">
                            <svg
                                width="18"
                                height="19"
                                viewBox="0 0 18 19"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M9.01501 2.68262C6.53251 2.68262 4.515 4.70012 4.515 7.18262V9.35012C4.515 9.80762 4.32 10.5051 4.0875 10.8951L3.225 12.3276C2.6925 13.2126 3.06 14.1951 4.035 14.5251C7.2675 15.6051 10.755 15.6051 13.9875 14.5251C14.895 14.2251 15.2925 13.1526 14.7975 12.3276L13.935 10.8951C13.71 10.5051 13.515 9.80762 13.515 9.35012V7.18262C13.515 4.70762 11.49 2.68262 9.01501 2.68262Z"
                                    stroke="#697586"
                                    stroke-width="1.5"
                                    stroke-miterlimit="10"
                                    stroke-linecap="round"
                                />
                                <path
                                    d="M10.4025 2.90008C10.17 2.83258 9.93 2.78008 9.6825 2.75008C8.9625 2.66008 8.2725 2.71258 7.6275 2.90008C7.845 2.34508 8.385 1.95508 9.015 1.95508C9.645 1.95508 10.185 2.34508 10.4025 2.90008Z"
                                    stroke="#697586"
                                    stroke-width="1.5"
                                    stroke-miterlimit="10"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                                <path
                                    d="M11.265 14.7949C11.265 16.0324 10.2525 17.0449 9.01501 17.0449C8.40001 17.0449 7.83001 16.7899 7.42501 16.3849C7.02001 15.9799 6.76501 15.4099 6.76501 14.7949"
                                    stroke="#697586"
                                    stroke-width="1.5"
                                    stroke-miterlimit="10"
                                />
                            </svg>
                            <span class="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500 ring-1 ring-white"></span>
                        </button>

                        {/* Profile Button & Dropdown in Header */}
                        <div
                            id="profile-menu-button"
                            class={`flex items-center space-x-2 border-l border-gray-200 pl-4 cursor-pointer relative ${
                                window.innerWidth < 768 ? 'w-12' : 'w-48' // TODO: Adjust width based on screen size
                            }`}
                            onClick={toggleProfileDropdown}
                        >
                            <img
                                class="h-9 w-9 rounded-full object-cover"
                                src="https://i.pravatar.cc/150?img=68"
                                alt="Stanley Agu"
                            />
                            <div class="hidden sm:block">
                                <p class="text-sm font-semibold text-gray-800">
                                    Stanley Agu
                                </p>
                                <p class="text-xs text-gray-500">
                                    stanleyagu@gmail.com
                                </p>
                            </div>
                            {/* FIX: Added 'inline-block' for stable rotation */}
                            <i
                                class={`fas fa-caret-down text-gray-500 text-sm transition-transform flex-shrink-0 origin-center inline-block ${
                                    isProfileDropdownOpen() ? 'rotate-180' : ''
                                }`}
                            ></i>

                            {/* Dropdown Menu (Header version) */}
                            <Show when={isProfileDropdownOpen()}>
                                <div
                                    id="profile-menu-header"
                                    class="absolute right-0 top-full mt-3 w-48 bg-white border border-gray-200 rounded-lg shadow-xl z-50 py-1"
                                >
                                    <a
                                        href="#"
                                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        View Profile
                                    </a>
                                    <a
                                        href="#"
                                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Account Settings
                                    </a>
                                    <div class="border-t border-gray-100"></div>
                                    <a
                                        href="#"
                                        class="block px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                    >
                                        Sign Out
                                    </a>
                                </div>
                            </Show>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main class="p-6">
                    {/* Welcome Header and Post Job Button */}
                    <div class="flex justify-between items-start mb-6">
                        <div>
                            <h1 class="text-2xl font-bold text-gray-900">
                                Welcome back, Stanley!
                            </h1>
                            <p class="text-gray-500 mt-1">
                                Ready to get things done today?
                            </p>
                        </div>
                        <button class="bg-[#1376A1] hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md flex items-center whitespace-nowrap text-sm transition-colors duration-200">
                            {' '}
                            <i class="fas fa-plus mr-2 text-xs"></i> Post a Job
                        </button>
                    </div>

                    {/* Stats Cards (Hover Effects Added) */}
                    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                        <div class="bg-white p-5 rounded-xl shadow-sm flex items-start justify-between border border-gray-100 cursor-pointer transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-[1.01]">
                            <div style="flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 4px; display: inline-flex">
                                <div style="color: #364152; font-size: 20px; font-weight: 400; line-height: 32px; word-wrap: break-word">
                                    Completed Jobs
                                </div>
                                <div style="color: #0D121C; font-size: 32px; font-weight: 600; line-height: 51.20px; word-wrap: break-word">
                                    6
                                </div>
                            </div>
                            <svg
                                width="44"
                                height="44"
                                viewBox="0 0 44 44"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <rect
                                    width="44"
                                    height="44"
                                    rx="12"
                                    fill="#9E07DF"
                                    fill-opacity="0.14"
                                />
                                <path
                                    d="M19.31 24.7L20.81 26.2L24.81 22.2"
                                    stroke="#9E07DF"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                                <path
                                    d="M20 16H24C26 16 26 15 26 14C26 12 25 12 24 12H20C19 12 18 12 18 14C18 16 19 16 20 16Z"
                                    stroke="#9E07DF"
                                    stroke-width="1.5"
                                    stroke-miterlimit="10"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                                <path
                                    d="M26 14.02C29.33 14.2 31 15.43 31 20V26C31 30 30 32 25 32H19C14 32 13 30 13 26V20C13 15.44 14.67 14.2 18 14.02"
                                    stroke="#9E07DF"
                                    stroke-width="1.5"
                                    stroke-miterlimit="10"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </svg>
                        </div>
                        <div class="bg-white p-5 rounded-xl shadow-sm flex items-start justify-between border border-gray-100 cursor-pointer transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-[1.01]">
                            <div style="flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 4px; display: inline-flex">
                                <div style="align-self: stretch; color: #364152; font-size: 20px; font-weight: 400; line-height: 32px; word-wrap: break-word">
                                    Active Jobs
                                </div>
                                <div style="color: #0D121C; font-size: 32px; font-weight: 600; line-height: 51.20px; word-wrap: break-word">
                                    2
                                </div>
                            </div>
                            <svg
                                width="44"
                                height="44"
                                viewBox="0 0 44 44"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <rect
                                    width="44"
                                    height="44"
                                    rx="12"
                                    fill="#4285F4"
                                    fill-opacity="0.14"
                                />
                                <path
                                    d="M22 16.4399V19.7699"
                                    stroke="#4285F4"
                                    stroke-width="1.5"
                                    stroke-miterlimit="10"
                                    stroke-linecap="round"
                                />
                                <path
                                    d="M22.02 12C18.34 12 15.36 14.98 15.36 18.66V20.76C15.36 21.44 15.08 22.46 14.73 23.04L13.46 25.16C12.68 26.47 13.22 27.93 14.66 28.41C19.44 30 24.61 30 29.39 28.41C30.74 27.96 31.32 26.38 30.59 25.16L29.32 23.04C28.97 22.46 28.69 21.43 28.69 20.76V18.66C28.68 15 25.68 12 22.02 12Z"
                                    stroke="#4285F4"
                                    stroke-width="1.5"
                                    stroke-miterlimit="10"
                                    stroke-linecap="round"
                                />
                                <path
                                    d="M25.33 28.8201C25.33 30.6501 23.83 32.1501 22 32.1501C21.09 32.1501 20.25 31.7701 19.65 31.1701C19.05 30.5701 18.67 29.7301 18.67 28.8201"
                                    stroke="#4285F4"
                                    stroke-width="1.5"
                                    stroke-miterlimit="10"
                                />
                            </svg>
                        </div>
                        <div class="bg-white p-5 rounded-xl shadow-sm flex items-start justify-between border border-gray-100 cursor-pointer transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-[1.01]">
                            <div style="flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 4px; display: inline-flex">
                                <div style="color: #364152; font-size: 20px; font-weight: 400; line-height: 32px; word-wrap: break-word">
                                    Pending Requests{' '}
                                </div>
                                <div style="color: #0D121C; font-size: 32px; font-weight: 600; line-height: 51.20px; word-wrap: break-word">
                                    1
                                </div>
                            </div>
                            <svg
                                width="44"
                                height="44"
                                viewBox="0 0 44 44"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <rect
                                    width="44"
                                    height="44"
                                    rx="12"
                                    fill="#EA4335"
                                    fill-opacity="0.14"
                                />
                                <path
                                    d="M32 22C32 27.52 27.52 32 22 32C16.48 32 12 27.52 12 22C12 16.48 16.48 12 22 12C27.52 12 32 16.48 32 22Z"
                                    stroke="#EA4335"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                                <path
                                    d="M25.71 25.18L22.61 23.33C22.07 23.01 21.63 22.24 21.63 21.61V17.51"
                                    stroke="#EA4335"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </svg>
                        </div>
                    </div>

                    {/* Active Jobs List */}
                    <h2 class="text-xl font-semibold text-gray-900 mb-4">
                        Active Jobs
                    </h2>
                    <div class="space-y-4 mb-8">
                        {/* Job Item 1 (Simplified structure) */}
                        <div class="bg-white p-5 rounded-lg shadow-sm flex flex-col sm:flex-row justify-between sm:items-center border-custom-yellow cursor-pointer hover:shadow-md transition-shadow">
                            <div class="mb-2 sm:mb-0">
                                <h3 class="text-lg font-semibold text-gray-900">
                                    Plumber needed for leaking pipe
                                </h3>
                                <p class="text-sm text-gray-500">
                                    Construction
                                </p>
                                <p class="text-sm text-gray-600 mt-2">
                                    <i class="fas fa-map-marker-alt text-gray-400 mr-1"></i>
                                    **Ikeja** ·
                                    <i class="fas fa-calendar-alt text-gray-400 mr-1 ml-3"></i>
                                    Due: **15th Sept, 2025** ·
                                    <i class="fas fa-money-bill-wave text-gray-400 mr-1 ml-3"></i>
                                    Budget: **N25,000**
                                </p>
                            </div>
                            <div class="flex items-center space-x-3">
                                <span class="inline-block bg-[#34a85324] text-custom-green text-xs font-medium px-2.5 py-0.5 rounded-full whitespace-nowrap">
                                    Completed
                                </span>
                                <button class="text-gray-400 hover:text-gray-600 p-1">
                                    <i class="fas fa-ellipsis-v"></i>
                                </button>
                            </div>
                        </div>

                        {/* Job Item 2 (Detailed structure - re-used from source) */}
                        <div class="w-full bg-white p-5 rounded-lg border-custom-yellow shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center cursor-pointer hover:shadow-md transition-shadow">
                            <div class="flex-1 min-w-0 pr-4 mb-3 md:mb-0">
                                <div class="mb-2">
                                    <div class="text-lg font-semibold text-slate-800 leading-snug truncate">
                                        Plumber needed for leaking pipe
                                    </div>
                                    <div class="text-sm text-gray-500 font-normal leading-snug">
                                        Construction
                                    </div>
                                </div>

                                <div class="flex flex-wrap items-center text-sm text-gray-600 gap-x-4 gap-y-1">
                                    <div class="flex items-center space-x-2">
                                        <i class="fas fa-map-marker-alt text-gray-400 text-xs"></i>
                                        <span class="font-medium text-slate-800">
                                            Ikoyi
                                        </span>
                                    </div>

                                    <div class="flex items-center space-x-2">
                                        <i class="fas fa-calendar-alt text-gray-400 text-xs"></i>
                                        <span class="text-gray-500 font-normal">
                                            Due date:
                                        </span>
                                        <span class="font-medium text-slate-800">
                                            15th Sept, 2025
                                        </span>
                                    </div>

                                    <div class="flex items-center space-x-2">
                                        <i class="fas fa-money-bill-wave text-gray-400 text-xs"></i>
                                        <span class="text-gray-500 font-normal">
                                            Budget:
                                        </span>
                                        <span class="font-medium text-slate-800">
                                            N25,000
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div class="flex items-center space-x-4 ml-auto">
                                <div class="py-1 px-3 bg-[#fbbc051f] rounded-full inline-flex justify-center items-center">
                                    <div class="text-custom-yellow text-xs font-semibold leading-snug">
                                        In progress
                                    </div>
                                </div>

                                <button class="text-gray-400 hover:text-gray-600 p-1">
                                    <i class="fas fa-ellipsis-v text-lg"></i>
                                </button>
                            </div>
                        </div>

                        {/* Job Item 3 (Ongoing) */}
                        <div class="bg-white p-5 rounded-lg shadow-sm flex flex-col sm:flex-row justify-between sm:items-center border-primary-blue cursor-pointer hover:shadow-md transition-shadow">
                            <div class="mb-2 sm:mb-0">
                                <h3 class="text-lg font-semibold text-gray-900">
                                    Electrician for house wiring
                                </h3>
                                <p class="text-sm text-gray-500">
                                    Construction
                                </p>
                                <p class="text-sm text-gray-600 mt-2">
                                    <i class="fas fa-map-marker-alt text-gray-400 mr-1"></i>
                                    **Ikeja** ·
                                    <i class="fas fa-calendar-alt text-gray-400 mr-1 ml-3"></i>
                                    Due: **15th Sept, 2025** ·
                                    <i class="fas fa-money-bill-wave text-gray-400 mr-1 ml-3"></i>
                                    Budget: **N25,000**
                                </p>
                            </div>
                            <div class="flex items-center space-x-3">
                                <span class="inline-block bg-[#34a85324] text-primary-blue text-xs font-medium px-2.5 py-0.5 rounded-full whitespace-nowrap">
                                    Ongoing
                                </span>
                                <button class="text-gray-400 hover:text-gray-600 p-1">
                                    <i class="fas fa-ellipsis-v"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Recommended Artisans */}
                    <h2 class="text-xl font-semibold text-gray-900 mb-4">
                        Recommended Artisans
                    </h2>
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {/* Artisan Cards (Hover Effects Added) */}
                        <div class="bg-white p-5 rounded-lg shadow-sm text-center border border-gray-100 cursor-pointer transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-[1.01]">
                            <img
                                class="h-20 w-20 rounded-full mx-auto object-cover border-2 border-primary-blue"
                                src="https://i.pravatar.cc/150?img=5"
                                alt="Peter Williams"
                            />
                            <h3 class="text-lg font-semibold text-gray-900 mt-3">
                                Peter Williams
                            </h3>
                            <p class="text-sm text-gray-500">Plumber</p>
                            <div class="flex justify-center items-center text-yellow-500 text-sm mt-1">
                                <i class="fas fa-star text-xs"></i>
                                <span class="ml-1 text-gray-600">4.3</span>
                            </div>
                            <button class="mt-4 bg-primary-blue hover:bg-blue-600 text-white font-semibold py-2 px-8 rounded-lg text-sm transition-colors">
                                Hire
                            </button>
                        </div>
                        {/* Artisan Card 2 (Rehire) */}
                        <div class="bg-white p-5 rounded-lg shadow-sm text-center border border-gray-100 cursor-pointer transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-[1.01]">
                            <img
                                class="h-20 w-20 rounded-full mx-auto object-cover border-2 border-gray-300"
                                src="https://i.pravatar.cc/150?img=33"
                                alt="Sarah Johnson"
                            />
                            <h3 class="text-lg font-semibold text-gray-900 mt-3">
                                Sarah Johnson
                            </h3>
                            <p class="text-sm text-gray-500">Mechanic</p>
                            <div class="flex justify-center items-center text-yellow-500 text-sm mt-1">
                                <i class="fas fa-star text-xs"></i>
                                <span class="ml-1 text-gray-600">4.9</span>
                            </div>
                            <button class="mt-4 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg text-sm transition-colors">
                                Rehire
                            </button>
                        </div>
                        {/* Artisan Card 3 */}
                        <div class="bg-white p-5 rounded-lg shadow-sm text-center border border-gray-100 cursor-pointer transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-[1.01]">
                            <img
                                class="h-20 w-20 rounded-full mx-auto object-cover border-2 border-primary-blue"
                                src="https://i.pravatar.cc/150?img=18"
                                alt="David Lee"
                            />
                            <h3 class="text-lg font-semibold text-gray-900 mt-3">
                                David Lee
                            </h3>
                            <p class="text-sm text-gray-500">Electrician</p>
                            <div class="flex justify-center items-center text-yellow-500 text-sm mt-1">
                                <i class="fas fa-star text-xs"></i>
                                <span class="ml-1 text-gray-600">4.7</span>
                            </div>
                            <button class="mt-4 bg-primary-blue hover:bg-blue-600 text-white font-semibold py-2 px-8 rounded-lg text-sm transition-colors">
                                Hire
                            </button>
                        </div>
                        {/* Artisan Card 4 */}
                        <div class="bg-white p-5 rounded-lg shadow-sm text-center border border-gray-100 cursor-pointer transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-[1.01]">
                            <img
                                class="h-20 w-20 rounded-full mx-auto object-cover border-2 border-primary-blue"
                                src="https://i.pravatar.cc/150?img=12"
                                alt="Maria Garcia"
                            />
                            <h3 class="text-lg font-semibold text-gray-900 mt-3">
                                Maria Garcia
                            </h3>
                            <p class="text-sm text-gray-500">Painter</p>
                            <div class="flex justify-center items-center text-yellow-500 text-sm mt-1">
                                <i class="fas fa-star text-xs"></i>
                                <span class="ml-1 text-gray-600">4.5</span>
                            </div>
                            <button class="mt-4 bg-primary-blue hover:bg-blue-600 text-white font-semibold py-2 px-8 rounded-lg text-sm transition-colors">
                                Hire
                            </button>
                        </div>
                        {/* Artisan Card 5 */}
                        <div class="bg-white p-5 rounded-lg shadow-sm text-center border border-gray-100 cursor-pointer transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-[1.01]">
                            <img
                                class="h-20 w-20 rounded-full mx-auto object-cover border-2 border-primary-blue"
                                src="https://i.pravatar.cc/150?img=22"
                                alt="John Smith"
                            />
                            <h3 class="text-lg font-semibold text-gray-900 mt-3">
                                John Smith
                            </h3>
                            <p class="text-sm text-gray-500">Carpenter</p>
                            <div class="flex justify-center items-center text-yellow-500 text-sm mt-1">
                                <i class="fas fa-star text-xs"></i>
                                <span class="ml-1 text-gray-600">4.2</span>
                            </div>
                            <button class="mt-4 bg-primary-blue hover:bg-blue-600 text-white font-semibold py-2 px-8 rounded-lg text-sm transition-colors">
                                Hire
                            </button>
                        </div>
                        {/* Artisan Card 6 */}
                        <div class="bg-white p-5 rounded-lg shadow-sm text-center border border-gray-100 cursor-pointer transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-[1.01]">
                            <img
                                class="h-20 w-20 rounded-full mx-auto object-cover border-2 border-primary-blue"
                                src="https://i.pravatar.cc/150?img=29"
                                alt="Emily White"
                            />
                            <h3 class="text-lg font-semibold text-gray-900 mt-3">
                                Emily White
                            </h3>
                            <p class="text-sm text-gray-500">Welder</p>
                            <div class="flex justify-center items-center text-yellow-500 text-sm mt-1">
                                <i class="fas fa-star text-xs"></i>
                                <span class="ml-1 text-gray-600">4.6</span>
                            </div>
                            <button class="mt-4 bg-primary-blue hover:bg-blue-600 text-white font-semibold py-2 px-8 rounded-lg text-sm transition-colors">
                                Hire
                            </button>
                        </div>
                        {/* Artisan Card 7 */}
                        <div class="bg-white p-5 rounded-lg shadow-sm text-center border border-gray-100 cursor-pointer transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-[1.01]">
                            <img
                                class="h-20 w-20 rounded-full mx-auto object-cover border-2 border-primary-blue"
                                src="https://i.pravatar.cc/150?img=40"
                                alt="Robert Brown"
                            />
                            <h3 class="text-lg font-semibold text-gray-900 mt-3">
                                Robert Brown
                            </h3>
                            <p class="text-sm text-gray-500">Tiler</p>
                            <div class="flex justify-center items-center text-yellow-500 text-sm mt-1">
                                <i class="fas fa-star text-xs"></i>
                                <span class="ml-1 text-gray-600">4.1</span>
                            </div>
                            <button class="mt-4 bg-primary-blue hover:bg-blue-600 text-white font-semibold py-2 px-8 rounded-lg text-sm transition-colors">
                                Hire
                            </button>
                        </div>
                        {/* Artisan Card 8 */}
                        <div class="bg-white p-5 rounded-lg shadow-sm text-center border border-gray-100 cursor-pointer transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-[1.01]">
                            <img
                                class="h-20 w-20 rounded-full mx-auto object-cover border-2 border-primary-blue"
                                src="https://i.pravatar.cc/150?img=50"
                                alt="Linda Green"
                            />
                            <h3 class="text-lg font-semibold text-gray-900 mt-3">
                                Linda Green
                            </h3>
                            <p class="text-sm text-gray-500">Plumber</p>
                            <div class="flex justify-center items-center text-yellow-500 text-sm mt-1">
                                <i class="fas fa-star text-xs"></i>
                                <span class="ml-1 text-gray-600">4.8</span>
                            </div>
                            <button class="mt-4 bg-primary-blue hover:bg-blue-600 text-white font-semibold py-2 px-8 rounded-lg text-sm transition-colors">
                                Hire
                            </button>
                        </div>
                    </div>

                    {/* Recent Job History Table */}
                    <div class="flex justify-between items-center mb-4">
                        <h2 class="text-xl font-semibold text-gray-900">
                            Recent Job History
                        </h2>
                        <a
                            href="#"
                            class="text-sm text-primary-blue font-medium hover:text-blue-600"
                        >
                            View All
                        </a>
                    </div>

                    <div class="bg-white rounded-lg shadow-sm overflow-x-auto border border-gray-100">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                                    >
                                        Job Title
                                    </th>
                                    <th
                                        scope="col"
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                                    >
                                        Location
                                    </th>
                                    <th
                                        scope="col"
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                                    >
                                        Date
                                    </th>
                                    <th
                                        scope="col"
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                                    >
                                        Amount
                                    </th>
                                    <th
                                        scope="col"
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                                    >
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                {/* Table Rows */}
                                <tr class="hover:bg-gray-50 cursor-pointer transition-colors">
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        Carpenter for door repair
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        Ikeja
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        31st August, 2025
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        $100
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-custom-green/10 text-custom-green">
                                            Completed
                                        </span>
                                    </td>
                                </tr>
                                <tr class="hover:bg-gray-50 cursor-pointer transition-colors">
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        Plumber for burst pipe
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        Lekki
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        30th June, 2025
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        $200
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-custom-red/10 text-custom-red">
                                            Cancelled
                                        </span>
                                    </td>
                                </tr>
                                <tr class="hover:bg-gray-50 cursor-pointer transition-colors">
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        Electrician for wiring
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        Victoria Island
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        22nd July, 2025
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        $100
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-custom-green/10 text-custom-green">
                                            Completed
                                        </span>
                                    </td>
                                </tr>
                                <tr class="hover:bg-gray-50 cursor-pointer transition-colors">
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        Tiler for bathroom floor
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        Ikeja
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        30th June, 2025
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        $100
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-custom-red/10 text-custom-red">
                                            Cancelled
                                        </span>
                                    </td>
                                </tr>
                                <tr class="hover:bg-gray-50 cursor-pointer transition-colors">
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        Painter for exterior wall
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        Lekki
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        1st May, 2025
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        $300
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-custom-green/10 text-custom-green">
                                            Completed
                                        </span>
                                    </td>
                                </tr>
                                <tr class="hover:bg-gray-50 cursor-pointer transition-colors">
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        AC Repair and service
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        Ikoyi
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        10th April, 2025
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        $150
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-custom-green/10 text-custom-green">
                                            Completed
                                        </span>
                                    </td>
                                </tr>
                                <tr class="hover:bg-gray-50 cursor-pointer transition-colors">
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        Gardener for lawn mowing
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        Victoria Island
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        5th March, 2025
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        $50
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-custom-green/10 text-custom-green">
                                            Completed
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        </div>
    );
};
