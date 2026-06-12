import {inject, Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {Samenwerking} from "../model/samenwerking.model";


@Injectable({
  providedIn: 'root'
})
export class SamenwerkingsinformatiepaginaClient {

  private readonly http: HttpClient = inject(HttpClient);
  private readonly baseUrl: string = "http://localhost:8080";
  private readonly SAMENWERKINGEN_URL = "samenwerkfunctionaliteit/v5/samenwerkingen"
  private readonly ACTIEVERZOEKEN_URL = "samenwerkfunctionaliteit/v5/actieverzoeken"


  getSamenwerking(samenwerkingId: string) {

    const samenwerking: Samenwerking = {
      samenwerkingId: "SAM-66497",
      verzoeknummer: "2026060200019",
      titel: "20260602 Test aanvraag voor GGD  | Stokdijkkade 2, 2671GW Naaldwijk",
      aangemaaktDoorNaam: "gemeente Westland",
      aangemaaktDoor: "00000001812579446000",
      status: {
        status: "OPEN"
      },
      samenwerkVorm: "SAMENWERKEN_AAN_BEHANDELEN",
      creatieDatumTijd: "2026-06-04T10:45:01.933+02:00",
      eindDatumTijd: "2028-06-04T10:45:01.933+02:00",
      kenmerkSysteem: "Rx.Mission",
      nummerBinnenSysteem: "Z2026-00000076",
      laatstAangepastDoor: "00000001812579446000",
      laatstAangepastDoorNaam: "gemeente Westland",
      contactpersoonNaam: "VVTH/BOCC Bouw",
      contactpersoonEmailadres: null,
      contactpersoonTelefoonnummer: null,
      laatstAangepastDatumTijd: "2026-06-11T16:46:15.482+02:00",
      beschrijving: null,
      taal: "NL",
      bronVerzoek: "DSO_LV",
      samenwerkDoel: "BEHANDELEN",
      typeVerzoek: "Aanvraag vergunning",
      globaleLocatie: "Stokdijkkade 2, 2671GW Naaldwijk",
      oloVerzoeknummer: null,
      aantalActieverzoeken: 2,
      aantalNotificaties: 16,
      _links: {
        self: {
          href: "https://pkio.service.pre.omgevingswet.overheid.nl/overheid/samenwerken/api/behandelen/v5/samenwerkingen/SAM-66497",
          deprecation: "",
          hreflang: "",
          name: "",
          profile: "",
          templated: "",
          title: "",
          type: ""
        },
        documentToevoegen: {
          "href": "https://pkio.service.pre.omgevingswet.overheid.nl/overheid/samenwerken/api/behandelen/v5/samenwerkingen/SAM-66497/documenten",
          deprecation: "",
          hreflang: "",
          name: "",
          profile: "",
          templated: "",
          title: "",
          type: ""
        },
        actieverzoekOpstellen: {
          "href": "https://pkio.service.pre.omgevingswet.overheid.nl/overheid/samenwerken/api/behandelen/v5/samenwerkingen/SAM-66497/actieverzoeken",
          deprecation: "",
          hreflang: "",
          name: "",
          profile: "",
          templated: "",
          title: "",
          type: ""
        },
        actieverzoeken: {
          "href": "https://pkio.service.pre.omgevingswet.overheid.nl/overheid/samenwerken/api/behandelen/v5/actieverzoeken?samenwerkingId=SAM-66497",
          deprecation: "",
          hreflang: "",
          name: "",
          profile: "",
          templated: "",
          title: "",
          type: ""
        }
      }
    }

    return of(samenwerking);


    // return this.get<Samenwerking>(this.SAMENWERKINGEN_URL + "/SAM-66497") //TODO Get samenwerkingId from service.

    // const httpParams = new HttpParams({fromObject: "/SAM-66497"});
    // const httpHeaders = new HttpHeaders({
    //   "x-dienst": "ggd-hl"
    // })
    //
    // return this.http.get<Samenwerking>(`${this.baseUrl}/${this.SAMENWERKINGEN_URL}/${samenwerkingId}`, {headers: httpHeaders})
  }


  private get<T>(endpoint: string, params?: Record<string, string>): Observable<T> {
    const httpParams = new HttpParams({fromObject: params});
    const httpHeaders = new HttpHeaders({
      "x-dienst": "ggd-hl"
    })
    return this.http.get<T>(`${this.baseUrl}/${endpoint}`, {params: httpParams, headers: httpHeaders});
  }


}
