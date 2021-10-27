import { Base, ClientType } from '../base/base';
import { database } from '@boatnet/bn-clients';
import moment from 'moment';

export class Waivers extends Base {
    public async getWaiverById(id: string, db?: ClientType) {
        return await this.getById(id, 'waivers', db);
    }

    public async getByIdAndYear(year: string, db?: ClientType, id?: string) {
        let waivers: any[] = [];
        const dbType = db ? db : this.type;

        if (dbType === ClientType.Mongo) {
            let queryParams: any;
            if (id) {
                queryParams = {
                    $or: [{ "vessel.stateRegulationNumber": id}, { "vessel.coastGuardNumber": id}],
                    issueDate: { $gt: year + '-01-01', $lt: year + '-12-31' }
                }
            } else {
                queryParams = {
                    issueDate: { $gt: year + '-01-01', $lt: year + '-12-31' }
                }
            }
            const result = await this.mongoClient.read('boatnetdb', 'waivers', queryParams);
            for (const waiver of result) {
                waivers.push(this.formatDoc(waiver));
            }
        } else if (dbType === ClientType.Couch) {
            const waiversQuery = await this.couchClient.view(
                'obs_web', 
                'waiverId',
                {"reduce": false, "descending": true, include_docs: true}
            );

            waivers = waiversQuery.rows
                .filter((row: any) => {
                    const curr = row.doc;
                    let status = false;
                    if (curr.issueDate) {
                        status = moment(curr.createdDate).format('YYYY') === year;
                    }
                    if (status && id && curr.vessel) {
                        status = (curr.vessel.stateRegulationNumber === id || curr.vessel.coastGuardNumber === id);
                    }
                    return status;
                })
                .map( (row: any) => {
                    const doc = row.doc;
                    return this.formatDoc(doc);
                });

        } else if (dbType === ClientType.Oracle) {
            console.log('oralce')
            let query = '';
            let params = []
            if (id) {
                query = "SELECT w.waiver_id, w.created_by as created_by_id, trim(coalesce(u.first_name, '') || ' ' || coalesce(u.last_name, '')) as created_by, v.vessel_name, coalesce(v.state_reg_number, v.coast_guard_number) as vessel_drvid, (select description from lookups where lookup_type = 'WAIVER_TYPE' and lookup_value = w.waiver_type) as waiver_type, (select description from lookups where lookup_type = 'WAIVER_REASON' and lookup_value = w.waiver_reason) as waiver_reason, w.fishery as fishery_id, (select description from lookups where lookup_type = 'FISHERY' and lookup_value = w.fishery) as fishery, trim(coalesce(c.first_name, '') || ' ' || coalesce(c.last_name, '')) as contact, w.certificate_number as permit_or_license, w.issue_date, w.start_date, w.end_date, p.port_name, p.port_code, p.port_group, p.state as port_state, w.created_date as waiver_created_date, w.notes FROM waivers w JOIN users u ON w.created_by = u.user_id JOIN vessels v ON w.vessel_id = v.vessel_id LEFT JOIN contacts c ON w.contact_id = c.contact_id LEFT JOIN ports p ON w.landing_port_id = p.port_id WHERE extract(year from issue_date) = :year AND (v.state_reg_number = :id OR v.coast_guard_number = :id)";
                params = [year, id, id];
            } else {
                query = "SELECT w.waiver_id, w.created_by as created_by_id, trim(coalesce(u.first_name, '') || ' ' || coalesce(u.last_name, '')) as created_by, v.vessel_name, coalesce(v.state_reg_number, v.coast_guard_number) as vessel_drvid, (select description from lookups where lookup_type = 'WAIVER_TYPE' and lookup_value = w.waiver_type) as waiver_type, (select description from lookups where lookup_type = 'WAIVER_REASON' and lookup_value = w.waiver_reason) as waiver_reason, w.fishery as fishery_id, (select description from lookups where lookup_type = 'FISHERY' and lookup_value = w.fishery) as fishery, trim(coalesce(c.first_name, '') || ' ' || coalesce(c.last_name, '')) as contact, w.certificate_number as permit_or_license, w.issue_date, w.start_date, w.end_date, p.port_name, p.port_code, p.port_group, p.state as port_state, w.created_date as waiver_created_date, w.notes FROM waivers w JOIN users u ON w.created_by = u.user_id JOIN vessels v ON w.vessel_id = v.vessel_id LEFT JOIN contacts c ON w.contact_id = c.contact_id LEFT JOIN ports p ON w.landing_port_id = p.port_id WHERE extract(year from issue_date) = :year";
                params = [year];
            }
            const result =  await this.oracleClient.getData(query, params, database.OBSPROD);
            for (const row of result.rows) {
                waivers.push({
                    waiverId: row[0],
                    startDate: row[12],
                    endDate: row[13],
                    vesselName: row[3],
                    vesselId: row[4],
                    fishery: row[8],
                    permit: row[10],
                    contract: row[9],
                    issuer: ClientType.Oracle,
                    issueDate: row[11],
                    type: row[5],
                    reason: row[6],
                    notes: row[19],
                    source: ClientType.Oracle,
                });
            }
        } 
        return waivers;
    }

    public async saveWaiver(doc: any[], db?: ClientType) {
        return await this.save('waivers', doc, db);
    }

    public async updateWaiver(waiver: any, updatedBy: string, db?: ClientType) {
        waiver.updateDate = moment().format();
        waiver.updatedBy = updatedBy;
        const previous = await this.getWaiverById(waiver._id);
        delete previous.changeLog;
        if (!waiver.changeLog) {
            waiver.changeLog = [];
        }
        waiver.changeLog.push(previous);
        return await this.update('waivers', waiver, db);
    }

      private formatDoc(doc: any) {
        return {
            waiverId: doc.waiverId,
            startDate: doc.startDate,
            endDate: doc.endDate,
            vesselName: doc.vessel ? doc.vessel.vesselName : '',
            vesselId: doc.vessel ? (doc.vessel.stateRegulationNumber ? doc.vessel.stateRegulationNumber : doc.vessel.coastGuardNumber) : '',
            fishery: doc.fishery ? doc.fishery.description : '',
            permit: doc.certificateNumber ? doc.certificateNumber.permitNumber : '',
            contract: doc.contract ? doc.contract.firstName + ' ' + doc.contract.lastName : '',
            issuer: doc.createdBy,
            issueDate: doc.issueDate,
            type: doc.waiverType ? doc.waiverType.description : '',
            reason: doc.reason ? doc.reason.description : '',
            notes: doc.notes,
            source: 'BOATNET'
        }
    }
}

export const waiversImpl = new Waivers();
