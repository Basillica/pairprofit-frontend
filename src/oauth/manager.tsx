import { UserModel } from "../models/auth";

class AuthService {
  private USER_AUTH_TOKEN = "x-auth-token";
  private TOKEN_EXP_KEY = "x-token-exp";
  private CURRENT_AUTH_PROCESS = "x-auth-process";
  private AUTH_PROCESS_TOKEN = "x-auth-process-token";
  private AUTH_USER_MODEL = "x-auth-user-model";
  private AUTH_PROVIDER = "x-auth-provider";

  constructor() {}

  public setAuthToken(token: string, expiration: number): void {
    localStorage.setItem(this.USER_AUTH_TOKEN, token);
    localStorage.setItem(this.TOKEN_EXP_KEY, String(expiration));
  }

  public confirmLogin(process: string, token: string): void {
    localStorage.setItem(this.CURRENT_AUTH_PROCESS, process);
    localStorage.setItem(this.AUTH_PROCESS_TOKEN, token);
  }

  public getAuthToken(): string | null {
    return localStorage.getItem(this.USER_AUTH_TOKEN);
  }

  public checkAuthOnLogin(): boolean {
    const now = Math.floor(Date.now() / 1000);
    const tokenExp = localStorage.getItem(this.TOKEN_EXP_KEY);

    if (tokenExp && Number(tokenExp) > now) {
      return true;
    }

    // this.clearAuthToken();
    return false;
  }

  public checkAuth(): boolean {
    const now = Math.floor(Date.now() / 1000);
    const tokenExp = localStorage.getItem(this.TOKEN_EXP_KEY);

    if (!tokenExp || now >= Number(tokenExp)) {
      this.clearAuthToken();
      return false;
    }
    return true;
  }

  public clearAuthToken(): void {
    localStorage.removeItem(this.USER_AUTH_TOKEN);
    localStorage.removeItem(this.TOKEN_EXP_KEY);
    localStorage.removeItem(this.CURRENT_AUTH_PROCESS);
    localStorage.removeItem(this.AUTH_PROCESS_TOKEN);
    localStorage.removeItem(this.AUTH_USER_MODEL);
  }

  public getCurrentProcess(): string | null {
    return localStorage.getItem(this.CURRENT_AUTH_PROCESS);
  }

  public getUserAuthToken(): string | null {
    return localStorage.getItem(this.USER_AUTH_TOKEN);
  }

  public getAuthUser(): UserModel | null {
    const user = localStorage.getItem(this.AUTH_USER_MODEL);
    if (user) return JSON.parse(user);
    return null;
  }

  public setAuthUser(user: UserModel) {
    user.password = "";
    localStorage.setItem(this.AUTH_USER_MODEL, JSON.stringify(user));
  }

  public setAuthProcess(value: string) {
    localStorage.setItem(this.CURRENT_AUTH_PROCESS, value);
  }

  public setAuthProcessToken(value: string) {
    localStorage.setItem(this.AUTH_PROCESS_TOKEN, value);
  }

  public getAuthProcessToken(): string | null {
    return localStorage.getItem(this.AUTH_PROCESS_TOKEN);
  }

  public getAuthProvider(): string | null {
    return localStorage.getItem(this.AUTH_PROVIDER);
  }

  public setAuthProvider(value: string) {
    localStorage.setItem(this.AUTH_PROVIDER, value);
  }
}

export const authService = new AuthService();
