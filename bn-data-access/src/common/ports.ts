import { Base, ClientType, Program } from '../base';
import { sortBy } from 'lodash';

export class Ports extends Base {
    async getWcgopPorts(db?: ClientType) {
        let result = await this.getAllDocs('ports', 'all_port_names', db, Program.Wcgop);
        result = sortBy(result, [function(obj: any) { return obj.name.toLowerCase()}]);
        return result;
    }

    async savePort() {
        this.save('ports', {});
    }
}

export const portDAO = new Ports();
