import { ListingPayload } from '../../models/listing';
import { ApiHandler } from './base';

export class ArtisanApiHandler extends ApiHandler {
    async addListing(listing: ListingPayload) {
        return await this.post(`/artisans/add`, listing);
    }

    async editListing(id: string, listing: ListingPayload) {
        return await this.put(`/artisans/${id}`, listing);
    }

    async getListingByID(id: string) {
        return await this.get(`/artisans/${id}`);
    }

    async getListingsForAUser(id: string) {
        return await this.get(`/artisans/profile/${id}`);
    }

    async fetchAllArtisans(props: any) {
        return await this.post(`/artisans/all`, props);
    }

    async deleteListing(id: string) {
        return await this.delete(`/artisans/${id}`);
    }

    async deleteMultiple(ids: string[]) {
        return await this.post(`/delete-many`, ids);
    }
}
