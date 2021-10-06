import request from 'request';

export enum database {
    PACFIN = 'pacfin',
    OBSPROD = 'obsProd',
    VMS = 'vms'
  }

export class OracleClient {
    url: string = '';
    token: string = '';

    constructor() {
        console.log('Oracle client created')
    }

    /**
     * Should be called from the application code to pass in the user auth token and url.
     * Currently this is called from the login page of obs-web.
     * @param url 
     * @param token 
     */
    connect(url: string, token: string) {
        this.url = url;
        this.token = token;
    }

    getData(url: string, token: string, query: string, params: any[], database: database) {
        console.log(url)
        return new Promise( (resolve, reject) => {
            const queryUrl = url + '/getOracleData';
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
                        'authorization': 'Token ' + token,
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
