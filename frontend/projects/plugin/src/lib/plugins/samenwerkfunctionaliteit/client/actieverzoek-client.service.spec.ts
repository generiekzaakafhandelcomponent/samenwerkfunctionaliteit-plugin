import { TestBed } from '@angular/core/testing';

import { ActieverzoekClientService } from './actieverzoek-client.service';

describe('ActieverzoekClientService', () => {
  let service: ActieverzoekClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActieverzoekClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
