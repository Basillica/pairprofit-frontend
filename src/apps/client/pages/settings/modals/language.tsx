import { createSignal, Show, For, Accessor, Setter } from 'solid-js';
import { Portal } from 'solid-js/web';

// 2. Mock Data for Languages and Regions
const languageOptions = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Espanol (Espana)' },
    { code: 'pt-br', name: 'Portugues (Brasil)' },
    { code: 'fr', name: 'French (France)' },
    { code: 'de', name: 'German' },
    { code: 'zh', name: 'Chinese' },
];

const regionOptions = [
    { code: 'utc', name: 'UTC Coordinated Universal Time' },
    { code: 'cet', name: 'CET Central European Time' },
    { code: 'est', name: 'EST Eastern Standard Time' },
    { code: 'pst', name: 'PST Pacific Standard Time' },
];

// 3. Radio Button Component (For Language)
const RadioButton = (props: {
    code: string;
    name: string;
    isSelected: boolean;
    onSelect: (code: string) => void;
}) => (
    <button
        onClick={() => props.onSelect(props.code)}
        class="flex justify-start items-center gap-4 w-full text-left p-2 -m-2 rounded-lg hover:bg-gray-50 transition-colors"
    >
        {/* Radio Indicator Container: [width: 32px; height: 32px] */}
        <div
            class={`w-8 h-8 flex items-center justify-center rounded-full transition-all duration-150 ${
                props.isSelected
                    ? 'border-2 border-blue-700'
                    : 'border border-gray-600'
            }`}
        >
            {/* Inner Checked Dot */}
            <Show when={props.isSelected}>
                <div class="w-4 h-4 bg-blue-700 rounded-full"></div>
            </Show>
        </div>

        {/* Language Name: [font-size: 18px; font-weight: 400] */}
        <div class="text-lg font-normal text-gray-800">{props.name}</div>
    </button>
);

// 4. Custom Select/Dropdown Component (For Region)
const RegionSelect = (props: {
    label: string;
    value: string;
    options: typeof regionOptions;
    onChange: (value: string) => void;
}) => (
    <div class="flex flex-col gap-2 w-full">
        <label class="text-base font-medium text-gray-800">{props.label}</label>
        <div class="relative w-full">
            <select
                value={props.value}
                onInput={(e) => props.onChange(e.currentTarget.value)}
                class="appearance-none w-full h-11 p-3 border border-gray-300 rounded-lg bg-white text-base text-gray-800 pr-10 focus:border-blue-700 focus:ring-1 focus:ring-blue-700 outline-none transition-shadow cursor-pointer"
            >
                <For each={props.options}>
                    {(option) => (
                        <option value={option.code}>{option.name}</option>
                    )}
                </For>
            </select>
            {/* Custom Arrow Icon */}
            <svg
                class="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            >
                <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
        </div>
    </div>
);

// --- MAIN MODAL COMPONENT ---
/**
 * @param props.isOpen - Boolean indicating if the modal should be visible.
 * @param props.onClose - Function to call when the modal needs to be dismissed.
 */
export const ChangeLanguageModal = (props: {
    onClose: () => void;
    isOpen: Accessor<boolean>;
    closeModal: Setter<boolean>;
}) => {
    // State to hold the currently selected values
    const [selectedLanguage, setSelectedLanguage] = createSignal('en');
    const [selectedRegion, setSelectedRegion] = createSignal('cet');

    const handleSave = () => {
        console.log(
            `Preferences saved: Language=${selectedLanguage()}, Region=${selectedRegion()}`
        );
        // Logic to submit both language and region changes
        props.onClose();
    };

    // If modal is not open, return null to avoid rendering
    if (!props.isOpen) {
        return null;
    }

    return (
        // Modal Backdrop: Full screen, semi-transparent black
        <Portal>
            <Show when={props.isOpen()}>
                <div
                    class="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-70 transition-opacity p-4"
                    onClick={props.onClose} // Close on backdrop click
                    classList={{
                        'modal-overlay': true,
                        active: props.isOpen(),
                    }}
                >
                    {/* Modal Content Container */}
                    {/* [width: 816px; padding: 20px 40px; border-radius: 16px] - Max-width set to match scale */}
                    <div
                        class="w-full max-w-3xl bg-white rounded-2xl shadow-2xl flex flex-col gap-6 p-8 md:p-10"
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
                    >
                        {/* --- Header & Close Button --- */}
                        <div class="flex flex-col gap-5 w-full">
                            {/* Title Row */}
                            <div class="flex justify-between items-center w-full pb-4 border-b border-gray-300">
                                {/* Title: [font-size: 24px; font-weight: 500] */}
                                <h2 class="text-2xl font-medium text-gray-900">
                                    Language & Region
                                </h2>

                                {/* Close Button: [width: 28px; height: 28px] */}
                                <button
                                    onClick={props.onClose}
                                    class="p-1 rounded-full text-gray-700 hover:bg-gray-100 transition-colors"
                                    aria-label="Close modal"
                                >
                                    <i class="fa-solid fa-xmark"></i>
                                </button>
                            </div>

                            {/* Subtitle */}
                            <p class="text-base font-normal text-gray-700">
                                Select your preferred language for the
                                application and the time zone for all
                                transaction records.
                            </p>
                        </div>

                        {/* --- Content Sections --- */}
                        <div class="flex flex-col gap-10 w-full">
                            {/* 1. Language Section */}
                            <div class="flex flex-col gap-4">
                                <h3 class="text-xl font-medium text-gray-900">
                                    Application Language
                                </h3>
                                <div class="flex flex-col gap-3 w-full max-w-sm">
                                    <For each={languageOptions}>
                                        {(lang) => (
                                            <RadioButton
                                                code={lang.code}
                                                name={lang.name}
                                                isSelected={
                                                    selectedLanguage() ===
                                                    lang.code
                                                }
                                                onSelect={setSelectedLanguage}
                                            />
                                        )}
                                    </For>
                                </div>
                            </div>

                            {/* 2. Region Section (Time Zone) */}
                            <div class="flex flex-col gap-4">
                                <h3 class="text-xl font-medium text-gray-900">
                                    Time Zone / Region
                                </h3>
                                <div class="w-full max-w-xs">
                                    <RegionSelect
                                        label="Time Zone"
                                        value={selectedRegion()}
                                        options={regionOptions}
                                        onChange={setSelectedRegion}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* --- Footer Buttons --- */}
                        <div class="flex justify-end items-center gap-4 pt-5 border-t border-gray-300 w-full">
                            {/* Cancel Button */}
                            <button
                                onClick={props.onClose}
                                class="py-3 px-6 border border-blue-700 text-blue-700 font-semibold rounded-lg hover:bg-blue-50 transition-colors text-base"
                            >
                                Cancel
                            </button>

                            {/* Save Button */}
                            <button
                                onClick={handleSave}
                                class="py-3 px-6 bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:bg-blue-800 transition-colors text-base"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </Show>
        </Portal>
    );
};
