import { createSignal } from 'solid-js';
import { CreditCardIcon, InputField, SelectField } from './utils';

export const PaymentMethodView = () => {
    // Form state signals
    const [firstName, setFirstName] = createSignal('Stanley');
    const [lastName, setLastName] = createSignal('Agu');
    const [cardNumber, setCardNumber] = createSignal('');
    const [cvv, setCvv] = createSignal('');
    const [expMonth, setExpMonth] = createSignal('');
    const [expYear, setExpYear] = createSignal('');

    const [country, setCountry] = createSignal('');
    const [city, setCity] = createSignal('Toronto');
    const [address, setAddress] = createSignal('');
    const [state, setState] = createSignal('California');
    const [zipCode, setZipCode] = createSignal('94025');
    const [currency, setCurrency] = createSignal('USD');

    // Mock options for select fields
    const countryOptions = ['USA', 'Canada', 'UK'];
    const stateOptions = ['California', 'New York', 'Texas'];
    const currencyOptions = [
        'U.S dollars (USD)',
        'Canadian dollars (CAD)',
        'Euros (EUR)',
    ];

    // Generate mock months/years
    const monthOptions = Array.from({ length: 12 }, (_, i) =>
        (i + 1).toString().padStart(2, '0')
    );
    const currentYear = new Date().getFullYear();
    const yearOptions = Array.from({ length: 10 }, (_, i) =>
        (currentYear + i).toString()
    );

    const handleSaveChanges = () => {
        console.log('Payment details saved!');
        // Logic to submit form data
    };

    return (
        // Main Content Container
        <div class="flex flex-col gap-8 w-full">
            {/* --- Header Section --- */}
            <div class="flex flex-col gap-1 border-b border-gray-100 pb-4">
                {/* Title: [font-size: 18px; font-weight: 500] */}
                <h2 class="text-xl font-medium text-gray-700">
                    Payment Method
                </h2>
                {/* Subtitle: [font-size: 14px; font-weight: 400] */}
                <p class="text-sm font-normal text-gray-600">
                    Update your billing details and address.
                </p>
            </div>

            {/* --- 1. Card Details Section --- */}
            <div class="flex flex-col gap-5 border-b border-gray-100 pb-8">
                {/* Section Title: [font-size: 16px; font-weight: 600] */}
                <h3 class="text-lg font-semibold text-gray-900">
                    Card details
                </h3>

                <div class="flex flex-col gap-5">
                    {/* First Name / Last Name */}
                    {/* Responsive Grid: 2 columns on desktop, 1 on mobile */}
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                        <InputField
                            label="First name"
                            value={firstName()}
                            placeholder="Stanley"
                            onChange={setFirstName}
                            isHalfWidth
                        />
                        <InputField
                            label="Last name"
                            value={lastName()}
                            placeholder="Agu"
                            onChange={setLastName}
                            isHalfWidth
                        />
                    </div>

                    {/* Card Number / CVV */}
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                        <InputField
                            label="Card number"
                            value={cardNumber()}
                            placeholder="**** **** **** ****"
                            onChange={setCardNumber}
                            type="text" // Keep as text to show asterisks/formatting
                            icon={<CreditCardIcon />}
                            isHalfWidth
                        />
                        <InputField
                            label="CVV"
                            value={cvv()}
                            placeholder="***"
                            onChange={setCvv}
                            type="password"
                            isHalfWidth
                        />
                    </div>

                    {/* Expiration Month / Year */}
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                        <SelectField
                            label="Expiration month"
                            value={expMonth()}
                            placeholder="Month"
                            onChange={setExpMonth}
                            options={monthOptions}
                            isHalfWidth
                        />
                        <SelectField
                            label="Expiration year"
                            value={expYear()}
                            placeholder="Year"
                            onChange={setExpYear}
                            options={yearOptions}
                            isHalfWidth
                        />
                    </div>
                </div>
            </div>

            {/* --- 2. Billing Address Section --- */}
            <div class="flex flex-col gap-5 pb-8">
                {/* Section Title: [font-size: 16px; font-weight: 600] */}
                <h3 class="text-lg font-semibold text-gray-900">
                    Billing address
                </h3>

                <div class="flex flex-col gap-5">
                    {/* Country / City */}
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                        <SelectField
                            label="Country"
                            value={country()}
                            placeholder="Select"
                            onChange={setCountry}
                            options={countryOptions}
                            isHalfWidth
                        />
                        <InputField
                            label="City"
                            value={city()}
                            placeholder="Toronto"
                            onChange={setCity}
                            isHalfWidth
                        />
                    </div>

                    {/* Address (Full Width) */}
                    <div class="w-full">
                        <InputField
                            label="Address"
                            value={address()}
                            placeholder="Enter your street address"
                            onChange={setAddress}
                        />
                    </div>

                    {/* State / Zip Code */}
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                        <SelectField
                            label="State"
                            value={state()}
                            placeholder="Select"
                            onChange={setState}
                            options={stateOptions}
                            isHalfWidth
                        />
                        <InputField
                            label="Zip code"
                            value={zipCode()}
                            placeholder="94025"
                            onChange={setZipCode}
                            type="number"
                            isHalfWidth
                        />
                    </div>

                    {/* Currency (Full Width) */}
                    <div class="w-full max-w-sm">
                        <SelectField
                            label="Currency"
                            value={currency()}
                            placeholder="Select"
                            onChange={setCurrency}
                            options={currencyOptions}
                        />
                    </div>
                </div>
            </div>

            {/* --- Save Changes Button --- */}
            <div class="w-full flex justify-end pt-4 border-t border-gray-100">
                <button
                    onClick={handleSaveChanges}
                    class="py-3 px-6 bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:bg-blue-800 transition-colors text-base"
                >
                    Save changes
                </button>
            </div>
        </div>
    );
};
