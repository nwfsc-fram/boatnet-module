import { get, orderBy, toUpper } from 'lodash';
import { Base, ClientType } from './base';
import { database } from '@boatnet/bn-clients';

export class BaseLookupInfo extends Base {
    async getLookups(program: string, type: string, displayName: string, value: string, db?: ClientType, displayCode?: string, showCodes?: boolean) {
        let options: any[] = [];
        let queryResults: any = [];
        const dbType = db ? db : this.type;

        if (dbType === ClientType.Mongo) {
            queryResults = await this.mongoClient.read('boatnetdb', 'lookups', { "type": type });
            for (const option of queryResults) {
                options.push({
                    label: showCodes && displayCode ? get(option, displayCode, '') : get(option, displayName),
                    value: value ? get(option, value) : option
                });
            }
        } else if (dbType === ClientType.Couch) {
            const optionsList: any = await this.couchClient.viewWithDocs('obs_web', program + '-' + type, { key: type});
            for (const option of optionsList.rows) {
                options.push({
                    label: showCodes && displayCode ? get(option.doc, displayCode, '') : get(option.doc, displayName),
                    value: get(option, value)
                });
            }
        } else if (dbType === ClientType.Oracle) {
            const query = "select * from lookups where lookup_type =: type";
            const params = [toUpper(type)];

            const result =  await this.oracleClient.getData(query, params, database.OBSPROD);
            for (const option of result.rows) {
                options.push({
                    label: option[3],
                    value: option
                })
            }
        } 
        options = orderBy(options, 'label');
        return options;
      }
}

export const baseLookupInfo = new BaseLookupInfo();