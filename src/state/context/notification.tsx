import { createSignal } from 'solid-js';
import { NotificationModel } from '../../models/notification';

export const [notificationType, setNotificationType] = createSignal<
    'success' | 'warning' | 'error' | null
>(null);
export const [notificationMessage, setNotificationMessage] = createSignal<
    string | null
>(null);
export const [notificationList, setNotificationList] = createSignal<
    NotificationModel[]
>([
    {
        id: 'notif_1',
        type: 'message',
        title: 'New Message from John Doe',
        message:
            'John Doe sent you a new message regarding your carpentry request.',
        timestamp: new Date('2025-08-10T14:30:00Z'),
        isRead: false,
        link: '#chat_page_with_john',
    },
    {
        id: 'notif_2',
        type: 'job',
        title: 'Job "Kitchen Renovation" Accepted!',
        message:
            'Your proposal for the kitchen renovation has been accepted by Jane Smith.',
        timestamp: new Date('2025-08-10T10:15:00Z'),
        isRead: false,
        link: '#job_details_kitchen',
    },
    {
        id: 'notif_3',
        type: 'review',
        title: 'New Review on Your Profile',
        message:
            'You have received a new 5-star review from Alex Johnson for your excellent work on his job.',
        timestamp: new Date('2025-08-09T18:00:00Z'),
        isRead: false,
        link: '#profile_reviews',
    },
    {
        id: 'notif_4',
        type: 'payment',
        title: 'Payment Received: $500',
        message:
            'Your payment of $500 for the "Kitchen Renovation" job has been successfully processed.',
        timestamp: new Date('2025-08-09T09:00:00Z'),
        isRead: true,
        link: '#payment_history',
    },
    {
        id: 'notif_5',
        type: 'system',
        title: 'System Update Complete',
        message:
            'The platform has been updated with new features and performance improvements. You can now use the advanced search filters.',
        timestamp: new Date('2025-08-08T08:00:00Z'),
        isRead: true,
        link: '#new_features_guide',
    },
    {
        id: 'notif_6',
        type: 'contact',
        title: 'New Contact Request',
        message:
            'Sarah Lee has added you as a contact. Review their profile to connect.',
        timestamp: new Date('2025-08-07T12:00:00Z'),
        isRead: false,
        link: '#contacts',
    },
    {
        id: 'notif_7',
        type: 'appointment',
        title: 'Appointment Confirmed',
        message:
            'Your appointment with Michael Brown on August 12 at 2:00 PM is confirmed.',
        timestamp: new Date('2025-08-06T15:30:00Z'),
        isRead: false,
        link: '#appointments',
    },
    {
        id: 'notif_8',
        type: 'email',
        title: 'Important Email: Account Verification',
        message:
            'Please verify your email address to ensure full access to all features.',
        timestamp: new Date('2025-08-05T11:00:00Z'),
        isRead: true,
        link: '#account_settings',
    },
    {
        id: 'notif_9',
        type: 'goal',
        title: 'Goal Achieved: 10 Jobs Completed!',
        message:
            'Congratulations! You have completed your goal of finishing 10 jobs this month. Keep up the great work!',
        timestamp: new Date('2025-08-04T17:00:00Z'),
        isRead: false,
        link: '#goals_dashboard',
    },
    {
        id: 'notif_10',
        type: 'general',
        title: 'Welcome to Our Platform!',
        message:
            'We are excited to have you on board. Explore your dashboard to get started.',
        timestamp: new Date('2025-08-03T09:45:00Z'),
        isRead: true,
        link: '#dashboard',
    },
]);
