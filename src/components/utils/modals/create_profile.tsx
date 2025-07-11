import { Accessor, Component, createSignal, For, Setter, Show } from 'solid-js';
import { Portal } from 'solid-js/web';
import modal_styles from './style.module.css';
import { ArtisanModel } from '../../../models/profile';

export const CreateProviderProfileComponent: Component<{
    isOpen: Accessor<boolean>;
    closeModal: Setter<boolean>;
}> = (props) => {
    // State for form fields
    const [fullName, setFullName] = createSignal('');
    const [specialization, setSpecialization] = createSignal('');
    const [profilePicturePreview, setProfilePicturePreview] = createSignal<
        string | undefined
    >('https://picsum.photos/200?random=2');
    const [uploadedFiles, setUploadedFiles] = createSignal<
        { file: File; previewUrl: string; mimeType: string }[]
    >([]);
    const [selectedFile, setSelectedFile] = createSignal<File>();
    const [agreeTerms, setAgreeTerms] = createSignal(false);
    const [formData, setFormData] = createSignal<ArtisanModel>({
        id: '',
        user_id: '',
        name: '',
        category: '',
        sub_category: '',
        profile_picture: '',
        followers: 0,
        specialization: '',
        certifications: '',
        bio: '',
        overall_rating: 0,
        total_reviews: 0,
        location: '',
        years_in_business: 0,
        business_name: '',
        business_registration: '',
        contact_preferences: [],
        ratingBreakdown: {
            '5': 0,
            '4': 0,
            '3': 0,
            '2': 0,
            '1': 0,
        },
        testimonials: [],
        services_offered: [],
        public_updates: [],
    });

    const handleTextArea = (
        e: InputEvent & {
            currentTarget: HTMLTextAreaElement;
            target: HTMLTextAreaElement;
        }
    ) => {
        e.preventDefault();
        e.stopPropagation();
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleInputChange = (
        e: InputEvent & {
            currentTarget: HTMLInputElement;
            target: HTMLInputElement;
        }
    ) => {
        e.preventDefault();
        e.stopPropagation();
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSelect = (
        e: InputEvent & {
            currentTarget: HTMLSelectElement;
            target: HTMLSelectElement;
        }
    ) => {
        e.preventDefault();
        e.stopPropagation();
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const slugify = (str: string) => {
        str = str.replace(/^\s+|\s+$/g, ''); // trim leading/trailing white space
        str = str.toLowerCase(); // convert string to lowercase
        str = str
            .replace(/[^a-z0-9 -]/g, '') // remove any non-alphanumeric characters
            .replace(/\s+/g, '-') // replace spaces with hyphens
            .replace(/-+/g, '-'); // remove consecutive hyphens
        return str;
    };

    const handleFileChange = (
        e: InputEvent & {
            currentTarget: HTMLInputElement;
            target: HTMLInputElement;
        }
    ) => {
        const file = e.target.files![0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                setProfilePicturePreview(e.target!.result as string);
            };
            reader.readAsDataURL(file);
        }

        const files: File[] = Array.from(e.target.files!);
        const newFilesToUpload: {
            file: File;
            previewUrl: string;
            mimeType: string;
        }[] = [];
        files.forEach((file) => {
            if (file.size > 5 * 1024 * 1024) {
                // 5MB limit
                alert(`File "${file.name}" is too large. Max 5MB per file.`);
            } else {
                newFilesToUpload.push({
                    file: file,
                    previewUrl: file.name,
                    mimeType: file.type,
                });
            }
        });

        setUploadedFiles((prev) => [...prev, ...newFilesToUpload]);
        e.target.value = '';
    };

    // Form submission handler
    const handleSubmit = (
        event: SubmitEvent & {
            currentTarget: HTMLFormElement;
            target: Element;
        }
    ) => {
        event.preventDefault(); // Prevent default form submission
    };

    return (
        <Portal>
            <Show when={props.isOpen()}>
                <div
                    classList={{
                        'modal-overlay': true,
                        active: props.isOpen(),
                    }}
                    class="fixed inset-0 bg-gray-200 bg-opacity-75 mt-10 flex items-center justify-center p-4 transition-opacity duration-300 ease-out"
                >
                    <div class={modal_styles.modal_content}>
                        <div class="max-w-4xl w-full bg-white p-8 rounded-lg shadow-lg">
                            <h1 class="text-3xl font-extrabold text-gray-900 text-center mb-8">
                                Create Your Service Provider Profile
                            </h1>
                            <p class="text-gray-600 text-center mb-8">
                                Tell us about yourself and your services. This
                                profile will help customers find and trust you!
                            </p>

                            <form onSubmit={handleSubmit} class="space-y-6">
                                <section class="border-b border-gray-200 pb-6">
                                    <h2 class="text-2xl font-bold text-gray-800 mb-4">
                                        1. Basic Information
                                    </h2>

                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                        <div>
                                            <label
                                                for="providerFullName"
                                                class="block text-sm font-medium text-gray-700"
                                            >
                                                Your Full Name
                                            </label>
                                            <input
                                                type="text"
                                                name="providerFullName"
                                                id="providerFullName"
                                                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                placeholder="e.g., John Doe"
                                                value={fullName()}
                                                onInput={(e) =>
                                                    setFullName(e.target.value)
                                                }
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label
                                                for="providerSpecialization"
                                                class="block text-sm font-medium text-gray-700"
                                            >
                                                Your Main
                                                Specialization/Profession
                                            </label>
                                            <input
                                                type="text"
                                                name="providerSpecialization"
                                                id="providerSpecialization"
                                                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                placeholder="e.g., Expert Carpenter, Freelance Web Developer"
                                                value={specialization()}
                                                onInput={(e) =>
                                                    setSpecialization(
                                                        e.target.value
                                                    )
                                                }
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div class="mb-6">
                                        <label
                                            for="attachments"
                                            class="block text-sm font-medium text-gray-700"
                                        >
                                            Profile Picture
                                        </label>
                                        <div class="mt-1 flex items-center space-x-4">
                                            <img
                                                src={profilePicturePreview()}
                                                alt="Profile Preview"
                                                class="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
                                            />
                                            <label
                                                for="attachments"
                                                class="relative cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                                            >
                                                <span>Upload a photo</span>
                                                <input
                                                    id="attachments"
                                                    name="attachments"
                                                    type="file"
                                                    class="sr-only"
                                                    accept="image/png, image/jpeg"
                                                    onInput={(e) =>
                                                        handleFileChange(e)
                                                    }
                                                    onChange={(e) =>
                                                        console.log(
                                                            e.target,
                                                            '..........'
                                                        )
                                                    }
                                                />
                                            </label>
                                        </div>
                                        <p class="mt-2 text-xs text-gray-500">
                                            JPG, PNG, GIF up to 5MB.
                                            Recommended: square aspect ratio.
                                        </p>
                                    </div>

                                    <div>
                                        <label
                                            for="providerBio"
                                            class="block text-sm font-medium text-gray-700"
                                        >
                                            Short Bio / About Me
                                        </label>
                                        <textarea
                                            name="bio"
                                            id="providerBio"
                                            rows="5"
                                            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            placeholder="Introduce yourself, your experience, and what makes your services unique."
                                            value={formData().bio}
                                            onInput={(e) => handleTextArea(e)}
                                            required
                                        ></textarea>
                                    </div>
                                </section>

                                <section class="border-b border-gray-200 pb-6 pt-6">
                                    <h2 class="text-2xl font-bold text-gray-800 mb-4">
                                        2. Location & Contact
                                    </h2>
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                                        <div>
                                            <label
                                                for="location"
                                                class="block text-sm font-medium text-gray-700"
                                            >
                                                Your Base Location (City,
                                                Country)
                                            </label>
                                            <input
                                                type="text"
                                                name="location"
                                                id="location"
                                                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                placeholder="e.g., Nuremberg, Germany"
                                                value={formData().location}
                                                onInput={(e) =>
                                                    handleInputChange(e)
                                                }
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label
                                                for="serviceRadius"
                                                class="block text-sm font-medium text-gray-700"
                                            >
                                                Service Radius (Optional, e.g.,
                                                "50km", "Local")
                                            </label>
                                            <input
                                                type="text"
                                                name="serviceRadius"
                                                id="serviceRadius"
                                                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                placeholder="e.g., 20km, Region-wide"
                                                // value={formData()}
                                                // onInput={(e) =>
                                                //     setServiceRadius(
                                                //         e.target.value
                                                //     )
                                                // }
                                            />
                                        </div>
                                    </div>

                                    <div class="mb-4">
                                        <label class="block text-sm font-medium text-gray-700">
                                            Specific Service Areas (Add multiple
                                            cities/regions you serve)
                                        </label>
                                        <div
                                            id="serviceAreasContainer"
                                            class="space-y-2 mt-2"
                                        >
                                            <For
                                                each={
                                                    formData().services_offered
                                                }
                                            >
                                                {(service, i) => (
                                                    <div class="flex items-center gap-2">
                                                        <input
                                                            type="text"
                                                            name="serviceAreas[]"
                                                            class="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                            placeholder={
                                                                i() === 0
                                                                    ? 'e.g., Fürth'
                                                                    : 'e.g., Another City'
                                                            }
                                                            value={
                                                                service.title
                                                            }
                                                            // onInput={(e) => updateServiceArea(i(), e.target.value)}
                                                        />
                                                        <Show
                                                            when={
                                                                formData()
                                                                    .services_offered
                                                                    .length > 1
                                                            }
                                                        >
                                                            <button
                                                                type="button"
                                                                // onClick={() =>
                                                                //     removeServiceArea(
                                                                //         i()
                                                                //     )
                                                                // }
                                                                class="remove-service-area-btn text-red-600 hover:text-red-800 text-sm font-medium"
                                                            >
                                                                Remove
                                                            </button>
                                                        </Show>
                                                    </div>
                                                )}
                                            </For>
                                        </div>
                                        <button
                                            type="button"
                                            // onClick={addServiceArea}
                                            class="mt-2 inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                        >
                                            Add Service Area
                                        </button>
                                    </div>

                                    <div>
                                        <label class="block text-sm font-medium text-gray-700">
                                            Preferred Contact Methods for
                                            Customers
                                        </label>
                                        <div class="mt-2 space-y-2">
                                            <div class="flex items-center">
                                                <input
                                                    id="contactChat"
                                                    name="contactMethods"
                                                    type="checkbox"
                                                    value="Platform Chat (Recommended)"
                                                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                    checked={formData().contact_preferences.includes(
                                                        'Platform Chat (Recommended)'
                                                    )}
                                                    // onChange={
                                                    //     handleContactMethodChange
                                                    // }
                                                />
                                                <label
                                                    for="contactChat"
                                                    class="ml-2 block text-sm text-gray-900"
                                                >
                                                    Platform Chat (Recommended)
                                                </label>
                                            </div>
                                            <div class="flex items-center">
                                                <input
                                                    id="contactEmail"
                                                    name="contactMethods"
                                                    type="checkbox"
                                                    value="Email"
                                                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                    checked={formData().contact_preferences.includes(
                                                        'Email'
                                                    )}
                                                    // onChange={
                                                    //     handleContactMethodChange
                                                    // }
                                                />
                                                <label
                                                    for="contactEmail"
                                                    class="ml-2 block text-sm text-gray-900"
                                                >
                                                    Email (if selected, ensure
                                                    your email is on file)
                                                </label>
                                            </div>
                                            <div class="flex items-center">
                                                <input
                                                    id="contactPhone"
                                                    name="contactMethods"
                                                    type="checkbox"
                                                    value="Phone"
                                                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                    checked={formData().contact_preferences.includes(
                                                        'Phone'
                                                    )}
                                                    // onChange={
                                                    //     handleContactMethodChange
                                                    // }
                                                />
                                                <label
                                                    for="contactPhone"
                                                    class="ml-2 block text-sm text-gray-900"
                                                >
                                                    Phone (if selected, ensure
                                                    your phone number is on
                                                    file)
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                <section class="border-b border-gray-200 pb-6 pt-6">
                                    <h2 class="text-2xl font-bold text-gray-800 mb-4">
                                        3. Business Details (Optional)
                                    </h2>
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label
                                                for="business_name"
                                                class="block text-sm font-medium text-gray-700"
                                            >
                                                Legal Business Name
                                            </label>
                                            <input
                                                type="text"
                                                name="business_name"
                                                id="business_name"
                                                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                placeholder="e.g., John Doe Carpentry GmbH"
                                                value={formData().business_name}
                                                onInput={(e) =>
                                                    handleInputChange(e)
                                                }
                                            />
                                        </div>
                                        <div>
                                            <label
                                                for="business_registration"
                                                class="block text-sm font-medium text-gray-700"
                                            >
                                                Business ID (e.g., VAT ID, Trade
                                                Register)
                                            </label>
                                            <input
                                                type="text"
                                                name="business_registration"
                                                id="business_registration"
                                                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                placeholder="e.g., DE123456789, HRB12345"
                                                value={
                                                    formData()
                                                        .business_registration
                                                }
                                                onInput={(e) =>
                                                    handleInputChange(e)
                                                }
                                            />
                                        </div>
                                        <div class="col-span-full">
                                            <label
                                                for="years_in_business"
                                                class="block text-sm font-medium text-gray-700"
                                            >
                                                Years in Business
                                            </label>
                                            <input
                                                type="number"
                                                name="years_in_business"
                                                id="years_in_business"
                                                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                min="0"
                                                placeholder="e.g., 10"
                                                value={
                                                    formData().years_in_business
                                                }
                                                onInput={(e) =>
                                                    handleInputChange(e)
                                                }
                                            />
                                        </div>
                                    </div>
                                </section>

                                <section class="border-b border-gray-200 pb-6 pt-6">
                                    <h2 class="text-2xl font-bold text-gray-800 mb-4">
                                        4. Your Skills
                                    </h2>
                                    <div>
                                        <label
                                            for="providerSkills"
                                            class="block text-sm font-medium text-gray-700"
                                        >
                                            List your key skills
                                            (comma-separated)
                                        </label>
                                        <input
                                            type="text"
                                            name="providerSkills"
                                            id="providerSkills"
                                            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            placeholder="e.g., Custom Furniture, Wood Carving, Deck Building, Renovation"
                                            value={'teste'}
                                            // onInput={(e) =>
                                            //     setProviderSkills(
                                            //         e.target.value
                                            //     )
                                            // }
                                        />
                                        <p class="mt-2 text-sm text-gray-500">
                                            These skills will help customers
                                            find you when searching for specific
                                            expertise.
                                        </p>
                                    </div>
                                </section>

                                <section class="border-b border-gray-200 pb-6 pt-6">
                                    <h2 class="text-2xl font-bold text-gray-800 mb-4">
                                        5. Your Services & Portfolio
                                    </h2>
                                    <div class="bg-blue-50 border border-blue-200 p-4 rounded-md">
                                        <p class="text-blue-800 font-medium">
                                            Once your profile is complete, you
                                            can start listing the specific
                                            services you offer!
                                        </p>
                                        <p class="text-blue-700 text-sm mt-2">
                                            Each service listing will include
                                            details like pricing, availability,
                                            and description. You'll be able to
                                            link your portfolio items to these
                                            listings.
                                        </p>
                                        <button
                                            type="button"
                                            class="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                        >
                                            Create Your First Service Listing
                                            (After Profile Creation)
                                        </button>
                                    </div>
                                </section>

                                <section class="border-b border-gray-200 pb-6 pt-6">
                                    <h2 class="text-2xl font-bold text-gray-800 mb-4">
                                        6. Ratings & Testimonials
                                    </h2>
                                    <div class="bg-green-50 border border-green-200 p-4 rounded-md">
                                        <p class="text-green-800 font-medium">
                                            Your reputation will grow as you
                                            provide excellent services!
                                        </p>
                                        <p class="text-green-700 text-sm mt-2">
                                            Customers will be able to leave
                                            ratings and reviews after completing
                                            a service with you. These will
                                            automatically appear on your public
                                            profile.
                                        </p>
                                    </div>
                                </section>

                                <section class="pt-6">
                                    <h2 class="text-2xl font-bold text-gray-800 mb-4">
                                        7. Public Updates & Project Spotlights
                                    </h2>
                                    <div class="bg-purple-50 border border-purple-200 p-4 rounded-md">
                                        <p class="text-purple-800 font-medium">
                                            Showcase your best work and keep
                                            customers informed!
                                        </p>
                                        <p class="text-purple-700 text-sm mt-2">
                                            After creating your profile, you'll
                                            have a dedicated section to post
                                            project spotlights, important
                                            announcements, or share insights
                                            about your activities.
                                        </p>
                                    </div>
                                </section>

                                <div class="pt-8">
                                    <div class="flex items-center">
                                        <input
                                            id="agreeTerms"
                                            name="agreeTerms"
                                            type="checkbox"
                                            class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                            checked={agreeTerms()}
                                            onChange={(e) =>
                                                setAgreeTerms(e.target.checked)
                                            }
                                        />
                                        <label
                                            for="agreeTerms"
                                            class="ml-2 block text-sm text-gray-900"
                                        >
                                            I agree to the{' '}
                                            <a
                                                href="#"
                                                class="text-blue-600 hover:text-blue-500"
                                            >
                                                Provider Terms of Service
                                            </a>{' '}
                                            and{' '}
                                            <a
                                                href="#"
                                                class="text-blue-600 hover:text-blue-500"
                                            >
                                                Privacy Policy
                                            </a>
                                            .
                                        </label>
                                    </div>
                                </div>

                                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <button
                                        type="button"
                                        onClick={() => props.closeModal(false)}
                                        class={`${modal_styles.cancel_button}`}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        class={`${modal_styles.submit_button}`}
                                    >
                                        Create
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Show>
        </Portal>
    );
};
