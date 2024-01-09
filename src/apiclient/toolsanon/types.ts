interface User {
    id: number;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
}

interface Token {
    access_token: string;
    token_type: string;
    expires_at: string;
}

interface RedirectLink {
    id: string;
    user_id: number;
    name: string;
    description: string;
    url: string;
    slug: string;
    clicks: number;
    is_enabled: boolean;
    created_at: string;
    updated_at: string;
}

export type {
    User,
    Token,
    RedirectLink,
};
