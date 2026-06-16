package com.ritense.valtimoplugins.samenwerkfunctionaliteit.mapper

import com.ritense.valtimoplugins.samenwerkfunctionaliteit.model.Document
import com.ritense.valtimoplugins.samenwerkfunctionaliteit.model.Document.DocumentLinksResponse
import com.ritense.valtimoplugins.samenwerkfunctionaliteit.model.Document.LinkResponse
import com.ritense.valtimoplugins.samenwerkfunctionaliteit.dto.Document as DocumentResponse
import com.ritense.valtimoplugins.samenwerkfunctionaliteit.dto.DocumentLinksResponse as DocumentLinksDto
import com.ritense.valtimoplugins.samenwerkfunctionaliteit.dto.LinkResponse as LinkDto

fun DocumentResponse.toModel(): Document =
    Document(
        documentId = documentId,
        bestandsNaam = bestandsNaam,
        kenmerkSysteem = kenmerkSysteem,
        nummerBinnenSysteem = nummerBinnenSysteem,
        samenwerkingId = samenwerkingId,
        aangemaaktDoor = aangemaaktDoor,
        aangemaaktDoorNaam = aangemaaktDoorNaam,
        creatieDatumTijd = creatieDatumTijd,
        laatstAangepastDoor = laatstAangepastDoor,
        laatstAangepastDoorNaam = laatstAangepastDoorNaam,
        laatstAangepastDatumTijd = laatstAangepastDatumTijd,
        documentOmschrijving = documentOmschrijving,
        vertrouwelijkheidsAanduiding = vertrouwelijkheidsAanduiding,
        taal = taal,
        formaat = formaat,
        documentHash = documentHash,
        links = links?.toModel(),
    )

fun DocumentLinksDto.toModel(): DocumentLinksResponse =
    DocumentLinksResponse(
        self = self?.toModel(),
        content = content?.toModel(),
        ontkoppelenVanActieverzoek = ontkoppelenVanActieverzoek?.toModel(),
    )

fun LinkDto.toModel(): LinkResponse =
    LinkResponse(
        href = href,
    )
