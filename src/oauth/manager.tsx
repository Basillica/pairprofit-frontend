import { SecureLocalStorage, LocalStorageKey } from '../lib/localstore';
import { UserModel } from '../models/auth';

class AuthService {
    private USER_AUTH_TOKEN = LocalStorageKey.AppAuthToken;
    private TOKEN_EXP_KEY = LocalStorageKey.AppAuthExp;
    private CURRENT_AUTH_PROCESS = LocalStorageKey.AppAuthProcess;
    private AUTH_PROCESS_TOKEN = LocalStorageKey.AppAuthProcessToken;
    private AUTH_USER_MODEL = LocalStorageKey.AppAuthUserModel;
    private AUTH_PROVIDER = LocalStorageKey.AppAuthProvider;
    private AUTH_DEVICE_VERIFIED = LocalStorageKey.AppAuthDeviceVerified;

    constructor() {}

    public setAuthToken(token: string, expiration: number): void {
        SecureLocalStorage.storeItem(this.USER_AUTH_TOKEN, token);
        SecureLocalStorage.storeItem(this.TOKEN_EXP_KEY, String(expiration));
    }

    public confirmLogin(process: string, token: string): void {
        SecureLocalStorage.storeItem(this.CURRENT_AUTH_PROCESS, process);
        SecureLocalStorage.storeItem(this.AUTH_PROCESS_TOKEN, token);
    }

    public getAuthToken(): string | null {
        return SecureLocalStorage.getItem(this.USER_AUTH_TOKEN);
    }

    public checkAuthOnLogin(): boolean {
        const now = Math.floor(Date.now() / 1000);
        const tokenExp = SecureLocalStorage.getItem(this.TOKEN_EXP_KEY);

        if (tokenExp && Number(tokenExp) > now) {
            return true;
        }

        // this.clearAuthToken();
        return false;
    }

    public isAuthValid(): boolean {
        const now = Math.floor(Date.now() / 1000);
        const tokenExp = SecureLocalStorage.getItem(this.TOKEN_EXP_KEY);

        if (!tokenExp || now >= Number(tokenExp)) {
            this.clearAuthToken();
            return false;
        }
        return true;
    }

    public clearAuthToken(): void {
        SecureLocalStorage.removeItem(this.USER_AUTH_TOKEN);
        SecureLocalStorage.removeItem(this.TOKEN_EXP_KEY);
        SecureLocalStorage.removeItem(this.CURRENT_AUTH_PROCESS);
        SecureLocalStorage.removeItem(this.AUTH_PROCESS_TOKEN);
        SecureLocalStorage.removeItem(this.AUTH_USER_MODEL);
    }

    public getCurrentProcess(): string | null {
        return SecureLocalStorage.getItem(this.CURRENT_AUTH_PROCESS);
    }

    public getUserAuthToken(): string | null {
        return SecureLocalStorage.getItem(this.USER_AUTH_TOKEN);
    }

    public getAuthUser(): UserModel | null {
        const user = SecureLocalStorage.getItem<UserModel>(
            this.AUTH_USER_MODEL
        );
        if (user) return user;
        return null;
    }

    public setAuthUser(user: UserModel) {
        user.password = '';
        SecureLocalStorage.storeItem(this.AUTH_USER_MODEL, user);
    }

    public setAuthProcess(value: string) {
        SecureLocalStorage.storeItem(this.CURRENT_AUTH_PROCESS, value);
    }

    public setAuthProcessToken(value: string) {
        SecureLocalStorage.storeItem(this.AUTH_PROCESS_TOKEN, value);
    }

    public getAuthProcessToken(): string | null {
        return SecureLocalStorage.getItem(this.AUTH_PROCESS_TOKEN);
    }

    public getAuthProvider(): string | null {
        return SecureLocalStorage.getItem(this.AUTH_PROVIDER);
    }

    public setAuthProvider(value: string) {
        SecureLocalStorage.storeItem(this.AUTH_PROVIDER, value);
    }

    public setDeviceVerified(value: string) {
        SecureLocalStorage.storeItem(this.AUTH_DEVICE_VERIFIED, value);
    }

    public getDeviceVerified(): string | null {
        return SecureLocalStorage.getItem(this.AUTH_DEVICE_VERIFIED);
    }
}

export const authService = new AuthService();
