export class Base {
    url: string = '';
    token: string = '';

    constructor() {
    }

    /**
     * Should be called from the application code to pass in the user auth token and url.
     * Currently this is called from the login page of obs-web.
     * @param url 
     * @param token 
     */
     connect(url: string, token: string) {
        this.url = url;
        this.token = token;
    }
}