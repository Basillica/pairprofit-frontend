import { ApiHandler } from "./base";

export class PublicHandler extends ApiHandler {
  async fetchCategories() {
    return await this.get(`/public/categories`);
  }

  async loginByProvider(provider: string, url: string) {
    return await this.get(`/public/${provider}/callback?${url}`);
  }
}
