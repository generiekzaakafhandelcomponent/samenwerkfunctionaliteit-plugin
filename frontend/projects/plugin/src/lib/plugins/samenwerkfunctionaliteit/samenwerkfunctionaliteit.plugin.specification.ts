import {PluginSpecification} from "@valtimo/plugin";
import {SamenwerkfunctionaliteitPluginConfigurationComponent} from './components/samenwerkfunctionaliteit-plugin-configuration/samenwerkfunctionaliteit-plugin-configuration.component';
import {SAMENWERKFUNCTIONALITEIT_PLUGIN_LOGO_BASE64} from './assets/samenwerkfunctionaliteit-plugin-logo';
import {GetActieverzoekComponent} from './components/get-actieverzoek/get-actieverzoek.component';
import {GetAllActieverzoekenComponent} from './components/get-all-actieverzoeken/get-all-actieverzoeken.component';
import {GetBerichtComponent} from './components/get-bericht/get-bericht.component';
import {PostBerichtComponent} from './components/post-bericht/post-bericht.component';
import {DeleteBerichtComponent} from './components/delete-bericht/delete-bericht.component';
import {GetDocumentenOverzichtComponent} from './components/get-documenten-overzicht/get-documenten-overzicht.component';
import {DownloadDocumentComponent} from './components/download-document/download-document.component';
import {UploadDocumentComponent} from './components/upload-document/upload-document.component';
import {GetSamenwerkingNotificatiesComponent} from './components/get-samenwerking-notificaties/get-samenwerking-notificaties.component';

const samenwerkfunctionaliteitPluginSpecification: PluginSpecification = {
  pluginId: 'samenwerkfunctionaliteit',
  pluginConfigurationComponent: SamenwerkfunctionaliteitPluginConfigurationComponent,
  pluginLogoBase64: SAMENWERKFUNCTIONALITEIT_PLUGIN_LOGO_BASE64,
  functionConfigurationComponents: {
    'get-actieverzoek': GetActieverzoekComponent,
    'get-all-actieverzoeken': GetAllActieverzoekenComponent,
    'get-bericht': GetBerichtComponent,
    'post-bericht': PostBerichtComponent,
    'delete-bericht': DeleteBerichtComponent,
    'get-documenten-overzicht': GetDocumentenOverzichtComponent,
    'download-document': DownloadDocumentComponent,
    'upload-document': UploadDocumentComponent,
    'get-samenwerking-notificaties': GetSamenwerkingNotificatiesComponent
  },
  pluginTranslations: {
    nl: {
      title: 'Samenwerkfunctionaliteit',
      configurationTitle: 'Configuratie van de Samenwerkfunctionaliteit-plugin',
      description:
        'Een plugin voor het verwerken van gegevens binnen de Samenwerkfunctionaliteit-API binnen het Digitaal Stelsel Omgevingswet (DSO).',
      configurationTitleTooltip:
        'In dit onderdeel configureer je de Samenwerkfunctionaliteit-plugin om eenvoudig gegevens te kunnen verzenden en ophalen.',
      samenwerkfunctionaliteitUrl: 'Samenwerkfunctionaliteit-URL',
      certificate: 'Certificaat',
      oinNummer: 'OIN-Nummer',
      isOrganisatieDeOntvangerTooltip: 'Filtert op actieverzoeken waarvan de huidige organisatie (zie OIN in de instellingen van de plugin) de ontvanger is.',
      samenwerkingId: 'Het samenwerkingId van deze actieverzoeken.',
      isOrganisatieDeOntvanger: 'De actieverzoeken filteren op organisatie',

      // Common
      resultPvName: 'Naam van resultaat-procesvariabele',
      variableFieldTooltip:
        'Dit veld kan zowel de letterlijke waarde, of het pad naar een (proces)variabele bevatten welke de waarde bevat (b.v. \'pv:/resultaat\')',

      //Pluginacties
      'get-actieverzoek': "Actieverzoek ophalen",
      'get-all-actieverzoeken': "Alle actieverzoeken ophalen"
    },

    en: {
      title: 'Samenwerkfunctionaliteit',
      configurationTitle: 'Samenwerkfunctionaliteit plugin configuration',
      description: 'A plugin for handling collaboration data within the Samenwerkfunctionaliteit API of the Digitaal Stelsel Omgevingswet (DSO).',
      configurationTitleTooltip:
        'In this section, you configure the Samenwerkfunctionaliteit plugin to easily send and retrieve data.',
      samenwerkfunctionaliteitUrl: 'Samenwerkfunctionaliteit URL',
      certificate: 'Certificate',
      oinNummer: 'OIN-Number',

      // Common
      resultPvName: 'Result process variable name',
      variableFieldTooltip:
        'This field accepts either a literal value or a path to a (process) variable containing the value (e.g. \'pv:/result\')',
    }
  },
};

export {samenwerkfunctionaliteitPluginSpecification};
