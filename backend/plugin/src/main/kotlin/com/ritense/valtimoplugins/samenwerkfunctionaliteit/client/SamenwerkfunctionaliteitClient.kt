package com.ritense.valtimoplugins.samenwerkfunctionaliteit.client

import com.ritense.valtimoplugins.samenwerkfunctionaliteit.dto.ActieverzoekResponse
import com.ritense.valtimoplugins.samenwerkfunctionaliteit.dto.BerichtResponse
import com.ritense.valtimoplugins.samenwerkfunctionaliteit.dto.CreateBerichtRequest
import com.ritense.valtimoplugins.samenwerkfunctionaliteit.dto.DocumentenOverzichtResponse
import com.ritense.valtimoplugins.samenwerkfunctionaliteit.dto.NotificatieResponse
import com.ritense.valtimoplugins.samenwerkfunctionaliteit.model.SamenwerkfunctionaliteitProperties
import org.springframework.core.io.InputStreamResource
import java.util.UUID

interface SamenwerkfunctionaliteitClient {
    fun getActieverzoek(
        properties: SamenwerkfunctionaliteitProperties,
        actieverzoekId: UUID,
    ): ActieverzoekResponse

    fun getAllActieverzoeken(properties: SamenwerkfunctionaliteitProperties): List<ActieverzoekResponse>

    fun getBericht(
        properties: SamenwerkfunctionaliteitProperties,
        actieVerzoekId: UUID,
        berichtId: UUID,
    ): BerichtResponse

    fun postBericht(
        properties: SamenwerkfunctionaliteitProperties,
        actieverzoekId: UUID,
        requestBody: CreateBerichtRequest,
    ): BerichtResponse

    fun deleteBericht(
        properties: SamenwerkfunctionaliteitProperties,
        actieVerzoekId: UUID,
        berichtId: UUID,
    )

    fun getDocumentenOverzicht(
        properties: SamenwerkfunctionaliteitProperties,
        samenwerkingId: String,
    ): DocumentenOverzichtResponse

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
    ): List<NotificatieResponse>
}