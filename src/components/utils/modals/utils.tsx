import { Accessor, Component, createSignal, Setter } from 'solid-js';
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
export const TestimonialInput: Component<{
    testimonial: Testimonial;
    index: Accessor<number>;
    arrayName: 'testimonials';
    formData: Accessor<ArtisanModel>;
    setFormData: Setter<ArtisanModel>;
}> = (props) => {
    const [localTestimonial, setLocalTestimonial] = createSignal(
        props.testimonial
    );

    /**
     * Handles input changes for nested arrays of objects (testimonials, services_offered, public_updates).
     * @param index The index of the object within the array to update.
     * @param fieldName The specific field within the object to update (e.g., 'reviewer').
     * @param value The new value for the field.
     */
    const handleTestimonialsInput = <F extends keyof Testimonial>(
        index: number,
        fieldName: F,
        value: Testimonial[F]
    ) => {
        setLocalTestimonial({
            ...localTestimonial(),
            [fieldName]: value,
        });
        props.setFormData({
            ...props.formData(),
            testimonials: [
                ...props.formData().testimonials.slice(0, index),
                localTestimonial(),
                ...props.formData().testimonials.slice(index + 1),
            ],
        });
    };

    /**
     * Removes an object from one of the dynamic arrays.
     * @param index The index of the object to remove.
     */
    const handleRemoveTestimonial = (index: number) => {
        setLocalTestimonial({
            id: localTestimonial().id,
            reviewer: '',
            rating: 0,
            date: '',
            comment: '',
            service_title: '',
        });
        props.setFormData({
            ...props.formData(),
            testimonials: [
                ...props.formData().testimonials.slice(0, index),
                localTestimonial(),
                ...props.formData().testimonials.slice(index + 1),
            ],
        });
    };

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
                        value={localTestimonial().reviewer}
                        onInput={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleTestimonialsInput(
                                props.index(),
                                'reviewer',
                                e.target.value
                            );
                        }}
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
                        value={localTestimonial().rating}
                        onInput={(e) =>
                            handleTestimonialsInput(
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
                        value={localTestimonial().comment}
                        onInput={(e) =>
                            handleTestimonialsInput(
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
                        value={localTestimonial().date}
                        onInput={(e) =>
                            handleTestimonialsInput(
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
                        value={localTestimonial().service_title}
                        onInput={(e) =>
                            handleTestimonialsInput(
                                props.index(),
                                'service_title',
                                e.target.value
                            )
                        }
                        placeholder="Service related to testimonial"
                    />
                </div>
            </div>
            <button
                type="button"
                onClick={() => handleRemoveTestimonial(props.index())}
                class="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded-md shadow-sm text-sm"
            >
                Clear
            </button>
        </div>
    );
};

/**
 * OfferedServiceInput Component
 * Renders input fields for a single offered service and allows its removal.
 * Reused from EditProfileModal for consistency.
 */
export const OfferedServiceInput: Component<{
    service: OfferedService;
    index: Accessor<number>;
    arrayName: 'services_offered';
    formData: Accessor<ArtisanModel>;
    setFormData: Setter<ArtisanModel>;
}> = (props) => {
    const [localOfferedService, setLocalOfferedService] = createSignal(
        props.service
    );

    /**
     * Handles input changes for nested arrays of objects (testimonials, services_offered, public_updates).
     * @param index The index of the object within the array to update.
     * @param fieldName The specific field within the object to update (e.g., 'reviewer').
     * @param value The new value for the field.
     */
    const handleServiceInput = <F extends keyof OfferedService>(
        index: number,
        fieldName: F,
        value: OfferedService[F]
    ) => {
        setLocalOfferedService({
            ...localOfferedService(),
            [fieldName]: value,
        });
        props.setFormData({
            ...props.formData(),
            services_offered: [
                ...props.formData().services_offered.slice(0, index),
                localOfferedService(),
                ...props.formData().services_offered.slice(index + 1),
            ],
        });
    };

    /**
     * Removes an object from one of the dynamic arrays.
     * @param index The index of the object to remove.
     */
    const handleRemoveService = (index: number) => {
        setLocalOfferedService({
            id: localOfferedService().id,
            title: '',
            category: '',
            price: '',
            link: '',
        });

        props.setFormData({
            ...props.formData(),
            services_offered: [
                ...props.formData().services_offered.slice(0, index),
                localOfferedService(),
                ...props.formData().services_offered.slice(index + 1),
            ],
        });
    };

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
                        value={localOfferedService().title}
                        onInput={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleServiceInput(
                                props.index(),
                                'title',
                                e.target.value
                            );
                        }}
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
                        value={localOfferedService().category}
                        onInput={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleServiceInput(
                                props.index(),
                                'category',
                                e.target.value
                            );
                        }}
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
                        value={localOfferedService().price}
                        onInput={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleServiceInput(
                                props.index(),
                                'price',
                                e.target.value
                            );
                        }}
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
                        value={localOfferedService().link}
                        onInput={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleServiceInput(
                                props.index(),
                                'link',
                                e.target.value
                            );
                        }}
                        placeholder="Link to service details"
                    />
                </div>
            </div>
            <button
                type="button"
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleRemoveService(props.index());
                }}
                class="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded-md shadow-sm text-sm"
            >
                Clear
            </button>
        </div>
    );
};

