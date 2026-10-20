import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { PLUGINS_TOKEN } from '@valtimo/plugin';
import { GetSamenwerkingPluginActionComponent } from './get-samenwerking-plugin-action.component';

describe('GetSamenwerkingPluginActionComponent', () => {
  let component: GetSamenwerkingPluginActionComponent;
  let fixture: ComponentFixture<GetSamenwerkingPluginActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetSamenwerkingPluginActionComponent, TranslateModule.forRoot()],
      providers: [{ provide: PLUGINS_TOKEN, useValue: [] }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GetSamenwerkingPluginActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
