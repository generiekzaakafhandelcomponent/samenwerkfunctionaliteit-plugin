import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllActieverzoekenComponent } from './get-all-actieverzoeken.component';

describe('GetAllActieverzoekenComponent', () => {
  let component: GetAllActieverzoekenComponent;
  let fixture: ComponentFixture<GetAllActieverzoekenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetAllActieverzoekenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetAllActieverzoekenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
