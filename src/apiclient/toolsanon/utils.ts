import axios, { AxiosInstance, AxiosResponse } from "axios";

interface ApiResponse<T> {
    success: boolean;
    status: number;
    data?: T;
    errors?: [];
}

export interface SuccessResponse<T extends number = 200> extends ApiResponse<any> {
    success: true;
    status: T;
    data?: any;
}

class BaseApiClient {
    protected http: AxiosInstance;
    protected baseUrl: string;

    constructor(baseUrl: string, headers: [{ key: string, value: string }] | null = null) {
        this.baseUrl = baseUrl;
        this.http    = axios.create({
            baseURL: this.baseUrl,
        });
        if (headers) {
            this.addHeaders(headers);
        }
    }

    addHeader(key: string, value: string) {
        this.http.defaults.headers.common[key] = value;
    }

    addHeaders(headers: [{ key: string, value: string }]) {
        headers.forEach((header) => {
            this.addHeader(header.key, header.value);
        });
    }

    replaceHeader(key: string, value: string) {
        if (! this.http.defaults.headers.common[key]) {
            this.addHeader(key, value);
        }
        this.http.defaults.headers.common[key] = value;
    }

    removeHeader(key: string) {
        delete this.http.defaults.headers.common[key];
    }

    /** @throws {Error} */
    async handleResponse<T>(response: AxiosResponse<ApiResponse<T>>) {
        if (response.data.success) {
            if (response.data.data === undefined) {
                throw new Error('Response data is undefined');
            }
            return response.data.data;
        }

        throw new Error(response.data.errors?.toString());
    }

    async get<T>(url: string) {
        const response = await axios.get<ApiResponse<T>>(this.baseUrl + url);
        return this.handleResponse(response);
    }

    async post<T>(url: string, data: any) {
        const response = await axios.post<ApiResponse<T>>(this.baseUrl + url, data);
        return this.handleResponse(response);
    }

    async put<T>(url: string, data: any) {
        const response = await axios.put<ApiResponse<T>>(this.baseUrl + url, data);
        return this.handleResponse(response);
    }

    async patch<T>(url: string, data: any) {
        const response = await axios.patch<ApiResponse<T>>(this.baseUrl + url, data);
        return this.handleResponse(response);
    }

    async delete<T>(url: string) {
        const response = await axios.delete<ApiResponse<T>>(this.baseUrl + url);
        return this.handleResponse(response);
    }
}

class BaseEndpoint {
    protected http: BaseApiClient;

    constructor(http: BaseApiClient) {
        this.http = http;
    }
}

export { BaseApiClient, BaseEndpoint };