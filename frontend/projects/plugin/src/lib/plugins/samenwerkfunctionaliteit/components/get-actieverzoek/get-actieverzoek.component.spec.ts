import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetActieverzoekComponent } from './get-actieverzoek.component';

describe('GetActieverzoekComponent', () => {
  let component: GetActieverzoekComponent;
  let fixture: ComponentFixture<GetActieverzoekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetActieverzoekComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetActieverzoekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