/**
 * PublicUpdateInput Component
 * Renders input fields for a single public update and allows its removal.
 * Reused from EditProfileModal for consistency.
 */
export const PublicUpdateInput: Component<{
    update: PublicUpdate;
    index: Accessor<number>;
    arrayName: 'public_updates';
    formData: Accessor<ArtisanModel>;
    setFormData: Setter<ArtisanModel>;
}> = (props) => {
    const [localPublicUpdate, setLocalPublicUpdate] = createSignal(
        props.update
    );

    /**
     * Handles input changes for nested arrays of objects (testimonials, services_offered, public_updates).
     * @param index The index of the object within the array to update.
     * @param fieldName The specific field within the object to update (e.g., 'reviewer').
     * @param value The new value for the field.
     */
    const handlePublicUpdateInput = <F extends keyof PublicUpdate>(
        index: number,
        fieldName: F,
        value: PublicUpdate[F]
    ) => {
        setLocalPublicUpdate({
            ...localPublicUpdate(),
            [fieldName]: value,
        });
        props.setFormData({
            ...props.formData(),
            public_updates: [
                ...props.formData().public_updates.slice(0, index),
                localPublicUpdate(),
                ...props.formData().public_updates.slice(index + 1),
            ],
        });
    };

    /**
     * Removes an object from one of the dynamic arrays.
     * @param index The index of the object to remove.
     */
    const handleRemovePublicUpdate = (index: number) => {
        setLocalPublicUpdate({
            id: localPublicUpdate().id,
            date: '',
            type: '',
            title: '',
            content: '',
            image: null,
        });
        props.setFormData({
            ...props.formData(),
            public_updates: [
                ...props.formData().public_updates.slice(0, index),
                localPublicUpdate(),
                ...props.formData().public_updates.slice(index + 1),
            ],
        });
    };

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
                        value={localPublicUpdate().date}
                        onInput={(e) =>
                            handlePublicUpdateInput(
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
                        value={localPublicUpdate().type}
                        onInput={(e) =>
                            handlePublicUpdateInput(
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
                        value={localPublicUpdate().title}
                        onInput={(e) =>
                            handlePublicUpdateInput(
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
                        value={localPublicUpdate().content}
                        onInput={(e) =>
                            handlePublicUpdateInput(
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
                        value={localPublicUpdate().image || ''}
                        onInput={(e) =>
                            handlePublicUpdateInput(
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
                onClick={() => handleRemovePublicUpdate(props.index())}
                class="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded-md shadow-sm text-sm"
            >
                Clear
            </button>
        </div>
    );
};
