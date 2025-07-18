import { ListingPayload } from '../../models/listing';
import { ApiHandler } from './base';

export class ListingApiHandler extends ApiHandler {
    async addListing(listing: ListingPayload) {
        return await this.post(`/listings/add`, listing);
    }

    async editListing(id: string, listing: ListingPayload) {
        return await this.put(`/listings/${id}`, listing);
    }

    async getListingByID(id: string) {
        return await this.get(`/listings/${id}`);
    }

    async getListingsForAUser(id: string) {
        return await this.get(`/listings/profile/${id}`);
    }

    async fetchAllListins(props: any) {
        return await this.post(`/listings/all`, props);
    }

    async deleteListing(id: string) {
        return await this.delete(`/listings/${id}`);
    }

    async deleteMultiple(ids: string[]) {
        return await this.post(`/delete-many`, ids);
    }
}
