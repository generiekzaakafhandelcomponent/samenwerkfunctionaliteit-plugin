import { inject, Injectable } from '@angular/core';
import { SwfPluginClient } from '../client/swf-plugin-client.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SwfPluginService {
  private readonly swfPluginClient: SwfPluginClient = inject(SwfPluginClient);

  getSwfPluginProperties(): Observable<Map<string, string>> {
    return this.swfPluginClient.getSwfPluginProperties();
  }
}
