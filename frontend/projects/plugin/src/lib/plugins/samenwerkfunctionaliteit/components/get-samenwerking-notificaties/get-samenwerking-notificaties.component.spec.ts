import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetSamenwerkingNotificatiesComponent } from './get-samenwerking-notificaties.component';

describe('GetSamenwerkingNotificatiesComponent', () => {
  let component: GetSamenwerkingNotificatiesComponent;
  let fixture: ComponentFixture<GetSamenwerkingNotificatiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetSamenwerkingNotificatiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetSamenwerkingNotificatiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
