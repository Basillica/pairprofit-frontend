import {
    Component,
    createSignal,
    createEffect,
    Accessor,
    For,
    Show,
    onMount,
    createMemo,
} from 'solid-js';
import { Portal } from 'solid-js/web';
import modal_styles from './style.module.css';
import { ArtisanModel } from '../../../models/profile';
import {
    TestimonialInput,
    OfferedServiceInput,
    PublicUpdateInput,
} from './utils';
import { SecureLocalStorage, LocalStorageKey } from '../../../lib/localstore';

interface ApiCategoriesResponse {
    [key: string]: string[];
}
/**
 * This modal allows users to edit their artisan profile details.
 * It uses the ArtisanModel for data structure and handles form input,
 * file uploads for profile pictures, and submission of updated data.
 *
 * Props:
 * - show: boolean - Controls the visibility of the modal.
 * - artisanProfile: Accessor<ArtisanModel | undefined> - The current artisan profile data to be edited.
 * - onClose: () => void - Callback function to close the modal.
 * - onSave: (updatedProfile: ArtisanModel) => void - Callback function to save the updated profile.
 */
export const ViewProfileModal: Component<{
    show: boolean;
    artisanProfile: Accessor<ArtisanModel | undefined>;
    onClose: () => void;
}> = (props) => {
    // Refs for direct DOM access, particularly for file input and image preview
    let profilePictureUploadRef: HTMLInputElement | undefined;
    let profilePicturePreviewRef: HTMLImageElement | undefined;

    // Default placeholder image for the profile picture
    const DEFAULT_PROFILE_PICTURE =
        'https://placehold.co/100x100/E0E0E0/808080?text=Profile';

    // SolidJS signal to manage the form data.
    // Initialized with default values conforming to ArtisanModel.
    const [formData, setFormData] = createSignal<ArtisanModel>({
        id: '',
        user_id: '',
        name: '',
        category: '',
        sub_category: '',
        profile_picture: DEFAULT_PROFILE_PICTURE,
        followers: 0,
        specialization: '',
        certifications: [],
        bio: '',
        overall_rating: 0,
        total_reviews: 0,
        location: '',
        years_in_business: 0,
        business_name: '',
        business_registration: '',
        contact_preferences: [],
        rating_breakdown: { '5': 0, '4': 0, '3': 0, '2': 0, '1': 0 },
        testimonials: [
            {
                id: 2,
                reviewer: 'anthony',
                rating: 4,
                date: '',
                comment: 'string',
                service_title: '',
            },
        ],
        services_offered: [],
        public_updates: [],
    });
    const [categories, setCategories] = createSignal<string[]>([]);
    const [apiCategories, setApiCategories] =
        createSignal<ApiCategoriesResponse>({});
    const subCategories = createMemo(
        () => apiCategories()[formData()!.category]
    );
    /**
     * createEffect hook to synchronize formData with the artisanProfile prop.
     * This ensures that when the modal opens with a new profile, the form fields are populated.
     */
    createEffect(() => {
        if (props.artisanProfile()) {
            // Merge the existing formData defaults with the incoming artisanProfile data.
            // This ensures all ArtisanModel fields are present and correctly typed.
            setFormData((prev) => ({
                ...prev, // Retain default values for fields not explicitly provided by artisanProfile
                ...props.artisanProfile(),
                // Ensure array/object fields are always initialized to prevent issues if they are null/undefined
                contact_preferences: props.artisanProfile()?.contact_preferences
                    ? [...props.artisanProfile()!.contact_preferences]
                    : [],
                testimonials: props.artisanProfile()?.testimonials
                    ? props
                          .artisanProfile()!
                          .testimonials.map((t) => ({ ...t }))
                    : [],
                services_offered: props.artisanProfile()?.services_offered
                    ? props
                          .artisanProfile()!
                          .services_offered.map((s) => ({ ...s }))
                    : [],
                public_updates: props.artisanProfile()?.public_updates
                    ? props
                          .artisanProfile()!
                          .public_updates.map((p) => ({ ...p }))
                    : [],
                rating_breakdown: props.artisanProfile()?.rating_breakdown
                    ? { ...props.artisanProfile()!.rating_breakdown }
                    : { '5': 0, '4': 0, '3': 0, '2': 0, '1': 0 },
                // Set default profile picture if the incoming profile_picture is missing
                profile_picture:
                    props.artisanProfile()?.profile_picture ||
                    DEFAULT_PROFILE_PICTURE,
            }));
            // Update the profile picture preview immediately if the ref is available
            if (profilePicturePreviewRef) {
                profilePicturePreviewRef.src =
                    props.artisanProfile()?.profile_picture ||
                    DEFAULT_PROFILE_PICTURE;
            }
        } else {
            // If no profile is being edited (e.g., modal is closing or opened without data), reset the form.
            handleClose();
        }
    });

    /**
     * Handles changes for text and number input fields.
     * Updates the corresponding field in the formData signal.
     */
    const handleInputChange = (
        e: InputEvent & {
            currentTarget: HTMLInputElement | HTMLTextAreaElement; // Supports both input and textarea
            target: HTMLInputElement | HTMLTextAreaElement;
        }
    ) => {
        const { name, value } = e.target;
        // Special handling for numeric inputs like 'years_in_business'
        if (name === 'years_in_business') {
            setFormData((prev) => ({ ...prev, [name]: parseInt(value) || 0 }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    /**
     * Handles changes for checkbox inputs, specifically for 'contact_preferences'.
     * Adds or removes the value from the contact_preferences array based on checkbox state.
     */
    const handleCheckboxChange = (
        e: Event & {
            currentTarget: HTMLInputElement;
            target: HTMLInputElement;
        }
    ) => {
        const { value, checked } = e.target;
        setFormData((prev) => {
            // Use a Set for efficient adding/removing of contact methods
            const methods = new Set(prev.contact_preferences);
            if (checked) {
                methods.add(value);
            } else {
                methods.delete(value);
            }
            // Convert back to array for the ArtisanModel structure
            return { ...prev, contact_preferences: Array.from(methods) };
        });
    };

    /**
     * Handles changes for the profile picture file input.
     * Reads the selected file and updates the profile_picture in formData,
     * also updating the image preview.
     */
    const handleFileChange = (
        e: Event & {
            currentTarget: HTMLInputElement;
            target: HTMLInputElement;
        }
    ) => {
        const files = e.target.files;
        const file = files ? files[0] : null; // Get the first selected file
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const result = event.target!.result as string;
                setFormData((prev) => ({
                    ...prev,
                    profile_picture: result, // Update profile_picture with base64 string
                }));
                // Update the preview image source
                if (profilePicturePreviewRef) {
                    profilePicturePreviewRef.src = result;
                }
            };
            reader.readAsDataURL(file); // Read the file as a Data URL (base64 string)
        } else {
            // If no file is selected, revert to the default placeholder
            setFormData((prev) => ({
                ...prev,
                profile_picture: DEFAULT_PROFILE_PICTURE,
            }));
            if (profilePicturePreviewRef) {
                profilePicturePreviewRef.src = DEFAULT_PROFILE_PICTURE;
            }
        }
    };

    /**
     * Handles the modal close action.
     * Calls the onClose prop and resets the form data to its initial default state.
     */
    const handleClose = () => {
        props.onClose(); // Call the onClose prop
        // Reset form data to a clean, default ArtisanModel state
        setFormData({
            id: '',
            user_id: '',
            name: '',
            category: '',
            sub_category: '',
            profile_picture: DEFAULT_PROFILE_PICTURE,
            followers: 0,
            specialization: '',
            certifications: [],
            bio: '',
            overall_rating: 0,
            total_reviews: 0,
            location: '',
            years_in_business: 0,
            business_name: '',
            business_registration: '',
            contact_preferences: [],
            rating_breakdown: { '5': 0, '4': 0, '3': 0, '2': 0, '1': 0 },
            testimonials: [],
            services_offered: [],
            public_updates: [],
        });
        // Reset the preview image to the default placeholder
        if (profilePicturePreviewRef) {
            profilePicturePreviewRef.src = DEFAULT_PROFILE_PICTURE;
        }
    };

    onMount(() => {
        let cachedCategores = SecureLocalStorage.getItem<ApiCategoriesResponse>(
            LocalStorageKey.PairProfitCategories
        );
        if (cachedCategores) {
            setApiCategories(cachedCategores);
            setCategories(Object.keys(cachedCategores));
            return;
        }
    });

    return (
        <Portal>
            <Show when={props.show}>
                {/* Modal Overlay */}
                <div
                    class="fixed inset-0 bg-gray-200 bg-opacity-75 flex items-center justify-center p-4 transition-opacity duration-300 ease-out z-[9999]"
                    classList={{ 'modal-overlay': true, active: props.show }}
                    onClick={(e) =>
                        // Close modal only if clicking on the overlay, not the content
                        e.target === e.currentTarget && handleClose()
                    }
                >
                    {/* Modal Content */}
                    <div
                        class={modal_styles.modal_content}
                        style="border-blue-500"
                    >
                        {/* Close Button */}
                        <span
                            class={modal_styles.modal_close_button}
                            onClick={handleClose}
                        >
                            &times;
                        </span>
                        {/* Modal Title */}
                        <h2 class="text-2xl font-bold text-blue-800 mb-6 text-center">
                            View Artisan Profile
                        </h2>

                        {/* Profile Edit Form */}
                        <form class="space-y-6">
                            {/* Hidden ID field */}
                            <input
                                type="hidden"
                                name="id"
                                value={formData().id}
                            />

                            {/* Basic Information Section */}
                            <section class="border-b border-gray-200 pb-6">
                                <h3 class="text-xl font-bold text-gray-800 mb-4 text-center">
                                    Basic Information
                                </h3>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    {/* Full Name Input */}
                                    <div>
                                        <label
                                            for="editArtisanName"
                                            class="block text-sm font-medium text-gray-700"
                                        >
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="editArtisanName"
                                            class="pointer-events-none mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            value={formData().name}
                                            onInput={handleInputChange}
                                            required
                                        />
                                    </div>
                                    {/* Main Specialization Input */}
                                    <div>
                                        <label
                                            for="editArtisanSpecialization"
                                            class="block text-sm font-medium text-gray-700"
                                        >
                                            Main Specialization
                                        </label>
                                        <input
                                            type="text"
                                            name="specialization"
                                            id="editArtisanSpecialization"
                                            class="pointer-events-none mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            value={formData().specialization}
                                            onInput={handleInputChange}
                                            required
                                        />
                                    </div>
                                    {/* Category Select */}
                                    <div>
                                        <label
                                            for="artisanCategory"
                                            class="block text-sm font-medium text-gray-700"
                                        >
                                            Category
                                        </label>
                                        <select
                                            name="category"
                                            id="artisanCategory"
                                            class="pointer-events-none mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            value={formData().category}
                                            required
                                        >
                                            <option value="">
                                                Select a category
                                            </option>
                                            <For each={categories()}>
                                                {(option) => (
                                                    <option value={option}>
                                                        {option}
                                                    </option>
                                                )}
                                            </For>
                                        </select>
                                    </div>
                                    {/* Sub-Category Input */}
                                    <div>
                                        <label
                                            for="artisanSubCategory"
                                            class="block text-sm font-medium text-gray-700"
                                        >
                                            Sub-Category (Optional)
                                        </label>
                                        <select
                                            name="sub_category"
                                            id="artisanCategory"
                                            class="pointer-events-none mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            value={formData().sub_category}
                                            required
                                        >
                                            <option value="">
                                                Select a subcategory
                                            </option>
                                            <For each={subCategories()}>
                                                {(option) => (
                                                    <option value={option}>
                                                        {option}
                                                    </option>
                                                )}
                                            </For>
                                        </select>
                                    </div>
                                </div>

                                {/* Profile Picture Upload */}
                                <div class="mb-6">
                                    <label
                                        for="editProfilePictureUpload"
                                        class="block text-sm font-medium text-gray-700"
                                    >
                                        Profile Picture
                                    </label>
                                    <div class="mt-1 flex items-center space-x-4">
                                        {/* Profile Picture Preview */}
                                        <img
                                            ref={profilePicturePreviewRef}
                                            src={formData().profile_picture}
                                            alt="Profile Preview"
                                            class="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
                                        />
                                        {/* File Input Label and Input */}
                                        <label
                                            for="editProfilePictureUpload"
                                            class="pointer-events-none relative cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                                        >
                                            <span>Change photo</span>
                                            <input
                                                ref={profilePictureUploadRef}
                                                id="editProfilePictureUpload"
                                                name="profile_picture"
                                                type="file"
                                                class="sr-only pointer-events-none"
                                                accept="image/*"
                                                onChange={handleFileChange}
                                            />
                                        </label>
                                    </div>
                                    <p class="mt-2 text-xs text-gray-500">
                                        JPG, PNG, GIF up to 5MB. Recommended:
                                        square aspect ratio.
                                    </p>
                                </div>

                                {/* Short Bio / About Me Textarea */}
                                <div>
                                    <label
                                        for="editArtisanBio"
                                        class="block text-sm font-medium text-gray-700"
                                    >
                                        Short Bio / About Me
                                    </label>
                                    <textarea
                                        name="bio"
                                        id="editArtisanBio"
                                        rows="5"
                                        class="pointer-events-none mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        value={formData().bio}
                                        onInput={handleInputChange}
                                        required
                                    ></textarea>
                                </div>
                            </section>

                            {/* Location & Contact Section */}
                            <section class="border-b border-gray-200 pb-6 pt-6">
                                <h3 class="text-xl font-bold text-gray-800 mb-4 text-center">
                                    Location & Contact
                                </h3>
                                {/* Base Location Input */}
                                <div class="grid grid-cols-1 gap-6 mb-4">
                                    <div>
                                        <label
                                            for="editLocation"
                                            class="pointer-events-none block text-sm font-medium text-gray-700"
                                        >
                                            Your Base Location (City, Country)
                                        </label>
                                        <input
                                            type="text"
                                            name="location"
                                            id="editLocation"
                                            class="pointer-events-none mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            value={formData().location}
                                            onInput={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Preferred Contact Methods Checkboxes */}
                                <div>
                                    <label class="block text-sm font-medium text-gray-700">
                                        Preferred Contact Methods
                                    </label>
                                    <div class="mt-2 space-y-2">
                                        <div class="flex items-center">
                                            <input
                                                id="editContactChat"
                                                name="contact_preferences"
                                                type="checkbox"
                                                value="Platform Chat (Recommended)"
                                                class="pointer-events-none h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                checked={formData().contact_preferences.includes(
                                                    'Platform Chat (Recommended)'
                                                )}
                                                onChange={handleCheckboxChange}
                                            />
                                            <label
                                                for="editContactChat"
                                                class="ml-2 block text-sm text-gray-900"
                                            >
                                                Platform Chat (Recommended)
                                            </label>
                                        </div>
                                        <div class="flex items-center">
                                            <input
                                                id="editContactEmail"
                                                name="contact_preferences"
                                                type="checkbox"
                                                value="Email"
                                                class="pointer-events-none h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                checked={formData().contact_preferences.includes(
                                                    'Email'
                                                )}
                                                onChange={handleCheckboxChange}
                                            />
                                            <label
                                                for="editContactEmail"
                                                class="pointer-events-none ml-2 block text-sm text-gray-900"
                                            >
                                                Email
                                            </label>
                                        </div>
                                        <div class="flex items-center">
                                            <input
                                                id="editContactPhone"
                                                name="contact_preferences"
                                                type="checkbox"
                                                value="Phone"
                                                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                checked={formData().contact_preferences.includes(
                                                    'Phone'
                                                )}
                                                onChange={handleCheckboxChange}
                                            />
                                            <label
                                                for="editContactPhone"
                                                class="pointer-events-none ml-2 block text-sm text-gray-900"
                                            >
                                                Phone
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Business Details Section */}
                            <section class="border-b border-gray-200 pb-6 pt-6">
                                <h3 class="text-xl font-bold text-gray-800 mb-4">
                                    Business Details (Optional)
                                </h3>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Legal Business Name Input */}
                                    <div>
                                        <label
                                            for="editBusinessName"
                                            class="pointer-events-none block text-sm font-medium text-gray-700"
                                        >
                                            Legal Business Name
                                        </label>
                                        <input
                                            type="text"
                                            name="business_name"
                                            id="editBusinessName"
                                            class="pointer-events-none mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            value={formData().business_name}
                                            onInput={handleInputChange}
                                        />
                                    </div>
                                    {/* Business Registration Number Input */}
                                    <div>
                                        <label
                                            for="editBusinessRegistration"
                                            class="pointer-events-none block text-sm font-medium text-gray-700"
                                        >
                                            Business Registration Number
                                        </label>
                                        <input
                                            type="text"
                                            name="business_registration"
                                            id="editBusinessRegistration"
                                            class="pointer-events-none mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            value={
                                                formData().business_registration
                                            }
                                            onInput={handleInputChange}
                                        />
                                    </div>
                                    {/* Years in Business Input */}
                                    <div class="col-span-full">
                                        <label
                                            for="editYearsInBusiness"
                                            class="pointer-events-none block text-sm font-medium text-gray-700"
                                        >
                                            Years in Business
                                        </label>
                                        <input
                                            type="number"
                                            name="years_in_business"
                                            id="editYearsInBusiness"
                                            class="pointer-events-none mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            min="0"
                                            value={formData().years_in_business}
                                            onInput={handleInputChange}
                                        />
                                    </div>
                                </div>
                            </section>

                            {/* Certifications Section */}
                            <section class="border-b border-gray-200 pb-6 pt-6">
                                <h2 class="text-2xl font-bold text-gray-800 mb-4">
                                    4. Certifications (Optional)
                                </h2>
                                <div class="bg-blue-50 border border-blue-200 p-4 rounded-md mb-4">
                                    <p class="text-blue-800 font-medium">
                                        Highlight your professional
                                        qualifications.
                                    </p>
                                    <p class="text-blue-700 text-sm mt-2">
                                        Listing relevant certifications can
                                        significantly boost your credibility.
                                    </p>
                                </div>

                                {/* Display current certifications */}
                                {formData().certifications.length > 0 && (
                                    <div class="mt-4 border border-gray-200 rounded-md p-3">
                                        <h4 class="text-sm font-semibold text-gray-700 mb-2">
                                            Your Certifications:
                                        </h4>
                                        <ul class="space-y-2">
                                            <For
                                                each={formData().certifications}
                                            >
                                                {(cert, i) => (
                                                    <li
                                                        id={`certification-${i()}`}
                                                        class="flex items-center justify-between bg-gray-50 p-2 rounded-md text-sm text-gray-800"
                                                    >
                                                        <span>{cert}</span>
                                                        <button
                                                            type="button"
                                                            class="pointer-events-none ml-2 p-1 rounded-full text-red-600 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                                            title="Remove certification"
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                class="h-4 w-4"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                            >
                                                                <path
                                                                    stroke-linecap="round"
                                                                    stroke-linejoin="round"
                                                                    stroke-width="2"
                                                                    d="M6 18L18 6M6 6l12 12"
                                                                />
                                                            </svg>
                                                        </button>
                                                    </li>
                                                )}
                                            </For>
                                        </ul>
                                    </div>
                                )}
                                {formData().certifications.length === 0 && (
                                    <p class="text-sm text-gray-500 italic mt-4">
                                        No certifications added yet.
                                    </p>
                                )}
                            </section>

                            {/* Testimonials Section */}
                            <section class="pb-6 pt-6 border-b border-gray-200">
                                <h3 class="text-xl font-bold text-gray-800 mb-4 text-center">
                                    Testimonials
                                </h3>
                                <div class="space-y-4">
                                    <For each={formData().testimonials}>
                                        {(testimonial, index) => (
                                            <TestimonialInput
                                                testimonial={testimonial}
                                                index={index}
                                                arrayName="testimonials" // Pass arrayName
                                                formData={formData}
                                                setFormData={setFormData}
                                                readOnly={true}
                                            />
                                        )}
                                    </For>
                                </div>
                            </section>

                            {/* Services Offered Section */}
                            <section class="pb-6 pt-6 border-b border-gray-200">
                                <h3 class="text-xl font-bold text-gray-800 mb-4 text-center">
                                    Services Offered
                                </h3>
                                <div class="space-y-4">
                                    <For each={formData().services_offered}>
                                        {(service, index) => (
                                            <OfferedServiceInput
                                                service={service}
                                                index={index}
                                                arrayName="services_offered" // Pass arrayName
                                                formData={formData}
                                                setFormData={setFormData}
                                                readOnly={true}
                                            />
                                        )}
                                    </For>
                                </div>
                            </section>

                            {/* Public Updates Section */}
                            <section class="pb-6 pt-6">
                                <h3 class="text-xl font-bold text-gray-800 mb-4 text-center">
                                    Public Updates
                                </h3>
                                <div class="space-y-4">
                                    <For each={formData().public_updates}>
                                        {(update, index) => (
                                            <PublicUpdateInput
                                                update={update}
                                                index={index}
                                                arrayName="public_updates" // Pass arrayName
                                                formData={formData}
                                                setFormData={setFormData}
                                                readOnly={true}
                                            />
                                        )}
                                    </For>
                                </div>
                            </section>
                        </form>
                    </div>
                </div>
            </Show>
        </Portal>
    );
};
