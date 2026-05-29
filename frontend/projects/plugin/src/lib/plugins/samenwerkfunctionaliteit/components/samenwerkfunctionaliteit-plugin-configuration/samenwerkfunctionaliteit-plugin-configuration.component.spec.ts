import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SamenwerkfunctionaliteitPluginConfigurationComponent} from './samenwerkfunctionaliteit-plugin-configuration.component';
import {EMPTY, of} from 'rxjs';
import { Config } from '../../models';

describe('SamenwerkfunctionaliteitPluginConfigurationComponent', () => {
  let component: SamenwerkfunctionaliteitPluginConfigurationComponent;
  let fixture: ComponentFixture<SamenwerkfunctionaliteitPluginConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SamenwerkfunctionaliteitPluginConfigurationComponent]
    })
      .overrideTemplate(SamenwerkfunctionaliteitPluginConfigurationComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SamenwerkfunctionaliteitPluginConfigurationComponent);
    component = fixture.componentInstance;

    component.save$ = EMPTY;
    component.disabled$ = of(false)
    component.pluginId = 'test-plugin';

    component.prefillConfiguration$ = of({
      configurationTitle: '',
      samenwerkfunctionaliteitUrl: '',
      certificate: ''
    } as unknown as Config);

    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component instanceof SamenwerkfunctionaliteitPluginConfigurationComponent).toBeTrue();
  });
});
