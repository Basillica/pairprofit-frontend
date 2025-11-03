import { Component, Show } from 'solid-js';
import { NotificationDropdown } from '../general';

export const Header: Component<{
    toggleSidebar: () => void;
    isSidebarOpen: () => boolean;
    toggleProfileDropdown: () => void;
    isProfileDropdownOpen: () => boolean;
}> = (props) => {
    return (
        <header class="fixed top-0 left-0 right-0 z-20 flex justify-between items-center bg-white px-6 py-3 shadow-sm md:left-64 border-b border-gray-100">
            {/* Mobile Menu Button - Moved inside the header flow */}
            <button
                class="md:hidden p-2 text-gray-500 hover:text-gray-700 rounded-md shadow-sm mr-3"
                onClick={props.toggleSidebar}
            >
                <i
                    class={`text-lg fas ${
                        props.isSidebarOpen() ? 'fa-times' : 'fa-bars'
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
                    <span class="hidden sm:inline">Switch to Client</span>{' '}
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
                <NotificationDropdown app="artisan" />
                {/* Profile Button & Dropdown in Header */}
                <div
                    id="profile-menu-button"
                    class={`flex items-center space-x-2 border-l border-gray-200 pl-4 cursor-pointer relative ${
                        window.innerWidth < 768 ? 'w-12' : 'w-48' // TODO: Adjust width based on screen size
                    }`}
                    onClick={props.toggleProfileDropdown}
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
                            props.isProfileDropdownOpen() ? 'rotate-180' : ''
                        }`}
                    ></i>

                    {/* Dropdown Menu (Header version) */}
                    <Show when={props.isProfileDropdownOpen()}>
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
    );
};
