import { get, orderBy } from 'lodash';
import { Base, ClientType } from './base';
import { database } from '@boatnet/bn-clients';

export class BaseLookupInfo extends Base {
    constructor(type: string) {
        super(type);
    }

    async getLookups(program: string, type: string, displayName: string, value: string, displayCode?: string, showCodes?: boolean) {
        let options: any[] = [];
        let queryResults: any = [];

        if (this.type === ClientType.Mongo) {
            queryResults = await this.mongoClient.read('boatnetdb', 'lookups', { "type": type });
            for (const option of queryResults) {
                options.push({
                    label: showCodes && displayCode ? get(option, displayCode, '') : get(option, displayName),
                    value: value ? get(option, value) : option
                });
            }
        } else if (this.type === ClientType.Couch) {
            const optionsList: any = await this.couchClient.viewWithDocs('obs_web', program + '-' + type, { key: type});
            for (const option of optionsList.rows) {
                options.push({
                    label: showCodes && displayCode ? get(option.doc, displayCode, '') : get(option.doc, displayName),
                    value: get(option, value)
                });
            }
        } else if (this.type === ClientType.Oracle) {
            const query = "select * from lookups where lookup_type =: type";
            const params = [type];

            const result =  await this.oracleClient.getData(query, params, database.OBSPROD);
            for (const option of result.rows) {
                options.push({
                    label: option[3],
                    value: option
                })
            }
        } 
        options = orderBy(options, 'label');
        console.log('heyyyyyy')
        console.log('options')
        console.log(options)
        return options;
      }
}

export const baseLookupInfo = new BaseLookupInfo(ClientType.Oracle);