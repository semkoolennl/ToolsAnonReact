import { BaseEndpoint } from "../utils";
import { User, Token } from '../types';

interface RegisterResponse {
    user: User;
    token: Token;
}

interface RegisterRequest {
    name: string;
    email: string;
    password: string;
}

interface LoginRequest {
    email: string;
    password: string;
}

interface LoginResponse {
    user: User;
    token: Token;
}


class AuthEndoint extends BaseEndpoint {
    async login(data: LoginRequest) {
        const response = await this.http.post<LoginResponse>('/auth/login', data);

        this.http.replaceHeader('Authorization', `Bearer ${response.token}`);
        console.log(response);
        return response;
    }

    async register(data: RegisterRequest) {
        const response = await this.http.post<RegisterResponse>('/auth/register', data);
        this.http.replaceHeader('Authorization', `Bearer ${response.token}`);

        return response;
    }
}

export default AuthEndoint;