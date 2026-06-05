export interface GetDocumentenOverzichtConfig {
  resultPvName: string;
  samenwerkingId: string;
  aangemaaktDoor?: string;
  negateAangemaaktDoor?: boolean;
  aangemaaktDoorNaam?: string;
  negateAangemaaktDoorNaam?: boolean;
  _sort?: string;
  aantal?: number;
  pagina?: number;
}
