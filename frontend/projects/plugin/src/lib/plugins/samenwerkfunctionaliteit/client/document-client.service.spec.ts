import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { DocumentClient } from './document-client.service';

describe('DocumentClient', () => {
  let service: DocumentClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DocumentClient, { provide: HttpClient, useValue: {} }],
    });
    service = TestBed.inject(DocumentClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
