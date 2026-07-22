import { TestBed } from '@angular/core/testing';
import { SwfPluginClient } from './swf-plugin-client.service';

describe('SwfPluginClientService', () => {
  let service: SwfPluginClient;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SwfPluginClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
