import { ComponentFixture, TestBed } from "@angular/core/testing";

import { NoticatiesCardList } from "./notificaties-custom-tab.component";

describe("NotificatiesCustomTabComponent", () => {
  let component: NoticatiesCardList;
  let fixture: ComponentFixture<NoticatiesCardList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoticatiesCardList],
    }).compileComponents();

    fixture = TestBed.createComponent(NoticatiesCardList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
