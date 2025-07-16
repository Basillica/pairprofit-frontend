import { createSignal, Show } from 'solid-js';

// Define types for your user data
interface Address {
    street: string;
    city: string;
    postalCode: string;
    country: string;
}

interface Notifications {
    email: boolean;
    inApp: boolean;
    sms: boolean;
    promotional: boolean;
}

type UserType = 'customer' | 'artisan' | 'none'; // Added 'none' for flexibility

interface UserData {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    address: Address;
    profilePictureUrl: string;
    userType: UserType;
    notifications: Notifications;
    twoFactorEnabled: boolean;
    // Optional: store the actual File object if you need to upload it later
    profilePictureFile?: File | null;
}

// Dummy User Data (simulating data fetched from backend)
const initialUserData: UserData = {
    id: 'user_123',
    fullName: 'Maximilian Müller',
    email: 'maximilian.m@example.com',
    phone: '+49 170 1234 5678',
    address: {
        street: 'Musterweg 15',
        city: 'Nürnberg',
        postalCode: '90403',
        country: 'Germany',
    },
    profilePictureUrl:
        'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=100&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    userType: 'artisan', // Can be 'customer', 'artisan', or 'none'
    notifications: {
        email: true,
        inApp: true,
        sms: false,
        promotional: true,
    },
    twoFactorEnabled: false,
    profilePictureFile: null, // Initialize with null
};

/**
 * Account Settings Component for SolidJS
 * Manages user profile, security, and notification preferences.
 */
