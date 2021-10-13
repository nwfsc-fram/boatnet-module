import { couchService } from "@boatnet/bn-couch";
import { mongoService } from '@boatnet/bn-clients';
import { oracleClient } from '@boatnet/bn-clients';
import { defaultDB } from './dbConfig'

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
        this.type = defaultDB;
        if (couchService.isConnected) {
            this.couchClient = couchService.masterDB;
        }
        this.mongoClient = mongoService;
        this.oracleClient = oracleClient;
    }
}