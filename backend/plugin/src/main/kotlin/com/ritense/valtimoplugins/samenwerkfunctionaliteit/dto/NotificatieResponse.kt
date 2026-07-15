package com.ritense.valtimoplugins.samenwerkfunctionaliteit.dto

import com.fasterxml.jackson.annotation.JsonProperty
import com.ritense.valtimoplugins.samenwerkfunctionaliteit.mapper.toModel
import com.ritense.valtimoplugins.samenwerkfunctionaliteit.model.Notificatie

data class NotificatieResponse(
    @get:JsonProperty("notificatieId")
    val notificatieID: String? = null,
    val notificatieType: String? = null,
    @get:JsonProperty("samenwerkingId")
    val samenwerkingID: String? = null,
    val samenwerkVorm: String? = null,
    val notificatieTitel: String? = null,
    val notificatieTekst: String? = null,
    val eventInitiator: String? = null,
    val eventInitiatorNaam: String? = null,
    val deelnemer: String? = null,
    val deelnemerNaam: String? = null,
    val eventDatumTijd: String? = null,
    val properties: Map<String, String?>? = null,
    @get:JsonProperty("_links")
    val links: Links? = null,
) {
    fun toModel(): Notificatie =
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
            properties = properties,
            links = links?.toModel(),
        )
}
