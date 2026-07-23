import { inject, Injectable } from '@angular/core';
import { SwfPluginClient } from '../client/swf-plugin-client.service';
import { Observable } from 'rxjs';
import { SwfPluginProperties } from '../interface/swf-plugin-properties.interface';

@Injectable({
  providedIn: 'root',
})
export class SwfPluginService {
  private readonly swfPluginClient: SwfPluginClient = inject(SwfPluginClient);

  getSwfPluginProperties(): Observable<SwfPluginProperties> {
    return this.swfPluginClient.getSwfPluginProperties();
  }
}
