import { TestBed } from '@angular/core/testing';
import { SwfPluginClientService } from './swf-plugin-client.service';

describe('SwfPluginClientService', () => {
  let service: SwfPluginClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SwfPluginClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
