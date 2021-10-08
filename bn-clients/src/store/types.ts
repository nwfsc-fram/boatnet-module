export interface ClientInfoState {
    mongoCredentials?: ClientCredentials;
    oracleCredentials?: ClientCredentials;
}

export interface ClientCredentials {
    url: string,
    token: string
}