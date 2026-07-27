import { TestBed } from '@angular/core/testing';
import { DocumentClient } from './document-client.service';

describe('DocumentClient', () => {
  let service: DocumentClient;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
