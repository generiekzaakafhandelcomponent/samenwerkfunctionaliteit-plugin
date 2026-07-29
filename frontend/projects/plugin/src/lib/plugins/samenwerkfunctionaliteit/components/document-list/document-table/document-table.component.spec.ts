import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { ModalService } from 'carbon-components-angular';
import { DocumentTableComponent } from './document-table.component';

describe('DocumentTableComponent', () => {
  let component: DocumentTableComponent;
  let fixture: ComponentFixture<DocumentTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentTableComponent, TranslateModule.forRoot()],
      providers: [{ provide: ModalService, useValue: {} }],
    }).compileComponents();

    fixture = TestBed.createComponent(DocumentTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
