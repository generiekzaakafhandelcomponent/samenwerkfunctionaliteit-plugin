import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SwfPluginProperties } from '../interface/swf-plugin-properties.interface';

@Injectable({
  providedIn: 'root',
})
export class SwfPluginClient {
  private readonly httpClient: HttpClient = inject(HttpClient);

  getSwfPluginProperties(): Observable<SwfPluginProperties> {
    return this.httpClient.get<SwfPluginProperties>(
      'plugin/samenwerkfunctionaliteit/api/v1/properties',
    );
  }
}
