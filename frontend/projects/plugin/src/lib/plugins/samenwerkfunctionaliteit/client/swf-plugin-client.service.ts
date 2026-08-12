import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SWF_PLUGIN_PROPERTIES_URL } from '../config/swf-plugin-config';
import { SwfPluginPropertiesResponseDto } from '../dto/swf-plugin-properties.dto';

@Injectable({
  providedIn: 'root',
})
export class SwfPluginClient {
  private readonly httpClient: HttpClient = inject(HttpClient);

  getSwfPluginProperties(): Observable<SwfPluginPropertiesResponseDto> {
    return this.httpClient.get<SwfPluginPropertiesResponseDto>(
      SWF_PLUGIN_PROPERTIES_URL,
    );
  }
}
