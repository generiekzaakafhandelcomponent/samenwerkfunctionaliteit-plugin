package com.ritense.valtimoplugins.samenwerkfunctionaliteit.mapper

import com.ritense.valtimoplugins.samenwerkfunctionaliteit.dto.ActieverzoekListResponse
import com.ritense.valtimoplugins.samenwerkfunctionaliteit.dto.ActieverzoekResponse
import com.ritense.valtimoplugins.samenwerkfunctionaliteit.model.Actieverzoek

fun ActieverzoekResponse.toModel(): Actieverzoek =
    Actieverzoek(
        links = links,
        aantalBerichten = aantalBerichten,
        actieverzoekId = actieverzoekId,
        creatieDatumTijd = creatieDatumTijd,
        documenten = documenten,
        laatstAangepastDatumTijd = laatstAangepastDatumTijd,
        laatstAangepastDoor = laatstAangepastDoor,
        laatstAangepastDoorNaam = laatstAangepastDoorNaam,
        melding = melding,
        omschrijving = omschrijving,
        ontvanger = ontvanger,
        ontvangerNaam = ontvangerNaam,
        productId = productId,
        samenwerkingId = samenwerkingId,
        status = status,
        titel = titel,
        zender = zender,
        zenderNaam = zenderNaam,
    )

fun ActieverzoekListResponse.toModel(): List<Actieverzoek> = embedded?.actieverzoeken ?: emptyList()
