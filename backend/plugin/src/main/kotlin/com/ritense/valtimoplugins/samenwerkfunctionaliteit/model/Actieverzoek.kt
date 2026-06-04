package com.ritense.valtimoplugins.samenwerkfunctionaliteit.model

import com.fasterxml.jackson.annotation.JsonProperty
import java.time.OffsetDateTime
import java.util.UUID

data class Actieverzoek(
    @JsonProperty("_links")
    val links: Links? = null,

    @JsonProperty("aantalBerichten")
    val aantalBerichten: Int? = null,

    @JsonProperty("actieverzoekId")
    val actieverzoekId: UUID? = null,

    @JsonProperty("creatieDatumTijd")
    val creatieDatumTijd: OffsetDateTime? = null,

    @JsonProperty("documenten")
    val documenten: List<Document>? = null,

    @JsonProperty("laatstAangepastDatumTijd")
    val laatstAangepastDatumTijd: OffsetDateTime? = null,

    @JsonProperty("laatstAangepastDoor")
    val laatstAangepastDoor: String? = null, // pattern: \d{20}

    @JsonProperty("laatstAangepastDoorNaam")
    val laatstAangepastDoorNaam: String? = null,

    @JsonProperty("melding")
    val melding: String? = null,

    @JsonProperty("omschrijving")
    val omschrijving: String? = null,

    @JsonProperty("ontvanger")
    val ontvanger: String? = null, // pattern: \d{20}

    @JsonProperty("ontvangerNaam")
    val ontvangerNaam: String? = null,

    @JsonProperty("productId")
    val productId: String? = null,

    @JsonProperty("samenwerkingId")
    val samenwerkingId: String? = null,

    @JsonProperty("status")
    val status: Status? = null,

    @JsonProperty("titel")
    val titel: String? = null,

    @JsonProperty("zender")
    val zender: String? = null, // pattern: \d{20}

    @JsonProperty("zenderNaam")
    val zenderNaam: String? = null
)

enum class Status {
    OPEN,
    IN_BEHANDELING,
    GEWEIGERD,
    INGETROKKEN,
    GEREEDGEMELD,
    GEREED
}
