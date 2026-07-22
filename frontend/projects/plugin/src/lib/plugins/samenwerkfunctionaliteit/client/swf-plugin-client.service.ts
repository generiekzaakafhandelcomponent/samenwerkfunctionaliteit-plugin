import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SwfPluginClient {
  private readonly httpClient: HttpClient = inject(HttpClient);

  getSwfPluginProperties(): Observable<Map<string, string>> {
    return this.httpClient.get<Map<string, string>>(
      'plugin/samenwerkfunctionaliteit/api/v1/properties',
    );
  }
}
