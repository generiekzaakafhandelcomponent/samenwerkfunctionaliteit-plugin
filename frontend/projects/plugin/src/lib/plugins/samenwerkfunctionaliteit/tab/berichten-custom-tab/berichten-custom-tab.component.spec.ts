import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BerichtenCustomTabComponent } from './berichten-custom-tab.component';

describe('BerichtenCustomTabComponent', () => {
  let component: BerichtenCustomTabComponent;
  let fixture: ComponentFixture<BerichtenCustomTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BerichtenCustomTabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BerichtenCustomTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
