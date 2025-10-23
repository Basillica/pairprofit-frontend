import { createSignal } from 'solid-js';
import { ChangeLanguageModal } from './modals';

//
const GlobeIcon = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="#1376A1"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="w-6 h-6"
    >
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="2" y1="12" x2="22" y2="12"></line>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
    </svg>
);

const SettingRow = (props: {
    title: string;
    description: string;
    value: string;
    onClick: () => void;
}) => (
    <div class="w-full flex justify-between items-center py-4 border-b border-gray-200 last:border-b-0">
        <div class="flex flex-col gap-1">
            <div class="text-lg font-medium text-gray-900">{props.title}</div>
            <div class="text-sm font-normal text-gray-600">
                {props.description}
            </div>
        </div>
        <div class="flex items-center gap-4">
            <div class="text-base font-semibold text-[#1376A1]">
                {props.value}
            </div>
            <button
                onClick={props.onClick}
                class="py-2 px-4 rounded-lg border border-[#1376A1] text-sm font-medium text-[#1376A1] hover:bg-blue-50 transition-colors"
            >
                Change
            </button>
        </div>
    </div>
);

export const LanguageRegionView = () => {
    // State to control the modal visibility (assuming ChangeLanguageModal is defined)
    const [isModalOpen, setIsModalOpen] = createSignal(false);

    // Placeholder data
    const [currentLanguage] = createSignal('English (US)');
    const [currentRegion] = createSignal('Central European Time (CET)');

    // In a real app, the modal should update currentLanguage upon save.

    return (
        <div class="flex flex-col gap-8 w-full max-w-4xl">
            {/* Header */}
            <div class="flex items-center gap-4 pb-2 border-b border-gray-300">
                <GlobeIcon />
                <h2 class="text-2xl font-medium text-gray-900">
                    Language & Region
                </h2>
            </div>

            {/* Subtitle */}
            <p class="text-base font-normal text-gray-700">
                Control your preferred language, time zone, and number
                formatting.
            </p>

            {/* Settings Card */}
            <div class="flex flex-col gap-2 p-6 border border-gray-200 rounded-xl bg-white shadow-sm">
                <SettingRow
                    title="App Language"
                    description="This controls the language for the PairProfit interface and marketing emails."
                    value={currentLanguage()}
                    onClick={() => setIsModalOpen(true)}
                />

                <SettingRow
                    title="Time Zone"
                    description="Used to display timestamps for transactions and activity."
                    value={currentRegion()}
                    // Note: This would launch a separate, simpler time zone modal
                    onClick={() => console.log('Open Time Zone Modal')}
                />
            </div>

            {/* Integrate the modal */}
            <ChangeLanguageModal
                isOpen={isModalOpen}
                closeModal={setIsModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
};
