import { EmailModel } from '../../models/email';
import { ApiHandler } from './base';

export class EmailApiHandler extends ApiHandler {
    async createEmail(email: EmailModel) {
        return await this.post(`/email/add`, email);
    }

    async updateEmail(email: EmailModel) {
        return await this.put(`/email/update`, email);
    }

    async deleteEmail(id: string) {
        return await this.delete(`/email/${id}`);
    }

    async getEmailByID(id: string) {
        return await this.get(`/email/${id}`);
    }

    async getUnreadEmails(id: string) {
        return await this.get(`/email/unread/${id}`);
    }

    async getEmailsWithAttachments() {
        return await this.get(`/email/with_attachments`);
    }

    async markEmailAsRead(id: string, status: boolean) {
        return await this.put(`/email/mark_as_read/${id}/${status}`, {});
    }
}
