import { BaseEndpoint, SuccessResponse } from "../utils";
import { RedirectLink } from '../types';

export interface RedirectLinkRequest {
    name: string;
    description?: string;
    url: string;
    slug?: string;
    is_enabled?: boolean;
}

export interface ToggleRedirectLinkRequest {
    is_enabled: boolean;
}

class RedirectLinkEndpoint extends BaseEndpoint {
    async create(data: RedirectLinkRequest) {
        return await this.http.post<RedirectLink>('/redirect-links', data);
    }

    async get(id: string) {
        return await this.http.get<RedirectLink>(`/redirect-links/${id}`);
    }

    async update(id: string, data: RedirectLinkRequest) {
        return await this.http.put<RedirectLink>(`/redirect-links/${id}`, data);
    }

    async patch(id: string, updates: Partial<RedirectLinkRequest>) {
        return await this.http.patch<RedirectLink>(`/redirect-links/${id}`, updates);
    }

    async delete(id: string) {
        return await this.http.delete<SuccessResponse>(`/redirect-links/${id}`);
    }
}

export default RedirectLinkEndpoint;