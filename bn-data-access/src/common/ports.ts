import { Base, ClientType, Program } from '../base';

export class Ports extends Base {
    async getWcgopPorts(db?: ClientType) {
        let result = await this.getAllDocs('ports', 'all_port_names', db, Program.Wcgop);
        return result;
    }
}

export const portDAO = new Ports();
