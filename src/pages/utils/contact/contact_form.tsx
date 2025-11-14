import { Component, createSignal, For } from 'solid-js';

// --- Sub-Components (Icon & Utilities) ---

// Simplified Abstract Icon based on the colors and geometry in the wireframe
const AbstractSupportIcon: Component = () => (
    <svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M78.804 56.944c5.257 5.258 5.257 13.78 0 19.037l-.68.68-19.038-19.038.681-.679c5.256-5.257 13.781-5.257 19.037 0M35.97 14.11c5.257 5.257 5.257 13.78 0 19.038l-.68.679L16.252 14.79l.68-.68c5.258-5.258 13.782-5.258 19.037 0"
            fill="#163EB1"
        />
        <path
            d="M78.125 76.662a17.25 17.25 0 0 1-12.239 5.069 17.25 17.25 0 0 1-12.238-5.07L16.252 39.268c-6.758-6.76-6.758-17.719 0-24.477L35.29 33.827l23.797 23.796z"
            fill="#3256C1"
        />
        <path
            d="M87.02 51.923a3.364 3.364 0 0 1 3.365 3.365 3.365 3.365 0 1 1-3.365-3.365m-68.27 12.5a5.288 5.288 0 1 1 0 10.576 5.288 5.288 0 0 1 0-10.576"
            fill="#D7E816"
        />
        <path
            d="M90.385 45.192h-43.27l16.389-14.465 5.046 5.021 4.967-4.852z"
            fill="#72B7DD"
        />
        <path
            d="M90.385 14.423v30.77L73.517 30.895zM63.504 30.727 47.115 45.192V14.423z"
            fill="#94D4FF"
        />
        <path
            d="M90.385 14.423 73.517 30.896l-4.967 4.852-5.046-5.021-16.389-16.304z"
            fill="#BCE4FF"
        />
        <path
            d="M89.904 71.154a1.442 1.442 0 1 1 .001 2.883 1.442 1.442 0 0 1-.001-2.883M87.98 6.73a1.442 1.442 0 1 1 .002 2.884 1.442 1.442 0 0 1-.001-2.883M39.904 6.73a1.442 1.442 0 1 1 .001 2.884 1.442 1.442 0 0 1-.001-2.883M37.98 69.23a1.442 1.442 0 1 1 .002 2.884 1.442 1.442 0 0 1-.001-2.883M21.635 85.577a1.442 1.442 0 1 1 .001 2.883 1.442 1.442 0 0 1-.001-2.883M12.98 8.654a1.442 1.442 0 1 1 .002 2.883 1.442 1.442 0 0 1-.001-2.883m-2.885 40.385a1.442 1.442 0 1 1 .002 2.883 1.442 1.442 0 0 1-.002-2.883m48.991 9.546a.96.96 0 0 1-.68-.282L34.61 34.507a.962.962 0 1 1 1.36-1.36l23.795 23.796a.961.961 0 0 1-.68 1.642"
            fill="#000"
        />
        <path
            d="M65.886 82.692c-4.882 0-9.47-1.9-12.918-5.35L15.572 39.946c-7.122-7.124-7.122-18.714 0-25.836a.962.962 0 0 1 1.36 1.36c-6.373 6.372-6.373 16.742 0 23.117l37.396 37.394a16.23 16.23 0 0 0 11.558 4.787c4.368 0 8.473-1.7 11.559-4.787a.961.961 0 1 1 1.36 1.359 18.14 18.14 0 0 1-12.919 5.351"
            fill="#000"
        />
        <path
            d="M90.385 46.154h-43.27a.96.96 0 0 1-.961-.962V14.423a.962.962 0 0 1 1.923 0v29.808h41.346V14.423a.962.962 0 1 1 1.923 0v30.77c0 .53-.43.96-.961.96"
            fill="#000"
        />
        <path
            d="M90.384 46.154a.96.96 0 0 1-.621-.228L72.896 31.63a.962.962 0 0 1 1.243-1.467l16.867 14.296a.962.962 0 0 1-.622 1.695m-43.268 0a.961.961 0 0 1-.636-1.682l16.388-14.466a.962.962 0 0 1 1.272 1.442L47.752 45.913a.96.96 0 0 1-.636.24"
            fill="#000"
        />
        <path
            d="M68.55 36.71a.96.96 0 0 1-.678-.28L46.437 15.105a.961.961 0 0 1 .678-1.644h43.27a.962.962 0 0 1 .671 1.65L69.222 36.436a.96.96 0 0 1-.672.274M49.445 15.385l19.111 19.013 19.468-19.013z"
            fill="#000"
        />
        <path
            d="M77.5 21.115H59.602a.962.962 0 0 1 0-1.923H77.5a.962.962 0 0 1 0 1.923m-4.475 4.77h-8.948a.962.962 0 1 1 0-1.924h8.948a.962.962 0 0 1 0 1.924M35.29 34.789a.96.96 0 0 1-.68-.282L15.573 15.47a.96.96 0 0 1 0-1.36l.68-.68a14.33 14.33 0 0 1 10.2-4.225c3.852 0 7.473 1.5 10.197 4.225a14.33 14.33 0 0 1 4.225 10.199c0 3.852-1.5 7.474-4.225 10.2l-.68.678a.96.96 0 0 1-.679.282M17.612 14.79 35.29 32.467a12.42 12.42 0 0 0 3.66-8.838c0-3.339-1.3-6.478-3.662-8.84a12.4 12.4 0 0 0-8.837-3.661c-3.339 0-6.478 1.3-8.84 3.662m60.514 62.833a.96.96 0 0 1-.68-.282L58.407 58.303a.96.96 0 0 1 0-1.36l.682-.68a14.32 14.32 0 0 1 10.197-4.224c3.852 0 7.474 1.501 10.198 4.226a14.33 14.33 0 0 1 4.225 10.198c0 3.853-1.5 7.474-4.225 10.198l-.678.68a.96.96 0 0 1-.68.282zM60.447 57.624l17.677 17.677a12.4 12.4 0 0 0 3.662-8.838 12.42 12.42 0 0 0-3.662-8.839 12.42 12.42 0 0 0-8.838-3.662c-3.34 0-6.478 1.3-8.839 3.662"
            fill="#000"
        />
        <path
            d="M78.142 93.27H45.73a4.33 4.33 0 0 1-4.327-4.328c0-1.154.45-2.24 1.265-3.06a4.3 4.3 0 0 1 3.062-1.267h9.133a.962.962 0 0 1 0 1.924H45.73c-.642 0-1.247.25-1.702.704a2.407 2.407 0 0 0 1.702 4.104h32.413a5.5 5.5 0 0 0 3.897-1.615 5.47 5.47 0 0 0 1.615-3.898 5.47 5.47 0 0 0-1.614-3.896l-4.595-4.597a.962.962 0 0 1 1.36-1.36l4.594 4.597a7.38 7.38 0 0 1 2.178 5.256 7.38 7.38 0 0 1-2.178 5.257 7.4 7.4 0 0 1-2.411 1.613 7.4 7.4 0 0 1-2.846.565M18.75 75.962a6.257 6.257 0 0 1-6.25-6.25 6.257 6.257 0 0 1 6.25-6.25 6.257 6.257 0 0 1 6.25 6.25 6.257 6.257 0 0 1-6.25 6.25m0-10.577a4.33 4.33 0 0 0-4.327 4.326 4.33 4.33 0 0 0 4.327 4.328 4.33 4.33 0 0 0 4.327-4.328 4.33 4.33 0 0 0-4.327-4.326m68.27-5.77a4.33 4.33 0 0 1-4.328-4.327 4.33 4.33 0 0 1 4.327-4.326 4.33 4.33 0 0 1 4.327 4.326 4.33 4.33 0 0 1-4.327 4.327m0-6.73a2.406 2.406 0 0 0-2.404 2.404 2.406 2.406 0 0 0 2.403 2.403 2.406 2.406 0 0 0 2.404-2.404 2.407 2.407 0 0 0-2.404-2.403M59.615 68.27a.96.96 0 0 1-.68-.282L19.512 28.563a.961.961 0 1 1 1.36-1.36l39.423 39.424a.961.961 0 0 1-.68 1.641"
            fill="#000"
        />
        <path
            d="M78.804 56.944c5.257 5.258 5.257 13.78 0 19.037l-.68.68-19.038-19.038.681-.679c5.256-5.257 13.781-5.257 19.037 0M35.97 14.11c5.257 5.257 5.257 13.78 0 19.038l-.68.679L16.252 14.79l.68-.68c5.258-5.258 13.782-5.258 19.037 0"
            fill="#163EB1"
        />
        <path
            d="M78.125 76.662a17.25 17.25 0 0 1-12.239 5.069 17.25 17.25 0 0 1-12.238-5.07L16.252 39.268c-6.758-6.76-6.758-17.719 0-24.477L35.29 33.827l23.797 23.796z"
            fill="#3256C1"
        />
        <path
            d="M87.02 51.923a3.364 3.364 0 0 1 3.365 3.365 3.365 3.365 0 1 1-3.365-3.365m-68.27 12.5a5.288 5.288 0 1 1 0 10.576 5.288 5.288 0 0 1 0-10.576"
            fill="#D7E816"
        />
        <path
            d="M90.385 45.192h-43.27l16.389-14.465 5.046 5.021 4.967-4.852z"
            fill="#72B7DD"
        />
        <path
            d="M90.385 14.423v30.77L73.517 30.895zM63.504 30.727 47.115 45.192V14.423z"
            fill="#94D4FF"
        />
        <path
            d="M90.385 14.423 73.517 30.896l-4.967 4.852-5.046-5.021-16.389-16.304z"
            fill="#BCE4FF"
        />
        <path
            d="M89.904 71.154a1.442 1.442 0 1 1 .001 2.883 1.442 1.442 0 0 1-.001-2.883M87.98 6.73a1.442 1.442 0 1 1 .002 2.884 1.442 1.442 0 0 1-.001-2.883M39.904 6.73a1.442 1.442 0 1 1 .001 2.884 1.442 1.442 0 0 1-.001-2.883M37.98 69.23a1.442 1.442 0 1 1 .002 2.884 1.442 1.442 0 0 1-.001-2.883M21.635 85.577a1.442 1.442 0 1 1 .001 2.883 1.442 1.442 0 0 1-.001-2.883M12.98 8.654a1.442 1.442 0 1 1 .002 2.883 1.442 1.442 0 0 1-.001-2.883m-2.885 40.385a1.442 1.442 0 1 1 .002 2.883 1.442 1.442 0 0 1-.002-2.883m48.991 9.546a.96.96 0 0 1-.68-.282L34.61 34.507a.962.962 0 1 1 1.36-1.36l23.795 23.796a.961.961 0 0 1-.68 1.642"
            fill="#000"
        />
        <path
            d="M65.886 82.692c-4.882 0-9.47-1.9-12.918-5.35L15.572 39.946c-7.122-7.124-7.122-18.714 0-25.836a.962.962 0 0 1 1.36 1.36c-6.373 6.372-6.373 16.742 0 23.117l37.396 37.394a16.23 16.23 0 0 0 11.558 4.787c4.368 0 8.473-1.7 11.559-4.787a.961.961 0 1 1 1.36 1.359 18.14 18.14 0 0 1-12.919 5.351"
            fill="#000"
        />
        <path
            d="M90.385 46.154h-43.27a.96.96 0 0 1-.961-.962V14.423a.962.962 0 0 1 1.923 0v29.808h41.346V14.423a.962.962 0 1 1 1.923 0v30.77c0 .53-.43.96-.961.96"
            fill="#000"
        />
        <path
            d="M90.384 46.154a.96.96 0 0 1-.621-.228L72.896 31.63a.962.962 0 0 1 1.243-1.467l16.867 14.296a.962.962 0 0 1-.622 1.695m-43.268 0a.961.961 0 0 1-.636-1.682l16.388-14.466a.962.962 0 0 1 1.272 1.442L47.752 45.913a.96.96 0 0 1-.636.24"
            fill="#000"
        />
        <path
            d="M68.55 36.71a.96.96 0 0 1-.678-.28L46.437 15.105a.961.961 0 0 1 .678-1.644h43.27a.962.962 0 0 1 .671 1.65L69.222 36.436a.96.96 0 0 1-.672.274M49.445 15.385l19.111 19.013 19.468-19.013z"
            fill="#000"
        />
        <path
            d="M77.5 21.115H59.602a.962.962 0 0 1 0-1.923H77.5a.962.962 0 0 1 0 1.923m-4.475 4.77h-8.948a.962.962 0 1 1 0-1.924h8.948a.962.962 0 0 1 0 1.924M35.29 34.789a.96.96 0 0 1-.68-.282L15.573 15.47a.96.96 0 0 1 0-1.36l.68-.68a14.33 14.33 0 0 1 10.2-4.225c3.852 0 7.473 1.5 10.197 4.225a14.33 14.33 0 0 1 4.225 10.199c0 3.852-1.5 7.474-4.225 10.2l-.68.678a.96.96 0 0 1-.679.282M17.612 14.79 35.29 32.467a12.42 12.42 0 0 0 3.66-8.838c0-3.339-1.3-6.478-3.662-8.84a12.4 12.4 0 0 0-8.837-3.661c-3.339 0-6.478 1.3-8.84 3.662m60.514 62.833a.96.96 0 0 1-.68-.282L58.407 58.303a.96.96 0 0 1 0-1.36l.682-.68a14.32 14.32 0 0 1 10.197-4.224c3.852 0 7.474 1.501 10.198 4.226a14.33 14.33 0 0 1 4.225 10.198c0 3.853-1.5 7.474-4.225 10.198l-.678.68a.96.96 0 0 1-.68.282zM60.447 57.624l17.677 17.677a12.4 12.4 0 0 0 3.662-8.838 12.42 12.42 0 0 0-3.662-8.839 12.42 12.42 0 0 0-8.838-3.662c-3.34 0-6.478 1.3-8.839 3.662"
            fill="#000"
        />
        <path
            d="M78.142 93.27H45.73a4.33 4.33 0 0 1-4.327-4.328c0-1.154.45-2.24 1.265-3.06a4.3 4.3 0 0 1 3.062-1.267h9.133a.962.962 0 0 1 0 1.924H45.73c-.642 0-1.247.25-1.702.704a2.407 2.407 0 0 0 1.702 4.104h32.413a5.5 5.5 0 0 0 3.897-1.615 5.47 5.47 0 0 0 1.615-3.898 5.47 5.47 0 0 0-1.614-3.896l-4.595-4.597a.962.962 0 0 1 1.36-1.36l4.594 4.597a7.38 7.38 0 0 1 2.178 5.256 7.38 7.38 0 0 1-2.178 5.257 7.4 7.4 0 0 1-2.411 1.613 7.4 7.4 0 0 1-2.846.565M18.75 75.962a6.257 6.257 0 0 1-6.25-6.25 6.257 6.257 0 0 1 6.25-6.25 6.257 6.257 0 0 1 6.25 6.25 6.257 6.257 0 0 1-6.25 6.25m0-10.577a4.33 4.33 0 0 0-4.327 4.326 4.33 4.33 0 0 0 4.327 4.328 4.33 4.33 0 0 0 4.327-4.328 4.33 4.33 0 0 0-4.327-4.326m68.27-5.77a4.33 4.33 0 0 1-4.328-4.327 4.33 4.33 0 0 1 4.327-4.326 4.33 4.33 0 0 1 4.327 4.326 4.33 4.33 0 0 1-4.327 4.327m0-6.73a2.406 2.406 0 0 0-2.404 2.404 2.406 2.406 0 0 0 2.403 2.403 2.406 2.406 0 0 0 2.404-2.404 2.407 2.407 0 0 0-2.404-2.403M59.615 68.27a.96.96 0 0 1-.68-.282L19.512 28.563a.961.961 0 1 1 1.36-1.36l39.423 39.424a.961.961 0 0 1-.68 1.641"
            fill="#000"
        />
    </svg>
);

