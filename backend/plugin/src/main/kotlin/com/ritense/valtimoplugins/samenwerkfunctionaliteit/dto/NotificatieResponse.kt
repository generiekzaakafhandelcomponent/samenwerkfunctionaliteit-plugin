package com.ritense.valtimoplugins.samenwerkfunctionaliteit.dto

import com.fasterxml.jackson.annotation.JsonProperty
import com.ritense.valtimoplugins.samenwerkfunctionaliteit.model.Links

data class NotificatieResponse(
    @get:JsonProperty("notificatieId")@field:JsonProperty("notificatieId")
    val notificatieID: String? = null,
    val notificatieType: String? = null,
    @get:JsonProperty("samenwerkingId")@field:JsonProperty("samenwerkingId")
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
    @get:JsonProperty("_links")@field:JsonProperty("_links")
    val links: Links? = null,
)
