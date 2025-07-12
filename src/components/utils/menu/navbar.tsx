import {
    Accessor,
    Component,
    createEffect,
    createSignal,
    Setter,
    For,
    onMount,
} from 'solid-js';
import { useNavigate } from '@solidjs/router';
import { PostServiceRequestForm } from '../modals';
import { useAppContext } from '../../../state';
import { authService } from '../../../oauth/manager';
import { MenuItem, MenuItems } from './menuitems';

// --- SubMenu Component ---
// This component will recursively render menu items and their children
const SubMenu: Component<{
    item: MenuItem;
    closeAllMenus: () => void;
}> = (props) => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = createSignal(false);

    const toggleOpen = (e: MouseEvent) => {
        e.stopPropagation(); // Prevent immediate closing from document click
        setIsOpen(!isOpen());
    };

    const handleItemClick = (e: MouseEvent, item: MenuItem) => {
        e.stopPropagation(); // Prevent parent dropdowns from closing prematurely
        if (item.path) {
            navigate(item.path);
        }
        props.closeAllMenus(); // Close all menus after navigation
    };

    return (
        <li class="relative">
            {props.item.children ? (
                // Menu item with children (dropdown trigger)
                <button
                    onClick={toggleOpen}
                    class="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                >
                    {props.item.icon && <i class={`${props.item.icon} mr-2`} />}
                    <span style="font-bold text-blue-500">
                        {props.item.label}
                    </span>
                    <i
                        class={`fas fa-chevron-right ml-auto transition-transform duration-200 ${
                            isOpen() ? 'rotate-90' : ''
                        }`}
                    ></i>
                </button>
            ) : (
                // Regular menu item (no children)
                <button
                    onClick={(e) => handleItemClick(e, props.item)}
                    class="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                >
                    {props.item.icon && <i class={`${props.item.icon} mr-2`} />}
                    <span style="font-bold text-blue-500">
                        {props.item.label}
                    </span>
                </button>
            )}

            {/* Sub-menu container */}
            {props.item.children && (
                <ul
                    class={`
                        ${isOpen() ? 'block' : 'hidden'}
                        ${
                            // Position for nested sub-menus
                            props.item.children[0]?.children
                                ? 'absolute left-full top-0'
                                : ''
                        }
                        mt-1
                        bg-white
                        border
                        border-gray-200
                        rounded-md
                        shadow-lg
                        py-1
                        z-20
                        min-w-[160px]
                    `}
                >
                    <For each={props.item.children}>
                        {(childItem) => (
                            <SubMenu
                                item={childItem}
                                closeAllMenus={props.closeAllMenus}
                            />
                        )}
                    </For>
                </ul>
            )}
        </li>
    );
};

