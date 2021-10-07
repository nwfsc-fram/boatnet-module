import request from 'request';
import { Base } from './base';

export enum database {
    PACFIN = 'pacfin',
    OBSPROD = 'obsProd',
    VMS = 'vms'
  }

class OracleClient extends Base {
    url: string = '';
    token: string = '';

    constructor() {
        super();
        console.log('Oracle client created')
    }

    getData(query: string, params: any[], database: database) {
        return new Promise( (resolve, reject) => {
            const queryUrl = this.url + '/getOracleData';
            const payload: any = {
                query,
                params,
                database
            };
            request.post(
                {
                    url: queryUrl,
                    json: true,
                    headers: {
                        'authorization': 'Token ' + this.token,
                        'Content-Type': 'application/json'
                    },
                    body: payload
                }, (err: any, response: any, body: any) => {
                    if (!err && response.statusCode === 200) {
                        resolve(body);
                    } else {
                        reject(body);
                    }
                }
            );
        });
    }
}

export const oracleClient = new OracleClient();
