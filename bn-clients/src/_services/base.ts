import { ClientCredentials } from "..";

export class Base {
    url: string = '';
    token: string = '';
    isConnected: boolean = false;

    constructor() {
    }

    /**
     * Should be called from the application code to pass in the user auth token and url.
     * Currently this is called from the login page of obs-web.
     * @param url 
     * @param token 
     */
     connect(credentials: ClientCredentials) {
        this.isConnected = true;
        this.url = credentials.url;
        this.token = credentials.token;
    }

    isClientConnected() {
        return this.isConnected;
    }
}