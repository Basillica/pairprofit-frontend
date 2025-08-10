export type NotificationType =
    | 'message'
    | 'job'
    | 'review'
    | 'payment'
    | 'system'
    | 'contact'
    | 'appointment'
    | 'email'
    | 'goal'
    | 'general';

export interface NotificationModel {
    id: string;
    type: NotificationType;
    title: string;
    message: string;
    timestamp: Date;
    isRead: boolean;
    link?: string;
}
