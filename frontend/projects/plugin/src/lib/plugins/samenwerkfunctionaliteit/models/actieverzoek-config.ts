import {PluginConfigurationData} from '@valtimo/plugin';

interface ActieverzoekConfig extends PluginConfigurationData {
  resultPvName: string;
  actieverzoekId: string;
}

interface AlleActieverzoekenConfig extends PluginConfigurationData {
  resultPvName: string;
  samenwerkingId: string;
  isOrganisatieDeOntvanger: boolean;
}

export {ActieverzoekConfig, AlleActieverzoekenConfig};
