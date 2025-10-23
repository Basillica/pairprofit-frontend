import { createSignal } from 'solid-js';
// Assuming the modal is imported/available (simulated for this example)
import { NotificationSettingsModal } from './modals';

//
const BellIcon = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="#1376A1"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="w-6 h-6"
    >
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
        <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
    </svg>
);

const SectionCard = (props: {
    title: string;
    subtitle: string;
    status: string;
    onClick: () => void;
}) => (
    <div class="w-full flex justify-between items-center py-5 border-b border-gray-200">
        <div class="flex items-center gap-4">
            <div class="flex flex-col gap-1">
                <div class="text-lg font-bold text-gray-900">{props.title}</div>
                <div class="text-base font-normal text-[#1376A1]">
                    {props.subtitle}
                </div>
            </div>
        </div>
        <div class="flex items-center gap-4">
            <div class="text-base font-bold text-[#1376A1]">{props.status}</div>
            <button
                onClick={props.onClick}
                class="py-2 px-4 rounded-lg border border-[#1376A1] text-sm font-medium text-[#1376A1] hover:bg-gray-50 transition-colors"
            >
                Manage
            </button>
        </div>
    </div>
);

export const NotificationsView = () => {
    // State to control the modal visibility (assuming NotificationSettingsModal is defined)
    const [isModalOpen, setIsModalOpen] = createSignal(false);

    // Placeholder status data
    const [desktopStatus] = createSignal('Enabled');
    const [emailStatus] = createSignal('Disabled');

    return (
        <div class="flex flex-col gap-8 w-full max-w-4xl">
            {/* Header */}
            <div class="flex items-center gap-4 pb-2 border-b border-gray-300">
                <BellIcon />
                <h2 class="text-2xl font-medium text-gray-900">
                    Notifications
                </h2>
            </div>

            {/* Subtitle */}
            <p class="text-base font-normal text-gray-700">
                Configure how PairProfit alerts you to important account
                activity and updates.
            </p>

            {/* Notification Sections */}
            <div class="flex flex-col gap-2 p-6 border border-gray-200 rounded-xl bg-white shadow-sm">
                <SectionCard
                    title="In-App & Desktop Alerts"
                    subtitle="Receive instant notifications while using the PairProfit website."
                    status={desktopStatus()}
                    onClick={() => setIsModalOpen(true)}
                />

                <SectionCard
                    title="Email Notifications"
                    subtitle="Get summaries and critical alerts sent directly to your inbox."
                    status={emailStatus()}
                    onClick={() => setIsModalOpen(true)}
                />
            </div>

            {/* Integrate the modal */}
            {/* Note: In a real app, the modal content should update the statuses above after save */}
            <NotificationSettingsModal
                isOpen={isModalOpen}
                closeModal={setIsModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
};
