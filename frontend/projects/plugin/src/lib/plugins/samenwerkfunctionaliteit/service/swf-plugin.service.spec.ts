import { TestBed } from '@angular/core/testing';
import { SwfPluginService } from './swf-plugin.service';

describe('SwfPluginService', () => {
  let service: SwfPluginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SwfPluginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
