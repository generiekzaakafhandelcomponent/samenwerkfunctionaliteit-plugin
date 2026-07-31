package com.ritense.valtimoplugins.samenwerkfunctionaliteit.model

import com.fasterxml.jackson.annotation.JsonInclude
import com.fasterxml.jackson.annotation.JsonProperty
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue

val mapper =
    jacksonObjectMapper().apply {
        setDefaultPropertyInclusion(JsonInclude.Include.NON_NULL)
    }

data class Notificaties(
    val notificaties: List<Notificatie>? = null,
) {
    fun toJson() = mapper.writeValueAsString(this)

    companion object {
        fun fromJson(json: String) = mapper.readValue<Notificaties>(json)
    }
}

data class Notificatie(
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
    val properties: Properties? = null,
    @get:JsonProperty("_links")@field:JsonProperty("_links")
    val links: Links? = null,
) {
    data class Properties(
        val actieverzoekId: String? = null,
        val actieverzoekStatusNieuw: Actieverzoek.ActieverzoekStatus? = null,
        val actieverzoekStatusOud: Actieverzoek.ActieverzoekStatus? = null,
        val actieverzoekTitel: String? = null,
        val berichtId: String? = null,
        val beschrijvendeRechten: String? = null,
        val deelnemer: String? = null,
        val deelnemerNaam: String? = null,
        val documentId: String? = null,
        val documentNaam: String? = null,
        val duurInactiviteit: String? = null,
        val eventInitiatorNaam: String? = null,
        val privilege: String? = null,
        val rechten: String? = null,
        val samenwerkingNaam: String? = null,
        val sluitDatum: String? = null,
        val toegangsNiveau: String? = null,
        val verwijderDatum: String? = null,
        val verzoeknummer: String? = null,
    )
}
