import { TestBed } from "@angular/core/testing";

import { DocumentClientService } from "./document-client.service";

describe("DocumentClientService", () => {
  let service: DocumentClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentClientService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
