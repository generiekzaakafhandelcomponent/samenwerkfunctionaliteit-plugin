import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { NotificatieService } from '../../service/notificatie.service';
import { SwfDocumentService } from '../../service/swf-document.service';
import { NotificatiesCustomTabComponent } from './notificaties-custom-tab.component';

describe('NotificatiesCustomTabComponent', () => {
  let component: NotificatiesCustomTabComponent;
  let fixture: ComponentFixture<NotificatiesCustomTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificatiesCustomTabComponent, TranslateModule.forRoot()],
      providers: [
        {
          provide: NotificatieService,
          useValue: { getNotificaties: () => of([]) },
        },
        {
          provide: SwfDocumentService,
          useValue: {
            getParam: () => null,
            getSamenwerkingProperties: () => of({ samenwerkingId: 'test' }),
          },
        },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: convertToParamMap({}) } },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NotificatiesCustomTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
