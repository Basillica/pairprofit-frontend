import { ContactModel } from '../../models/contact';
import { ApiHandler } from './base';

export class ContactApiHandler extends ApiHandler {
    async createContact(contact: ContactModel) {
        return await this.post(`/contact/add`, contact);
    }

    async deleteContact(id: string) {
        return await this.delete(`/contact/${id}`);
    }

    async toggleFavorite(user_id: string, contact_id: string, status: boolean) {
        return await this.put(
            `/contact/favorite/${user_id}/${contact_id}/${status}`,
            {}
        );
    }

    async toggleBlocked(user_id: string, contact_id: string, status: boolean) {
        return await this.put(
            `/contact/blocked/${user_id}/${contact_id}/${status}`,
            {}
        );
    }

    async getUserContact(user_id: string, contact_id: string) {
        return await this.get(`/contact/user/${user_id}/${contact_id}`);
    }

    async getUserContacts(user_id: string) {
        return await this.get(`/contact/contacts/${user_id}`);
    }
}
