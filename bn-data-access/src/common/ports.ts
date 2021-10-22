import { Base, ClientType } from '../base';

export class Ports extends Base {
    async getWcgopPorts(db?: ClientType) {
        let result = await this.getAllDocs('ports', 'all_port_names', db);

        if (db === ClientType.Couch) {
            result = result.filter( (row: any) => row.isWcgop && row.isActive );
        }
        return result;
    }
}

export const portDAO = new Ports();
