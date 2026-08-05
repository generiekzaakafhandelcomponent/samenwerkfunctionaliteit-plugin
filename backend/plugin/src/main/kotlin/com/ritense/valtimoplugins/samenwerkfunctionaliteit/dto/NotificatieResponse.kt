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
    val properties: Properties? = null,
    @get:JsonProperty("_links")
    val links: Links? = null,
) {
    data class Properties(
        val actieverzoekId: String?,
        val actieverzoekStatusNieuw: Actieverzoek.ActieverzoekStatus?,
        val actieverzoekStatusOud: Actieverzoek.ActieverzoekStatus?,
        val actieverzoekTitel: String?,
        val berichtId: String?,
        val beschrijvendeRechten: String?,
        val deelnemer: String?,
        val deelnemerNaam: String?,
        val documentId: String?,
        val documentNaam: String?,
        val duurInactiviteit: String?,
        val eventInitiatorNaam: String?,
        val privilege: String?,
        val rechten: String?,
        val samenwerkingNaam: String?,
        val sluitDatum: String?,
        val toegangsNiveau: String?,
        val verwijderDatum: String?,
        val verzoeknummer: String?,
    )
}

fun NotificatieResponse.Properties.toModel(): Notificatie.Properties =
    Notificatie.Properties(
        actieverzoekId = actieverzoekId,
        actieverzoekStatusNieuw = actieverzoekStatusNieuw?.toModel(),
        actieverzoekStatusOud = actieverzoekStatusOud?.toModel(),
        actieverzoekTitel = actieverzoekTitel,
        berichtId = berichtId,
        beschrijvendeRechten = beschrijvendeRechten,
        deelnemer = deelnemer,
        deelnemerNaam = deelnemerNaam,
        documentId = documentId,
        documentNaam = documentNaam,
        duurInactiviteit = duurInactiviteit,
        eventInitiatorNaam = eventInitiatorNaam,
        privilege = privilege,
        rechten = rechten,
        samenwerkingNaam = samenwerkingNaam,
        sluitDatum = sluitDatum,
        toegangsNiveau = toegangsNiveau,
        verwijderDatum = verwijderDatum,
        verzoeknummer = verzoeknummer,
    )
