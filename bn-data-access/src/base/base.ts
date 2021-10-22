import { couchService } from "@boatnet/bn-couch";
import { mongoService } from '@boatnet/bn-clients';
import { oracleClient } from '@boatnet/bn-clients';
import { merge } from 'lodash';

export enum ClientType {
    Mongo = 'mongo',
    Couch = 'couch',
    Oracle = 'oracle'
}

export abstract class Base {
    type: string;
    couchClient: any;
    mongoClient: any;
    oracleClient: any;

    constructor() {
        this.type = ClientType.Mongo;
        if (couchService.isConnected) {
            this.couchClient = couchService.masterDB;
        }
        this.mongoClient = mongoService;
        this.oracleClient = oracleClient;
    }

    async getFromMongo(collection: string, queryOptions?: any) {
        try {
            return await this.mongoClient.read('boatnetdb', collection, queryOptions);
        } catch (error){
            console.log(error);
        }    
    }

    async fetchFromCouch(view: string, val?: string, limit?: number, descending?: boolean) {
        const limitDocs = limit ? limit : 20;
        const isDescending = descending ? descending : false;

        let queryParams = {
            limit: limitDocs,
            descending: isDescending,
            include_docs: true
        };
        if (val) {
            const id = {
                start_key: val.toLowerCase(),
                end_key: val.toLowerCase() + '\u9999', 
            };
            merge(queryParams, id);
        }
        try {
            const result = await this.couchClient.view('obs_web', view, queryParams);
            return result ? result.rows.map( (row: any) => row.doc ) : [];
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    async getAllDocs(collection: string, couchView: string, db?: ClientType) {
        const dbType = db ? db : this.type;
        let result = [];

        if (dbType === ClientType.Mongo) {
            result = await this.getFromMongo(collection, {});
        } else if (dbType === ClientType.Couch) {
            result = await this.fetchFromCouch(couchView);
        }
        return result;
    }
}