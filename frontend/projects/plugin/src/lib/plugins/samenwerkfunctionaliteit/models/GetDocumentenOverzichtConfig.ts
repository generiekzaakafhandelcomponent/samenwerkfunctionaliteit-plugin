export interface GetDocumentenOverzichtConfig {
  resultPvName: string;
  samenwerkingId: string;
  aangemaaktDoor?: string;
  negateAangemaaktDoor?: string;
  aangemaaktDoorNaam?: string;
  negateAangemaaktDoorNaam?: string;
  sort?: string;
  aantal?: string;
  pagina?: string;
}
