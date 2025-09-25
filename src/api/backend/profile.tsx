import { ArtisanModel } from '../../models/profile';
import { ApiHandler } from './base';

export class ArtisanApiHandler extends ApiHandler {
    async addListing(listing: ArtisanModel) {
        return await this.post(`/artisan/add`, listing);
    }

    async editListing(id: string, listing: ArtisanModel) {
        return await this.put(`/artisan/${id}`, listing);
    }

    async getListingByUserID(id: string, props: any) {
        return await this.post(`/artisan/id/${id}`, props);
    }

    async getArtisanByID(id: string) {
        return await this.get(`/artisan/user/${id}`);
    }

    async getListingByEmail(email: string) {
        return await this.get(`/artisan/email/${email}`);
    }
    async getListingsForAUser(id: string) {
        return await this.get(`/artisan/profile/${id}`);
    }

    async fetchAllArtisans(props: any) {
        return await this.post(`/artisan/all`, props);
    }

    async deleteListing(id: string) {
        return await this.delete(`/artisan/${id}`);
    }

    async deleteMultiple(ids: string[]) {
        return await this.post(`/delete-many`, ids);
    }
}
