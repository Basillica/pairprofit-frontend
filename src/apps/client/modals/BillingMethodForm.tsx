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
    <svg
        width="29"
        height="22"
        viewBox="0 0 29 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M5.273 21.89v-1.456c0-.558-.348-.922-.945-.922-.298 0-.622.097-.845.413-.174-.267-.423-.413-.796-.413a.81.81 0 0 0-.696.34v-.291h-.522v2.33h.522v-1.287c0-.412.224-.606.572-.606s.522.218.522.606v1.287h.522v-1.287c0-.412.249-.606.572-.606.348 0 .522.218.522.606v1.287zm7.733-2.33h-.845v-.703h-.522v.704h-.473v.46h.473v1.069c0 .534.223.85.82.85.224 0 .473-.074.647-.17l-.15-.438a.83.83 0 0 1-.447.122c-.249 0-.348-.146-.348-.389v-1.043h.845zm4.426-.048a.7.7 0 0 0-.621.34v-.291h-.523v2.33h.523v-1.31c0-.39.174-.608.497-.608.1 0 .224.025.323.049l.15-.485c-.1-.025-.25-.025-.349-.025m-6.689.243c-.248-.17-.596-.243-.97-.243-.596 0-.994.292-.994.753 0 .388.298.606.82.68l.25.024c.273.048.422.12.422.242 0 .17-.199.291-.547.291s-.622-.121-.796-.242l-.248.388c.273.194.646.291 1.019.291.696 0 1.094-.315 1.094-.752 0-.413-.323-.631-.82-.704l-.25-.024c-.223-.024-.397-.073-.397-.218 0-.17.174-.267.448-.267.298 0 .596.12.746.194zm13.875-.243a.7.7 0 0 0-.621.34v-.291h-.523v2.33h.523v-1.31c0-.39.174-.607.497-.607.1 0 .224.024.323.048l.15-.485c-.1-.025-.25-.025-.349-.025m-6.664 1.214c0 .704.498 1.213 1.269 1.213.348 0 .596-.073.845-.267l-.249-.412a1.02 1.02 0 0 1-.621.218c-.423 0-.721-.291-.721-.752 0-.437.298-.728.72-.752.225 0 .423.072.622.218l.249-.413c-.249-.194-.497-.267-.845-.267-.771 0-1.269.51-1.269 1.214m4.824 0V19.56h-.522v.291c-.174-.218-.422-.34-.746-.34-.671 0-1.193.51-1.193 1.214s.522 1.213 1.193 1.213c.348 0 .597-.121.746-.34v.292h.522zm-1.914 0c0-.413.273-.752.72-.752.423 0 .722.315.722.752 0 .412-.299.752-.721.752-.448-.024-.721-.34-.721-.752m-6.241-1.214c-.697 0-1.194.486-1.194 1.214s.497 1.213 1.218 1.213c.348 0 .697-.097.97-.315l-.249-.364a1.2 1.2 0 0 1-.696.242c-.323 0-.646-.145-.721-.558h1.765v-.194c.026-.752-.422-1.238-1.093-1.238m0 .437c.322 0 .547.194.596.558h-1.243c.05-.315.273-.558.646-.558m12.954.777v-2.087h-.522v1.213c-.174-.218-.423-.34-.746-.34-.671 0-1.193.51-1.193 1.214s.522 1.213 1.193 1.213c.348 0 .597-.121.746-.34v.292h.522zm-1.914 0c0-.413.273-.752.72-.752.424 0 .722.315.722.752 0 .412-.299.752-.721.752-.448-.024-.721-.34-.721-.752m-17.456 0V19.56h-.522v.291c-.174-.218-.423-.34-.746-.34-.672 0-1.194.51-1.194 1.214s.522 1.213 1.194 1.213c.348 0 .597-.121.746-.34v.292h.522zm-1.94 0c0-.413.274-.752.722-.752.422 0 .72.315.72.752 0 .412-.298.752-.72.752-.448-.024-.722-.34-.722-.752"
            fill="#000"
        />
        <path d="M10.57 1.869h7.832v13.736h-7.833z" fill="#FF5F00" />
        <path
            d="M11.067 8.737c0-2.791 1.342-5.267 3.406-6.868A9.04 9.04 0 0 0 8.953 0C4.005 0 .002 3.907.002 8.737s4.003 8.737 8.951 8.737a9.04 9.04 0 0 0 5.52-1.869 8.65 8.65 0 0 1-3.406-6.868"
            fill="#EB001B"
        />
        <path
            d="M28.97 8.737c0 4.83-4.004 8.737-8.952 8.737a9.04 9.04 0 0 1-5.52-1.869c2.089-1.602 3.407-4.077 3.407-6.868s-1.343-5.267-3.407-6.868A9.04 9.04 0 0 1 20.018 0c4.948 0 8.952 3.932 8.952 8.737"
            fill="#F79E1B"
        />
    </svg>
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
