package com.ritense.valtimoplugins.samenwerkfunctionaliteit.service

import com.ritense.valtimoplugins.samenwerkfunctionaliteit.dto.CreateBerichtRequest
import com.ritense.valtimoplugins.samenwerkfunctionaliteit.model.Actieverzoek
import com.ritense.valtimoplugins.samenwerkfunctionaliteit.model.Bericht
import com.ritense.valtimoplugins.samenwerkfunctionaliteit.model.Document
import com.ritense.valtimoplugins.samenwerkfunctionaliteit.model.Notificatie
import com.ritense.valtimoplugins.samenwerkfunctionaliteit.model.SamenwerkfunctionaliteitProperties
import org.springframework.core.io.InputStreamResource
import java.util.UUID

interface SamenwerkfunctionaliteitService {
    fun getActieverzoek(
        properties: SamenwerkfunctionaliteitProperties,
        actieverzoekId: UUID,
    ): Actieverzoek

    fun getAllActieverzoeken(properties: SamenwerkfunctionaliteitProperties): List<Actieverzoek>

    fun getBericht(
        properties: SamenwerkfunctionaliteitProperties,
        actieVerzoekId: UUID,
        berichtId: UUID,
    ): Bericht

    fun postBericht(
        properties: SamenwerkfunctionaliteitProperties,
        actieverzoekId: UUID,
        requestBody: CreateBerichtRequest,
    ): Bericht

    fun deleteBericht(
        properties: SamenwerkfunctionaliteitProperties,
        actieVerzoekId: UUID,
        berichtId: UUID,
    )

    fun getDocumentenOverzicht(
        properties: SamenwerkfunctionaliteitProperties,
        samenwerkingId: String,
    ): List<Document>

    fun downloadDocument(
        properties: SamenwerkfunctionaliteitProperties,
        documentId: UUID,
    ): InputStreamResource

    fun uploadDocument(
        properties: SamenwerkfunctionaliteitProperties,
        samenwerkingId: String,
    )

    fun getSamenwerkingNotificaties(
        properties: SamenwerkfunctionaliteitProperties,
        samenwerkingId: String,
    ): List<Notificatie>
}