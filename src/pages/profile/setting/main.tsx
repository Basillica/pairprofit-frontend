import { createEffect, createSignal, Show } from 'solid-js';
import { useAppContext } from '../../../state';

interface AccountFormState {
    firstname: string;
    lastname: string;
    email: string;
    username: string;
    phone: string;
    address: {
        street: string;
        city: string;
        postalCode: string;
        country: string;
    };
    profilePictureUrl: string;
    userType: 'customer' | 'artisan' | 'none';
    notifications: {
        email: boolean;
        inApp: boolean;
        sms: boolean;
        promotional: boolean;
    };
    twoFactorEnabled: boolean;
    profilePictureFile?: File | null;
}

const initialFormState: AccountFormState = {
    firstname: '',
    lastname: '',
    email: '',
    username: '',
    phone: '',
    address: {
        street: '',
        city: '',
        postalCode: '',
        country: '',
    },
    profilePictureUrl: '',
    userType: 'none',
    notifications: {
        email: false,
        inApp: false,
        sms: false,
        promotional: false,
    },
    twoFactorEnabled: false,
    profilePictureFile: null,
};

export const AccountSettings = () => {
    // Get the authenticated user from the global context
    const {
        userType: { authUser },
    } = useAppContext();

    const [profilePicturePreview, setProfilePicturePreview] =
        createSignal<string>('');
    const [formData, setFormData] =
        createSignal<AccountFormState>(initialFormState);

    createEffect(() => {
        const user = authUser();
        if (user) {
            setFormData({
                ...initialFormState,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                username: user.username,
                // For now, i'll keep them as dummy data or default values. TODO:
                phone: '+49 170 1234 5678', // Dummy data
                address: {
                    street: 'Musterweg 15',
                    city: 'Nürnberg',
                    postalCode: '90403',
                    country: 'Germany',
                },
                profilePictureUrl: user.profile_uri,
                userType:
                    (user.role as 'customer' | 'artisan' | 'none') || 'none',
                notifications: {
                    email: user.permissions.includes('emailNotifications'),
                    inApp: user.permissions.includes('inAppNotifications'),
                    sms: user.permissions.includes('smsNotifications'),
                    promotional: user.permissions.includes(
                        'promotionalNotifications'
                    ),
                },
                twoFactorEnabled: user.permissions.includes('2faEnabled'),
            });
            setProfilePicturePreview(user.profile_uri);
        } else {
            // Reset form if the user is logged out
            setFormData(initialFormState);
            setProfilePicturePreview('');
        }
    });

    // Helper function to update top-level fields
    const updateProfileField = <K extends keyof AccountFormState>(
        field: K,
        value: AccountFormState[K]
    ) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    // Helper function to update address fields
    const updateAddressField = <K extends keyof AccountFormState['address']>(
        field: K,
        value: AccountFormState['address'][K]
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
    const updateNotificationField = <
        K extends keyof AccountFormState['notifications']
    >(
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
        const file = input.files?.[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setProfilePicturePreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);

            setFormData((prev) => ({
                ...prev,
                profilePictureFile: file,
            }));
        } else {
            setProfilePicturePreview(formData().profilePictureUrl);
            setFormData((prev) => ({
                ...prev,
                profilePictureFile: null,
            }));
        }
    };

    const handleSubmit = (event: Event) => {
        event.preventDefault();

        const currentData = formData();
        console.log('Simulating saving data:', currentData);

        if (currentData.profilePictureFile) {
            console.log(
                'Simulating uploading profile picture:',
                currentData.profilePictureFile.name
            );
        }
    };

    // Render the component only if authUser exists
    return (
        <Show when={authUser()}>
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
                                    for="firstname"
                                    class="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    id="firstname"
                                    name="firstname"
                                    value={formData().firstname}
                                    onInput={(e) =>
                                        updateProfileField(
                                            'firstname',
                                            e.currentTarget.value
                                        )
                                    }
                                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                            </div>
                            <div>
                                <label
                                    for="lastname"
                                    class="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    id="lastname"
                                    name="lastname"
                                    value={formData().lastname}
                                    onInput={(e) =>
                                        updateProfileField(
                                            'lastname',
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
                                    Email address cannot be changed directly
                                    here for security reasons.
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
                                            window.innerWidth < 768
                                                ? '190px'
                                                : ''
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
                                        <input
                                            type="checkbox"
                                            id="2faToggle"
                                            class="sr-only"
                                            checked={
                                                formData().twoFactorEnabled
                                            }
                                            onChange={handle2FAToggle}
                                        />
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
                                        {formData().twoFactorEnabled
                                            ? 'On'
                                            : 'Off'}
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
                                    checked={
                                        formData().notifications.promotional
                                    }
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
                                            Manage your saved credit/debit cards
                                            or other payment options.
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
        </Show>
    );
};