const CheckboxIcon: Component<{ checked: boolean }> = (props) => (
    <div
        class="w-6 h-6 rounded-md flex items-center justify-center transition-colors duration-200 flex-shrink-0"
        classList={{
            'bg-[#106286]': props.checked,
            'border border-[#CDD5DF] bg-white': !props.checked,
        }}
    >
        <svg
            class="w-4 h-4 text-white transition-opacity duration-200"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            classList={{
                'opacity-100': props.checked,
                'opacity-0': !props.checked,
            }}
        >
            <path
                d="M3.5 8.5L6.5 11.5L12.5 5.5"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
    </div>
);

const DropdownIcon: Component<{ classList?: { [key: string]: boolean } }> = (
    props
) => (
    <svg
        class="w-6 h-6 text-gray-900 transition-transform duration-200"
        classList={props.classList}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M7 10L12 15L17 10"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
    </svg>
);

// --- Form Element Components ---

const TextInput: Component<{ label: string; placeholder: string }> = (
    props
) => (
    <div class="flex flex-col justify-start items-start gap-4 flex-1 w-full">
        <label class="text-lg font-medium text-[#121926] leading-relaxed">
            {props.label}
        </label>
        <input
            type="text"
            placeholder={props.placeholder}
            class="self-stretch p-4 border border-[#CDD5DF] rounded-lg text-base font-normal text-[#697586] placeholder-[#697586] focus:border-[#1376A1] focus:ring-1 focus:ring-[#1376A1] transition-colors"
        />
    </div>
);

