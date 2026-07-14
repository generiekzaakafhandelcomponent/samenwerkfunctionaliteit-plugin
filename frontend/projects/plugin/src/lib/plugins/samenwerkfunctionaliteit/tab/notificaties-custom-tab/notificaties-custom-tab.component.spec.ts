import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NotificatiesCustomTab } from "./notificaties-custom-tab.component";

describe("NotificatiesCustomTabComponent", () => {
  let component: NotificatiesCustomTab;
  let fixture: ComponentFixture<NotificatiesCustomTab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificatiesCustomTab],
    }).compileComponents();

    fixture = TestBed.createComponent(NotificatiesCustomTab);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
