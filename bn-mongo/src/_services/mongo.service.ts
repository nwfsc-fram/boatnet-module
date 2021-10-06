import { triggerAsyncId } from 'async_hooks';
import request from 'request';

export class MongoService {
    url: string = '';
    token: string = '';

    constructor() {
        console.log('Mongo service created')
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

    read(database: string, collection: string, query: any, options?: any) {
        return new Promise( (resolve, reject) => {
            const queryOptions = options ? options : {};
            const payload: any = {
                query,
                options: queryOptions
            };
            const queryUrl = this.url + '/' + database + '/' + collection;
            request.post(
                {
                    url: queryUrl,
                    json: true,
                    headers: {
                        'authorization': 'Token ' + this.token,
                        'Content-Type': 'application/json'
                    },
                    body: payload
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

    mongoAggregate(database: any, collection: string, pipeline: any) {
        return new Promise( (resolve, reject) => {
            const payload = {pipeline};
            const queryUrl = this.url + '/aggregate/' + database + '/' + collection;
            request.post(
                {
                    url: queryUrl,
                    json: true,
                    headers: {
                        'authorization': 'Token ' + this.token,
                        'Content-Type': 'application/json'
                    },
                    body: payload
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

    // example query:
    // const result = await mongoAggregate(
    //     'boatnetdb',
    //     'lookups.beauforts',
    //     [
    //         {$match: {isActive: true}},
    //         {$limit: 3}
    //     ]
    // );
    // console.log(result);

    mongoGetOne(database: any, collection: string, id: string) {
        return new Promise( (resolve, reject) => {
            const queryUrl = this.url + '/get/' + database + '/' + collection + '/' + id;
            request.get(
                {
                    url: queryUrl,
                    json: true,
                    headers: {
                        'authorization': 'Token ' + this.token,
                        'Content-Type': 'application/json'
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

    // example query:
    // const getOneResult = await mongoGetOne(
    //     'boatnetdb',
    //     'trips_api.trips',
    //     "612515f92feb772abc836e6c"
    // )
    // console.log(getOneResult);

    mongoGetMany(database: any, collection: string, ids: string[]) {
        return new Promise( (resolve, reject) => {
            const queryUrl = this.url + '/getMany/' + database + '/' + collection + '/';
            request.post(
                {
                    url: queryUrl,
                    json: true,
                    headers: {
                        'authorization': 'Token ' + this.token,
                        'Content-Type': 'application/json'
                    },
                    body: {
                        ids
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

    // example query:
    // const getManyResult = await mongoGetMany(
    //     'boatnetdb',
    //     'trips_api.trips',
    //     ["612515f92feb772abc836e6c"]
    // )
    // console.log(getManyResult)

    mongoWrite(documents: object[]) {
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

    mongoUpdate(document: any) {
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

    mongoDelete(document: any) {
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
