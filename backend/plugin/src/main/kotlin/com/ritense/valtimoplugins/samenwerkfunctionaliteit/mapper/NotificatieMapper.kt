package com.ritense.valtimoplugins.samenwerkfunctionaliteit.mapper

import com.ritense.valtimoplugins.samenwerkfunctionaliteit.dto.NotificatieResponse
import com.ritense.valtimoplugins.samenwerkfunctionaliteit.dto.toModel
import com.ritense.valtimoplugins.samenwerkfunctionaliteit.model.Notificatie

fun NotificatieResponse.toModel(): Notificatie =
    Notificatie(
        notificatieID = notificatieID,
        notificatieType = notificatieType,
        samenwerkingID = samenwerkingID,
        samenwerkVorm = samenwerkVorm,
        notificatieTitel = notificatieTitel,
        notificatieTekst = notificatieTekst,
        eventInitiator = eventInitiator,
        eventInitiatorNaam = eventInitiatorNaam,
        deelnemer = deelnemer,
        deelnemerNaam = deelnemerNaam,
        eventDatumTijd = eventDatumTijd,
        properties = properties?.toModel(),
        links = links?.toModel(),
    )
