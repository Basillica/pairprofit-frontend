import { Component, For, JSX } from 'solid-js';

const SelectField: Component<{
    label: string;
    options: { value: string; text: string }[];
    placeholder: string;
    note?: string;
    class?: string;
}> = (props) => (
    <div class={`flex flex-col gap-2 w-full ${props.class || ''}`}>
        <label class="text-sm sm:text-base font-medium text-gray-800">
            {props.label}
        </label>
        <div class="relative">
            <select class="w-full h-[46px] p-3 appearance-none border border-gray-300 rounded-lg text-sm font-normal text-gray-900 bg-white focus:outline-none focus:ring-1 focus:ring-[#1376A1] transition">
                <option value="" disabled selected>
                    {props.placeholder}
                </option>
                <For each={props.options}>
                    {(option) => (
                        <option value={option.value}>{option.text}</option>
                    )}
                </For>
            </select>
            {/* Custom down arrow */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
            </svg>
        </div>
        {props.note && (
            <p class="text-xs font-medium text-gray-600 max-w-sm pt-1">
                {props.note}
            </p>
        )}
    </div>
);

const MOCK_OPTIONS = {
    countries: [
        { value: 'US', text: 'United States' },
        { value: 'CA', text: 'Canada' },
    ],
    states: [
        { value: 'CA', text: 'California' },
        { value: 'NY', text: 'New York' },
    ],
    currencies: [
        { value: 'USD', text: 'U.S. dollars (USD)' },
        { value: 'EUR', text: 'Euro (EUR)' },
    ],
};

const InputField: Component<{
    label: string;
    placeholder: string;
    type?: string;
    optional?: boolean;
    children?: JSX.Element;
    class?: string;
    inputClass?: string;
}> = (props) => (
    <div class={`flex flex-col gap-2 w-full ${props.class || ''}`}>
        <label class="text-sm sm:text-base font-medium text-gray-800">
            {props.label}
            {props.optional && (
                <span class="text-sm font-medium text-gray-500">
                    {' '}
                    (optional)
                </span>
            )}
        </label>
        <div class="w-full h-[46px] p-3 border border-gray-300 rounded-lg flex items-center gap-3 focus-within:ring-1 focus-within:ring-[#1376A1] transition-shadow">
            {props.children}
            <input
                type={props.type || 'text'}
                placeholder={props.placeholder}
                class={`w-full text-sm font-normal text-gray-900 placeholder-gray-500 bg-white focus:outline-none ${
                    props.inputClass || ''
                }`}
            />
        </div>
    </div>
);

// Component for the PayPay Form content
export const PayPalForm = () => {
    // Signals for form data (using initial values from the previous component)

    return (
        <div
            style={{
                'flex-direction': 'column',
                'justify-content': 'flex-start',
                'align-items': 'flex-start',
                gap: '40px',
                display: 'flex',
                'margin-top': '8px',
            }}
        >
            {/* Informational Text Block */}
            <div
                style={{
                    'align-self': 'stretch',
                    color: '#364152',
                    'font-size': '14px',
                    'font-weight': '400',
                    'line-height': '22.40px',
                    'word-wrap': 'break-word',
                }}
            >
                To complete your purchase with **PayPay**, we will securely
                redirect you to the PayPay website. Please confirm your billing
                country below to proceed.
            </div>

            {/* Simplified Billing Address Section */}
            <div
                style={{
                    'align-self': 'stretch',
                    'flex-direction': 'column',
                    'justify-content': 'flex-start',
                    'align-items': 'flex-start',
                    gap: '32px',
                    display: 'flex',
                }}
            >
                <div class="flex flex-col gap-8 w-full">
                    <h3 class="text-lg font-semibold text-gray-900 leading-normal">
                        Billing address
                    </h3>

                    <div class="flex flex-col gap-5 w-full">
                        {/* Row 5: Country */}
                        <SelectField
                            label="Country"
                            placeholder="United States"
                            options={MOCK_OPTIONS.countries}
                            // class="max-w-full sm:max-w-sm"
                        />

                        {/* Row 6: Address line 1 */}
                        <InputField
                            label="Address line 1"
                            placeholder="1226 University Dr"
                        />

                        {/* Row 7: Address line 2 (optional) */}
                        <InputField
                            label="Address line 2"
                            placeholder="1226 University Dr"
                            optional
                        />

                        {/* Row 8: City / State (Uses flex-wrap for responsiveness) */}
                        <div class="flex flex-col sm:flex-row gap-5 sm:gap-6 w-full">
                            <InputField
                                label="City"
                                placeholder="Menlo Park"
                                class="sm:w-1/2"
                            />
                            <SelectField
                                label="State"
                                placeholder="California"
                                options={MOCK_OPTIONS.states}
                                class="sm:w-1/2"
                            />
                        </div>

                        {/* Row 9: ZIP code */}
                        <div class="flex flex-col sm:flex-row gap-5 sm:gap-6 w-full">
                            <InputField
                                label="ZIP code"
                                placeholder="94025"
                                type="number"
                                inputClass="max-w-[100px]"
                                class="max-w-full sm:max-w-sm"
                            />

                            {/* Row 10: Currency + Note */}
                            <SelectField
                                label="Currency"
                                placeholder="U.S. dollars (USD)"
                                options={MOCK_OPTIONS.currencies}
                                note="Most clients in United States choose SGD to avoid reconciliation discrepancies."
                                class="max-w-full sm:max-w-sm"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Connect Button (Primary Action) */}
            <button
                type="button"
                class="px-4 py-3 border border-[#1376A1] text-[#1376A1] font-semibold rounded-lg hover:bg-blue-50 transition-colors"
            >
                Connect and Pay with PayPay
            </button>
        </div>
    );
};
