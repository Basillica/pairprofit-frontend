import { createSignal, For, onMount, Show } from 'solid-js';
import { NotificationModel, NotificationType } from '../../models/notification';
import { LocalStorageKey, SecureLocalStorage } from '../../lib/localstore';
import { UserModel } from '../../models/auth';
import { useAppContext } from '../../state';
import { NotificationApiHandler } from '../../api/backend/notification';

function getNotificationIcon(type: NotificationType): string {
    switch (type) {
        case 'message':
            return `<svg class="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H2a2 2 0 01-2-2V5a2 2 0 012-2h16a2 2 0 012 2zM12 7H8v2h4V7zm0 3H8v2h4v-2z" clip-rule="evenodd"></path></svg>`;
        case 'job':
            return `<svg class="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path><path fill-rule="evenodd" d="M4 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 2a1 1 0 000 2h6a1 1 0 100-2H7zm0 4a1 1 0 100 2h3a1 1 0 100-2H7z" clip-rule="evenodd"></path></svg>`;
        case 'review':
            return `<svg class="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1.517l.939.782a1 1 0 001.328.058l1.65-.964a1 1 0 01.996.368l1.416 2.502a1 1 0 01-.292 1.344l-1.56.974a1 1 0 00-.472 1.258l.267 1.767c.05.328-.044.664-.265.918l-1.745 1.564a1 1 0 00-.332 1.488l.857 1.543a1 1 0 01-.107 1.157l-1.417 1.417a1 1 0 01-1.157.107l-1.543-.857a1 1 0 00-1.488.332l-1.564 1.745a1 1 0 01-.918.267l-1.767-.267a1 1 0 01-1.258.472l-.964-1.65a1 1 0 01.368-.996l2.502-1.416a1 1 0 011.344.292l1.56.974a1 1 0 001.258-.472l1.767-.267a1 1 0 01.918-.265l1.564 1.745a1 1 0 00.332 1.488l-.857 1.543a1 1 0 01-.107 1.157l1.417 1.417z" clip-rule="evenodd"></path></svg>`;
        case 'payment':
            return `<svg class="w-6 h-6 text-purple-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 002-2V4H4zm10 2a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h10z" clip-rule="evenodd"></path></svg>`;
        case 'system':
            return `<svg class="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>`;
        case 'contact':
            return `<svg class="w-6 h-6 text-indigo-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>`;
        case 'appointment':
            return `<svg class="w-6 h-6 text-pink-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>`;
        case 'email':
            return `<svg class="w-6 h-6 text-orange-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>`;
        case 'goal':
            return `<svg class="w-6 h-6 text-teal-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>`;
        case 'general':
        default:
            return `<svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l3 3a1 1 0 001.414-1.414L11 9.586V6z" clip-rule="evenodd"></path></svg>`;
    }
}

