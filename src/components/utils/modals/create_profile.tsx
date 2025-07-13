import {
    Accessor,
    Component,
    createEffect,
    createSignal,
    For,
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

/**
 * TestimonialInput Component
 * Renders input fields for a single testimonial and allows its removal.
 * Reused from EditProfileModal for consistency.
 */
const TestimonialInput: Component<{
    testimonial: Testimonial;
    index: Accessor<number>;
    arrayName: 'testimonials';
    onInput: (
        arrayName: 'testimonials',
        index: number,
        field: keyof Testimonial,
        value: string | number
    ) => void;
    onRemove: (arrayName: 'testimonials', index: number) => void;
}> = (props) => {
    return (
        <div class="flex flex-col sm:flex-row gap-2 border border-gray-200 rounded-md p-3 items-end">
            <div class="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label
                        for={`testimonial-reviewer-${props.index()}`}
                        class="block text-xs font-medium text-gray-600"
                    >
                        Reviewer Name
                    </label>
                    <input
                        type="text"
                        id={`testimonial-reviewer-${props.index()}`}
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 text-sm"
                        value={props.testimonial.reviewer}
                        onInput={(e) =>
                            props.onInput(
                                props.arrayName,
                                props.index(),
                                'reviewer',
                                e.target.value
                            )
                        }
                        placeholder="Reviewer Name"
                    />
                </div>
                <div>
                    <label
                        for={`testimonial-rating-${props.index()}`}
                        class="block text-xs font-medium text-gray-600"
                    >
                        Rating (1-5)
                    </label>
                    <input
                        type="number"
                        id={`testimonial-rating-${props.index()}`}
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 text-sm"
                        value={props.testimonial.rating}
                        onInput={(e) =>
                            props.onInput(
                                props.arrayName,
                                props.index(),
                                'rating',
                                parseInt(e.target.value) || 0
                            )
                        }
                        min="1"
                        max="5"
                        placeholder="Rating"
                    />
                </div>
                <div class="md:col-span-2">
                    <label
                        for={`testimonial-comment-${props.index()}`}
                        class="block text-xs font-medium text-gray-600"
                    >
                        Comment
                    </label>
                    <textarea
                        id={`testimonial-comment-${props.index()}`}
                        rows="2"
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 text-sm"
                        value={props.testimonial.comment}
                        onInput={(e) =>
                            props.onInput(
                                props.arrayName,
                                props.index(),
                                'comment',
                                e.target.value
                            )
                        }
                        placeholder="Testimonial comment"
                    ></textarea>
                </div>
                <div>
                    <label
                        for={`testimonial-date-${props.index()}`}
                        class="block text-xs font-medium text-gray-600"
                    >
                        Date
                    </label>
                    <input
                        type="date"
                        id={`testimonial-date-${props.index()}`}
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 text-sm"
                        value={props.testimonial.date}
                        onInput={(e) =>
                            props.onInput(
                                props.arrayName,
                                props.index(),
                                'date',
                                e.target.value
                            )
                        }
                    />
                </div>
                <div>
                    <label
                        for={`testimonial-service-${props.index()}`}
                        class="block text-xs font-medium text-gray-600"
                    >
                        Service Title
                    </label>
                    <input
                        type="text"
                        id={`testimonial-service-${props.index()}`}
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 text-sm"
                        value={props.testimonial.serviceTitle}
                        onInput={(e) =>
                            props.onInput(
                                props.arrayName,
                                props.index(),
                                'serviceTitle',
                                e.target.value
                            )
                        }
                        placeholder="Service related to testimonial"
                    />
                </div>
            </div>
            <button
                type="button"
                onClick={() => props.onRemove(props.arrayName, props.index())}
                class="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded-md shadow-sm text-sm"
            >
                Remove
            </button>
        </div>
    );
};

/**
 * OfferedServiceInput Component
 * Renders input fields for a single offered service and allows its removal.
 * Reused from EditProfileModal for consistency.
 */
const OfferedServiceInput: Component<{
    service: OfferedService;
    index: Accessor<number>;
    arrayName: 'services_offered';
    onInput: (
        arrayName: 'services_offered',
        index: number,
        field: keyof OfferedService,
        value: string
    ) => void;
    onRemove: (arrayName: 'services_offered', index: number) => void;
}> = (props) => {
    return (
        <div class="flex flex-col sm:flex-row gap-2 border border-gray-200 rounded-md p-3 items-end">
            <div class="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label
                        for={`service-title-${props.index()}`}
                        class="block text-xs font-medium text-gray-600"
                    >
                        Service Title
                    </label>
                    <input
                        type="text"
                        id={`service-title-${props.index()}`}
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 text-sm"
                        value={props.service.title}
                        onInput={(e) =>
                            props.onInput(
                                props.arrayName,
                                props.index(),
                                'title',
                                e.target.value
                            )
                        }
                        placeholder="e.g., Custom Wood Carving"
                    />
                </div>
                <div>
                    <label
                        for={`service-category-${props.index()}`}
                        class="block text-xs font-medium text-gray-600"
                    >
                        Category
                    </label>
                    <input
                        type="text"
                        id={`service-category-${props.index()}`}
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 text-sm"
                        value={props.service.category}
                        onInput={(e) =>
                            props.onInput(
                                props.arrayName,
                                props.index(),
                                'category',
                                e.target.value
                            )
                        }
                        placeholder="e.g., Woodwork"
                    />
                </div>
                <div>
                    <label
                        for={`service-price-${props.index()}`}
                        class="block text-xs font-medium text-gray-600"
                    >
                        Price
                    </label>
                    <input
                        type="text"
                        id={`service-price-${props.index()}`}
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 text-sm"
                        value={props.service.price}
                        onInput={(e) =>
                            props.onInput(
                                props.arrayName,
                                props.index(),
                                'price',
                                e.target.value
                            )
                        }
                        placeholder="e.g., $100/hr or Fixed Price"
                    />
                </div>
                <div>
                    <label
                        for={`service-link-${props.index()}`}
                        class="block text-xs font-medium text-gray-600"
                    >
                        Link (Optional)
                    </label>
                    <input
                        type="url"
                        id={`service-link-${props.index()}`}
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 text-sm"
                        value={props.service.link}
                        onInput={(e) =>
                            props.onInput(
                                props.arrayName,
                                props.index(),
                                'link',
                                e.target.value
                            )
                        }
                        placeholder="Link to service details"
                    />
                </div>
            </div>
            <button
                type="button"
                onClick={() => props.onRemove(props.arrayName, props.index())}
                class="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded-md shadow-sm text-sm"
            >
                Remove
            </button>
        </div>
    );
};

/**
 * PublicUpdateInput Component
 * Renders input fields for a single public update and allows its removal.
 * Reused from EditProfileModal for consistency.
 */
const PublicUpdateInput: Component<{
    update: PublicUpdate;
    index: Accessor<number>;
    arrayName: 'public_updates';
    onInput: (
        arrayName: 'public_updates',
        index: number,
        field: keyof PublicUpdate,
        value: string | null
    ) => void;
    onRemove: (arrayName: 'public_updates', index: number) => void;
}> = (props) => {
    return (
        <div class="flex flex-col sm:flex-row gap-2 border border-gray-200 rounded-md p-3 items-end">
            <div class="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label
                        for={`update-date-${props.index()}`}
                        class="block text-xs font-medium text-gray-600"
                    >
                        Date
                    </label>
                    <input
                        type="date"
                        id={`update-date-${props.index()}`}
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 text-sm"
                        value={props.update.date}
                        onInput={(e) =>
                            props.onInput(
                                props.arrayName,
                                props.index(),
                                'date',
                                e.target.value
                            )
                        }
                    />
                </div>
                <div>
                    <label
                        for={`update-type-${props.index()}`}
                        class="block text-xs font-medium text-gray-600"
                    >
                        Type
                    </label>
                    <input
                        type="text"
                        id={`update-type-${props.index()}`}
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 text-sm"
                        value={props.update.type}
                        onInput={(e) =>
                            props.onInput(
                                props.arrayName,
                                props.index(),
                                'type',
                                e.target.value
                            )
                        }
                        placeholder="e.g., Event, New Product"
                    />
                </div>
                <div class="md:col-span-2">
                    <label
                        for={`update-title-${props.index()}`}
                        class="block text-xs font-medium text-gray-600"
                    >
                        Title
                    </label>
                    <input
                        type="text"
                        id={`update-title-${props.index()}`}
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 text-sm"
                        value={props.update.title}
                        onInput={(e) =>
                            props.onInput(
                                props.arrayName,
                                props.index(),
                                'title',
                                e.target.value
                            )
                        }
                        placeholder="Update Title"
                    />
                </div>
                <div class="md:col-span-2">
                    <label
                        for={`update-content-${props.index()}`}
                        class="block text-xs font-medium text-gray-600"
                    >
                        Content
                    </label>
                    <textarea
                        id={`update-content-${props.index()}`}
                        rows="3"
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 text-sm"
                        value={props.update.content}
                        onInput={(e) =>
                            props.onInput(
                                props.arrayName,
                                props.index(),
                                'content',
                                e.target.value
                            )
                        }
                        placeholder="Details of the update"
                    ></textarea>
                </div>
                <div class="md:col-span-2">
                    <label
                        for={`update-image-${props.index()}`}
                        class="block text-xs font-medium text-gray-600"
                    >
                        Image URL (Optional)
                    </label>
                    <input
                        type="text" // Using text for URL, could be file input for actual upload
                        id={`update-image-${props.index()}`}
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 text-sm"
                        value={props.update.image || ''}
                        onInput={(e) =>
                            props.onInput(
                                props.arrayName,
                                props.index(),
                                'image',
                                e.target.value
                            )
                        }
                        placeholder="Image URL"
                    />
                </div>
            </div>
            <button
                type="button"
                onClick={() => props.onRemove(props.arrayName, props.index())}
                class="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded-md shadow-sm text-sm"
            >
                Remove
            </button>
        </div>
    );
};

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
export const CreateProviderProfileComponent: Component<{
    isOpen: Accessor<boolean>;
    closeModal: Setter<boolean>;
}> = (props) => {
    // Default placeholder image for the profile picture
    const DEFAULT_PROFILE_PICTURE =
        'https://placehold.co/100x100/E0E0E0/808080?text=Profile';

    // SolidJS signal to manage the form data for a new ArtisanModel.
    // Initialized with default empty/zero values for all ArtisanModel fields.
    const [formData, setFormData] = createSignal<ArtisanModel>({
        id: crypto.randomUUID(), // Generate a new ID for a new profile
        user_id: '', // This might be set from auth context later
        name: '',
        category: '',
        sub_category: '',
        profile_picture: DEFAULT_PROFILE_PICTURE,
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
        rating_breakdown: { '5': 0, '4': 0, '3': 0, '2': 0, '1': 0 },
        testimonials: [],
        services_offered: [],
        public_updates: [],
    });

    /**
     * Handles changes for text, number, and select input fields.
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
        const files = e.target.files;
        const file = files ? files[0] : null;
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                // 5MB limit
                console.error(
                    `File "${file.name}" is too large. Max 5MB per file.`
                );
                // Optionally, provide user feedback through a modal or message box instead of console.error
                return;
            }
            const reader = new FileReader();
            reader.onload = (event) => {
                const result = event.target!.result as string;
                setFormData((prev) => ({
                    ...prev,
                    profile_picture: result,
                }));
            };
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
     * Handles input changes for nested arrays of objects (testimonials, services_offered, public_updates).
     * @param arrayName The name of the array field in ArtisanModel (e.g., 'testimonials').
     * @param index The index of the object within the array to update.
     * @param fieldName The specific field within the object to update (e.g., 'reviewer').
     * @param value The new value for the field.
     */
    const handleArrayObjectInputChange = <K extends keyof ArtisanModel>(
        arrayName: K,
        index: number,
        fieldName: any, // keyof ArtisanModel[K][number],
        value: string | number | null
    ) => {
        setFormData((prev) => {
            const currentArray = prev[arrayName] as any[];
            const newArray = currentArray.map((item, i) =>
                i === index ? { ...item, [fieldName]: value } : { ...item }
            );
            return { ...prev, [arrayName]: newArray as ArtisanModel[K] };
        });
    };

    /**
     * Adds a new empty object to one of the dynamic arrays (testimonials, services_offered, public_updates).
     * @param arrayName The name of the array field in ArtisanModel.
     */
    const addArrayObjectInput = (
        arrayName: 'testimonials' | 'services_offered' | 'public_updates'
    ) => {
        setFormData((prev) => {
            const newArray = [...prev[arrayName]];
            if (arrayName === 'testimonials') {
                newArray.push({
                    id: Date.now(),
                    reviewer: '',
                    rating: 0,
                    date: '',
                    comment: '',
                    serviceTitle: '',
                });
            } else if (arrayName === 'services_offered') {
                newArray.push({
                    id: crypto.randomUUID(),
                    title: '',
                    category: '',
                    price: '',
                    link: '',
                });
            } else if (arrayName === 'public_updates') {
                newArray.push({
                    id: crypto.randomUUID(),
                    date: '',
                    type: '',
                    title: '',
                    content: '',
                    image: null,
                });
            }
            return {
                ...prev,
                [arrayName]: newArray as (typeof prev)[typeof arrayName],
            };
        });
    };

    /**
     * Removes an object from one of the dynamic arrays.
     * @param arrayName The name of the array field in ArtisanModel.
     * @param index The index of the object to remove.
     */
    const removeArrayObjectInput = (
        arrayName: 'testimonials' | 'services_offered' | 'public_updates',
        index: number
    ) => {
        setFormData((prev) => {
            const newArray = (prev[arrayName] as any[]).filter(
                (_, i) => i !== index
            );
            return {
                ...prev,
                [arrayName]: newArray as (typeof prev)[typeof arrayName],
            };
        });
    };

    /**
     * Handles the form submission.
     * In a real application, this would send the formData to a backend API.
     */
    const handleSubmit = (
        event: SubmitEvent & {
            currentTarget: HTMLFormElement;
            target: Element;
        }
    ) => {
        event.preventDefault(); // Prevent default form submission

        // Here you would typically send formData() to your backend
        console.log('Submitting new Artisan Profile:', formData());

        // Close the modal and reset form after submission
        props.closeModal(false);
        resetForm();
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
            certifications: '',
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

                            <form onSubmit={handleSubmit} class="space-y-6">
                                {/* Basic Information Section */}
                                <section class="border-b border-gray-200 pb-6">
                                    <h2 class="text-2xl font-bold text-gray-800 mb-4">
                                        1. Basic Information
                                    </h2>
                                    <div class="bg-blue-50 border border-blue-200 p-4 rounded-md mb-4">
                                        <p class="text-blue-800 font-medium">
                                            Start by providing your essential
                                            details.
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
                                                    formData().specialization
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
                                                onInput={handleInputChange}
                                                required
                                            >
                                                <option value="">
                                                    Select a category
                                                </option>
                                                <option value="Arts & Crafts">
                                                    Arts & Crafts
                                                </option>
                                                <option value="Home Services">
                                                    Home Services
                                                </option>
                                                <option value="Digital Services">
                                                    Digital Services
                                                </option>
                                                <option value="Personal Services">
                                                    Personal Services
                                                </option>
                                                {/* Add more categories as needed */}
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
                                            <input
                                                type="text"
                                                name="sub_category"
                                                id="artisanSubCategory"
                                                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                placeholder="e.g., Custom Furniture, Web Design"
                                                value={formData().sub_category}
                                                onInput={handleInputChange}
                                            />
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
                                                src={formData().profile_picture}
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
                                                    onInput={handleFileChange}
                                                />
                                            </label>
                                        </div>
                                        <p class="mt-2 text-xs text-gray-500">
                                            JPG, PNG, GIF up to 5MB.
                                            Recommended: square aspect ratio.
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
                                            Let customers know where you operate
                                            and how to reach you.
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
                                                    Platform Chat (Recommended)
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
                                                    Email (if selected, ensure
                                                    your email is on file)
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
                                                    Phone (if selected, ensure
                                                    your phone number is on
                                                    file)
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
                                            registered business (if applicable).
                                        </p>
                                        <p class="text-blue-700 text-sm mt-2">
                                            This information can help build
                                            trust and verify your professional
                                            status.
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
                                                value={formData().business_name}
                                                onInput={handleInputChange}
                                            />
                                        </div>
                                        {/* Business Registration Number Input */}
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
                                                    formData().years_in_business
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
                                            Listing relevant certifications can
                                            significantly boost your
                                            credibility.
                                        </p>
                                    </div>
                                    <div>
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
                                            value={formData().certifications}
                                            onInput={handleInputChange}
                                        />
                                        <p class="mt-2 text-xs text-gray-500">
                                            These help build trust and
                                            credibility with potential
                                            customers.
                                        </p>
                                    </div>
                                </section>

                                {/* Testimonials Section */}
                                <section class="pb-6 pt-6 border-b border-gray-200">
                                    <h3 class="text-xl font-bold text-gray-800 mb-4">
                                        5. Testimonials
                                    </h3>
                                    <div class="bg-blue-50 border border-blue-200 p-4 rounded-md mb-4">
                                        <p class="text-blue-800 font-medium">
                                            Collect and showcase positive
                                            feedback from your clients to build
                                            trust!
                                        </p>
                                        <p class="text-blue-700 text-sm mt-2">
                                            Add testimonials from satisfied
                                            customers here. Include their name,
                                            rating, date, and a comment about
                                            their experience with your service.
                                        </p>
                                    </div>
                                    <div class="space-y-4">
                                        <For each={formData().testimonials}>
                                            {(testimonial, index) => (
                                                <TestimonialInput
                                                    testimonial={testimonial}
                                                    index={index}
                                                    arrayName="testimonials"
                                                    onInput={
                                                        handleArrayObjectInputChange
                                                    }
                                                    onRemove={
                                                        removeArrayObjectInput
                                                    }
                                                />
                                            )}
                                        </For>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            addArrayObjectInput('testimonials')
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
                                            Each service listing will include
                                            details like title, category, price,
                                            and an optional link to more
                                            details.
                                        </p>
                                    </div>
                                    <div class="space-y-4">
                                        <For each={formData().services_offered}>
                                            {(service, index) => (
                                                <OfferedServiceInput
                                                    service={service}
                                                    index={index}
                                                    arrayName="services_offered"
                                                    onInput={
                                                        handleArrayObjectInputChange
                                                    }
                                                    onRemove={
                                                        removeArrayObjectInput
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
                                            Post project spotlights, important
                                            announcements, or share insights
                                            about your activities.
                                        </p>
                                    </div>
                                    <div class="space-y-4">
                                        <For each={formData().public_updates}>
                                            {(update, index) => (
                                                <PublicUpdateInput
                                                    update={update}
                                                    index={index}
                                                    arrayName="public_updates"
                                                    onInput={
                                                        handleArrayObjectInputChange
                                                    }
                                                    onRemove={
                                                        removeArrayObjectInput
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
                                                setFormData((prev) => {
                                                    const newContactPreferences =
                                                        new Set(
                                                            prev.contact_preferences
                                                        );
                                                    if (e.target.checked) {
                                                        newContactPreferences.add(
                                                            'Agreed to Terms'
                                                        );
                                                    } else {
                                                        newContactPreferences.delete(
                                                            'Agreed to Terms'
                                                        );
                                                    }
                                                    return {
                                                        ...prev,
                                                        contact_preferences:
                                                            Array.from(
                                                                newContactPreferences
                                                            ),
                                                    };
                                                });
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
                                        onClick={() => props.closeModal(false)}
                                        class="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-lg font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                    >
                                        Create My Profile
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
