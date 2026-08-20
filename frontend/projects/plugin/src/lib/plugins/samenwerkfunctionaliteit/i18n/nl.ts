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
    messenger: {
      messengerTitle: 'Stuur bericht',
      messagePlaceholder: 'Typ hier uw bericht',
      sendMessage: 'Bericht versturen',
      loadingMessages: 'Berichten aan het laden...',
    },
    feedback: {
      notAnSwfCaseMessage: {
        genericTitle: 'Tabblad kan niet getoond worden.',
        genericMessage:
          'Dit dossier is niet gekoppeld aan een samenwerking in het Digitaal Stelsel Omgevingswet.',

        samenwerkingTitle: 'Geen samenwerking opgehaald',
      },
      userNotification: {
        contactYourAdmin:
          'Neem contact op met uw beheerder als dit probleem zich vaker voordoet.',
        failedGeneric: 'Er ging iets mis',
        genericSuccessTitle: 'Gelukt',
        genericSuccessMessage: 'De actie is succesvol uitgevoerd',

        downloadDocumentFailureTitle: 'Er ging iets mis tijdens het downloaden',

        fetchDocuments: {
          failure: {
            title:
              'Er ging iets mis tijdens het ophalen van de lijst van documenten',
          },
        },

        uploadDocumentToSWF: {
          success: {
            title: 'Uploaden naar de Samenwerkfunctionaliteit gelukt',
            message:
              '{{ filename }} is succesvol aan de samenwerking toegevoegd.',
          },
          failure: {
            title: 'Uploaden naar de samenwerking mislukt',
          },
        },

        uploadDocumentToDocumentenApi: {
          success: {
            title: 'Uploaden naar de Documenten-API gelukt',
            message:
              'Archiveringskopie {{ filename }} is succesvol geüpload naar de Documenten-API.',
          },
          failure: {
            title: 'Uploaden van archiveringskopie naar Documenten-API mislukt',
          },
        },

        messenger: {
          success: {
            title: 'Verzonden',
            message: 'Het bericht is succesvol verstuurd.',
          },
          failure: {
            title: 'Het bericht kon niet verstuurd worden',
          },
          failureMissingActieverzoekId: {
            message: 'Het actieverzoek kon niet gevonden worden.',
          },
        },
      },
    },
    messages: {
      dateTimeStamp: {
        justNow: 'Zojuist',
        today: 'Vandaag',
        minuteSingular: '{{ minuteCount }} minuut geleden',
        minutePlural: '{{ minuteCount }} minuten geleden',
      },
    },

    actieverzoekStatusTypes: {
      open: 'Open',
      inProgress: 'In behandeling',
      rejected: 'Afgewezen',
      withdrawn: 'Ingetrokken',
      reportedReady: 'Gereedgemeld',
      ready: 'Gereed',
    },
    actieverzoekStatusUpdate: {
      failedTitle: 'Actieverzoekstatus wijzigen mislukt.',
      failedMessage:
        'Er ging iets mis tijdens het wijzigen van de status van het actieverzoek. Probeer het later nog eens.',
      successTitle: 'Actieverzoekstatus succesvol gewijzigd.',
      successMessage:
        'De status van actieverzoek {{ name }} is succesvol gewijzigd naar {{ status }}.',
    },
    actieverzoekCard: {
      status: 'Status',
      date: 'Datum aangemaakt',
      sentBy: 'Verzonden door',
      productCode: 'Productcode',
      description: 'Omschrijving',
    },
  },
};
