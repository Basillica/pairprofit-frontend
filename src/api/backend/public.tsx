import { UserModel } from "../../models/auth";
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

  async confirmSignup(body: { token: string; otp: number; email: string }) {
    return await this.post(`/public/confirm-signup`, body);
  }

  async forgotPassword(body: { email: string }) {
    return await this.post(`/public/forgot-password`, body);
  }

  async confirmForgotPassword(body: {
    token: string;
    otp: number;
    password: string;
  }) {
    return await this.post(`/public/confirm-forgot-password`, body);
  }

  async login(body: { username: string; password: string }) {
    return await this.post(`/public/login`, body);
  }
}
