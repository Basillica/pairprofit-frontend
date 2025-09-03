import { ListingPayload } from '../../models/listing';
import { ApiHandler } from './base';

export class ListingApiHandler extends ApiHandler {
    async addListing(listing: ListingPayload) {
        return await this.post(`/listing/add`, listing);
    }

    async editListing(id: string, listing: ListingPayload) {
        return await this.put(`/listing/${id}`, listing);
    }

    async getListingByID(id: string) {
        return await this.get(`/listing/${id}`);
    }

    async getListingsForAUser(id: string) {
        return await this.get(`/listing/profile/${id}`);
    }

    async fetchAllListins(props: any) {
        return await this.post(`/listing/all`, props);
    }

    async deleteListing(id: string) {
        return await this.delete(`/listing/${id}`);
    }

    async deleteMultiple(ids: string[]) {
        return await this.post(`/delete-many`, ids);
    }
}
