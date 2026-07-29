import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { DocumentTableLightComponent } from './document-table-light.component';

describe('DocumentTableLightComponent', () => {
  let component: DocumentTableLightComponent;
  let fixture: ComponentFixture<DocumentTableLightComponent>;

  beforeEach(async () => {
    const translateService = jasmine.createSpyObj<TranslateService>(
      'TranslateService',
      ['instant'],
    );
    translateService.instant.and.returnValue('');

    await TestBed.configureTestingModule({
      providers: [{ provide: TranslateService, useValue: translateService }],
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
