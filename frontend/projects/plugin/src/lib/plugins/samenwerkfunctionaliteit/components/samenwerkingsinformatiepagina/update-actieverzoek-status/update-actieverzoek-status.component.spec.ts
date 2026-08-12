import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateActieverzoekStatusComponent } from './update-actieverzoek-status.component';

describe('UpdateActieverzoekStatusComponent', () => {
  let component: UpdateActieverzoekStatusComponent;
  let fixture: ComponentFixture<UpdateActieverzoekStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateActieverzoekStatusComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateActieverzoekStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
