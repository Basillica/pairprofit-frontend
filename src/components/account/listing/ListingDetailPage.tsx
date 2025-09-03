import { For, Show, Component, createSignal, createResource } from 'solid-js';
import { useParams } from '@solidjs/router';
import { ArtisanModel } from '../../../models/profile';
import modal_styles from './style.module.css';
import { useAppContext } from '../../../state';
import { EmailModel } from '../../../models/email';
import { ArtisanApiHandler } from '../../../api/backend/profile';

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

export const ProviderProfileDetail = () => {
    const [emailFormData, setEmailFormData] = createSignal<EmailModel>({
        id: '',
        sender: '',
        sender_initials: '',
        sender_color: '',
        sender_email: '',
        subject: '',
        preview: '',
        date: '',
        is_read: false,
        has_attachment: false,
        body: '',
        cc: [],
        bcc: [],
    });
    const {
        sendChatMessage,
        userType,
        inAppConnection: { setIsAppLoading, isAppLoading },
    } = useAppContext();

    const fetchArtisan = async (id: string): Promise<ArtisanModel | null> => {
        setIsAppLoading(true);
        let api = new ArtisanApiHandler();
        let listing: ArtisanModel;
        const result = await api.getArtisanByID(id);
        if (result.success) {
            listing = result.data as ArtisanModel;
        }
        setIsAppLoading(false);
        return listing!;
    };

    const params = useParams();
    const [artisanModel] = createResource(() => params.id, fetchArtisan);
    const totalReviews = () => 0;

    const emailhandleInputChange = (
        e: InputEvent & {
            currentTarget: HTMLInputElement;
            target: HTMLInputElement;
        }
    ) => {
        e.preventDefault();
        e.stopPropagation();
        const { name, value } = e.target;
        setEmailFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const emailhandleTextInputChange = (
        e: InputEvent & {
            currentTarget: HTMLTextAreaElement;
            target: HTMLTextAreaElement;
        }
    ) => {
        e.preventDefault();
        e.stopPropagation();
        const { name, value } = e.target;
        setEmailFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const [chatMessage, setChatMessage] = createSignal('');
    const [callbackName, setCallbackName] = createSignal('');
    const [callbackPhone, setCallbackPhone] = createSignal('');
    const [callbackTime, setCallbackTime] = createSignal('');
    const [callbackMessage, setCallbackMessage] = createSignal('');
    const [activeTab, setActiveTab] = createSignal('chat');

    const handleTabClick = (tabName: string) => {
        setActiveTab(tabName);
    };

    const handleSendMessage = () => {
        const message = chatMessage().trim();
        sendChatMessage({
            subtype: 'chat_message',
            sender_id: userType.userID(),
            receiver_id: artisanModel()?.user_id,
            receiver_name: artisanModel()?.name!,
            message: message,
            timestamp: new Date().toISOString(),
            message_content: 'text',
            is_media: false,
        });
        setChatMessage('');
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
        console.log(emailFormData());
    };

    return (
        <div class="bg-gray-200 bg-opacity-75 items-center justify-center p-4">
            <div class={modal_styles.modal_content}>
                <div>
                    <header class="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-8 mb-8 pb-8 border-b border-gray-200 b-8 p-6 bg-gray-50 rounded-lg shadow-inner">
                        <img
                            src={artisanModel()?.profile_picture}
                            alt="Provider Profile"
                            class="w-32 h-32 rounded-full object-cover shadow-md border-4 border-white"
                        />
                        <div class="text-center sm:text-left flex-grow">
                            <h1 class="text-4xl font-extrabold text-gray-900 mb-2">
                                {artisanModel()?.name}
                            </h1>
                            <p class="text-xl text-blue-600 mb-2">
                                {artisanModel()?.specialization}
                            </p>
                            <div class="flex items-center justify-center sm:justify-start mb-4">
                                {!isAppLoading() && artisanModel.latest && (
                                    <StarRating
                                        rating={artisanModel()?.overall_rating!}
                                    />
                                )}
                                <span class="text-gray-700 text-lg font-semibold">
                                    {artisanModel()?.overall_rating.toFixed(1)}
                                </span>
                                <span class="text-gray-500 text-lg ml-2">
                                    ({artisanModel()?.total_reviews} Reviews)
                                </span>
                            </div>
                        </div>
                    </header>

                    <section class="mb-8 p-6 bg-gray-50 rounded-lg shadow-inner">
                        <h2 class="text-2xl font-bold text-gray-800 mb-4">
                            About Me
                        </h2>
                        <p class="text-gray-700 leading-relaxed">
                            {artisanModel()?.bio}
                        </p>
                        <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                            <p>
                                <strong class="font-semibold">Location:</strong>{' '}
                                <a class="mb-2 p-2 bg-blue-100 rounded-md shadow-sm text-blue-800 font-medium [&::marker]:text-blue-600">
                                    {' '}
                                    {artisanModel()?.location}
                                </a>
                            </p>
                            <p>
                                <strong class="font-semibold">
                                    Years in Business:
                                </strong>{' '}
                                <a class="mb-2 p-2 bg-blue-100 rounded-md shadow-sm text-blue-800 font-medium [&::marker]:text-blue-600">
                                    {' '}
                                    {artisanModel()?.years_in_business}
                                </a>
                            </p>
                            <p>
                                <strong class="font-semibold">
                                    Business Name:
                                </strong>{' '}
                                <a class="mb-2 p-2 bg-blue-100 rounded-md shadow-sm text-blue-800 font-medium [&::marker]:text-blue-600">
                                    {' '}
                                    {artisanModel()?.business_name}
                                </a>
                            </p>
                            <p>
                                <strong class="font-semibold">
                                    Business Registration:
                                </strong>{' '}
                                <a class="mb-2 p-2 bg-blue-100 rounded-md shadow-sm text-blue-800 font-medium [&::marker]:text-blue-600">
                                    {' '}
                                    {artisanModel()?.business_registration}
                                </a>
                            </p>
                        </div>
                        <div class="mt-4">
                            <h3 class="text-lg font-semibold text-gray-800">
                                Contact Preferences:
                            </h3>
                            <ul class="list-disc ml-6 mt-5 text-gray-800">
                                {' '}
                                <For
                                    each={artisanModel()?.contact_preferences}
                                    fallback={
                                        <div>
                                            No contact preferences available.
                                        </div>
                                    }
                                >
                                    {(item) => (
                                        <li class="mb-2 p-2 bg-blue-100 rounded-md shadow-sm text-blue-800 font-medium [&::marker]:text-blue-600">
                                            {item}
                                        </li>
                                    )}
                                </For>
                            </ul>
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
                                                artisanModel()
                                                    ?.rating_breakdown[
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
                                                        style={'width: 50px'}
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
                                            artisanModel()?.testimonials &&
                                            artisanModel()!.testimonials
                                                .length > 0
                                        }
                                        fallback={
                                            <p class="text-gray-500">
                                                No testimonials yet.
                                            </p>
                                        }
                                    >
                                        <For
                                            each={artisanModel()?.testimonials}
                                        >
                                            {(testimonial) => (
                                                <div class="bg-white p-4 rounded-md shadow-sm border border-gray-100">
                                                    <div class="flex items-center mb-2">
                                                        {!isAppLoading() &&
                                                            artisanModel.latest && (
                                                                <StarRating
                                                                    rating={
                                                                        testimonial.rating
                                                                    }
                                                                />
                                                            )}
                                                        <span class="font-semibold text-gray-800">
                                                            {
                                                                testimonial.reviewer
                                                            }
                                                        </span>
                                                        <span class="text-gray-500 text-sm ml-auto">
                                                            {testimonial.date}
                                                        </span>
                                                    </div>
                                                    <p class="text-gray-700 italic mb-2">
                                                        "{testimonial.comment}"
                                                    </p>
                                                    <p class="text-sm text-gray-600">
                                                        Service:{' '}
                                                        <span class="font-medium">
                                                            {
                                                                testimonial.service_title
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
                                    artisanModel()?.services_offered &&
                                    artisanModel()!.services_offered.length > 0
                                }
                                fallback={
                                    <p class="text-gray-500 mt-4">
                                        This provider has no public service
                                        listings yet.
                                    </p>
                                }
                            >
                                <For each={artisanModel()?.services_offered}>
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
                                    artisanModel()?.public_updates &&
                                    artisanModel()!.public_updates.length > 0
                                }
                                fallback={
                                    <p class="text-gray-500 mt-4">
                                        No recent updates or project spotlights
                                        from this provider.
                                    </p>
                                }
                            >
                                <For each={artisanModel()?.public_updates}>
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

                    <section class="p-6 bg-blue-50 border border-blue-200 rounded-lg shadow-lg mt-5">
                        <h2 class="text-2xl font-bold text-blue-800 mb-4">
                            Contact the Provider
                        </h2>

                        <div class="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
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
                                <span class="block text-xl">📞</span> Request a
                                Callback
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
                                <span class="block text-xl">📧</span>
                                Send an Email
                            </button>
                            <button
                                type="button"
                                onClick={() => handleTabClick('in-app-call')}
                                class={`${
                                    activeTab() === 'in-app-call'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-200 text-gray-800'
                                }
                                              py-3 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out`}
                            >
                                <span class="block text-xl">📧</span>
                                In-App Call
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
                                        setChatMessage(e.currentTarget.value)
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
                                    will call you back at your preferred time.
                                </p>
                                <form
                                    onSubmit={(e) => handleSubmitCallback(e)}
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
                                    Send a direct email to the service provider.
                                </p>
                                <form
                                    onSubmit={handleSubmitEmail}
                                    class="space-y-4"
                                >
                                    <div>
                                        <label
                                            for="sender"
                                            class="block text-sm font-medium text-gray-700"
                                        >
                                            Your Name
                                        </label>
                                        <input
                                            type="text"
                                            id="sender"
                                            name="sender"
                                            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            value={emailFormData().sender}
                                            onInput={emailhandleInputChange}
                                        />
                                    </div>
                                    <div>
                                        <label
                                            for="sender_email"
                                            class="block text-sm font-medium text-gray-700"
                                        >
                                            Your Email Address
                                        </label>
                                        <input
                                            type="email"
                                            name="sender_email"
                                            id="sender_email"
                                            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            placeholder="your.email@example.com"
                                            value={emailFormData().sender_email}
                                            onInput={emailhandleInputChange}
                                        />
                                    </div>
                                    <div>
                                        <label
                                            for="subject"
                                            class="block text-sm font-medium text-gray-700"
                                        >
                                            Subject
                                        </label>
                                        <input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            placeholder="Inquiry about your service"
                                            value={emailFormData().subject}
                                            onInput={emailhandleInputChange}
                                        />
                                    </div>
                                    <div>
                                        <label
                                            for="body"
                                            class="block text-sm font-medium text-gray-700"
                                        >
                                            Message
                                        </label>
                                        <textarea
                                            id="body"
                                            name="body"
                                            rows="6"
                                            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            placeholder="Write your detailed message here..."
                                            value={emailFormData().body}
                                            onInput={emailhandleTextInputChange}
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
        </div>
    );
};
