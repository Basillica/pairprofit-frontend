// src/data/authenticatedMenuItems.ts (or wherever you store menu data)
export interface MenuItem {
    id: string;
    label: string;
    path?: string; // Optional path for navigation
    icon?: string; // Optional icon class (e.g., 'fas fa-home')
    path_action?: CallableFunction;
    children?: MenuItem[]; // Nested sub-menu items
}

export const authenticatedMenuItems: MenuItem[] = [
    {
        id: 'profile-dashboard',
        label: 'Profile Dashboard',
        path: '/profile/dashboard', // Correct path from your routes
        icon: 'fas fa-id-card', // Example icon
    },
    {
        id: 'service-provider-dashboard',
        label: 'Service Provider Dashboard',
        path: '/profile/dashboard', // You have two dashboard routes, ensure this maps correctly
        icon: 'fas fa-tachometer-alt', // Example icon
    },
    {
        id: 'services',
        label: 'Services Management',
        icon: 'fas fa-briefcase',
        children: [
            {
                id: 'all-listings',
                label: 'All Listings',
                path: '/listings', // Path to the main service listings page
            },
            {
                id: 'manage-profiles',
                label: 'Manage Service Profiles',
                path: '/profiles/manage', // Correct path
            },
            {
                id: 'service-provider-listings',
                label: 'Service Provider Listings',
                path: '/profiles', // Correct path for the root of /profiles
            },
            // Add a "Request Service" if it leads to a specific route/modal
            // {
            //     id: 'request-service',
            //     label: 'Request Service',
            //     path: '/request-service', // If you have a dedicated route
            // },
        ],
    },
    {
        id: 'communication',
        label: 'Communication',
        icon: 'fas fa-comments',
        children: [
            {
                id: 'chat-app',
                label: 'Chat',
                path: '/chat', // Correct path
            },
            {
                id: 'lovely-chat',
                label: 'Direct Messages',
                path: '/profile/message', // Correct path
            },
            {
                id: 'email-inbox',
                label: 'Email Inbox',
                path: '/profile/inbox', // Correct path
            },
            {
                id: 'mail-app',
                label: 'All Mail',
                path: '/mail', // Correct path
            },
            {
                id: 'compose-mail',
                label: 'Compose Mail',
                path: '/mailer', // Correct path
            },
            {
                id: 'contact-list',
                label: 'Contacts',
                path: '/contact', // Correct path
            },
        ],
    },
    {
        id: 'project-management',
        label: 'Project Management',
        icon: 'fas fa-project-diagram',
        children: [
            {
                id: 'kanban',
                label: 'Kanban Board',
                path: '/profiles/kanban', // Correct path
            },
            {
                id: 'calendar',
                label: 'Calendar',
                path: '/profiles/calendar', // Correct path
            },
        ],
    },
    {
        id: 'settings',
        label: 'Settings',
        icon: 'fas fa-cog',
        children: [
            {
                id: 'account-settings',
                label: 'Account Settings',
                path: '/profile/setting', // Correct path
            },
            // The original /settings/account doesn't exist, mapped to profile setting
        ],
    },
    {
        id: 'notifications',
        label: 'Notifications',
        path: '/notifications', // Correct path
        icon: 'fas fa-bell',
    },
    {
        id: 'logger',
        label: 'Logger',
        path: '/logger', // Correct path
        icon: 'fas fa-clipboard-list',
    },
    // Placeholder for "Products" and "Reports" as these paths don't exist yet in your router
    // If you add routes like /products or /reports, you'd enable these
    // {
    //     id: 'products-placeholder',
    //     label: 'Products (Needs Routes)',
    //     icon: 'fas fa-box',
    //     children: [
    //         { id: 'all-products', label: 'All Products', path: '#', tooltip: 'Route /products not found' },
    //         { id: 'categories', label: 'Categories', path: '#', tooltip: 'Route /products/categories not found' },
    //         { id: 'add-product', label: 'Add New Product', path: '#', tooltip: 'Route /products/add not found' },
    //     ],
    // },
    // {
    //     id: 'reports-placeholder',
    //     label: 'Reports (Needs Routes)',
    //     icon: 'fas fa-file-alt',
    //     children: [
    //         { id: 'sales-report', label: 'Sales Report', path: '#', tooltip: 'Route /reports/sales not found' },
    //         { id: 'user-activity', label: 'User Activity', path: '#', tooltip: 'Route /reports/user-activity not found' },
    //     ],
    // },
];

