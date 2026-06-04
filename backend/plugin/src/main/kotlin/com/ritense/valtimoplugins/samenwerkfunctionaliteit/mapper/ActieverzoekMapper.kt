package com.ritense.valtimoplugins.samenwerkfunctionaliteit.mapper

import com.ritense.valtimoplugins.samenwerkfunctionaliteit.dto.ActieverzoekListResponse
import com.ritense.valtimoplugins.samenwerkfunctionaliteit.dto.ActieverzoekResponse
import com.ritense.valtimoplugins.samenwerkfunctionaliteit.model.Actieverzoek
import java.net.URI


fun ActieverzoekResponse.toModel(): Actieverzoek =
    Actieverzoek(
        links = actieverzoek?.links,
        aantalBerichten = actieverzoek?.aantalBerichten,
        actieverzoekId = actieverzoek?.actieverzoekId,
        creatieDatumTijd = actieverzoek?.creatieDatumTijd,
        documenten = actieverzoek?.documenten,
        laatstAangepastDatumTijd = actieverzoek?.laatstAangepastDatumTijd,
        laatstAangepastDoor = actieverzoek?.laatstAangepastDoor,
        laatstAangepastDoorNaam = actieverzoek?.laatstAangepastDoorNaam,
        melding = actieverzoek?.melding,
        omschrijving = actieverzoek?.omschrijving,
        ontvanger = actieverzoek?.ontvanger,
        ontvangerNaam = actieverzoek?.ontvangerNaam,
        productId = actieverzoek?.productId,
        samenwerkingId = actieverzoek?.samenwerkingId,
        status = actieverzoek?.status,
        titel = actieverzoek?.titel,
        zender = actieverzoek?.zender,
        zenderNaam = actieverzoek?.zenderNaam,
    )

fun ActieverzoekListResponse.toModel(): List<Actieverzoek> = embedded
