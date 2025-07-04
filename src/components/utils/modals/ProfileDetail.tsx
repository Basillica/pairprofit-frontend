import { For, Show, Component, Accessor, Setter, createSignal } from 'solid-js';
import { Portal } from 'solid-js/web';
import { ArtisanModel } from '../../../models/profile';
import modal_styles from './style.module.css';

/**
 * @typedef {object} Review
 * @property {number} id
 * @property {string} reviewer
 * @property {number} rating
 * @property {string} date
 * @property {string} comment
 * @property {string} serviceTitle
 */

/**
 * @typedef {object} ServiceOffered
 * @property {string} id
 * @property {string} title
 * @property {string} category
 * @property {string} price
 * @property {string} link
 */

/**
 * @typedef {object} PublicUpdate
 * @property {string} id
 * @property {string} date
 * @property {string} type
 * @property {string} title
 * @property {string} content
 * @property {string | null} image
 */

/**
 * @typedef {object} ProviderData
 * @property {string} id
 * @property {string} name
 * @property {string} profilePicture
 * @property {string} specialization
 * @property {string} bio
 * @property {number} overallRating
 * @property {number} totalReviews
 * @property {string} location
 * @property {string} yearsInBusiness
 * @property {string} businessName
 * @property {string} businessRegistration
 * @property {string[]} contactPreferences
 * @property {{ [key: number]: number }} ratingBreakdown
 * @property {Review[]} testimonials
 * @property {ServiceOffered[]} servicesOffered
 * @property {PublicUpdate[]} publicUpdates
 */

const StarRating: Component<{
    rating: number;
}> = (props) => {
    const fullStars = Math.floor(props.rating);
    const halfStar = props.rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
        <div class={`${modal_styles.stars} flex items-center`}>
            <For each={Array(fullStars)}>
                {() => (
                    <span
                        class={`${modal_styles.star} text-gold-500 text-xl mr-0.5}`}
                    >
                        &#9733;
                    </span>
                )}
            </For>
            <Show when={halfStar}>
                <span
                    class={`${modal_styles.star} text-gold-500 text-xl mr-0.5`}
                >
                    &#9733;
                </span>
            </Show>
            <For each={Array(emptyStars)}>
                {() => (
                    <span
                        class={`${modal_styles.star} empty text-gray-300 text-xl mr-0.5`}
                    >
                        &#9734;
                    </span>
                )}
            </For>
        </div>
    );
};

