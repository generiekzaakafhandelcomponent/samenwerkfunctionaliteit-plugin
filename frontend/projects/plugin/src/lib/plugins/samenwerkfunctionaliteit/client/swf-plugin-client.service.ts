import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SwfPluginProperties } from '../interface/swf-plugin-properties.interface';
import { SWF_PLUGIN_PROPERTIES_URL } from '../config/swf-plugin-config';

@Injectable({
  providedIn: 'root',
})
export class SwfPluginClient {
  private readonly httpClient: HttpClient = inject(HttpClient);

  getSwfPluginProperties(): Observable<SwfPluginProperties> {
    return this.httpClient.get<SwfPluginProperties>(SWF_PLUGIN_PROPERTIES_URL);
  }
}
