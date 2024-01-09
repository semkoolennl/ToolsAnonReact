import { BaseApiClient } from "./utils";
import AuthEndpoint from "./endpoints/authEndpoint";
import { RedirectLink, Token } from "./types";
import RedirectLinkEndpoint from "./endpoints/redirectLinkEndpoint";

class ApiClient
{
    public auth: AuthEndpoint;
    public links: RedirectLinkEndpoint;

    private http: BaseApiClient;

    constructor() {
        this.http = new BaseApiClient('http://localhost:80/api');
        this.auth = new AuthEndpoint(this.http);
        this.links = new RedirectLinkEndpoint(this.http);
    }

    public setToken(token: Token) {
        this.http.replaceHeader('Authorization', `Bearer ${token.access_token}`);
    }
}

export default ApiClient;