import {
    Accessor,
    type Component,
    createSignal,
    For,
    JSX,
    Setter,
    Show,
} from 'solid-js';
import { Portal } from 'solid-js/web';
import Paypal from './../../../assets/client/paypal.svg';
import { PayPalForm } from '../pages/payment/Paypal';

// --- Icon & Helper Components ---

// Back/Close Arrow Icon
const BackIcon: Component = () => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M15 19.9201L8.47997 13.4001C7.70997 12.6301 7.70997 11.3701 8.47997 10.6001L15 4.08008"
            stroke="#292D32"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
    </svg>
);

// Mastercard Icon (for input field)
const CardIcon: Component = () => (
    <div class="w-[26px] h-[20px] relative flex-shrink-0">
        <div class="w-[23.41px] h-0.8 left-[1.32px] top-[16.94px] absolute bg-black"></div>
        <div class="w-[7.02px] h-[12.49px] left-[9.48px] top-[1.70px] absolute bg-[#FF5F00]"></div>
        <div class="w-[12.97px] h-[15.89px] left-0 top-0 absolute bg-[#EB001B]"></div>
        <div class="w-[12.97px] h-[15.89px] left-[13px] top-0 absolute bg-[#F79E1B]"></div>
    </div>
);

// Lock Icon (for Securely Stored label)
const LockIcon: Component = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-5 h-5 text-gray-500"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
    >
        <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-1.5 6h12a2.25 2.25 0 0 0 2.25-2.25v-6a2.25 2.25 0 0 0-2.25-2.25h-12a2.25 2.25 0 0 0-2.25 2.25v6a2.25 2.25 0 0 0 2.25 2.25Z"
        />
    </svg>
);

// 6. Custom Input Field Component (Now uses actual <input> tag)
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

// 7. Custom Select Field Component (Now uses actual <select> tag)
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

// --- Mock Data for Select Fields ---
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

const RadioButton = (props: any) => {
    const isSelected = () => props.selectedMethod === props.methodName;

    // Selected state: Green filled circle
    const SelectedState = () => (
        <div
            style={{
                width: '24px',
                height: '24px',
                position: 'relative',
                background: 'var(--Green, #34A853)',
                overflow: 'hidden',
                'border-radius': '20px',
            }}
        >
            <div
                style={{
                    width: '12px',
                    height: '12px',
                    left: '6px',
                    top: '6px',
                    position: 'absolute',
                    'border-radius': '20px',
                    border: '1px white solid',
                }}
            />
        </div>
    );

    // Unselected state: Grey outlined circle
    const UnselectedState = () => (
        <div
            style={{
                width: '20px',
                height: '20px',
                position: 'relative',
                'border-radius': '20px',
                outline: '1.50px #CDD5DF solid',
            }}
        />
    );

    return (
        <div style={{ 'min-width': '24px', 'min-height': '24px' }}>
            <Show when={isSelected()} fallback={<UnselectedState />}>
                <SelectedState />
            </Show>
        </div>
    );
};

