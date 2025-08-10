import { NotificationModel } from '../../models/notification';
import { ApiHandler } from './base';

export class NotificationApiHandler extends ApiHandler {
    async createNotification(notification: NotificationModel) {
        return await this.post(`/notification/add`, notification);
    }

    async deleteContact(id: string) {
        return await this.delete(`/notification/${id}`);
    }

    async toggleReadStatus(id: string, status: boolean) {
        return await this.put(`/notification/read/${id}/${status}`, {});
    }

    async toggleAllReadStatus(user_id: string, status: boolean) {
        return await this.put(
            `/notification/all/read/${user_id}/${status}`,
            {}
        );
    }

    async getUserNotifications(user_id: string) {
        return await this.get(`/notification/user/${user_id}`);
    }

    async getUserNotificationsByStatus(user_id: string, status: boolean) {
        return await this.get(`/notification/user/${user_id}/status/${status}`);
    }
}