export const NavBar: Component<{
    setOpenLogout: Setter<boolean>;
    openLogout: Accessor<boolean>;
}> = (props) => {
    const navigate = useNavigate();
    const [addRequest, setAddRequest] = createSignal<boolean>(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = createSignal(false);
    const [openDropdowns, setOpenDropdowns] = createSignal<string[]>([]);
    const { userType } = useAppContext();
    // Function to close all open dropdowns
    const closeAllMenus = () => {
        setOpenDropdowns([]);
        setIsMobileMenuOpen(false); // Close mobile menu as well
    };

    onMount(() => {
        if (!userType.authUser()!) {
            let authUser = authService.getAuthUser();
            if (authUser) {
                userType.setAuthUser(authUser);
            }
        }
    });

    // Close dropdowns when clicking outside
    createEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const navbar = document.getElementById('main-navbar');
            if (navbar && !navbar.contains(event.target as Node)) {
                closeAllMenus();
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    });

    // Handle mobile menu toggle
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen());
    };

    const handleUserProfile = (
        e: MouseEvent & {
            currentTarget: HTMLButtonElement;
            target: Element;
        }
    ) => {
        e.stopPropagation();
        navigate('/profile/dashboard');
        closeAllMenus(); // Close menus after navigating
    };

    const handleLogout = (
        e: MouseEvent & {
            currentTarget: HTMLButtonElement;
            target: Element;
        }
    ) => {
        e.stopPropagation();
        if (!userType.authUser()!) {
            return;
        }
        props.setOpenLogout(true);
        closeAllMenus(); // Close menus after triggering logout modal
    };

    createEffect(() => {
        const handleResize = () => {
            // If window is wider than 768px (md breakpoint), close mobile menu
            if (window.innerWidth > 768) {
                setIsMobileMenuOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleItemClick = (
        e: MouseEvent & {
            currentTarget: HTMLButtonElement;
            target: Element;
        },
        item: MenuItem
    ) => {
        e.preventDefault();
        e.stopPropagation();
        console.log(e, item);
    };

    return (
        <nav
            id="main-navbar"
            class="top-section bg-white shadow-md p-4 flex justify-between items-center relative z-999"
        >
            <PostServiceRequestForm
                isOpen={addRequest}
                closeModal={setAddRequest}
            />

            <div class="top-section-left flex items-center">
                <button
                    onClick={toggleMobileMenu}
                    class="md:hidden text-blue-500 text-xl focus:outline-none"
                >
                    <i class="fas fa-bars"></i>{' '}
                </button>
                <span class="text-xl font-bold text-blue-500 ml-2">
                    <a href="/listings">PairProfit</a>
                </span>
            </div>

            {/* Main Navigation - Hidden on mobile, shown on desktop */}
            <div class="hidden md:flex items-center space-x-4 z-999">
                {MenuItems.map((item) => (
                    <div class="relative group">
                        {item.children ? (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    const newOpenDropdowns =
                                        openDropdowns().includes(item.id)
                                            ? openDropdowns().filter(
                                                  (id) => id !== item.id
                                              ) // Close if already open
                                            : [...openDropdowns(), item.id]; // Open if closed
                                    setOpenDropdowns(newOpenDropdowns);
                                }}
                                class="flex items-center px-3 py-2 text-gray-700 hover:text-blue-600 focus:outline-none group-hover:text-blue-600"
                            >
                                {item.icon && <i class={`${item.icon} mr-2`} />}
                                <span style="font-bold text-blue-500">
                                    {item.label}
                                </span>
                                <i
                                    class={`fas fa-chevron-down ml-2 transition-transform duration-200 ${
                                        openDropdowns().includes(item.id)
                                            ? 'rotate-180'
                                            : ''
                                    }`}
                                ></i>
                            </button>
                        ) : (
                            <button
                                onClick={(e) => {
                                    handleItemClick(e, item);
                                    closeAllMenus(); // Close all menus on navigation
                                }}
                                class="flex items-center px-3 py-2 text-gray-700 hover:text-blue-600 focus:outline-none"
                            >
                                {item.icon && <i class={`${item.icon} mr-2`} />}
                                <span>{item.label}</span>
                            </button>
                        )}

                        {/* Desktop Dropdown Menu */}
                        {item.children && (
                            <ul
                                class={`
                                    ${
                                        openDropdowns().includes(item.id)
                                            ? 'block'
                                            : 'hidden'
                                    }
                                    absolute left-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-999 min-w-[180px]
                                `}
                            >
                                <For each={item.children}>
                                    {(childItem) => (
                                        <SubMenu
                                            item={childItem}
                                            closeAllMenus={closeAllMenus}
                                        />
                                    )}
                                </For>
                            </ul>
                        )}
                    </div>
                ))}
            </div>

            {/* Right Section: User Actions */}
            <div class="top-section-right flex items-center space-x-2">
                {userType.authUser()! && (
                    <button
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded-full flex items-center justify-center text-lg"
                        onClick={() => {
                            setAddRequest(true);
                            closeAllMenus(); // Close any open menus
                        }}
                        aria-label="Add New Request"
                    >
                        <i class="fas fa-plus"></i>
                    </button>
                )}

                <div class="relative inline-flex">
                    {userType.authUser()! && (
                        <button
                            id="dropdown-trigger"
                            type="button"
                            class="flex justify-center items-center size-9 text-sm font-semibold rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                            aria-haspopup="menu"
                            aria-expanded={
                                openDropdowns().includes('notifications')
                                    ? 'true'
                                    : 'false'
                            }
                            aria-label="Notifications"
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent document click from closing
                                const newOpenDropdowns =
                                    openDropdowns().includes('notifications')
                                        ? openDropdowns().filter(
                                              (id) => id !== 'notifications'
                                          )
                                        : [...openDropdowns(), 'notifications'];
                                setOpenDropdowns(newOpenDropdowns);
                            }}
                        >
                            <div class="relative inline-block">
                                <i class="fas fa-bell"></i>
                                <div class="absolute top-0 right-0 h-5 w-5 rounded-full bg-red-500 text-white text-xs font-semibold flex items-center justify-center transform translate-x-1/3 -translate-y-1/3">
                                    9+
                                </div>
                            </div>
                        </button>
                    )}

                    {/* Notifications Dropdown */}
                    {userType.authUser()! && (
                        <div
                            id="dropdown-menu"
                            class={`
                                transition-opacity duration-300
                                absolute right-0 mt-10 bg-white
                                shadow-md rounded-lg origin-top-right
                                ${
                                    openDropdowns().includes('notifications')
                                        ? 'block opacity-100'
                                        : 'hidden opacity-0'
                                }
                                overflow-y-auto
                            `}
                            style={{
                                width: '290px',
                                'max-height': '650px',
                            }}
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="dropdown-trigger"
                        >
                            <div class="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                                <div class="flex items-center justify-between mb-4">
                                    <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">
                                        Latest Activities
                                    </h5>
                                    <a
                                        href="/notifications"
                                        class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                                        onClick={closeAllMenus} // Close menus when navigating
                                    >
                                        View all
                                    </a>
                                </div>
                                <div class="flow-root">
                                    <ul
                                        role="list"
                                        class="divide-y divide-gray-200 dark:divide-gray-700"
                                    >
                                        {/* Your existing notification list items */}
                                        <li class="py-3 sm:py-4">
                                            <div class="flex items-center">
                                                <div class="shrink-0">
                                                    <img
                                                        class="w-8 h-8 rounded-full"
                                                        src="https://picsum.photos/50"
                                                        alt="Neil image"
                                                    />
                                                </div>
                                                <div class="flex-1 min-w-0 ms-4">
                                                    <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                        Neil Sims
                                                    </p>
                                                    <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                                        email@windster.com
                                                    </p>
                                                </div>
                                                <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                                    $320
                                                </div>
                                            </div>
                                        </li>
                                        <li class="py-3 sm:py-4">
                                            <div class="flex items-center ">
                                                <div class="shrink-0">
                                                    <img
                                                        class="w-8 h-8 rounded-full"
                                                        src="https://picsum.photos/50"
                                                        alt="Bonnie image"
                                                    />
                                                </div>
                                                <div class="flex-1 min-w-0 ms-4">
                                                    <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                        Bonnie Green
                                                    </p>
                                                    <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                                        email@windster.com
                                                    </p>
                                                </div>
                                                <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                                    $3467
                                                </div>
                                            </div>
                                        </li>
                                        <li class="py-3 sm:py-4">
                                            <div class="flex items-center">
                                                <div class="shrink-0">
                                                    <img
                                                        class="w-8 h-8 rounded-full"
                                                        src="https://picsum.photos/50"
                                                        alt="Michael image"
                                                    />
                                                </div>
                                                <div class="flex-1 min-w-0 ms-4">
                                                    <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                        Michael Gough
                                                    </p>
                                                    <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                                        email@windster.com
                                                    </p>
                                                </div>
                                                <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                                    $67
                                                </div>
                                            </div>
                                        </li>
                                        <li class="py-3 sm:py-4">
                                            <div class="flex items-center ">
                                                <div class="shrink-0">
                                                    <img
                                                        class="w-8 h-8 rounded-full"
                                                        src="https://picsum.photos/50"
                                                        alt="Lana image"
                                                    />
                                                </div>
                                                <div class="flex-1 min-w-0 ms-4">
                                                    <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                        Lana Byrd
                                                    </p>
                                                    <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                                        email@windster.com
                                                    </p>
                                                </div>
                                                <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                                    $367
                                                </div>
                                            </div>
                                        </li>
                                        <li class="pt-3 pb-0 sm:pt-4">
                                            <div class="flex items-center ">
                                                <div class="shrink-0">
                                                    <img
                                                        class="w-8 h-8 rounded-full"
                                                        src="https://picsum.photos/50"
                                                        alt="Thomas image"
                                                    />
                                                </div>
                                                <div class="flex-1 min-w-0 ms-4">
                                                    <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                        Thomes Lean
                                                    </p>
                                                    <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                                        email@windster.com
                                                    </p>
                                                </div>
                                                <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                                    $2367
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {userType.authUser()! && (
                    <button
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded-full flex items-center justify-center text-lg"
                        onClick={handleUserProfile}
                        aria-label="User Profile"
                    >
                        <i class="fas fa-user"></i>
                    </button>
                )}

                {userType.authUser()! && (
                    <button
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded-full flex items-center justify-center text-lg"
                        onClick={handleLogout}
                        aria-label="Logout"
                    >
                        <i class="fas fa-right-from-bracket"></i>
                    </button>
                )}
            </div>

            {/* Mobile Menu Overlay */}
            <div
                class={`
                    fixed top-0 left-0 w-full h-full bg-blue-100 bg-opacity-25 z-40
                    transform transition-transform duration-300 ease-in-out
                    ${
                        isMobileMenuOpen()
                            ? 'translate-x-0'
                            : '-translate-x-full'
                    }
                    md:hidden
                `}
                onClick={closeAllMenus} // Close when clicking on the overlay
            >
                <div
                    class="w-64 bg-white h-full shadow-lg p-4"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Prevent clicks inside the menu from closing the overlay */}
                    <div class="flex justify-between items-center mb-4">
                        <h2 class="text-xl font-semibold">Menu</h2>
                        <button
                            onClick={closeAllMenus}
                            class="text-gray-600 text-2xl focus:outline-none"
                        >
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <ul class="space-y-2">
                        <For each={MenuItems}>
                            {(item) => (
                                <SubMenu
                                    item={item}
                                    closeAllMenus={closeAllMenus}
                                />
                            )}
                        </For>
                    </ul>
                </div>
            </div>
        </nav>
    );
};
