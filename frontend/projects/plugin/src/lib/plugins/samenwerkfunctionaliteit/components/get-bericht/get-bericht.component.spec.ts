import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetBerichtComponent } from './get-bericht.component';

describe('GetBerichtComponent', () => {
  let component: GetBerichtComponent;
  let fixture: ComponentFixture<GetBerichtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetBerichtComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetBerichtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
