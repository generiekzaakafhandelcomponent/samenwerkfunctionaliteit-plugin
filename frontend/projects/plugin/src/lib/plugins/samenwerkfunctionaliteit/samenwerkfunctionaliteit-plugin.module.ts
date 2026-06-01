import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormModule, InputModule} from '@valtimo/components';
import {PluginTranslatePipeModule} from '@valtimo/plugin';
import {SamenwerkfunctionaliteitPluginConfigurationComponent} from './components/samenwerkfunctionaliteit-plugin-configuration/samenwerkfunctionaliteit-plugin-configuration.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, InputModule, PluginTranslatePipeModule, FormModule, SamenwerkfunctionaliteitPluginConfigurationComponent],
  exports: [SamenwerkfunctionaliteitPluginConfigurationComponent],
})
export class SamenwerkfunctionaliteitPluginModule {
}