export const ProviderProfileDetail: Component<{
    isOpen: Accessor<boolean>;
    closeModal: Setter<boolean>;
    listing: Accessor<ArtisanModel | undefined>;
}> = (props) => {
    const totalReviews = () => props.listing()?.total_reviews;
    const [chatMessage, setChatMessage] = createSignal('');
    const [callbackName, setCallbackName] = createSignal('');
    const [callbackPhone, setCallbackPhone] = createSignal('');
    const [callbackTime, setCallbackTime] = createSignal('');
    const [callbackMessage, setCallbackMessage] = createSignal('');
    const [emailSenderName, setEmailSenderName] = createSignal('');
    const [emailSenderEmail, setEmailSenderEmail] = createSignal('');
    const [emailSubject, setEmailSubject] = createSignal('');
    const [emailMessage, setEmailMessage] = createSignal('');
    const [activeTab, setActiveTab] = createSignal('chat');

    const handleClose = () => {
        props.closeModal(false);
    };

    const handleTabClick = (tabName: string) => {
        setActiveTab(tabName);
    };

    const handleSendMessage = () => {
        const message = chatMessage().trim();
        if (message) {
            console.log('Sending message:', message);
            setChatMessage('');
        } else {
            alert('Please type a message.');
        }
    };

    const handleSubmitCallback = (
        event: SubmitEvent & {
            currentTarget: HTMLFormElement;
            target: Element;
        }
    ) => {
        event.preventDefault();
        const name = callbackName().trim();
        const phone = callbackPhone().trim();
        const time = callbackTime();
        const message = callbackMessage().trim();

        if (name && phone && time) {
            console.log('Callback Request:', { name, phone, time, message });
            alert('Callback request submitted! (Check console)');
            setCallbackName('');
            setCallbackPhone('');
            setCallbackTime('');
            setCallbackMessage('');
        } else {
            alert(
                'Please fill in your Name, Phone Number, and Preferred Callback Time.'
            );
        }
    };

    const handleSubmitEmail = (
        event: SubmitEvent & {
            currentTarget: HTMLFormElement;
            target: Element;
        }
    ) => {
        event.preventDefault();
        const senderName = emailSenderName().trim();
        const senderEmail = emailSenderEmail().trim();
        const subject = emailSubject().trim();
        const message = emailMessage().trim();

        if (senderName && senderEmail && subject && message) {
            console.log('Email Request:', {
                senderName,
                senderEmail,
                subject,
                message,
            });
            alert('Email sent to provider! (Check console)');
            // Clear form inputs
            setEmailSenderName('');
            setEmailSenderEmail('');
            setEmailSubject('');
            setEmailMessage('');
        } else {
            alert('Please fill in all email fields.');
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
                    class="fixed inset-0 bg-gray-200 bg-opacity-75 flex items-center justify-center p-4 transition-opacity duration-300 ease-out z-[9999]"
                >
                    <div class={modal_styles.modal_content}>
                        <span
                            class={modal_styles.modal_close_button}
                            onClick={handleClose}
                        >
                            &times;
                        </span>
                        {/* <div class="max-w-4xl w-full bg-white p-8 rounded-lg shadow-lg"> */}
                        <div class="mb-6">
                            <button
                                class="text-blue-600 hover:text-blue-800 flex items-center"
                                onClick={handleClose}
                            >
                                <svg
                                    class="w-4 h-4 mr-1"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                    ></path>
                                </svg>
                                Back to Listings
                            </button>
                        </div>

                        <header class="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-8 mb-8 pb-8 border-b border-gray-200">
                            <img
                                src={props.listing()?.profile_picture}
                                alt="Provider Profile"
                                class="w-32 h-32 rounded-full object-cover shadow-md border-4 border-white"
                            />
                            <div class="text-center sm:text-left flex-grow">
                                <h1 class="text-4xl font-extrabold text-gray-900 mb-2">
                                    {props.listing()?.name}
                                </h1>
                                <p class="text-xl text-blue-600 mb-2">
                                    {props.listing()?.specialization}
                                </p>
                                <div class="flex items-center justify-center sm:justify-start mb-4">
                                    <StarRating
                                        rating={props.listing()!.overall_rating}
                                    />
                                    <span class="text-gray-700 text-lg font-semibold">
                                        {props
                                            .listing()
                                            ?.overall_rating.toFixed(1)}
                                    </span>
                                    <span class="text-gray-500 text-lg ml-2">
                                        ({props.listing()?.total_reviews}{' '}
                                        Reviews)
                                    </span>
                                </div>
                                {/* <button class="w-full sm:w-auto bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-lg font-medium shadow-md">
                  Chat with Provider
                </button> */}
                            </div>
                        </header>

                        <section class="mb-8 p-6 bg-gray-50 rounded-lg shadow-inner">
                            <h2 class="text-2xl font-bold text-gray-800 mb-4">
                                About Me
                            </h2>
                            <p class="text-gray-700 leading-relaxed">
                                {props.listing()?.bio}
                            </p>
                            <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                                <p>
                                    <strong class="font-semibold">
                                        Location:
                                    </strong>{' '}
                                    {props.listing()?.location}
                                </p>
                                <p>
                                    <strong class="font-semibold">
                                        Years in Business:
                                    </strong>{' '}
                                    {props.listing()?.years_in_business}
                                </p>
                                <p>
                                    <strong class="font-semibold">
                                        Business Name:
                                    </strong>{' '}
                                    {props.listing()?.business_name}
                                </p>
                                <p>
                                    <strong class="font-semibold">
                                        Business Registration:
                                    </strong>{' '}
                                    {props.listing()?.business_registration}
                                </p>
                            </div>
                            <div class="mt-4">
                                <h3 class="text-lg font-semibold text-gray-800">
                                    Contact Preferences:
                                </h3>
                                <p class="text-gray-700">
                                    {props
                                        .listing()
                                        ?.contact_preferences.join(', ')}
                                </p>
                            </div>
                        </section>

                        <section class="mb-8 p-6 bg-white rounded-lg shadow-md">
                            <h2 class="text-2xl font-bold text-gray-800 mb-4">
                                Ratings & Reviews
                            </h2>

                            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <div>
                                    <h3 class="text-xl font-semibold text-gray-800 mb-3">
                                        Overall Rating Breakdown
                                    </h3>
                                    <div class="space-y-2">
                                        <For each={['5', '4', '3', '2', '1']}>
                                            {(star) => {
                                                const count =
                                                    props.listing()
                                                        ?.ratingBreakdown[
                                                        star as
                                                            | '5'
                                                            | '4'
                                                            | '3'
                                                            | '2'
                                                            | '1'
                                                    ] || 0;
                                                const percentage =
                                                    totalReviews()! > 0
                                                        ? (count /
                                                              totalReviews()!) *
                                                          100
                                                        : 0;
                                                return (
                                                    <div class="flex items-center space-x-2">
                                                        <span
                                                            class="text-sm font-medium text-gray-700 w-6 text-right"
                                                            style={
                                                                'width: 50px'
                                                            }
                                                        >
                                                            {`${star} star`}
                                                        </span>
                                                        <div
                                                            class={`${modal_styles.rating_bar_container} flex-grow`}
                                                        >
                                                            <div
                                                                class={`${modal_styles.rating_bar_fill}`}
                                                                style={{
                                                                    width: `${percentage}%`,
                                                                }}
                                                            ></div>
                                                        </div>
                                                        <span class="text-sm text-gray-600 w-10 text-right">
                                                            {count}
                                                        </span>
                                                    </div>
                                                );
                                            }}
                                        </For>
                                    </div>
                                </div>

                                <div>
                                    <h3 class="text-xl font-semibold text-gray-800 mb-3">
                                        What Clients Say
                                    </h3>
                                    <div class="space-y-4">
                                        <Show
                                            when={
                                                props.listing()?.testimonials &&
                                                props.listing()!.testimonials
                                                    .length > 0
                                            }
                                            fallback={
                                                <p class="text-gray-500">
                                                    No testimonials yet.
                                                </p>
                                            }
                                        >
                                            <For
                                                each={
                                                    props.listing()
                                                        ?.testimonials
                                                }
                                            >
                                                {(testimonial) => (
                                                    <div class="bg-white p-4 rounded-md shadow-sm border border-gray-100">
                                                        <div class="flex items-center mb-2">
                                                            <StarRating
                                                                rating={
                                                                    testimonial.rating
                                                                }
                                                            />
                                                            <span class="font-semibold text-gray-800">
                                                                {
                                                                    testimonial.reviewer
                                                                }
                                                            </span>
                                                            <span class="text-gray-500 text-sm ml-auto">
                                                                {
                                                                    testimonial.date
                                                                }
                                                            </span>
                                                        </div>
                                                        <p class="text-gray-700 italic mb-2">
                                                            "
                                                            {
                                                                testimonial.comment
                                                            }
                                                            "
                                                        </p>
                                                        <p class="text-sm text-gray-600">
                                                            Service:{' '}
                                                            <span class="font-medium">
                                                                {
                                                                    testimonial.serviceTitle
                                                                }
                                                            </span>
                                                        </p>
                                                    </div>
                                                )}
                                            </For>
                                        </Show>
                                    </div>
                                    <button class="mt-6 text-blue-600 hover:text-blue-800 font-medium">
                                        Read More Reviews
                                    </button>
                                </div>
                            </div>
                        </section>

                        <section class="mb-8 p-6 bg-gray-50 rounded-lg shadow-inner">
                            <h2 class="text-2xl font-bold text-gray-800 mb-4">
                                Services Offered
                            </h2>
                            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <Show
                                    when={
                                        props.listing()?.services_offered &&
                                        props.listing()!.services_offered
                                            .length > 0
                                    }
                                    fallback={
                                        <p class="text-gray-500 mt-4">
                                            This provider has no public service
                                            listings yet.
                                        </p>
                                    }
                                >
                                    <For
                                        each={props.listing()?.services_offered}
                                    >
                                        {(service) => (
                                            <a
                                                href={service.link}
                                                class="block bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-200"
                                            >
                                                <h4 class="text-lg font-semibold text-blue-700 mb-1">
                                                    {service.title}
                                                </h4>
                                                <p class="text-gray-600 text-sm mb-2">
                                                    {service.category}
                                                </p>
                                                <p class="text-gray-800 font-medium">
                                                    {service.price}
                                                </p>
                                            </a>
                                        )}
                                    </For>
                                </Show>
                            </div>
                        </section>

                        <section class="p-6 bg-white rounded-lg shadow-md">
                            <h2 class="text-2xl font-bold text-gray-800 mb-4">
                                Recent Updates & Project Spotlights
                            </h2>
                            <div class="space-y-6">
                                <Show
                                    when={
                                        props.listing()?.public_updates &&
                                        props.listing()!.public_updates.length >
                                            0
                                    }
                                    fallback={
                                        <p class="text-gray-500 mt-4">
                                            No recent updates or project
                                            spotlights from this provider.
                                        </p>
                                    }
                                >
                                    <For each={props.listing()?.public_updates}>
                                        {(update) => (
                                            <div class="bg-gray-100 p-4 rounded-md border border-gray-200">
                                                <div class="flex justify-between items-center mb-2">
                                                    <h4 class="text-lg font-semibold text-gray-800">
                                                        {update.title}
                                                    </h4>
                                                    <span class="text-sm text-gray-500">
                                                        {update.date}
                                                    </span>
                                                </div>
                                                <p class="text-gray-700 mb-3">
                                                    {update.content}
                                                </p>
                                                <Show when={update.image}>
                                                    <img
                                                        src={update.image!}
                                                        alt={update.title}
                                                        class="w-full h-48 object-cover rounded-md mt-2"
                                                    />
                                                </Show>
                                                <span class="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                                                    {update.type}
                                                </span>
                                            </div>
                                        )}
                                    </For>
                                </Show>
                            </div>
                        </section>
                        {/* </div> */}

                        <section class="p-6 bg-blue-50 border border-blue-200 rounded-lg shadow-lg mt-5">
                            <h2 class="text-2xl font-bold text-blue-800 mb-4">
                                Contact the Provider
                            </h2>

                            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                                <button
                                    type="button"
                                    onClick={() => handleTabClick('chat')}
                                    class={`${
                                        activeTab() === 'chat'
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-200 text-gray-800'
                                    }
                                              py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out`}
                                >
                                    <span class="block text-xl">💬</span> Send a
                                    Message
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleTabClick('callback')}
                                    class={`${
                                        activeTab() === 'callback'
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-200 text-gray-800'
                                    }
                                              py-3 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out`}
                                >
                                    <span class="block text-xl">📞</span>{' '}
                                    Request a Callback
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleTabClick('email')}
                                    class={`${
                                        activeTab() === 'email'
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-200 text-gray-800'
                                    }
                                              py-3 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out`}
                                >
                                    <span class="block text-xl">📧</span> Send
                                    an Email
                                </button>
                            </div>

                            <Show when={activeTab() === 'chat'}>
                                <div class="p-4 border border-blue-300 rounded-md bg-white">
                                    <h3 class="text-xl font-semibold text-gray-800 mb-3">
                                        Direct Message
                                    </h3>
                                    <p class="text-gray-600 mb-4">
                                        Start a private chat with the service
                                        provider on our platform.
                                    </p>
                                    <textarea
                                        rows="4"
                                        class="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        placeholder="Type your message here..."
                                        value={chatMessage()}
                                        onInput={(e) =>
                                            setChatMessage(
                                                e.currentTarget.value
                                            )
                                        }
                                    ></textarea>
                                    <button
                                        type="button"
                                        onClick={handleSendMessage}
                                        class="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        Send Message
                                    </button>
                                </div>
                            </Show>

                            <Show when={activeTab() === 'callback'}>
                                <div class="p-4 border border-blue-300 rounded-md bg-white">
                                    <h3 class="text-xl font-semibold text-gray-800 mb-3">
                                        Request a Callback
                                    </h3>
                                    <p class="text-gray-600 mb-4">
                                        Fill out the form below and the provider
                                        will call you back at your preferred
                                        time.
                                    </p>
                                    <form
                                        onSubmit={(e) =>
                                            handleSubmitCallback(e)
                                        }
                                        class="space-y-4"
                                    >
                                        <div>
                                            <label
                                                for="callbackName"
                                                class="block text-sm font-medium text-gray-700"
                                            >
                                                Your Name
                                            </label>
                                            <input
                                                type="text"
                                                id="callbackName"
                                                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                value={callbackName()}
                                                onInput={(e) =>
                                                    setCallbackName(
                                                        e.currentTarget.value
                                                    )
                                                }
                                            />
                                        </div>
                                        <div>
                                            <label
                                                for="callbackPhone"
                                                class="block text-sm font-medium text-gray-700"
                                            >
                                                Your Phone Number
                                            </label>
                                            <input
                                                type="tel"
                                                id="callbackPhone"
                                                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                placeholder="+49 123 456789"
                                                value={callbackPhone()}
                                                onInput={(e) =>
                                                    setCallbackPhone(
                                                        e.currentTarget.value
                                                    )
                                                }
                                            />
                                        </div>
                                        <div>
                                            <label
                                                for="callbackTime"
                                                class="block text-sm font-medium text-gray-700"
                                            >
                                                Preferred Callback Time
                                            </label>
                                            <input
                                                type="datetime-local"
                                                id="callbackTime"
                                                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                value={callbackTime()}
                                                onInput={(e) =>
                                                    setCallbackTime(
                                                        e.currentTarget.value
                                                    )
                                                }
                                            />
                                        </div>
                                        <div>
                                            <label
                                                for="callbackMessage"
                                                class="block text-sm font-medium text-gray-700"
                                            >
                                                Brief Message
                                            </label>
                                            <textarea
                                                id="callbackMessage"
                                                rows="3"
                                                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                placeholder="e.g., I'm interested in your cleaning service for a large apartment."
                                                value={callbackMessage()}
                                                onInput={(e) =>
                                                    setCallbackMessage(
                                                        e.currentTarget.value
                                                    )
                                                }
                                            ></textarea>
                                        </div>
                                        <button
                                            type="submit"
                                            class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                        >
                                            Submit Callback Request
                                        </button>
                                    </form>
                                </div>
                            </Show>

                            <Show when={activeTab() === 'email'}>
                                <div class="p-4 border border-blue-300 rounded-md bg-white">
                                    <h3 class="text-xl font-semibold text-gray-800 mb-3">
                                        Send an Email
                                    </h3>
                                    <p class="text-gray-600 mb-4">
                                        Send a direct email to the service
                                        provider.
                                    </p>
                                    <form
                                        onSubmit={handleSubmitEmail}
                                        class="space-y-4"
                                    >
                                        <div>
                                            <label
                                                for="emailSenderName"
                                                class="block text-sm font-medium text-gray-700"
                                            >
                                                Your Name
                                            </label>
                                            <input
                                                type="text"
                                                id="emailSenderName"
                                                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                value={emailSenderName()}
                                                onInput={(e) =>
                                                    setEmailSenderName(
                                                        e.currentTarget.value
                                                    )
                                                }
                                            />
                                        </div>
                                        <div>
                                            <label
                                                for="emailSenderEmail"
                                                class="block text-sm font-medium text-gray-700"
                                            >
                                                Your Email Address
                                            </label>
                                            <input
                                                type="email"
                                                id="emailSenderEmail"
                                                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                placeholder="your.email@example.com"
                                                value={emailSenderEmail()}
                                                onInput={(e) =>
                                                    setEmailSenderEmail(
                                                        e.currentTarget.value
                                                    )
                                                }
                                            />
                                        </div>
                                        <div>
                                            <label
                                                for="emailSubject"
                                                class="block text-sm font-medium text-gray-700"
                                            >
                                                Subject
                                            </label>
                                            <input
                                                type="text"
                                                id="emailSubject"
                                                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                placeholder="Inquiry about your service"
                                                value={emailSubject()}
                                                onInput={(e) =>
                                                    setEmailSubject(
                                                        e.currentTarget.value
                                                    )
                                                }
                                            />
                                        </div>
                                        <div>
                                            <label
                                                for="emailMessage"
                                                class="block text-sm font-medium text-gray-700"
                                            >
                                                Message
                                            </label>
                                            <textarea
                                                id="emailMessage"
                                                rows="6"
                                                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                placeholder="Write your detailed message here..."
                                                value={emailMessage()}
                                                onInput={(e) =>
                                                    setEmailMessage(
                                                        e.currentTarget.value
                                                    )
                                                }
                                            ></textarea>
                                        </div>
                                        <button
                                            type="submit"
                                            class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                        >
                                            Send Email
                                        </button>
                                    </form>
                                </div>
                            </Show>
                        </section>
                    </div>
                </div>
            </Show>
        </Portal>
    );
};
