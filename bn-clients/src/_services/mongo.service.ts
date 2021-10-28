import { triggerAsyncId } from 'async_hooks';
import request from 'request';
import { Base } from './base';
class MongoService extends Base{
    url: string = '';
    token: string = '';

    constructor() {
        super();
        console.log('Mongo service created')
    }

    getReadURL() {
        return this.url + '/mongoRead';
    }

    getWriteURL() {
        return this.url + '/mongoWrite';
    }

    async queryAPI(url: string, body: any) {
        return new Promise( (resolve, reject) => {
            request.post(
                {
                    url,
                    json: true,
                    headers: {
                        'authorization': 'Token ' + this.token,
                        'Content-Type': 'application/json'
                    },
                    body
                }, (err: any, response: any, body: any) => {
                    if (!err && response.statusCode === 200) {
                        resolve(body);
                    } else {
                        reject(body);
                    }
                }
            );
        })
    }

    async read(database: string, collection: string, query: any, options?: any) {
        const body: any = {
            database,
            collection,
            operation: 'find',
            payload: {
                query,
                options
            }
        };
        return await this.queryAPI(this.getReadURL(), body);
    }

    async aggregate(database: any, collection: string, pipeline: any) {
        const body: any = {
            database,
            collection,
            operation: 'aggregation',
            payload: pipeline
        };
        return await this.queryAPI(this.getReadURL(), body);
    }

    async getOne(database: any, collection: string, id: string) {
        const body: any = {
            database,
            collection,
            operation: 'getOneById',
            payload: {
                id
            }
        };
        return await this.queryAPI(this.getReadURL(), body);
    }

    async getMany(database: any, collection: string, ids: string[]) {
        const body: any = {
            database,
            collection,
            operation: 'getManyById',
            payload: {
                ids
            }
        }
        return await this.queryAPI(this.getReadURL(), body);
    }

    async getDistinct(database: any, collection: string, field: string, query?: any, options?: any) {
        const body: any = {
            database,
            collection,
            operation: 'getDistinct',
            payload: {
                field,
                query,
                options
            }
        }
        return await this.queryAPI(this.getReadURL(), body);
    }

    async insert(database: string, collection: string, documents: object[]) {
        const body: any = {
            database,
            collection,
            operation: 'insert',
            payload: {
                documents
            }
        }
        return await this.queryAPI(this.getWriteURL(), body);
    }

    async update(database: string, collection: string, document: any) {
        const body: any = {
            database,
            collection,
            operation: 'update',
            payload: {
                document
            }
        }
        return await this.queryAPI(this.getWriteURL(), body);
    }

    async delete(database: string, collection: string, document: any) {
        const body: any = {
            database,
            collection,
            operation: 'delete',
            payload: {
                document
            }
        }
        return await this.queryAPI(this.getWriteURL(), body);
    }
}

export const mongoService = new MongoService();
