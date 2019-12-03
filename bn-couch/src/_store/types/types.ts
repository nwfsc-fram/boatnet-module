export interface CouchDBInfo {
  urlRoot: string;
  userDB: string;
  masterDB: string;
  lookupsDB: string;
}

export interface CouchDBCredentials {
  dbInfo: CouchDBInfo;
  userCredentials: {
    username: string;
    password: string;
  };
}

export interface CouchDBState {
  credentials: CouchDBCredentials | null;
}

export interface DBConfig {
  apiUrl?: string;
}
