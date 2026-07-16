import { inject, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormModule, InputModule } from "@valtimo/components";
import { PluginTranslatePipeModule } from "@valtimo/plugin";
import { SamenwerkfunctionaliteitPluginConfigurationComponent } from "./components/samenwerkfunctionaliteit-plugin-configuration/samenwerkfunctionaliteit-plugin-configuration.component";
import { pluginNlTranslations } from "./i18n/nl";
import { TranslateService } from "@ngx-translate/core";

@NgModule({
  declarations: [],
  imports: [CommonModule, InputModule, PluginTranslatePipeModule, FormModule, SamenwerkfunctionaliteitPluginConfigurationComponent],
  exports: [SamenwerkfunctionaliteitPluginConfigurationComponent],
})
export class SamenwerkfunctionaliteitPluginModule {
  protected translate = inject(TranslateService);

  constructor() {
    this.translate.setTranslation("nl", pluginNlTranslations, true);
  }
}
