import { replace, get, sortBy, toUpper } from 'lodash';
import { Base, ClientType } from './base';
import { database } from '@boatnet/bn-clients';

export class BaseLookupInfo extends Base {
    /**
     * 
     * @param program program type
     *  eg: wcgop, ashop, em
     * @param type doc type we want to get from lookups
     *  eg: beaufort, waiver-type, em review, calc-weight-type
     * @param displayName indicates which field to display in the lookups list
     *  eg description
     * @param value indicates which field to use as the value in the list. If empty, then
     *  defaults to the entire object.
     * @param displayCode optional param that indicates which field to display when showing code
     *  representation of the field
     *  eg lookupValue
     * @param showCodes indicated whether code should be displayed instead of full description
     * @param db indicated which database to query
     *  eg mongo, oracle, couch
     * @returns list of lookupvalues with format { label: '', value:''}
     */
    async getLookups(program: string, type: string, displayName: string, value?: string, displayCode?: string, showCodes?: boolean, db?: ClientType) {
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
            const query: string= "select * from lookups where lookup_type =: type";
            const params = [type];
            const result =  await this.oracleClient.getData(query, params, database.OBSPROD);
            let name = toUpper(displayName);
            const labelIndex = result.metaData.map(function(row: any) { return row.name; }).indexOf(name);

            for (const option of result.rows) {
                options.push({
                    label: option[labelIndex],
                    value: option
                })
            }
        }
        options = sortBy(options, [function(obj: any) { return obj.label.toLowerCase()}]);
        return options;
      }
}

export const baseLookupInfo = new BaseLookupInfo();
