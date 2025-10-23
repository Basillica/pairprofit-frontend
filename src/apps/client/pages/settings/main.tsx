import { createSignal, For, Match, Switch } from 'solid-js';
import { ProfileInformation } from './profile';
import { SidebarLink, settingsNav } from './utils';
import { PaymentMethodView } from './payment';
import { SecurityView } from './security';
import { DeleteAccountConfirmationModal, ChangePasswordModal } from './modals';
import { NotificationsView } from './notification';
import { LanguageRegionView } from './language';
import { HelpCenterView } from './help';
import { TermsConditionsView } from './terms';

// 5. Main Settings Page Component
export const ClientSettingsPage = () => {
    // State to track the currently active settings tab/section
    const [activeTab, setActiveTab] = createSignal('profile');
    const [isPasswordModalOpen, setIsPasswordModalOpen] = createSignal(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = createSignal(false);
    const handleOpenModal = () => setIsPasswordModalOpen(true);
    const handleCloseModal = () => setIsPasswordModalOpen(false);
    const handleTabClick = (id: string) => {
        setActiveTab(id);
        // In a real application, you would lazy-load the component content here.
    };

    const handleConfirmDelete = () => {
        // Perform the actual API call to delete the account
        console.log('Account deletion confirmed and initiated!');
        setIsDeleteModalOpen(false);
    };

    return (
        // Main Container: Centered max width, responsive padding
        // <div class="w-full max-w-7xl mx-auto p-4 md:p-8 flex flex-col gap-10">
        <main class="p-6">
            <ChangePasswordModal
                isOpen={isPasswordModalOpen}
                closeModal={setIsPasswordModalOpen}
                onClose={handleCloseModal}
            />
            <DeleteAccountConfirmationModal
                isOpen={isDeleteModalOpen}
                closeModal={setIsDeleteModalOpen}
                onConfirm={handleConfirmDelete}
                onClose={() => setIsDeleteModalOpen(false)}
            />
            {/* --- Header Section --- */}
            <div class="pb-6 border-b border-gray-200 flex flex-col gap-2">
                {/* Title: [font-size: 24px; font-weight: 500] */}
                <h1 class="text-3xl font-semibold text-gray-900">Settings</h1>
                {/* Subtitle: [font-size: 16px; font-weight: 500] */}
                <p class="text-lg font-medium text-gray-600">
                    Manage your account, preferences, and notifications.
                </p>
            </div>

            {/* --- Content Area: Menu & Main View --- */}
            <div class="flex flex-col md:flex-row md:gap-32 gap-10  mt-10">
                {/* A. Navigation Menu */}
                {/* Mobile: Horizontal scrollable tabs */}
                <div class="md:hidden w-full flex overflow-x-auto border-b border-gray-200 pb-2 flex-shrink-0">
                    <For each={settingsNav.flatMap((group) => group.links)}>
                        {(link) => (
                            <SidebarLink
                                label={link.label}
                                id={link.id}
                                active={activeTab()}
                                onClick={handleTabClick}
                                // Specific mobile styles for horizontal scroll
                                classList={{
                                    'border-b-2': true,
                                    'border-[#1376A1]': activeTab() === link.id,
                                    'border-transparent':
                                        activeTab() !== link.id,
                                    'px-4': true,
                                }}
                            />
                        )}
                    </For>
                </div>

                {/* Desktop: Vertical Sidebar Menu */}
                <div class="hidden md:flex flex-col gap-7 w-48 flex-shrink-0">
                    <For each={settingsNav}>
                        {(group) => (
                            <div class="flex flex-col gap-2">
                                {/* Group Title: [font-size: 20px; font-weight: 500] */}
                                <div class="text-xl font-medium text-gray-900 mb-2">
                                    {group.title}
                                </div>
                                <div class="flex flex-col gap-1">
                                    <For each={group.links}>
                                        {(link) => (
                                            <SidebarLink
                                                label={link.label}
                                                id={link.id}
                                                active={activeTab()}
                                                onClick={handleTabClick}
                                            />
                                        )}
                                    </For>
                                </div>
                            </div>
                        )}
                    </For>

                    {/* Delete Account Link: [color: #EA4335; font-size: 20px; font-weight: 500] */}
                    <button
                        class="text-xl font-medium text-red-600 text-left mt-4 hover:text-red-700 transition-colors cursor-pointer"
                        onClick={() => setIsDeleteModalOpen(true)}
                    >
                        Delete Account
                    </button>
                </div>

                {/* B. Main Content Area */}
                <main class="flex-grow max-w-full">
                    <Switch>
                        <Match when={activeTab() === 'profile'}>
                            <ProfileInformation />
                        </Match>
                        <Match when={activeTab() === 'payment'}>
                            <PaymentMethodView />
                        </Match>
                        <Match when={activeTab() === 'security'}>
                            <SecurityView handleOpenModal={handleOpenModal} />
                        </Match>
                        <Match when={activeTab() === 'notifications'}>
                            <NotificationsView />
                        </Match>
                        <Match when={activeTab() === 'language'}>
                            <LanguageRegionView />
                        </Match>
                        <Match when={activeTab() === 'help'}>
                            <HelpCenterView />
                        </Match>
                        <Match when={activeTab() === 'terms'}>
                            <TermsConditionsView />
                        </Match>
                    </Switch>
                </main>
            </div>
        </main>
    );
};
