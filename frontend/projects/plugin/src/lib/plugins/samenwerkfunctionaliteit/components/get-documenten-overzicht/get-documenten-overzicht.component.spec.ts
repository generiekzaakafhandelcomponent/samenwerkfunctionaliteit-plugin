import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetDocumentenOverzichtComponent } from './get-documenten-overzicht.component';

describe('GetDocumentenOverzichtComponent', () => {
  let component: GetDocumentenOverzichtComponent;
  let fixture: ComponentFixture<GetDocumentenOverzichtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetDocumentenOverzichtComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetDocumentenOverzichtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
