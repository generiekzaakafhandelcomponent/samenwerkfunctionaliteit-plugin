import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BerichtenListComponent } from './berichten-list.component';

describe('BerichtenListComponent', () => {
  let component: BerichtenListComponent;
  let fixture: ComponentFixture<BerichtenListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BerichtenListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BerichtenListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
