import { inject, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormModule, InputModule } from "@valtimo/components";
import { PluginTranslatePipeModule } from "@valtimo/plugin";
import { SamenwerkfunctionaliteitPluginConfigurationComponent } from "./components/samenwerkfunctionaliteit-plugin-configuration/samenwerkfunctionaliteit-plugin-configuration.component";
import { pluginNlTranslations } from "./i18n/nl";
import { TranslateService } from "@ngx-translate/core";
import { take } from "rxjs";

@NgModule({
  declarations: [],
  imports: [CommonModule, InputModule, PluginTranslatePipeModule, FormModule, SamenwerkfunctionaliteitPluginConfigurationComponent],
  exports: [SamenwerkfunctionaliteitPluginConfigurationComponent],
})
export class SamenwerkfunctionaliteitPluginModule {
  protected translate = inject(TranslateService);

  constructor() {
    this.translate.onLangChange.pipe(take(1)).subscribe(({ lang }) => {
      switch (lang) {
        case "nl":
          this.translate.setTranslation(lang, pluginNlTranslations, true);
          break;
      }
    });
  }
}
