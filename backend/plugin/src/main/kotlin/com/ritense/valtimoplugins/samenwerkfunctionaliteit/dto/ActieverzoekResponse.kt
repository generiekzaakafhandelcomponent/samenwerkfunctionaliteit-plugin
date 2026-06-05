package com.ritense.valtimoplugins.samenwerkfunctionaliteit.dto

import com.fasterxml.jackson.annotation.JsonProperty
import com.ritense.valtimoplugins.samenwerkfunctionaliteit.model.Document
import com.ritense.valtimoplugins.samenwerkfunctionaliteit.model.Links
import com.ritense.valtimoplugins.samenwerkfunctionaliteit.model.Status
import java.time.OffsetDateTime
import java.util.UUID

data class ActieverzoekResponse(
    @JsonProperty("_links")
    val links: Links? = null,
    val aantalBerichten: Int? = null,
    val actieverzoekId: UUID? = null,
    val creatieDatumTijd: OffsetDateTime? = null,
    val documenten: List<Document>? = null,
    val laatstAangepastDatumTijd: OffsetDateTime? = null,
    val laatstAangepastDoor: String? = null, // pattern: \d{20}
    val laatstAangepastDoorNaam: String? = null,
    val melding: String? = null,
    val omschrijving: String? = null,
    val ontvanger: String? = null, // pattern: \d{20}
    val ontvangerNaam: String? = null,
    val productId: String? = null,
    val samenwerkingId: String? = null,
    val status: Status? = null,
    val titel: String? = null,
    val zender: String? = null, // pattern: \d{20}
    val zenderNaam: String? = null
)