export const AccountSettings = () => {
    const [formData, setFormData] = createSignal<UserData>(initialUserData);
    // profilePicturePreview will be derived from formData.profilePictureUrl
    // No separate signal is strictly needed if profilePictureUrl updates immediately.
    // However, if the URL is only updated after successful upload, a preview signal is useful.
    // For immediate client-side preview, we'll keep it.
    const [profilePicturePreview, setProfilePicturePreview] =
        createSignal<string>(initialUserData.profilePictureUrl);

    // Helper function to update top-level fields
    const updateProfileField = <K extends keyof UserData>(
        field: K,
        value: UserData[K]
    ) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    // Helper function to update address fields
    const updateAddressField = <K extends keyof Address>(
        field: K,
        value: Address[K]
    ) => {
        setFormData((prev) => ({
            ...prev,
            address: {
                ...prev.address,
                [field]: value,
            },
        }));
    };

    // Helper function to update notification fields
    const updateNotificationField = <K extends keyof Notifications>(
        field: K,
        checked: boolean
    ) => {
        setFormData((prev) => ({
            ...prev,
            notifications: {
                ...prev.notifications,
                [field]: checked,
            },
        }));
    };

    const handle2FAToggle = () => {
        setFormData((prev) => ({
            ...prev,
            twoFactorEnabled: !prev.twoFactorEnabled,
        }));
    };

    const handleProfilePictureChange = (event: Event) => {
        const input = event.target as HTMLInputElement;
        const file = input.files?.[0]; // Use optional chaining for safety

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setProfilePicturePreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);

            // Store the actual file in formData for submission
            setFormData((prev) => ({
                ...prev,
                profilePictureFile: file,
            }));
        } else {
            // If no file selected, revert to current URL or a default placeholder
            setProfilePicturePreview(formData().profilePictureUrl);
            setFormData((prev) => ({
                ...prev,
                profilePictureFile: null,
            }));
        }
    };

    const handleSubmit = (event: Event) => {
        event.preventDefault(); // Prevent default form submission

        const currentData = formData();
        console.log('Simulating saving data:', currentData);

        // In a real application, you would send this 'currentData' to your backend API.
        // If you have a file to upload (e.g., currentData.profilePictureFile),
        // you'd typically use FormData and a separate fetch/axios call for the file.
        if (currentData.profilePictureFile) {
            console.log(
                'Simulating uploading profile picture:',
                currentData.profilePictureFile.name
            );
            // Example of how you might prepare for file upload:
            // const formDataToSend = new FormData();
            // formDataToSend.append('profilePicture', currentData.profilePictureFile);
            // formDataToSend.append('userId', currentData.id);
            // fetch('/api/upload-profile-picture', { method: 'POST', body: formDataToSend });
        }

        alert('Settings saved successfully! (Simulated)');
    };

    // Improved 2FA toggle styling directly in JSX via dynamic classes.
    // Removed createEffect for this, as direct class binding is more Solid-idiomatic for this case.
    // The original JS used querySelector which can be brittle; Solid's reactivity handles it.

    return (
        <div class="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h1 class="text-4xl font-extrabold text-gray-900 text-center mb-8">
                Account Settings
            </h1>

            <form onSubmit={handleSubmit} class="space-y-8">
                {/* Profile Information Section */}
                <section class="p-6 bg-blue-50 rounded-lg shadow-inner">
                    <h2 class="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                        <svg
                            class="w-7 h-7 mr-3 text-blue-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            ></path>
                        </svg>
                        Profile Information
                    </h2>
                    <div class="space-y-4">
                        <div>
                            <label
                                for="fullName"
                                class="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                value={formData().fullName}
                                onInput={(e) =>
                                    updateProfileField(
                                        'fullName',
                                        e.currentTarget.value
                                    )
                                }
                                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label
                                for="email"
                                class="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData().email}
                                readOnly
                                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 cursor-not-allowed sm:text-sm"
                            />
                            <p class="mt-1 text-xs text-gray-500">
                                Email address cannot be changed directly here
                                for security reasons. Please contact support.
                            </p>
                        </div>
                        <div>
                            <label
                                for="phone"
                                class="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData().phone}
                                onInput={(e) =>
                                    updateProfileField(
                                        'phone',
                                        e.currentTarget.value
                                    )
                                }
                                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label
                                    for="street"
                                    class="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Street & House No.
                                </label>
                                <input
                                    type="text"
                                    id="street"
                                    name="street"
                                    value={formData().address.street}
                                    onInput={(e) =>
                                        updateAddressField(
                                            'street',
                                            e.currentTarget.value
                                        )
                                    }
                                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                            </div>
                            <div>
                                <label
                                    for="city"
                                    class="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    City
                                </label>
                                <input
                                    type="text"
                                    id="city"
                                    name="city"
                                    value={formData().address.city}
                                    onInput={(e) =>
                                        updateAddressField(
                                            'city',
                                            e.currentTarget.value
                                        )
                                    }
                                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                            </div>
                        </div>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label
                                    for="postalCode"
                                    class="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Postal Code
                                </label>
                                <input
                                    type="text"
                                    id="postalCode"
                                    name="postalCode"
                                    value={formData().address.postalCode}
                                    onInput={(e) =>
                                        updateAddressField(
                                            'postalCode',
                                            e.currentTarget.value
                                        )
                                    }
                                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                            </div>
                            <div>
                                <label
                                    for="country"
                                    class="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Country
                                </label>
                                <input
                                    type="text"
                                    id="country"
                                    name="country"
                                    value={formData().address.country}
                                    readOnly
                                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 cursor-not-allowed sm:text-sm"
                                />
                            </div>
                        </div>
                        <div class="grid grid-cols-1 sm:grid-cols-1 gap-4">
                            <label
                                for="profilePicture"
                                class="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Profile Picture
                            </label>
                            <div class="flex items-center space-x-4">
                                <img
                                    class="h-20 w-20 rounded-full object-cover shadow-md"
                                    src={profilePicturePreview()}
                                    alt="Profile Picture"
                                />
                                <input
                                    style={`width: ${
                                        window.innerWidth < 768 ? '190px' : ''
                                    }`}
                                    type="file"
                                    id="profilePicture"
                                    name="profilePicture"
                                    accept="image/*"
                                    onChange={handleProfilePictureChange}
                                    class="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Account Security Section */}
                <section class="p-6 bg-red-50 rounded-lg shadow-inner">
                    <h2 class="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                        <svg
                            class="w-7 h-7 mr-3 text-red-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v3h8z"
                            ></path>
                        </svg>
                        Account Security
                    </h2>
                    <div class="space-y-4">
                        <div>
                            <a
                                href="#"
                                class="text-blue-600 hover:text-blue-800 font-medium"
                                onClick={(e) => {
                                    e.preventDefault();
                                    alert(
                                        'Simulating: Navigate to Change Password page.'
                                    );
                                }}
                            >
                                Change Password
                            </a>
                            <p class="mt-1 text-sm text-gray-600">
                                Update your account password regularly for
                                better security.
                            </p>
                        </div>
                        <div class="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-md shadow-sm">
                            <span class="text-sm font-medium text-gray-700">
                                Two-Factor Authentication (2FA)
                            </span>
                            <label
                                for="2faToggle"
                                class="flex items-center cursor-pointer"
                            >
                                <div class="relative">
                                    {/* The actual checkbox is hidden, but its state drives the visual toggle */}
                                    <input
                                        type="checkbox"
                                        id="2faToggle"
                                        class="sr-only"
                                        checked={formData().twoFactorEnabled}
                                        onChange={handle2FAToggle}
                                    />
                                    {/* Visual part of the toggle switch, now with dynamic classes directly */}
                                    <div
                                        class={`block w-10 h-6 rounded-full ${
                                            formData().twoFactorEnabled
                                                ? 'bg-blue-600'
                                                : 'bg-gray-300'
                                        }`}
                                    ></div>
                                    <div
                                        class={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${
                                            formData().twoFactorEnabled
                                                ? 'translate-x-full bg-blue-200'
                                                : ''
                                        }`}
                                    ></div>
                                </div>
                                <div class="ml-3 text-gray-700 text-sm">
                                    {formData().twoFactorEnabled ? 'On' : 'Off'}
                                </div>
                            </label>
                        </div>
                    </div>
                </section>

                {/* Notification Preferences Section */}
                <section class="p-6 bg-green-50 rounded-lg shadow-inner">
                    <h2 class="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                        <svg
                            class="w-7 h-7 mr-3 text-green-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                            ></path>
                        </svg>
                        Notification Preferences
                    </h2>
                    <div class="space-y-3">
                        <div class="flex items-center">
                            <input
                                id="emailNotifications"
                                name="emailNotifications"
                                type="checkbox"
                                checked={formData().notifications.email}
                                onChange={(e) =>
                                    updateNotificationField(
                                        'email',
                                        e.currentTarget.checked
                                    )
                                }
                                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label
                                for="emailNotifications"
                                class="ml-3 block text-sm text-gray-700"
                            >
                                Receive email notifications
                            </label>
                        </div>
                        <div class="flex items-center">
                            <input
                                id="inAppNotifications"
                                name="inAppNotifications"
                                type="checkbox"
                                checked={formData().notifications.inApp}
                                onChange={(e) =>
                                    updateNotificationField(
                                        'inApp',
                                        e.currentTarget.checked
                                    )
                                }
                                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label
                                for="inAppNotifications"
                                class="ml-3 block text-sm text-gray-700"
                            >
                                Receive in-app notifications
                            </label>
                        </div>
                        <div class="flex items-center">
                            <input
                                id="smsNotifications"
                                name="smsNotifications"
                                type="checkbox"
                                checked={formData().notifications.sms}
                                onChange={(e) =>
                                    updateNotificationField(
                                        'sms',
                                        e.currentTarget.checked
                                    )
                                }
                                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label
                                for="smsNotifications"
                                class="ml-3 block text-sm text-gray-700"
                            >
                                Receive SMS notifications
                            </label>
                        </div>
                        <div class="flex items-center">
                            <input
                                id="promoNotifications"
                                name="promoNotifications"
                                type="checkbox"
                                checked={formData().notifications.promotional}
                                onChange={(e) =>
                                    updateNotificationField(
                                        'promotional',
                                        e.currentTarget.checked
                                    )
                                }
                                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label
                                for="promoNotifications"
                                class="ml-3 block text-sm text-gray-700"
                            >
                                Receive promotional offers
                            </label>
                        </div>
                    </div>
                </section>

                {/* Payment/Payouts Section (Conditional) */}
                <Show
                    when={
                        formData().userType === 'customer' ||
                        formData().userType === 'artisan'
                    }
                >
                    <section class="p-6 bg-purple-50 rounded-lg shadow-inner">
                        <h2 class="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                            <svg
                                class="w-7 h-7 mr-3 text-purple-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                                ></path>
                            </svg>
                            <span>
                                {formData().userType === 'artisan'
                                    ? 'Payout Settings'
                                    : 'Payment Methods'}
                            </span>
                        </h2>
                        <div class="space-y-4">
                            <Show when={formData().userType === 'customer'}>
                                <div>
                                    <p class="text-gray-700 mb-2">
                                        Manage your saved credit/debit cards or
                                        other payment options.
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            alert(
                                                'Simulating: Go to Add/Manage Payment Methods'
                                            )
                                        }
                                        class="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 text-sm"
                                    >
                                        Add/Manage Payment Methods
                                    </button>
                                </div>
                            </Show>
                            <Show when={formData().userType === 'artisan'}>
                                <div>
                                    <p class="text-gray-700 mb-2">
                                        Manage your bank account details for
                                        receiving payouts.
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            alert(
                                                'Simulating: Go to Add/Manage Payout Account'
                                            )
                                        }
                                        class="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 text-sm"
                                    >
                                        Add/Manage Payout Account
                                    </button>
                                </div>
                            </Show>
                        </div>
                    </section>
                </Show>

                {/* Action Buttons */}
                <div class="pt-5">
                    <div class="flex justify-end">
                        <button
                            type="button"
                            onClick={() => window.history.back()}
                            class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-3"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};
