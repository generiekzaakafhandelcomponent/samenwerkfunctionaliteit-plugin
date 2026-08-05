import { TestBed } from '@angular/core/testing';
import { SwfPluginClient } from '../client/swf-plugin-client.service';
import { SwfPluginService } from './swf-plugin.service';

describe('SwfPluginService', () => {
  let service: SwfPluginService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: SwfPluginClient, useValue: {} }],
    });
    service = TestBed.inject(SwfPluginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
