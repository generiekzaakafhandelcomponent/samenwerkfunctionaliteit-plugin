import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute, convertToParamMap } from "@angular/router";
import { of } from "rxjs";
import { NotificatieCardList } from "./notificatie-card-list.component";
import { NotificatieService } from "../../service/notificatie.service";
import { SwfDocumentService } from "../../service/swf-document.service";
import { TranslateModule } from "@ngx-translate/core";

describe("NotificatieCardList", () => {
  let component: NotificatieCardList;
  let fixture: ComponentFixture<NotificatieCardList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificatieCardList, TranslateModule.forRoot()],
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

    fixture = TestBed.createComponent(NotificatieCardList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
