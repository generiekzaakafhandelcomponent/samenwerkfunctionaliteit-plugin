import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivatedRoute } from '@angular/router';
import {
  PluginTranslatePipeModule,
  PluginTranslationService,
} from '@valtimo/plugin';
import { IconService } from 'carbon-components-angular';
import { NGXLogger } from 'ngx-logger';
import { Observable, of } from 'rxjs';
import { SamenwerkingProperties } from '../../../models/samenwerking-properties.model';
import { BerichtenService } from '../../../service/berichten.service';
import { SwfDocumentService } from '../../../service/swf-document.service';
import { StuurBerichtComponent } from './stuur-bericht.component';

const mockSamenwerkingProperties: Observable<SamenwerkingProperties> = of({
  samenwerkingId: 'SAM-12345',
  actieverzoekId: 'a5bb80ec-baf5-4eb6-b20c-de94a269a09a',
});

describe('StuurBerichtComponent', () => {
  let component: StuurBerichtComponent;
  let fixture: ComponentFixture<StuurBerichtComponent>;

  beforeEach(async () => {
    const iconService = jasmine.createSpyObj<IconService>('IconService', [
      'registerAll',
    ]);
    iconService.registerAll.and.returnValue();

    const pluginTranslationService =
      jasmine.createSpyObj<PluginTranslationService>(
        'PluginTranslationService',
        ['translate'],
      );

    pluginTranslationService.translate.and.returnValue(of(''));

    const swfDocumentService = jasmine.createSpyObj<SwfDocumentService>(
      'SwfDocumentService',
      ['getParam', 'getSamenwerkingProperties'],
    );
    swfDocumentService.getParam.and.returnValue(
      '6bccaaae-0695-4a56-9696-32d12e627f04',
    );
    swfDocumentService.getSamenwerkingProperties.and.returnValue(
      mockSamenwerkingProperties,
    );

    await TestBed.configureTestingModule({
      imports: [StuurBerichtComponent, PluginTranslatePipeModule],
      providers: [
        { provide: IconService, useValue: iconService },
        { provide: SwfDocumentService, useValue: swfDocumentService },
        {
          provide: PluginTranslationService,
          useValue: pluginTranslationService,
        },
        { provide: BerichtenService, useValue: {} },
        { provide: NGXLogger, useValue: {} },
        { provide: ActivatedRoute, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(StuurBerichtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
