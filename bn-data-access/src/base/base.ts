import { couchService } from "@boatnet/bn-couch";
import { mongoService } from '@boatnet/bn-clients';
import { oracleClient } from '@boatnet/bn-clients';

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

    constructor(type: string) {
        this.type = type;
        if (couchService.isConnected) {
            this.couchClient = couchService.masterDB;
        }
        this.mongoClient = mongoService;
        this.oracleClient = oracleClient;
    }
}