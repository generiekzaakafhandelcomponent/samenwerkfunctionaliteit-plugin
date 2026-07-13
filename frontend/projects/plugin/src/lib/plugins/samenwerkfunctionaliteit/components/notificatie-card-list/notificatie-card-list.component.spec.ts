import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NotificatieCardList } from "./notificatie-card-list.component";

describe("NotificatiesCustomTabComponent", () => {
  let component: NotificatieCardList;
  let fixture: ComponentFixture<NotificatieCardList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificatieCardList],
    }).compileComponents();

    fixture = TestBed.createComponent(NotificatieCardList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
