import axios, { AxiosResponse, AxiosInstance } from 'axios';
import { GetEnvConfig } from '../../environments';
import { SecureLocalStorage, LocalStorageKey } from '../../lib/localstore';
import { UserModel } from '../../models/auth';

export type HttpResponse = {
    success: boolean;
    data?: object | any;
    error?: ErrorType;
    message?: string;
};

enum ErrorType {
    ITEM_NOT_FOUND = 'the item does not exist',
    DUPLICATE_ITEM = 'there is already an item with the provided name',
    UNAUTHORIZED = 'you do not have enough permisson to perform this operation',
    INTERNAL_SERVER_ERROR = 'there an error processing your request',
    STATUS_OK = 'your operation was successful',
    ITEM_CREATED = 'item have been successfully created',
    PAGE_NOT_FOUND = 'the item that you requested for does not exist',
    BAD_REQUEST = 'invalid request',
    UNKNOWN_ERROR = 'unknown error',
}

type ErrorKey =
    | 'ITEM_NOT_FOUND'
    | 'DUPLICATE_ITEM'
    | 'UNAUTHORIZED'
    | 'INTERNAL_SERVER_ERROR'
    | 'STATUS_OK'
    | 'ITEM_CREATED'
    | 'PAGE_NOT_FOUND'
    | 'BAD_REQUEST'
    | 'UNKNOWN_ERROR';

const config = GetEnvConfig();

export class ApiHandler {
    /**
     * Makes an Authorization "Bearer"  request with the given accessToken to the given endpoint.
     * @param base_url
     *
     * @param axiosInstance
     */
    private base_url: string;
    private axiosInstance: AxiosInstance;
    constructor(base_url: string = '') {
        this.base_url = base_url ? base_url : config.BASE_URL;
        this.axiosInstance = axios.create();
        this.axiosInstance.interceptors.request.use((config) => {
            config.baseURL = this.base_url;

            let access_token =
                SecureLocalStorage.getItem<string>(
                    LocalStorageKey.AppAuthToken
                ) ?? '';
            let token_exp =
                SecureLocalStorage.getItem<string>(
                    LocalStorageKey.AppAuthExp
                ) ?? '0';
            let user_data = SecureLocalStorage.getItem<UserModel>(
                LocalStorageKey.AppAuthUserModel
            );
            config.headers.setAuthorization(`Bearer ${access_token}`);
            config.headers.set('X-Access-Token', access_token);
            config.headers.set('token-exp', token_exp);
            config.headers.set('user-data', JSON.stringify(user_data));

            config.withCredentials = true;
            return config;
        });
    }

    async get(url: string): Promise<HttpResponse> {
        try {
            const res = await this.axiosInstance(`${url}`, {
                method: 'GET',
            });
            return { success: true, data: res.data, message: '', ...res.data };
        } catch (err: any) {
            return { ...err?.response?.data, success: false };
        }
    }

    async put(url: string, data: any): Promise<HttpResponse> {
        try {
            const res = await this.axiosInstance(`${url}`, {
                method: 'PUT',
                data: data,
            });
            return { success: true, data: res.data, ...res.data };
        } catch (err: any) {
            return { ...err.response?.data, success: false };
        }
    }

    async post(url: string, data: any): Promise<HttpResponse> {
        try {
            const res = await this.axiosInstance(`${url}`, {
                method: 'POST',
                data: data,
            });
            return { success: true, data: res.data, message: '', ...res.data };
        } catch (err: any) {
            return { ...err.response?.data, success: false };
        }
    }

    async post_form(url: string, data: any): Promise<HttpResponse> {
        try {
            const res = await this.axiosInstance(`${url}`, {
                method: 'POST',
                data: data,
            });
            return { success: true, data: res.data, ...res.data };
        } catch (err: any) {
            return { ...err.response?.data, success: false };
        }
    }

    async delete(url: string): Promise<HttpResponse> {
        try {
            const res = await this.axiosInstance(`${url}`, {
                method: 'DELETE',
            });
            return { success: true, data: res.data, ...res.data };
        } catch (err: any) {
            return { ...err.response?.data, success: false };
        }
    }

    handleError(response: AxiosResponse<any, any>): HttpResponse {
        let result: HttpResponse = { success: false };
        switch (response.status) {
            case 400:
                result = this.errorBuilder('BAD_REQUEST', response);
                break;
            case 401:
                result = this.errorBuilder('UNAUTHORIZED', response);
                window.location.href = '/';
                break;
            case 404:
                result = this.errorBuilder('ITEM_NOT_FOUND', response);
                break;
            case 500:
                result = this.errorBuilder('INTERNAL_SERVER_ERROR', response);
                break;
            default:
                break;
        }
        return result;
    }

    errorBuilder(status: ErrorKey, res: AxiosResponse<any, any>): HttpResponse {
        if (res?.data?.Error)
            return {
                success: false,
                error: ErrorType[status],
                message: res.data.Error,
            };
        if (res?.data?.error)
            return {
                success: false,
                error: ErrorType[status],
                message: res.data.error,
            };
        if (res?.data?.message)
            return {
                success: false,
                error: ErrorType[status],
                message: res.data.message,
            };
        return {
            success: false,
            error: ErrorType[status],
            message: 'unknown error type',
        };
    }
}
