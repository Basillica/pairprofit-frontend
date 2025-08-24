import { createSignal, createMemo, For, Show, onMount } from 'solid-js';
import contact_styles from './style.module.css';
import { Pagination } from '../../../components';
import { ContactModel } from '../../../models/contact';
import { ContactApiHandler } from '../../../api/backend/contact';
import { LocalStorageKey, SecureLocalStorage } from '../../../lib/localstore';
import { UserModel } from '../../../models/auth';
import { useAppContext } from '../../../state';

// Dummy Data for User Contacts (unchanged)
const initialUserContacts: ContactModel[] = [
    {
        user_id: 'contact_johndoe',
        name: 'John Doe',
        role: 'Artisan (Carpenter)',
        avatar: 'https://images.unsplash.com/photo-1549068106-b024baf5062d?q=80&w=60&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        last_interaction: new Date('2025-06-07T10:30:00Z'),
        is_favorite: true,
        is_blocked: false,
        contact_id: 'artisan_xyz456',
    },
    {
        user_id: 'contact_sarahchen',
        name: 'Sarah Chen',
        role: 'Artisan (Plumber)',
        avatar: 'https://picsum.photos/200?random=1',
        last_interaction: new Date('2025-06-06T14:06:00Z'),
        is_favorite: false,
        is_blocked: false,
        contact_id: 'artisan_abc789',
    },
    {
        user_id: 'contact_janedoe',
        name: 'Jane Smith',
        role: 'Customer',
        avatar: 'https://picsum.photos/200?random=2',
        last_interaction: new Date('2025-06-05T09:15:00Z'),
        is_favorite: true,
        is_blocked: false,
        contact_id: 'customer_janedoe',
    },
    {
        user_id: 'contact_peterjones',
        name: 'Peter Jones',
        role: 'Customer',
        avatar: 'https://picsum.photos/200?random=3',
        last_interaction: new Date('2025-06-03T16:00:00Z'),
        is_favorite: false,
        is_blocked: true,
        contact_id: 'customer_peterjones',
    },
    {
        user_id: 'contact_marywhite',
        name: 'Mary White',
        role: 'Artisan (Painter)',
        avatar: 'https://picsum.photos/200?random=4',
        last_interaction: new Date('2025-06-01T11:00:00Z'),
        is_favorite: false,
        is_blocked: false,
        contact_id: 'artisan_marywhite',
    },
];

