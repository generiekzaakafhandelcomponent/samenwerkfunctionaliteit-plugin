import { TestBed } from '@angular/core/testing';
import { DocumentClient } from '../client/document-client.service';
import { DocumentService } from './document.service';
import { FileDownloadService } from './file-download.service';
import { UserNotificationService } from './user-notification.service';

describe('DocumentService', () => {
  let service: DocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DocumentService,
        { provide: DocumentClient, useValue: {} },
        { provide: FileDownloadService, useValue: {} },
        { provide: UserNotificationService, useValue: {} },
      ],
    });
    service = TestBed.inject(DocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
