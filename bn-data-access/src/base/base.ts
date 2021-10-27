import { couchService } from "@boatnet/bn-couch";
import { mongoService } from '@boatnet/bn-clients';
import { oracleClient } from '@boatnet/bn-clients';
import { merge } from 'lodash';

export enum ClientType {
    Mongo = 'mongo',
    Couch = 'couch',
    Oracle = 'oracle'
}

export enum OrderBy {
    ascending = 'ascending',
    descending = 'descending'
}

export enum Program {
    Wcgop = 'isWcgop',
    Ashop = 'isAshop',
    TrawlSurvey = 'isTrawlSurvey',
    HookAndLineSurvey = 'isHookAndLineSurvey',
    HakeSurvey = 'isHakeSurvey',
    EM = 'isEM'
}

export abstract class Base {
    type = ClientType.Mongo;
    couchClient: any;
    mongoClient: any;
    oracleClient: any;

    constructor() {
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
        const isDescending = descending ? descending : false;

        let queryParams: any = {
            descending: isDescending,
            include_docs: true
        };
        if (limit) {
            queryParams.limit = limit
        }
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

    async getAllDocs(collection: string, couchView: string, db?: ClientType, program?: Program) {
        const dbType = db ? db : this.type;
        let result = [];

        if (dbType === ClientType.Mongo) {
            const queryParams: any = { isActive: true };
            if (program) {
                queryParams[program] = true;
            }
            result = await this.getFromMongo(collection, queryParams);
        } else if (dbType === ClientType.Couch) {
            result = await this.fetchFromCouch(couchView);
            if (program) {
                result = result.filter((row: any) => row[program] && row.isActive);
            } else {
                result = result.filter( (row: any) => row.isActive );
            }
        }
        return result;
    }

    async save(collection: string, document: any, db?: ClientType) {
        const dbType = db ? db : this.type;

        if (dbType === ClientType.Mongo) {
            try {
                this.mongoClient.mongoWrite('boatnetdb', collection, [document]);
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                const result = this.couchClient.post(document);
                document._id = result.id;
                document._rev = result.rev;
            } catch (error) {
                console.log(error);
            }
        }
        return document;
    }

    async update(collection: string, document: any, db?: ClientType) {
        const dbType = db ? db : this.type;

        if (dbType === ClientType.Mongo) {
            try {
                this.mongoClient.update('boatnetdb', collection, document);
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                const result = this.couchClient.post(document);
                document._id = result.id;
                document._rev = result.rev;
            } catch (error) {
                console.log(error);
            }
        }
        return document;
    }
	
	async getById(id: string, collection: string, db?: ClientType) {
        const dbType = db ? db : this.type;
        let result = [];

        if (dbType === ClientType.Mongo) {
            try {
                result = await this.mongoClient.mongoGetOne('boatnetdb', collection, id);
            } catch (error) {
                console.log(error);
            }
        } else if (dbType === ClientType.Couch) {
            try {
                result = await this.couchClient.get(id);
            } catch (error) {
                console.log(error);
            }
        }
        return result;
    }
}
