import request from 'request';
import { authService } from '@boatnet/bn-auth';

class MongoService {
    url: string;
    token: string | undefined;

    constructor() {
        this.url = authService.getTripsApiUrl() + '/api/v1/mongo';
        this.token = authService.getCurrentUser()!.jwtToken;
    }

    read(database: string, collection: string, query: any) {
        return new Promise( (resolve, reject) => {
            let queryString = '';
            Object.keys(query).forEach( (key: string) => {
                if (Object.keys(query).indexOf(key) === 0) {
                    queryString += '?';
                }
                if (key) {queryString += key + '=' + query[key]; }
                if (Object.keys(query).indexOf(key) > 0) {
                    queryString += '&';
                }
            });
            const queryUrl = this.url + '/' + database + '/' + collection + queryString;
            request.get(
                {
                    url: queryUrl,
                    json: true,
                    headers: {
                        authorization: 'Token ' + this.token
                    }
                }, (err: any, response: any, body: any) => {
                    if (!err && response.statusCode === 200) {
                        resolve(body);
                    } else {
                        reject(body);
                    }
                }
            );
        });
    }

    write(documents: object[]) {
        return new Promise( (resolve, reject) => {
            const queryUrl = this.url;
            request.post(
                {
                    url: queryUrl,
                    json: true,
                    headers: {
                        authorization: 'Token ' + this.token
                    },
                    body: documents
                }, (err: any, response: any, body: any) => {
                    if (!err && response.statusCode === 200) {
                        resolve(body);
                    } else {
                        reject(body);
                    }
                }
            );
        });
    }
    
    update(document: any) {
        return new Promise( (resolve, reject) => {
            const queryUrl = this.url;
            request.put(
                {
                    url: queryUrl,
                    json: true,
                    headers: {
                        authorization: 'Token ' + this.token
                    },
                    body: document
                }, (err: any, response: any, body: any) => {
                    if (!err && response.statusCode === 200) {
                        resolve(body);
                    } else {
                        reject(body);
                    }
                }
            );
        });
    }
    
    delete(document: any) {
        return new Promise( (resolve, reject) => {
            const queryUrl = this.url;
            request.delete(
                {
                    url: queryUrl,
                    json: true,
                    headers: {
                        authorization: 'Token ' + this.token
                    },
                    body: document
                }, (err: any, response: any, body: any) => {
                    if (!err && response.statusCode === 200) {
                        resolve(body);
                    } else {
                        reject(body);
                    }
                }
            );
        });
    }
}

export const mongoService = new MongoService();
