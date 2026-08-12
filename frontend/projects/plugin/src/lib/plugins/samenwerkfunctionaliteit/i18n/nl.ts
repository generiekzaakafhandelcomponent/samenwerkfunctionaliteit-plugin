export const pluginNlTranslations = {
  samenwerkfunctionaliteit: {
    notifications: {
      types: {
        status: 'Status',
        document: 'Document',
        system: 'Systeem',
        message: 'Bericht',
      },
    },
    documenttable: {
      delete: 'Verwijderen',
      fileName: 'Bestandsnaam',
      confidentialityType: 'Vertrouwelijkheidsaanduiding',
      dateCreated: 'Datum aangemaakt',
    },
    feedback: {
      userNotification: {
        contactYourAdmin:
          'Neem contact op met uw beheerder als dit probleem zich vaker voordoet.',
        failedGeneric: 'Er ging iets mis',
        genericSuccessTitle: 'Gelukt',
        genericSuccessMessage: 'De actie is succesvol uitgevoerd',

        downloadDocumentFailureTitle: 'Er ging iets mis tijdens het downloaden',

        fetchDocumentFailureTitle:
          'Er ging iets mis tijdens het ophalen van de lijst van documenten',

        uploadDocumentToSWFSuccessTitle:
          'Uploaden naar de Samenwerkfunctionaliteit gelukt',
        uploadDocumentToSWFSuccessMessage:
          '{{ filename }} is succesvol aan de samenwerking toegevoegd',
        uploadDocumentToSWFFailureTitle:
          'Uploaden naar de samenwerking mislukt',

        uploadDocumentToDocumentenApiSuccessTitle:
          'Uploaden naar de Documenten-API gelukt',
        uploadDocumentToDocumentenApiSuccessMessage:
          'Archiveringskopie {{ filename }} is succesvol geüpload naar de Documenten-API',
        uploadDocumentToDocumentenAPIFailureTitle:
          'Uploaden van archiveringskopie naar Documenten-API mislukt',
      },
    },
    messages: {
      datetimestamp: {
        justNow: 'Zojuist',
        today: 'Vandaag',
        minuteSingular: '{{ minuteCount }} minuut geleden',
        minutePlural: '{{ minuteCount }} minuten geleden',
      },
    },
  },
};
