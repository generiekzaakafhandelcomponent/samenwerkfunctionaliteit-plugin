import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentTableLightComponent } from './document-table-light.component';

describe('DocumentTableLightComponent', () => {
  let component: DocumentTableLightComponent;
  let fixture: ComponentFixture<DocumentTableLightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentTableLightComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DocumentTableLightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