const SelectInput: Component<{
    label: string;
    placeholder: string;
    options: string[];
}> = (props) => {
    const [isOpen, setIsOpen] = createSignal(false);
    const [selectedValue, setSelectedValue] = createSignal('');

    const toggleDropdown = () => setIsOpen((prev) => !prev);

    const handleSelect = (value: string) => {
        setSelectedValue(value);
        setIsOpen(false);
    };

    const displayValue = () => selectedValue() || props.placeholder;

    return (
        <div class="flex flex-col justify-start items-start gap-4 w-full relative">
            <label class="text-lg font-medium text-[#121926] leading-relaxed">
                {props.label}
            </label>
            {/* Clickable Input / Display Area */}
            <div
                class="self-stretch p-4 border border-[#CDD5DF] rounded-lg flex justify-between items-center cursor-pointer bg-white transition-colors hover:border-[#1376A1]"
                onClick={toggleDropdown}
            >
                <span
                    class="text-base font-normal"
                    classList={{
                        'text-[#697586]': !selectedValue(),
                        'text-[#121926]': !!selectedValue(),
                    }}
                >
                    {displayValue()}
                </span>
                <DropdownIcon classList={{ 'rotate-180': isOpen() }} />
            </div>

            {/* Dropdown Menu List */}
            <ul
                class="absolute top-full left-0 mt-2 self-stretch w-full bg-white border border-[#CDD5DF] rounded-lg shadow-lg max-h-60 overflow-y-auto z-10 transition-opacity duration-200"
                classList={{
                    'opacity-100 visible pointer-events-auto': isOpen(),
                    'opacity-0 invisible pointer-events-none': !isOpen(),
                }}
            >
                <For each={props.options}>
                    {(option) => (
                        <li
                            class="p-4 text-base text-[#121926] hover:bg-[#F0F4F8] cursor-pointer"
                            onClick={() => handleSelect(option)}
                        >
                            {option}
                        </li>
                    )}
                </For>
            </ul>
        </div>
    );
};

