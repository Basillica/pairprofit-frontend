import {
    Accessor,
    Component,
    createEffect,
    createMemo,
    createSignal,
    For,
    onMount,
    Setter,
    Show,
} from 'solid-js';
import { Portal } from 'solid-js/web';
import modal_styles from './style.module.css';
import {
    ArtisanModel,
    OfferedService,
    PublicUpdate,
    Testimonial,
} from '../../../models/profile';
import {
    TestimonialInput,
    OfferedServiceInput,
    PublicUpdateInput,
} from './utils';
import { SecureLocalStorage } from '../../../lib/localstore';
import { BucketAPIHandler } from '../../../api/supabase';
import { ArtisanApiHandler } from '../../../api/backend/profile';
import { LoadingAnimation } from '../../../lib/lottie';
import { UserModel } from '../../../models/auth';

interface ApiCategoriesResponse {
    [key: string]: string[];
}

interface FilterOption {
    category: string;
    subCategory: string;
    location: string;
    price: number;
    rating?: number;
}

/**
 * CreateProviderProfileComponent SolidJS Component
 *
 * This modal allows users to create a new artisan profile.
 * It uses the ArtisanModel for data structure and handles form input,
 * file uploads for profile pictures, and submission of new profile data.
 *
 * Props:
 * - isOpen: Accessor<boolean> - Controls the visibility of the modal.
 * - closeModal: Setter<boolean> - Callback function to close the modal.
 */
