import { TestBed } from '@angular/core/testing';
import { ActieverzoekService } from './actieverzoek.service';

describe('ActieverzoekService', () => {
  let service: ActieverzoekService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActieverzoekService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