function formatRelativeTime(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSeconds = Math.round(diffMs / 1000);
    const diffMinutes = Math.round(diffMs / (1000 * 60));
    const diffHours = Math.round(diffMs / (1000 * 60 * 60));
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

    if (diffSeconds < 60) return 'just now';
    if (diffMinutes < 60)
        return `${diffMinutes} min${diffMinutes !== 1 ? 's' : ''} ago`;
    if (diffHours < 24)
        return `${diffHours} hr${diffHours !== 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    if (diffDays < 30)
        return `${Math.round(diffDays / 7)} week${
            Math.round(diffDays / 7) !== 1 ? 's' : ''
        } ago`;
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
}

export function NotificationsPage() {
    const [filter, setFilter] = createSignal<string>('all');
    const [selectedNotification, setSelectedNotification] =
        createSignal<NotificationModel | null>(null);
    const {
        userType: { authUser, setAuthUser },
        notification: { notificationList, setNotificationList },
    } = useAppContext();
    const notificationApi = new NotificationApiHandler();
    const filteredNotifications = () => {
        let currentNotifications = [...notificationList()];
        const currentFilter = filter();
        if (currentFilter === 'unread') {
            currentNotifications = currentNotifications.filter(
                (n) => !n.isRead
            );
        } else if (currentFilter !== 'all') {
            currentNotifications = currentNotifications.filter(
                (n) => n.type === currentFilter
            );
        }
        return currentNotifications.sort(
            (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
        );
    };

    onMount(async () => {
        if (!authUser()) {
            const user = SecureLocalStorage.getItem<UserModel>(
                LocalStorageKey.AppAuthUserModel
            );
            if (!user) return;
            setAuthUser(user);
        }

        const result = await notificationApi.getUserNotifications(
            authUser()!.id
        );
        if (result.success) {
            setNotificationList([...notificationList(), ...result.data]);
        }
    });

    const handleToggleReadStatus = async (notificationID: string) => {
        const notification = notificationList().find(
            (c) => c.id === notificationID
        )!;
        if (!notification) return;

        let result = await notificationApi.toggleReadStatus(
            notification.id,
            !notification.isRead
        );

        if (result.success) {
            setNotificationList((prevNotifs) =>
                prevNotifs.map((notification) =>
                    notification.id === notificationID
                        ? { ...notification, isRead: !notification.isRead }
                        : notification
                )
            );
        }
    };

    const handleMarkAll = async (status: boolean) => {
        let result = await notificationApi.toggleAllReadStatus(
            authUser()!.id,
            status
        );
        if (result.success) {
            setNotificationList((prev) =>
                prev.map((notif) => ({ ...notif, isRead: status }))
            );
        }
    };

    const handleNotificationClick = (notif: NotificationModel) => {
        setSelectedNotification(notif);
        if (!notif.isRead) {
            handleToggleReadStatus(notif.id);
        }
    };

    const handleCloseNotificationCard = () => {
        setSelectedNotification(null);
    };

    return (
        <div class="bg-gray-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
            <div class="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                <h1 class="text-3xl font-extrabold text-gray-900 text-center mb-6">
                    My Notifications
                </h1>

                <div class="mb-6 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4">
                    <div class="flex space-x-2">
                        <button
                            onClick={() => handleMarkAll(true)}
                            class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
                        >
                            Mark All as Read
                        </button>
                        <button
                            onClick={() => handleMarkAll(false)}
                            class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                        >
                            Mark All as Unread
                        </button>
                    </div>
                    <select
                        value={filter()}
                        onInput={(e) => setFilter(e.currentTarget.value)}
                        class="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                    >
                        <option value="all">All Notifications</option>
                        <option value="unread">Unread</option>
                        <option value="job">Job Updates</option>
                        <option value="message">Messages</option>
                        <option value="review">Reviews</option>
                        <option value="payment">Payments</option>
                        <option value="system">System Alerts</option>
                        <option value="contact">Contact Alerts</option>
                        <option value="appointment">Appointment Alerts</option>
                        <option value="email">Email Alerts</option>
                        <option value="goal">Goal Alerts</option>
                        <option value="general">General Alerts</option>
                    </select>
                </div>

                <div class="notifications-container space-y-4">
                    <Show
                        when={filteredNotifications().length > 0}
                        fallback={
                            <p class="text-center text-gray-500 py-10">
                                No notifications found.
                            </p>
                        }
                    >
                        <For each={filteredNotifications()}>
                            {(notif) => (
                                <div
                                    tabindex="0"
                                    role="button"
                                    onClick={() =>
                                        handleNotificationClick(notif)
                                    }
                                    class={`notification-item p-4 rounded-lg shadow-sm flex items-start space-x-4
                          ${notif.isRead ? 'read' : 'unread'}`}
                                >
                                    <div
                                        class="flex-shrink-0 pt-1"
                                        innerHTML={getNotificationIcon(
                                            notif.type
                                        )}
                                    />
                                    <div class="flex-grow">
                                        <h3 class="text-lg font-semibold text-gray-900">
                                            {notif.title}
                                        </h3>
                                        <p class="text-gray-700 text-sm mb-1">
                                            {notif.message}
                                        </p>
                                        <span class="text-xs text-gray-500">
                                            {formatRelativeTime(
                                                notif.timestamp
                                            )}
                                        </span>
                                    </div>
                                    {/* MODIFIED: Button container with responsive stacking */}
                                    <div class="flex-shrink-0 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleToggleReadStatus(
                                                    notif.id
                                                );
                                            }}
                                            class={`px-3 py-1 rounded-md text-sm
                              ${
                                  notif.isRead
                                      ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                      : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                              }`}
                                        >
                                            {notif.isRead
                                                ? 'Mark as Unread'
                                                : 'Mark as Read'}
                                        </button>
                                        <Show when={notif.link}>
                                            <a
                                                href={notif.link}
                                                onClick={(e) =>
                                                    e.stopPropagation()
                                                }
                                                class="px-3 py-1 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 text-sm text-center sm:w-auto"
                                            >
                                                View
                                            </a>
                                        </Show>
                                    </div>
                                </div>
                            )}
                        </For>
                    </Show>
                </div>

                <p class="text-gray-500 text-sm mt-8 text-center">
                    Note: Clicking notifications can mark it as read/unread
                </p>
            </div>

            <Show when={selectedNotification()}>
                <NotificationDetailCard
                    notification={selectedNotification()!}
                    onClose={handleCloseNotificationCard}
                />
            </Show>

            <style>{`
                .notifications-container {
                max-height: calc(100vh - 200px);
                overflow-y: auto;
                scrollbar-width: thin;
                scrollbar-color: #a0aec0 #edf2f7;
                }
                .notifications-container::-webkit-scrollbar {
                width: 8px;
                }
                .notifications-container::-webkit-scrollbar-track {
                background: #edf2f7;
                border-radius: 10px;
                }
                .notifications-container::-webkit-scrollbar-thumb {
                background-color: #a0aec0;
                border-radius: 10px;
                border: 2px solid #edf2f7;
                }

                .notification-item {
                cursor: pointer;
                transition: background-color 0.2s ease;
                }

                .notification-item.unread {
                background-color: #eff6ff;
                border-left: 4px solid #3b82f6;
                }
                .notification-item.read {
                background-color: #ffffff;
                border-left: 4px solid transparent;
                }
                .notification-item:hover {
                background-color: #e2e8f0;
                }
            `}</style>
        </div>
    );
}

function getNotificationTypeTitle(type: NotificationType): string {
    switch (type) {
        case 'message':
            return 'New Message';
        case 'job':
            return 'Job Update';
        case 'review':
            return 'New Review';
        case 'payment':
            return 'Payment Received';
        case 'system':
            return 'System Alert';
        case 'general':
            return 'General NotificationModel';
        default:
            return 'NotificationModel';
    }
}

interface NotificationDetailCardProps {
    notification: NotificationModel;
    onClose: () => void; // Callback to close the card
}

export function NotificationDetailCard(props: NotificationDetailCardProps) {
    const { notification, onClose } = props;

    return (
        <div class="fixed inset-0 bg-gray-600 bg-opacity-70 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-opacity duration-300">
            <div class="bg-white rounded-xl shadow-2xl max-w-lg w-full mx-auto p-8 relative transform scale-100 transition-transform duration-300">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 rounded-full p-1"
                    aria-label="Close notification details"
                >
                    <svg
                        class="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M6 18L18 6M6 6l12 12"
                        ></path>
                    </svg>
                </button>

                {/* Header Section */}
                <div class="flex items-center space-x-4 mb-4">
                    {/* The icon can be dynamically rendered here if needed */}
                    {/* <div innerHTML={getNotificationIcon(notification.type)} class="text-4xl"></div> */}
                    <h2 class="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">
                        {notification.title}
                    </h2>
                </div>

                {/* Metadata Section */}
                <div class="mb-6 space-y-1 text-sm text-gray-600 border-b border-gray-200 pb-4">
                    <div class="flex items-center">
                        <span class="font-semibold text-gray-800 w-24">
                            Type:
                        </span>
                        <span class="capitalize">
                            {getNotificationTypeTitle(notification.type)}
                        </span>
                    </div>
                    <div class="flex items-center">
                        <span class="font-semibold text-gray-800 w-24">
                            Received:
                        </span>
                        <span>{notification.timestamp.toLocaleString()}</span>
                    </div>
                    <div class="flex items-center">
                        <span class="font-semibold text-gray-800 w-24">
                            Status:
                        </span>
                        <span
                            class={
                                notification.isRead
                                    ? 'text-green-600'
                                    : 'text-yellow-600 font-bold'
                            }
                        >
                            {notification.isRead ? 'Read' : 'Unread'}
                        </span>
                    </div>
                </div>

                {/* Message Body */}
                <div class="prose max-w-none text-gray-800 mb-6">
                    <p class="leading-relaxed whitespace-pre-wrap">
                        {notification.message}
                    </p>
                </div>

                {/* Action Button */}
                {/* <Show when={notification.link}>
                    <a
                        href={notification.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                        onClick={onClose}
                    >
                        View Details
                        <svg
                            class="ml-3 h-5 w-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
                            <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
                        </svg>
                    </a>
                </Show> */}
            </div>
        </div>
    );
}