export const ContactList = () => {
    const [contacts, setContacts] = createSignal<ContactModel[]>([]);
    const [searchTerm, setSearchTerm] = createSignal('');
    const [filterRole, setFilterRole] = createSignal('all');
    const [filterStatus, setFilterStatus] = createSignal('all');
    const [currentPage, setCurrentPage] = createSignal(1);
    const {
        userType: { authUser, setAuthUser },
    } = useAppContext();
    const NUMBER_OF_ITEMS_PER_PAGE = 20;
    const contactApi = new ContactApiHandler();

    const [_, setCurrentPageData] = createSignal(1); // State to hold the current page in the parent
    const handlePageChange = (newPage: number) => {
        console.log(`Parent received page change to: ${newPage}`);
        setCurrentPageData(newPage);
    };

    onMount(async () => {
        if (!authUser()) {
            const user = SecureLocalStorage.getItem<UserModel>(
                LocalStorageKey.AppAuthUserModel
            );
            if (!user) return;
            setAuthUser(user);
        }

        const result = await contactApi.getUserContacts(authUser()!.id);
        if (result.success) {
            setContacts([...result.data]);
        }
    });

    const formatRelativeDate = (date: Date) => {
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMinutes = Math.round(diffMs / (1000 * 60));
        const diffHours = Math.round(diffMs / (1000 * 60 * 60));
        const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

        if (diffMinutes < 1) return 'just now';
        if (diffMinutes < 60) return `${diffMinutes} min ago`;
        if (diffHours < 24) return `${diffHours} hr ago`;
        if (diffDays < 7) return `${diffDays} days ago`;
        return date.toLocaleDateString('en-DE');
    };

    const filteredAndSortedContacts = createMemo(() => {
        const term = searchTerm().toLowerCase();
        const role = filterRole();
        const status = filterStatus();

        let filtered = contacts().filter((contact) => {
            if (typeof contact.last_interaction === 'string') {
                contact.last_interaction = new Date(contact.last_interaction);
            }
            if (contact.avatar === '') {
                contact.avatar = 'https://picsum.photos/200?random=1';
            }
            const matchesSearch =
                contact.name.toLowerCase().includes(term) ||
                contact.role.toLowerCase().includes(term);

            const matchesRole =
                role === 'all' ||
                (role === 'customer' && contact.role.includes('Customer')) ||
                (role === 'artisan' && contact.role.includes('Artisan'));

            const matchesStatus =
                status === 'all' ||
                (status === 'favorite' && contact.is_favorite) ||
                (status === 'blocked' && contact.is_blocked);

            return matchesSearch && matchesRole && matchesStatus;
        });

        console.log(filtered, 'ööööööööööööööööööööööö');
        filtered.sort(
            (a, b) =>
                b.last_interaction.getTime() - a.last_interaction.getTime()
        );

        return filtered;
    });

    const simulateAction = (
        actionType: string,
        contactId: string,
        profileId = ''
    ) => {
        const contact = contacts().find((c) => c.user_id === contactId);
        if (!contact) return;

        if (actionType === 'message') {
            alert(
                `Simulating: Opening chat with ${contact.name}. (Would navigate to chat.html?contactId=${contactId})`
            );
        } else if (actionType === 'view_profile') {
            if (contact.role.includes('Artisan') && profileId) {
                alert(
                    `Simulating: Viewing ${contact.name}'s artisan profile. (Would navigate to artisan_profile.html?artisanId=${profileId})`
                );
            } else if (contact.role.includes('Customer') && profileId) {
                alert(
                    `Simulating: Viewing ${contact.name}'s customer profile. (Would navigate to customer_profile.html?customerId=${profileId})`
                );
            } else {
                alert(
                    `Simulating: Viewing generic profile for ${contact.name}. (No specific profile ID available)`
                );
            }
        }
    };

    const toggleFavorite = async (contactId: string) => {
        const contact = contacts().find((c) => c.user_id === contactId)!;
        if (!contact) return;

        let result = await contactApi.toggleFavorite(
            contact.user_id,
            contact.contact_id,
            !contact.is_favorite
        );

        if (result.success) {
            setContacts((prevContacts) =>
                prevContacts.map((contact) =>
                    contact.user_id === contactId
                        ? { ...contact, is_favorite: !contact.is_favorite }
                        : contact
                )
            );
        }
    };

    const toggleBlock = async (contactId: string) => {
        const contact = contacts().find((c) => c.user_id === contactId)!;
        if (!contact) return;

        let result = await contactApi.toggleBlocked(
            contact.user_id,
            contact.contact_id,
            !contact.is_blocked
        );

        if (result.success) {
            setContacts((prevContacts) =>
                prevContacts.map((contact) =>
                    contact.user_id === contactId
                        ? { ...contact, is_blocked: !contact.is_blocked }
                        : contact
                )
            );
        }
    };

    return (
        <div class="mx-auto bg-white p-8 rounded-lg shadow-lg min-h-screen">
            <h1 class="text-3xl font-extrabold text-gray-900 text-center mb-6">
                My Contact List
            </h1>

            <div class="mb-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <input
                    type="text"
                    id="searchContacts"
                    placeholder="Search contacts by name or role..."
                    class="flex-grow p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    value={searchTerm()}
                    onInput={(e) => setSearchTerm(e.currentTarget.value)}
                />
                <select
                    id="filterRole"
                    class="p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    value={filterRole()}
                    onChange={(e) => setFilterRole(e.currentTarget.value)}
                >
                    <option value="all">All Roles</option>
                    <option value="customer">Customer</option>
                    <option value="artisan">Artisan</option>
                </select>
                <select
                    id="filterStatus"
                    class="p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    value={filterStatus()}
                    onChange={(e) => setFilterStatus(e.currentTarget.value)}
                >
                    <option value="all">All Statuses</option>
                    <option value="favorite">Favorites</option>
                    <option value="blocked">Blocked</option>
                </select>
            </div>

            <div
                id="contactListContainer"
                class={`${contact_styles.contact_list_container} space-y-4`}
            >
                <Show when={filteredAndSortedContacts().length === 0}>
                    <p
                        id="noContactsMessage"
                        class="text-center text-gray-500 py-10"
                    >
                        No contacts found matching your criteria.
                    </p>
                </Show>

                <For each={filteredAndSortedContacts()}>
                    {(contact) => (
                        <div class="bg-gray-50 p-4 rounded-lg shadow-sm flex flex-col sm:flex-row items-start sm:items-center border border-gray-200">
                            {' '}
                            {/* Removed space-x-4 from here */}
                            <div class="flex items-center space-x-4 w-full sm:flex-grow">
                                {' '}
                                {/* Added sm:flex-grow here */}
                                <img
                                    src={contact.avatar}
                                    alt={contact.name}
                                    class="w-16 h-16 rounded-full object-cover flex-shrink-0"
                                />
                                <div class="flex-grow">
                                    <h3 class="text-xl font-semibold text-gray-900">
                                        {contact.name}
                                    </h3>
                                    <p class="text-sm text-gray-600">
                                        {contact.role}
                                        <Show when={contact.is_favorite}>
                                            <span class="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-0.5 rounded-full ml-1">
                                                Favorite
                                            </span>
                                        </Show>
                                        <Show when={contact.is_blocked}>
                                            <span class="bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded-full ml-1">
                                                Blocked
                                            </span>
                                        </Show>
                                    </p>
                                    <p class="text-xs text-gray-500 mt-1">
                                        Last interacted:{' '}
                                        {formatRelativeDate(
                                            contact.last_interaction
                                        )}
                                    </p>
                                </div>
                            </div>
                            {/* Button Container - Key Changes here */}
                            <div class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 flex-shrink-0 w-full sm:w-auto sm:justify-end sm:ml-4">
                                <button
                                    class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 text-sm w-full sm:w-auto"
                                    onClick={() =>
                                        simulateAction(
                                            'message',
                                            contact.user_id
                                        )
                                    }
                                >
                                    Message
                                </button>
                                <button
                                    class="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 text-sm w-full sm:w-auto"
                                    onClick={() =>
                                        simulateAction(
                                            'view_profile',
                                            contact.user_id,
                                            contact.role.includes('Artisan')
                                                ? contact.contact_id
                                                : contact.contact_id
                                        )
                                    }
                                >
                                    View Profile
                                </button>
                                <button
                                    class="bg-orange-100 text-orange-700 px-3 py-2 rounded-md hover:bg-orange-200 text-sm w-full sm:w-auto"
                                    onClick={() =>
                                        toggleFavorite(contact.user_id)
                                    }
                                >
                                    {contact.is_favorite
                                        ? 'Unfavorite'
                                        : 'Favorite'}
                                </button>
                                <button
                                    class="bg-red-100 text-red-700 px-3 py-2 rounded-md hover:bg-red-200 text-sm w-full sm:w-auto"
                                    onClick={() => toggleBlock(contact.user_id)}
                                >
                                    {contact.is_blocked ? 'Unblock' : 'Block'}
                                </button>
                            </div>
                        </div>
                    )}
                </For>
            </div>

            <Pagination
                itemsPerPage={NUMBER_OF_ITEMS_PER_PAGE}
                totalItems={contacts().length}
                onPageChange={handlePageChange}
                initialPage={1} // Optional: start on a specific page
                maxPagesToShow={5} // Optional: control how many page numbers are visible
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
            <p class="text-gray-500 text-sm mt-8 text-center">
                <b>Note:</b> Customers that you have either provided for or
                accepted service from, will show up here as contacts.
            </p>
        </div>
    );
};
