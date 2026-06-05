export interface GetDocumentenOverzichtConfig {
    resultPvName: string;
    queryParams: KeyValueQueryParam[];
}

interface KeyValueQueryParam {
    key: string;
    value: string;
}
