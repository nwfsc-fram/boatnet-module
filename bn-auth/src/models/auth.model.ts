import { CouchDBInfo } from '@boatnet/bn-couch'

export interface BoatnetUserToken {
  exp: number;
  iat: number;
  sub: BoatnetUser;
}

export interface BoatnetUser {
  username: string;
  hashedPW: string;
  applicationName?: string;
  roles: string[];
  couchDBInfo: CouchDBInfo;
  jwtToken?: string;
}
