import { UserModel } from "../models/auth";
import { ApiHandler } from "./base";

export class PublicHandler extends ApiHandler {
  async fetchCategories() {
    return await this.get(`/public/categories`);
  }

  async loginByProvider(provider: string, url: string) {
    return await this.get(`/public/${provider}/callback?${url}`);
  }

  async signUp(body: UserModel) {
    return await this.post(`/public/signup`, body);
  }

  async confirmSignup(body: UserModel) {
    return await this.post(`/public/confirm-signup`, body);
  }

  async forgotPassword(body: UserModel) {
    return await this.post(`/public/forgot-password`, body);
  }

  async confirmForgotPassword(body: UserModel) {
    return await this.post(`/public/confirm-forgot-password`, body);
  }

  async login(body: UserModel) {
    return await this.post(`/public/login`, body);
  }
}
