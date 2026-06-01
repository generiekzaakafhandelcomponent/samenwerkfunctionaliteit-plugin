import {PluginConfigurationData} from '@valtimo/plugin';

interface Config extends PluginConfigurationData {
  samenwerkfunctionaliteitUrl: string;
  certificate: string;
  oinNummer: string;
}

export {Config};
