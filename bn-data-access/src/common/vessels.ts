import { Base, ClientType } from '../base';
import { concat, merge } from 'lodash';

export class Vessels extends Base {
    /**
     * 
     * @param identifier could be vesselName or id (coastGuardNumber of stateRegulationNumber)
     * @param limit number of docs to display
     * @param descending sort or not
     * @param db mongo or couch
     * @returns 
     */
    async getByIdentifier(identifier: string, limit?: number, descending?: boolean, db?: ClientType) {
        const dbType = db ? db : this.type;
        let result = [];

        if (dbType === ClientType.Mongo) {
            try {
                const mongoInfo = {
                    '$or': [
                        { vesselName: { "$regex": identifier, "$options": 'i' }},
                        { stateRegulationNumber: {'$regex': identifier, '$options': 'i'}},
                        { coastGuardNumber: {'$regex': identifier, '$options': 'i'}}]
                };
                return await this.getFromMongo('vessels', mongoInfo);
            } catch (error){
                console.log(error);
            }
        } else if (dbType === ClientType.Couch) {
            result = await this.fetchFromCouch('all_vessel_names', identifier, limit, descending);
            concat(result, await this.fetchFromCouch('all_vessel_nums', identifier, limit, descending));
        }
        return result;
    }

    async getVessels(db?: ClientType) {
        return await this.getAllDocs('vessels', 'all_vessel_names', db);
    }
}

export const vesselInfo = new Vessels();