// --- Main Form Component ---
export const AddBillingMethodForm: Component<{
    isOpen: Accessor<boolean>;
    closeModal: Setter<boolean>;
}> = (props) => {
    const [selectedMethod, setSelectedMethod] = createSignal('card');
    return (
        // Outer container: Simulates a side-sheet/modal. Full width on mobile,
        // fixed max-width on desktop to match the original wide layout.
        <Portal>
            <Show when={props.isOpen()}>
                <div
                    class="flex justify-center p-4 pt-200 h-screen overflow-y-auto"
                    classList={{
                        'modal-overlay': true,
                        active: props.isOpen(),
                    }}
                >
                    <form class="w-full max-w-2xl p-8 sm:p-10 lg:p-12 bg-white rounded-xl border border-gray-200 shadow-xl flex flex-col gap-8 flex-shrink-0">
                        {/* Header Section */}
                        <div class="flex flex-col gap-4">
                            <button
                                onClick={() =>
                                    props.closeModal(!props.isOpen())
                                }
                                aria-label="Back"
                                class="w-8 h-8 p-1 rounded-full hover:bg-gray-100 transition"
                            >
                                <BackIcon />
                            </button>
                            <h2 class="text-2xl sm:text-3xl font-medium text-gray-900 leading-tight">
                                Add a billing method
                            </h2>
                        </div>

                        {/* Form Content Area */}
                        <div class="flex flex-col gap-10 w-full">
                            {/* Payment Method Selection */}
                            <div
                                style={{
                                    'align-self': 'stretch',
                                    'padding-top': '16px',
                                    'padding-bottom': '16px',
                                    'border-bottom': '1px #CDD5DF solid',
                                    'justify-content': 'flex-start',
                                    'align-items': 'center',
                                    gap: '20px',
                                    display: 'inline-flex',
                                    cursor: 'pointer',
                                }}
                                onClick={() => setSelectedMethod('card')}
                            >
                                <div
                                    style={{
                                        'justify-content': 'flex-start',
                                        'align-items': 'center',
                                        gap: '8px',
                                        display: 'flex',
                                    }}
                                >
                                    <RadioButton
                                        selectedMethod={selectedMethod()}
                                        methodName="card"
                                    />
                                    <div
                                        style={{
                                            color: '#0D121C',
                                            'font-size': '18px',
                                            'font-weight': '500',
                                            'line-height': '28.80px',
                                            'word-wrap': 'break-word',
                                        }}
                                    >
                                        Payment card
                                    </div>
                                </div>
                                <div
                                    style={{
                                        color: '#364152',
                                        'font-size': '16px',
                                        'font-weight': '400',
                                        'line-height': '25.60px',
                                        'word-wrap': 'break-word',
                                    }}
                                >
                                    Visa, Mastercard, American Express,
                                    Discover, Diners
                                </div>
                            </div>

                            {/* Card and Billing Address Details Form */}
                            {selectedMethod() === 'card' && (
                                <div class="flex flex-col gap-10 w-full pl-6 sm:pl-0">
                                    {/* Card Details Group */}
                                    <div class="flex flex-col gap-5 sm:gap-8">
                                        <h3 class="text-lg font-semibold text-gray-900 leading-normal">
                                            Card details
                                        </h3>

                                        {/* Row 1: Card Number */}
                                        <InputField
                                            label="Card number"
                                            placeholder="**** **** ***** ****"
                                            type="tel"
                                        >
                                            <CardIcon />
                                            <div class="flex items-center gap-2 absolute right-3 pr-3">
                                                <LockIcon />
                                                <span class="text-sm font-normal text-gray-600 hidden sm:inline">
                                                    Securely stored
                                                </span>
                                            </div>
                                        </InputField>

                                        {/* Row 2: First Name / Last Name (Uses flex-wrap for responsiveness) */}
                                        <div class="flex flex-col sm:flex-row gap-5 sm:gap-6 w-full">
                                            <InputField
                                                label="First name"
                                                placeholder="Stanley"
                                                class="sm:w-1/2"
                                            />
                                            <InputField
                                                label="Last name"
                                                placeholder="Agu"
                                                class="sm:w-1/2"
                                            />
                                        </div>

                                        {/* Row 3: Expiration Month / Expiration Year (Uses flex-wrap for responsiveness) */}
                                        <div class="flex flex-col sm:flex-row gap-5 sm:gap-6 w-full">
                                            <InputField
                                                label="Expiration month"
                                                placeholder="MM"
                                                type="number"
                                                inputClass="max-w-xs"
                                                class="sm:w-1/2"
                                            />
                                            <InputField
                                                label="Expiration year"
                                                placeholder="YYYY"
                                                type="number"
                                                inputClass="max-w-xs"
                                                class="sm:w-1/2"
                                            />
                                        </div>

                                        {/* Row 4: Security Code (Full width, limited horizontal size) */}
                                        <InputField
                                            label="Security code"
                                            placeholder="***"
                                            type="password"
                                            inputClass="max-w-[100px]"
                                            // class="max-w-full sm:max-w-sm"
                                        />
                                    </div>

                                    {/* Billing Address Group */}
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
                                                    options={
                                                        MOCK_OPTIONS.states
                                                    }
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
                                                    options={
                                                        MOCK_OPTIONS.currencies
                                                    }
                                                    note="Most clients in United States choose SGD to avoid reconciliation discrepancies."
                                                    class="max-w-full sm:max-w-sm"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <div class="flex justify-start w-full pt-4">
                                        <button
                                            type="submit"
                                            class="py-3 px-6 bg-[#1376A1] text-white font-semibold text-base rounded-lg hover:bg-opacity-90 transition min-w-[120px]"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </div>
                            )}

                            <div
                                style={{
                                    'align-self': 'stretch',
                                    'padding-top': '20px',
                                    'padding-bottom': '20px',
                                    'border-top': '1px #CDD5DF solid',
                                    'border-bottom': '1px #CDD5DF solid',
                                    'justify-content': 'flex-start',
                                    'align-items': 'center',
                                    gap: '20px',
                                    display: 'inline-flex',
                                    cursor: 'pointer',
                                }}
                                onClick={() => setSelectedMethod('paypal')}
                            >
                                <div
                                    style={{
                                        'justify-content': 'flex-start',
                                        'align-items': 'center',
                                        gap: '12px',
                                        display: 'flex',
                                    }}
                                >
                                    <RadioButton
                                        selectedMethod={selectedMethod()}
                                        methodName="paypal"
                                    />

                                    {/* PayPay Logo/Title Group */}
                                    <div
                                        style={{
                                            'justify-content': 'flex-start',
                                            'align-items': 'center',
                                            gap: '8px',
                                            display: 'flex',
                                        }}
                                    >
                                        {/* Creative Logo Badge */}
                                        <img
                                            src={Paypal}
                                            alt="Company Logo"
                                            style={'width: 80px'}
                                        />
                                    </div>
                                </div>

                                {/* Creative Description */}
                                <div
                                    style={{
                                        color: '#364152',
                                        'font-size': '16px',
                                        'font-weight': '400',
                                        'line-height': '25.60px',
                                        'word-wrap': 'break-word',
                                    }}
                                >
                                    The quick and rewarding way to pay. Connect
                                    for exclusive points and offers.
                                </div>
                            </div>

                            {selectedMethod() === 'paypal' && <PayPalForm />}
                        </div>
                    </form>
                </div>
            </Show>
        </Portal>
    );
};
