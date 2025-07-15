import { ArtisanModel } from '../../models/profile';
import { ApiHandler } from './base';

export class ArtisanApiHandler extends ApiHandler {
    async addListing(listing: ArtisanModel) {
        return await this.post(`/artisans/add`, listing);
    }

    async editListing(id: string, listing: ArtisanModel) {
        return await this.put(`/artisans/${id}`, listing);
    }

    async getListingByID(id: string, props: any) {
        return await this.post(`/artisans/id/${id}`, props);
    }

    async getListingByEmail(email: string) {
        return await this.get(`/artisans/email/${email}`);
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
