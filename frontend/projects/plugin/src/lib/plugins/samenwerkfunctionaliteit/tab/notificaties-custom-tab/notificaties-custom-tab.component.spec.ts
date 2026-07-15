import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute, convertToParamMap } from "@angular/router";
import { of } from "rxjs";
import { NotificatiesCustomTab } from "./notificaties-custom-tab.component";
import { NotificatieService } from "../../service/notificatie.service";
import { SwfDocumentService } from "../../service/swf-document.service";

describe("NotificatiesCustomTabComponent", () => {
  let component: NotificatiesCustomTab;
  let fixture: ComponentFixture<NotificatiesCustomTab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificatiesCustomTab],
      providers: [
        { provide: NotificatieService, useValue: { getNotificaties: () => of([]) } },
        {
          provide: SwfDocumentService,
          useValue: {
            getParam: () => null,
            getSamenwerkingProperties: () => of({ samenwerkingId: "test" }),
          },
        },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: convertToParamMap({}) } },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NotificatiesCustomTab);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