export const GetMenuItems = (isAuth?: boolean): MenuItem[] => {
    return [
        // --- Public / Unauthenticated Routes ---
        isAuth
            ? {
                  id: 'home',
                  label: 'Home',
                  icon: 'fas fa-home',
                  path: '/listings',
                  children: [
                      {
                          id: 'listings',
                          label: 'Service Profiles',
                          path: '/listings',
                          icon: 'fas fa-home',
                      },
                  ],
              }
            : {
                  id: 'home',
                  label: 'Home',
                  icon: 'fas fa-home',
                  path: '/listings',
                  children: [
                      {
                          id: 'home',
                          label: 'Home',
                          path: '/',
                          icon: 'fas fa-home',
                      },
                      {
                          id: 'about',
                          label: 'About Us',
                          path: '/about',
                          icon: 'fas fa-info-circle',
                      },
                      {
                          id: 'login',
                          label: 'Login',
                          path: '/login',
                          icon: 'fas fa-sign-in-alt',
                      },
                      {
                          id: 'listings-public',
                          label: 'Explore Services',
                          path: '/listings',
                          icon: 'fas fa-search',
                      },
                  ],
              },
        // --- Authenticated Routes ---
        {
            id: 'contact',
            label: 'Contact',
            icon: 'fas fa-address-book',
            children: [
                {
                    id: 'contact-list',
                    label: 'Contact List',
                    path: '/contact/list',
                    icon: 'fas fa-comment-dots',
                },

                {
                    id: 'notifications',
                    label: 'Notifications',
                    path: '/notifications',
                    icon: 'fas fa-bell',
                },
                {
                    id: 'logger',
                    label: 'Logger',
                    path: '/logger',
                    icon: 'fas fa-clipboard-list',
                },
                {
                    id: 'email',
                    label: 'Email',
                    icon: 'fas fa-comments',
                    children: [
                        {
                            id: 'inbox',
                            label: 'Email Inbox',
                            path: '/contact/email/inbox',
                            icon: 'fas fa-inbox',
                        },
                        {
                            id: 'email-compose',
                            label: 'Compose Email',
                            path: '/contact/email/compose',
                            icon: 'fas fa-paper-plane',
                        },
                    ],
                },
                {
                    id: 'in-app-chat',
                    label: 'In-App Chat',
                    path: '/contact/chat',
                    icon: 'fas fa-comment-dots',
                },
                {
                    id: 'in-app-call',
                    label: 'In-App Call',
                    path: '/contact/call',
                    icon: 'fas fa-comment-dots',
                },

                // {
                //     id: 'communication',
                //     label: 'Communication',
                //     icon: 'fas fa-comments',
                //     children: [
                //         {
                //             id: 'chat-app',
                //             label: 'Chat',
                //             path: '/chat',
                //             icon: 'fas fa-comment-dots',
                //         },
                //         {
                //             id: 'mail-app',
                //             label: 'All Mail',
                //             path: '/mail',
                //             icon: 'fas fa-mail-bulk',
                //         },
                //         {
                //             id: 'compose-mail',
                //             label: 'Compose Mail',
                //             path: '/mailer',
                //             icon: 'fas fa-paper-plane',
                //         },
                //         {
                //             id: 'lovely-chat',
                //             label: 'Direct Messages',
                //             path: '/profile/message',
                //             icon: 'fas fa-envelope-open-text',
                //         },
                //         {
                //             id: 'in-app-call',
                //             label: 'In-App Call',
                //             path: '/profile/call',
                //             icon: 'fas fa-solid fa-phone-volume',
                //         },
                //         {
                //             id: 'email-inbox',
                //             label: 'Email Inbox',
                //             path: '/profile/inbox',
                //             icon: 'fas fa-inbox',
                //         },
                //     ],
                // },
            ],
        },
        {
            id: 'profile-management',
            label: 'Profile Management',
            icon: 'fas fa-user-circle',
            children: [
                {
                    id: 'profile-dashboard',
                    label: 'My Dashboard',
                    path: '/profile/dashboard',
                    icon: 'fas fa-chart-line',
                },
                {
                    id: 'account-settings',
                    label: 'Account Settings',
                    path: '/profile/setting',
                    icon: 'fas fa-cogs',
                },
            ],
        },
        {
            id: 'service-provider-management',
            label: 'Service Provider',
            icon: 'fas fa-hands-helping',
            children: [
                {
                    id: 'provider-listings',
                    label: 'Service Requests',
                    path: '/requests',
                    icon: 'fas fa-list',
                },
                {
                    id: 'manage-service-profiles',
                    label: 'Manage Profiles',
                    path: '/profiles/manage',
                    icon: 'fas fa-user-tie',
                },
                {
                    id: 'kanban-board',
                    label: 'Kanban Board',
                    path: '/profiles/kanban',
                    icon: 'fas fa-th-list',
                },
                {
                    id: 'calendar',
                    label: 'Calendar',
                    path: '/profiles/calendar',
                    icon: 'fas fa-calendar-alt',
                },
                {
                    id: 'calendar',
                    label: 'Dashboard',
                    path: '/profiles/dashboard',
                    icon: 'fas fa-calendar-alt',
                },
            ],
        },
    ];
};