const TextareaInput: Component<{ label: string; placeholder: string }> = (
    props
) => (
    <div class="flex flex-col justify-start items-start gap-4 w-full">
        <label class="text-lg font-medium text-[#121926] leading-relaxed">
            {props.label}
        </label>
        <textarea
            placeholder={props.placeholder}
            rows={5}
            class="self-stretch p-4 border border-[#CDD5DF] rounded-lg text-base font-normal text-[#697586] placeholder-[#697586] focus:border-[#1376A1] focus:ring-1 focus:ring-[#1376A1] transition-colors min-h-[141px]"
        />
    </div>
);

// --- Main Component ---

export const ContactSupportForm: Component = () => {
    const [isChecked, setIsChecked] = createSignal(true);

    const LOCATION_OPTIONS = [
        'United States',
        'Canada',
        'United Kingdom',
        'Germany',
        'Australia',
        'Other',
    ];
    const TOPIC_OPTIONS = [
        'Billing Inquiry',
        'Technical Support',
        'Artisan Vetting',
        'Dispute Resolution',
        'General Question',
        'Other',
    ];

    return (
        <section class="w-full flex justify-center px-4 md:px-16 lg:px-[100px] py-16 md:py-24 bg-[#F8FAFC]">
            <div class="w-full max-w-3xl flex flex-col justify-start items-start gap-6">
                {/* Header/Breadcrumb (Simulated) */}
                <div class="self-stretch p-3 flex justify-start items-center gap-8 border-b border-gray-200">
                    <div class="flex justify-start items-center gap-3">
                        <span class="text-lg font-medium text-[#697586] leading-relaxed">
                            Support
                        </span>
                        <span class="text-lg font-semibold text-[#202939] leading-relaxed">
                            |
                        </span>
                    </div>
                </div>

                {/* Main Content Area */}
                <div class="self-stretch flex flex-col justify-center items-start gap-8">
                    {/* Icon and Info */}
                    <div class="flex flex-col justify-center items-start gap-8">
                        <AbstractSupportIcon />

                        <div class="self-stretch flex flex-col justify-start items-start gap-4">
                            <h3 class="text-3xl font-semibold text-[#0E0D13] leading-snug text-center sm:text-left">
                                PairProfit Customer Support
                            </h3>

                            {/* Things To Know Section */}
                            <div class="self-stretch flex flex-col justify-start items-start gap-4">
                                <div class="flex justify-center items-center gap-2">
                                    <div class="text-2xl font-semibold text-[#0F322E] leading-loose">
                                        |
                                    </div>
                                    <div class="text-xl font-medium text-[#0F322E] leading-loose">
                                        Things To Know
                                    </div>
                                </div>
                                <p class="text-lg font-normal text-[#4B5565] leading-relaxed">
                                    All artisans on our platform undergo a
                                    verification process. We also provide secure
                                    messaging, transparent review systems and a
                                    dedicated support team to assist with any
                                    issues.
                                </p>
                                <p class="text-lg font-normal text-[#4B5565] leading-relaxed">
                                    In case of dispute, our team offers
                                    mediation services to help reach a fair
                                    resolution. We encourage all our users to
                                    communicate clearly and adhere to our
                                    community guidelines. Learn more about our
                                    <a
                                        href="#"
                                        class="text-[#1376A1] font-semibold underline hover:text-[#0E5B7C] transition-colors ml-1"
                                    >
                                        Privacy Policy
                                    </a>
                                    ,
                                    <a
                                        href="#"
                                        class="text-[#1376A1] font-semibold underline hover:text-[#0E5B7C] transition-colors ml-1"
                                    >
                                        Terms & Conditions
                                    </a>
                                    .
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <form class="self-stretch flex flex-col justify-start items-start gap-8 w-full">
                        <div class="self-stretch flex flex-col justify-start items-start gap-6 w-full">
                            {/* Row 1: Name and Email */}
                            <div class="self-stretch flex flex-col sm:flex-row justify-start items-start gap-4 sm:gap-6 w-full">
                                <TextInput
                                    label="What’s your name?"
                                    placeholder="Enter your name"
                                />
                                <TextInput
                                    label="What’s your email address"
                                    placeholder="Enter your email address"
                                />
                            </div>

                            {/* Row 2: Location (Now a functional Select) */}
                            <SelectInput
                                label="What’s your location"
                                placeholder="Select country"
                                options={LOCATION_OPTIONS}
                            />

                            {/* Row 3: Help Topic (Now a functional Select) */}
                            <SelectInput
                                label="What can we help you with?"
                                placeholder="Select questions"
                                options={TOPIC_OPTIONS}
                            />

                            {/* Row 4: Message/Complaint */}
                            <TextareaInput
                                label="What’s your complaint?"
                                placeholder="Describe your complain here"
                            />

                            {/* Row 5: Checkbox Confirmation */}
                            <div
                                class="self-stretch flex justify-start items-center gap-4 cursor-pointer"
                                onClick={() => setIsChecked((prev) => !prev)}
                            >
                                <CheckboxIcon checked={isChecked()} />
                                <span class="flex-1 text-base font-medium text-[#4B5565] leading-relaxed">
                                    Do you want us to send a confirmation of
                                    your request to your email address?
                                </span>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div class="self-stretch flex flex-col justify-start items-center gap-3">
                            <button
                                type="submit"
                                class="self-stretch px-4 py-3 bg-[#1376A1] rounded-lg text-base font-semibold text-white hover:bg-[#0E5B7C] transition-colors h-14"
                            >
                                Submit Request
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};