export const CreateProviderProfile: Component<{
    isOpen: Accessor<boolean>;
    closeModal: Setter<boolean>;
    userProfiles: Accessor<ArtisanModel[]>;
    setUserProfiles: Setter<ArtisanModel[]>;
}> = (props) => {
    const [categories, setCategories] = createSignal<string[]>([]);
    const [isLoading, setIsLoading] = createSignal(false);
    const [filterOption, setFilterOption] = createSignal<FilterOption>({
        category: '',
        subCategory: '',
        price: 0,
        rating: 5,
        location: '',
    });
    const [apiCategories, setApiCategories] =
        createSignal<ApiCategoriesResponse>({});
    const subCategories = createMemo(
        () => apiCategories()[filterOption()!.category]
    );

    // Default placeholder image for the profile picture
    const DEFAULT_PROFILE_PICTURE =
        'https://placehold.co/100x100/E0E0E0/808080?text=Profile';

    // SolidJS signal to manage the form data for a new ArtisanModel.
    // Initialized with default empty/zero values for all ArtisanModel fields.
    const [testimonials, setTestimonials] = createSignal<Testimonial[]>([]);
    const [aggredToTerms, setToAgreeToTerms] = createSignal(false);
    const [offeredServices, setOfferedServices] = createSignal<
        OfferedService[]
    >([]);
    const [uploadedFiles, setUploadedFiles] = createSignal<
        { file: File; fileName: string; mimeType: string }[]
    >([]);
    const [publicUpdates, setPublicUpdates] = createSignal<PublicUpdate[]>([]);
    const [newCertificationInput, setNewCertificationInput] = createSignal('');
    const [formData, setFormData] = createSignal<ArtisanModel>({
        id: crypto.randomUUID(), // Generate a new ID for a new profile
        user_id: '', // This might be set from auth context later
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

    onMount(() => {
        let cachedCategores = SecureLocalStorage.getItem<ApiCategoriesResponse>(
            'x-pairprofit-categories'
        );
        if (cachedCategores) {
            setApiCategories(cachedCategores);
            setCategories(Object.keys(cachedCategores));
            return;
        }
    });

    /**
     * Handles changes for text, number, and select input fields.A
     * Updates the corresponding field in the formData signal.
     */
    const handleInputChange = (
        e: InputEvent & {
            currentTarget:
                | HTMLInputElement
                | HTMLTextAreaElement
                | HTMLSelectElement;
            target: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
        }
    ) => {
        const { name, value } = e.target;
        // Special handling for numeric inputs like 'years_in_business'
        if (
            name === 'years_in_business' ||
            name === 'followers' ||
            name === 'overall_rating' ||
            name === 'total_reviews'
        ) {
            setFormData((prev) => ({ ...prev, [name]: parseInt(value) || 0 }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSelect = (
        e: Event & {
            currentTarget: HTMLSelectElement;
            target: HTMLSelectElement;
        }
    ) => {
        e.preventDefault();
        e.stopPropagation();
        const { name, value } = e.target;
        setFilterOption((prev) => ({
            ...prev!,
            [name]: value,
        }));
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
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
            const methods = new Set(prev.contact_preferences);
            if (checked) {
                methods.add(value);
            } else {
                methods.delete(value);
            }
            return { ...prev, contact_preferences: Array.from(methods) };
        });
    };

    /**
     * Handles changes for the profile picture file input.
     * Reads the selected file and updates the profile_picture in formData.
     */
    const handleFileChange = (
        e: Event & {
            currentTarget: HTMLInputElement;
            target: HTMLInputElement;
        }
    ) => {
        const files = e.target.files!;
        const file = files ? files[0] : null;
        let newFilesToUpload: {
            file: File;
            fileName: string;
            mimeType: string;
        }[] = [];

        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                // 5MB limit
                console.error(
                    `File "${file.name}" is too large. Max 5MB per file.`
                );
                // Optionally, provide user feedback through a modal or message box instead of console.error
                return;
            }
            newFilesToUpload.push({
                file: file,
                fileName: file.name,
                mimeType: file.type,
            });
            const reader = new FileReader();
            reader.onload = (event) => {
                const result = event.target!.result as string;
                setFormData((prev) => ({
                    ...prev,
                    profile_picture: result,
                }));
            };
            setUploadedFiles((prev) => [...prev, ...newFilesToUpload]);
            reader.readAsDataURL(file);
        } else {
            setFormData((prev) => ({
                ...prev,
                profile_picture: DEFAULT_PROFILE_PICTURE,
            }));
        }
        e.target.value = ''; // Clear the input so the same file can be selected again if needed
    };

    /**
     * Adds a new empty object to one of the dynamic arrays (testimonials, services_offered, public_updates).
     * @param arrayName The name of the array field in ArtisanModel.
     */
    const addArrayObjectInput = (
        arrayName: 'testimonials' | 'services_offered' | 'public_updates'
    ) => {
        if (arrayName === 'testimonials') {
            setTestimonials([
                ...testimonials(),
                {
                    id: Date.now(),
                    reviewer: '',
                    rating: 0,
                    date: '',
                    comment: '',
                    service_title: '',
                },
            ]);
        } else if (arrayName === 'services_offered') {
            setOfferedServices([
                ...offeredServices(),
                {
                    id: crypto.randomUUID(),
                    title: '',
                    category: '',
                    price: '',
                    link: '',
                },
            ]);
        } else if (arrayName === 'public_updates') {
            setPublicUpdates([
                ...publicUpdates(),
                {
                    id: crypto.randomUUID(),
                    date: '',
                    type: '',
                    title: '',
                    content: '',
                    image: null,
                },
            ]);
        }
    };

    /**
     * Handles the form submission.
     * In a real application, this would send the formData to a backend API.
     */
    const handleSubmit = async (
        event: SubmitEvent & {
            currentTarget: HTMLFormElement;
            target: Element;
        }
    ) => {
        event.preventDefault(); // Prevent default form submission
        // Here you would typically send formData() to your backend
        const user = SecureLocalStorage.getItem<UserModel>('x-auth-user-model');
        if (!user) return;

        setIsLoading(true);
        const supabase = new BucketAPIHandler();
        const project_url = import.meta.env.VITE_SUPABASE_PROJECT_URL;
        const api = new ArtisanApiHandler();

        // uplaod files
        const uploadPromises = uploadedFiles().map(async (element) => {
            const filePath = `${user.id}/${element.fileName}`;
            const file_url = await supabase.uploadFile(
                'profiles',
                filePath,
                element.file
            );

            if (file_url) {
                return {
                    type: element.mimeType,
                    url: `${project_url}/storage/v1/object/public/profiles/${file_url}`,
                    name: element.fileName,
                };
            }
            return null;
        });

        const uploadedAttachments = await Promise.all(uploadPromises);
        if (uploadedAttachments!.length > 0) {
            formData().profile_picture = uploadedAttachments[0]?.url!;
        }
        setFormData((prev) => ({
            ...prev,
            user_id: user.id,
        }));

        const result = await api.addListing(formData());
        setIsLoading(false);

        if (result.success) {
            console.log('Submitting new Artisan Profile:', formData());
            props.setUserProfiles([...props.userProfiles(), formData()]);
            // Close the modal and reset form after submission
            resetForm();
            props.closeModal(false);
        }
    };

    /**
     * Resets the form data to its initial empty state.
     */
    const resetForm = () => {
        setFormData({
            id: crypto.randomUUID(), // Generate a new ID for the next potential profile
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
    };

    // Effect to reset form when modal closes (if isOpen becomes false)
    createEffect(() => {
        if (!props.isOpen()) {
            resetForm();
        }
    });

    const removeCertification = (indexToRemove: number) => {
        setFormData((prev) => ({
            ...prev,
            certifications: prev.certifications.filter(
                (_, i) => i !== indexToRemove
            ),
        }));
    };

    const addCertification = () => {
        const trimmedCert = newCertificationInput().trim();
        if (trimmedCert && !formData().certifications.includes(trimmedCert)) {
            // Prevent empty and duplicate
            setFormData((prev) => ({
                ...prev,
                certifications: [...prev.certifications, trimmedCert],
            }));
            setNewCertificationInput(''); // Clear the input field
        }
    };

    return (
        <Portal>
            <Show when={props.isOpen()}>
                <div
                    classList={{
                        'modal-overlay': true,
                        active: props.isOpen(),
                    }}
                    class="fixed inset-0 bg-gray-200 bg-opacity-75 mt-10 flex items-center justify-center p-4 transition-opacity duration-300 ease-out z-[9999]"
                    onClick={(e) => {
                        // Close modal only if clicking on the overlay, not the content
                        if (e.target === e.currentTarget) {
                            props.closeModal(false);
                        }
                    }}
                >
                    <div class={modal_styles.modal_content}>
                        <div class="max-w-4xl w-full bg-white p-8 rounded-lg shadow-lg">
                            <span
                                class={modal_styles.modal_close_button}
                                onClick={() => props.closeModal(false)}
                            >
                                &times;
                            </span>
                            <h1 class="text-3xl font-extrabold text-gray-900 text-center mb-8">
                                Create Your Artisan Profile
                            </h1>
                            <p class="text-gray-600 text-center mb-8">
                                Tell us about yourself and your services. This
                                profile will help customers find and trust you!
                            </p>
                            {isLoading() ? (
                                <div style={'width: 90px; height: 90px'}>
                                    <LoadingAnimation />
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} class="space-y-6">
                                    {/* Basic Information Section */}
                                    <section class="border-b border-gray-200 pb-6">
                                        <h2 class="text-2xl font-bold text-gray-800 mb-4">
                                            1. Basic Information
                                        </h2>
                                        <div class="bg-blue-50 border border-blue-200 p-4 rounded-md mb-4">
                                            <p class="text-blue-800 font-medium">
                                                Start by providing your
                                                essential details.
                                            </p>
                                            <p class="text-blue-700 text-sm mt-2">
                                                This includes your name, main
                                                specialization, category, and a
                                                profile picture.
                                            </p>
                                        </div>

                                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                            {/* Full Name Input */}
                                            <div>
                                                <label
                                                    for="artisanName"
                                                    class="block text-sm font-medium text-gray-700"
                                                >
                                                    Your Full Name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    id="artisanName"
                                                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                    placeholder="e.g., Jane Doe"
                                                    value={formData().name}
                                                    onInput={handleInputChange}
                                                    required
                                                />
                                            </div>
                                            {/* Main Specialization Input */}
                                            <div>
                                                <label
                                                    for="artisanSpecialization"
                                                    class="block text-sm font-medium text-gray-700"
                                                >
                                                    Your Main
                                                    Specialization/Profession
                                                </label>
                                                <input
                                                    type="text"
                                                    name="specialization"
                                                    id="artisanSpecialization"
                                                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                    placeholder="e.g., Expert Carpenter, Freelance Web Developer"
                                                    value={
                                                        formData()
                                                            .specialization
                                                    }
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
                                                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                    value={formData().category}
                                                    onInput={handleSelect}
                                                    required
                                                >
                                                    <option value="">
                                                        Select a category
                                                    </option>
                                                    <For each={categories()}>
                                                        {(option) => (
                                                            <option
                                                                value={option}
                                                            >
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
                                                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                    value={
                                                        formData().sub_category
                                                    }
                                                    onInput={handleSelect}
                                                    required
                                                >
                                                    <option value="">
                                                        Select a subcategory
                                                    </option>
                                                    <For each={subCategories()}>
                                                        {(option) => (
                                                            <option
                                                                value={option}
                                                            >
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
                                                for="profilePictureUpload"
                                                class="block text-sm font-medium text-gray-700"
                                            >
                                                Profile Picture
                                            </label>
                                            <div class="mt-1 flex items-center space-x-4">
                                                <img
                                                    src={
                                                        formData()
                                                            .profile_picture
                                                    }
                                                    alt="Profile Preview"
                                                    class="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
                                                />
                                                <label
                                                    for="profilePictureUpload"
                                                    class="relative cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                                                >
                                                    <span>Upload a photo</span>
                                                    <input
                                                        id="profilePictureUpload"
                                                        name="profile_picture"
                                                        type="file"
                                                        class="sr-only"
                                                        accept="image/png, image/jpeg"
                                                        onInput={
                                                            handleFileChange
                                                        }
                                                    />
                                                </label>
                                            </div>
                                            <p class="mt-2 text-xs text-gray-500">
                                                JPG, PNG, GIF up to 5MB.
                                                Recommended: square aspect
                                                ratio.
                                            </p>
                                        </div>

                                        {/* Short Bio / About Me Textarea */}
                                        <div>
                                            <label
                                                for="artisanBio"
                                                class="block text-sm font-medium text-gray-700"
                                            >
                                                Short Bio / About Me
                                            </label>
                                            <textarea
                                                name="bio"
                                                id="artisanBio"
                                                rows="5"
                                                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                placeholder="Introduce yourself, your experience, and what makes your services unique."
                                                value={formData().bio}
                                                onInput={handleInputChange}
                                                required
                                            ></textarea>
                                        </div>
                                    </section>

                                    {/* Location & Contact Section */}
                                    <section class="border-b border-gray-200 pb-6 pt-6">
                                        <h2 class="text-2xl font-bold text-gray-800 mb-4">
                                            2. Location & Contact
                                        </h2>
                                        <div class="bg-blue-50 border border-blue-200 p-4 rounded-md mb-4">
                                            <p class="text-blue-800 font-medium">
                                                Let customers know where you
                                                operate and how to reach you.
                                            </p>
                                            <p class="text-blue-700 text-sm mt-2">
                                                Specify your base location and
                                                select your preferred contact
                                                methods.
                                            </p>
                                        </div>
                                        <div class="grid grid-cols-1 gap-6 mb-4">
                                            {/* Base Location Input */}
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
                                                    onInput={handleInputChange}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        {/* Preferred Contact Methods Checkboxes */}
                                        <div>
                                            <label class="block text-sm font-medium text-gray-700">
                                                Preferred Contact Methods for
                                                Customers
                                            </label>
                                            <div class="mt-2 space-y-2">
                                                <div class="flex items-center">
                                                    <input
                                                        id="contactChat"
                                                        name="contact_preferences"
                                                        type="checkbox"
                                                        value="Platform Chat (Recommended)"
                                                        class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                        checked={formData().contact_preferences.includes(
                                                            'Platform Chat (Recommended)'
                                                        )}
                                                        onChange={
                                                            handleCheckboxChange
                                                        }
                                                    />
                                                    <label
                                                        for="contactChat"
                                                        class="ml-2 block text-sm text-gray-900"
                                                    >
                                                        Platform Chat
                                                        (Recommended)
                                                    </label>
                                                </div>
                                                <div class="flex items-center">
                                                    <input
                                                        id="contactEmail"
                                                        name="contact_preferences"
                                                        type="checkbox"
                                                        value="Email"
                                                        class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                        checked={formData().contact_preferences.includes(
                                                            'Email'
                                                        )}
                                                        onChange={
                                                            handleCheckboxChange
                                                        }
                                                    />
                                                    <label
                                                        for="contactEmail"
                                                        class="ml-2 block text-sm text-gray-900"
                                                    >
                                                        Email (if selected,
                                                        ensure your email is on
                                                        file)
                                                    </label>
                                                </div>
                                                <div class="flex items-center">
                                                    <input
                                                        id="contactPhone"
                                                        name="contact_preferences"
                                                        type="checkbox"
                                                        value="Phone"
                                                        class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                        checked={formData().contact_preferences.includes(
                                                            'Phone'
                                                        )}
                                                        onChange={
                                                            handleCheckboxChange
                                                        }
                                                    />
                                                    <label
                                                        for="contactPhone"
                                                        class="ml-2 block text-sm text-gray-900"
                                                    >
                                                        Phone (if selected,
                                                        ensure your phone number
                                                        is on file)
                                                    </label>
                                                </div>
                                                <div class="flex items-center">
                                                    <input
                                                        id="InAppCall"
                                                        name="contact_preferences"
                                                        type="checkbox"
                                                        value="InAppCall"
                                                        class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                        checked={formData().contact_preferences.includes(
                                                            'InAppCall'
                                                        )}
                                                        onChange={
                                                            handleCheckboxChange
                                                        }
                                                    />
                                                    <label
                                                        for="contactPhone"
                                                        class="ml-2 block text-sm text-gray-900"
                                                    >
                                                        In-App Internet call
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </section>

                                    {/* Business Details Section */}
                                    <section class="border-b border-gray-200 pb-6 pt-6">
                                        <h2 class="text-2xl font-bold text-gray-800 mb-4">
                                            3. Business Details (Optional)
                                        </h2>
                                        <div class="bg-blue-50 border border-blue-200 p-4 rounded-md mb-4">
                                            <p class="text-blue-800 font-medium">
                                                Provide details about your
                                                registered business (if
                                                applicable).
                                            </p>
                                            <p class="text-blue-700 text-sm mt-2">
                                                This information can help build
                                                trust and verify your
                                                professional status.
                                            </p>
                                        </div>
                                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {/* Legal Business Name Input */}
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
                                                    value={
                                                        formData().business_name
                                                    }
                                                    onInput={handleInputChange}
                                                />
                                            </div>
                                            {/* Business Registration Number Input */}
                                            <div>
                                                <label
                                                    for="business_registration"
                                                    class="block text-sm font-medium text-gray-700"
                                                >
                                                    Business ID (e.g., VAT ID,
                                                    Trade Register)
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
                                                    onInput={handleInputChange}
                                                />
                                            </div>
                                            {/* Years in Business Input */}
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
                                                        formData()
                                                            .years_in_business
                                                    }
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
                                                Listing relevant certifications
                                                can significantly boost your
                                                credibility.
                                            </p>
                                        </div>
                                        {/* <div>
                                            <label
                                                for="certifications"
                                                class="block text-sm font-medium text-gray-700"
                                            >
                                                List your certifications
                                                (comma-separated)
                                            </label>
                                            <input
                                                type="text"
                                                name="certifications"
                                                id="certifications"
                                                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                placeholder="e.g., Certified Master Carpenter, Google Ads Certified"
                                                value={
                                                    formData().certifications
                                                }
                                                onInput={handleInputChange}
                                            />
                                            <p class="mt-2 text-xs text-gray-500">
                                                These help build trust and
                                                credibility with potential
                                                customers.
                                            </p>
                                        </div> */}

                                        <div class="mb-4">
                                            <label
                                                for="new-certification"
                                                class="block text-sm font-medium text-gray-700"
                                            >
                                                Add a new certification link
                                            </label>
                                            <div class="mt-1 flex rounded-md shadow-sm">
                                                <input
                                                    type="text"
                                                    id="new-certification"
                                                    class="flex-1 block w-full rounded-none rounded-l-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                    placeholder="e.g., Certified Master Carpenter"
                                                    value={newCertificationInput()}
                                                    onInput={(e) =>
                                                        setNewCertificationInput(
                                                            e.target.value
                                                        )
                                                    }
                                                    onKeyDown={(e) => {
                                                        // Allow adding with Enter key
                                                        if (e.key === 'Enter') {
                                                            e.preventDefault(); // Prevent form submission
                                                            addCertification();
                                                        }
                                                    }}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={addCertification}
                                                    class="inline-flex items-center rounded-r-md border border-l-0 border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                                >
                                                    Add
                                                </button>
                                            </div>
                                        </div>

                                        {/* Display current certifications */}
                                        {formData().certifications.length >
                                            0 && (
                                            <div class="mt-4 border border-gray-200 rounded-md p-3">
                                                <h4 class="text-sm font-semibold text-gray-700 mb-2">
                                                    Your Certifications:
                                                </h4>
                                                <ul class="space-y-2">
                                                    <For
                                                        each={
                                                            formData()
                                                                .certifications
                                                        }
                                                    >
                                                        {(cert, i) => (
                                                            <li class="flex items-center justify-between bg-gray-50 p-2 rounded-md text-sm text-gray-800">
                                                                <span>
                                                                    {cert}
                                                                </span>
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        removeCertification(
                                                                            i()
                                                                        )
                                                                    }
                                                                    class="ml-2 p-1 rounded-full text-red-600 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
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
                                        {formData().certifications.length ===
                                            0 && (
                                            <p class="text-sm text-gray-500 italic mt-4">
                                                No certifications added yet.
                                            </p>
                                        )}
                                    </section>

                                    {/* Testimonials Section */}
                                    <section class="pb-6 pt-6 border-b border-gray-200">
                                        <h3 class="text-xl font-bold text-gray-800 mb-4">
                                            5. Testimonials
                                        </h3>
                                        <div class="bg-blue-50 border border-blue-200 p-4 rounded-md mb-4">
                                            <p class="text-blue-800 font-medium">
                                                Collect and showcase positive
                                                feedback from your clients to
                                                build trust!
                                            </p>
                                            <p class="text-blue-700 text-sm mt-2">
                                                Add testimonials from satisfied
                                                customers here. Include their
                                                name, rating, date, and a
                                                comment about their experience
                                                with your service.
                                            </p>
                                        </div>
                                        <div class="space-y-4">
                                            <For each={testimonials()}>
                                                {(testimonial, index) => (
                                                    <TestimonialInput
                                                        testimonial={
                                                            testimonial
                                                        }
                                                        index={index}
                                                        arrayName="testimonials"
                                                        formData={formData}
                                                        setFormData={
                                                            setFormData
                                                        }
                                                    />
                                                )}
                                            </For>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                addArrayObjectInput(
                                                    'testimonials'
                                                )
                                            }
                                            class="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                        >
                                            Add Testimonial
                                        </button>
                                    </section>

                                    {/* Services Offered Section */}
                                    <section class="pb-6 pt-6 border-b border-gray-200">
                                        <h3 class="text-xl font-bold text-gray-800 mb-4">
                                            6. Services Offered
                                        </h3>
                                        <div class="bg-blue-50 border border-blue-200 p-4 rounded-md mb-4">
                                            <p class="text-blue-800 font-medium">
                                                List the specific services you
                                                provide to attract relevant
                                                customers!
                                            </p>
                                            <p class="text-blue-700 text-sm mt-2">
                                                Each service listing will
                                                include details like title,
                                                category, price, and an optional
                                                link to more details.
                                            </p>
                                        </div>
                                        <div class="space-y-4">
                                            <For each={offeredServices()}>
                                                {(service, index) => (
                                                    <OfferedServiceInput
                                                        service={service}
                                                        index={index}
                                                        arrayName="services_offered"
                                                        formData={formData}
                                                        setFormData={
                                                            setFormData
                                                        }
                                                    />
                                                )}
                                            </For>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                addArrayObjectInput(
                                                    'services_offered'
                                                )
                                            }
                                            class="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                        >
                                            Add Service
                                        </button>
                                    </section>

                                    {/* Public Updates Section */}
                                    <section class="pb-6 pt-6">
                                        <h3 class="text-xl font-bold text-gray-800 mb-4">
                                            7. Public Updates
                                        </h3>
                                        <div class="bg-purple-50 border border-purple-200 p-4 rounded-md mb-4">
                                            <p class="text-purple-800 font-medium">
                                                Showcase your best work and keep
                                                customers informed!
                                            </p>
                                            <p class="text-purple-700 text-sm mt-2">
                                                Post project spotlights,
                                                important announcements, or
                                                share insights about your
                                                activities.
                                            </p>
                                        </div>
                                        <div class="space-y-4">
                                            <For each={publicUpdates()}>
                                                {(update, index) => (
                                                    <PublicUpdateInput
                                                        update={update}
                                                        index={index}
                                                        arrayName="public_updates"
                                                        formData={formData}
                                                        setFormData={
                                                            setFormData
                                                        }
                                                    />
                                                )}
                                            </For>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                addArrayObjectInput(
                                                    'public_updates'
                                                )
                                            }
                                            class="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                        >
                                            Add Update
                                        </button>
                                    </section>

                                    {/* Terms and Conditions Checkbox */}
                                    <div class="pt-8">
                                        <div class="flex items-center">
                                            <input
                                                id="agreeTerms"
                                                name="agreeTerms"
                                                type="checkbox"
                                                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                checked={formData().contact_preferences.includes(
                                                    'Agreed to Terms'
                                                )} // Example: Use a specific string in contact_preferences to denote agreement
                                                onChange={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    setToAgreeToTerms(
                                                        e.target.checked
                                                    );
                                                }}
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

                                    {/* Action Buttons */}
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                props.closeModal(false)
                                            }
                                            class="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-lg font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                            style={`${
                                                !aggredToTerms()
                                                    ? 'pointer-events: none; background-color: #e0e0e0ff'
                                                    : 'background-color: #16a34a'
                                            }`}
                                        >
                                            Create My Profile
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </Show>
        </Portal>
    );
};
