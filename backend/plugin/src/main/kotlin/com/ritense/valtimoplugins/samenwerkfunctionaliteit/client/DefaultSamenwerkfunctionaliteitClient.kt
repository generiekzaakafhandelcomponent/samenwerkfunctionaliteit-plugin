package com.ritense.valtimoplugins.samenwerkfunctionaliteit.client

import com.ritense.valtimoplugins.samenwerkfunctionaliteit.dto.ActieverzoekResponse
import com.ritense.valtimoplugins.samenwerkfunctionaliteit.dto.BerichtResponse
import com.ritense.valtimoplugins.samenwerkfunctionaliteit.dto.CreateBerichtRequest
import com.ritense.valtimoplugins.samenwerkfunctionaliteit.dto.DocumentenOverzichtResponse
import com.ritense.valtimoplugins.samenwerkfunctionaliteit.dto.NotificatieResponse
import com.ritense.valtimoplugins.samenwerkfunctionaliteit.model.SamenwerkfunctionaliteitProperties
import io.github.oshai.kotlinlogging.KotlinLogging
import org.springframework.core.io.InputStreamResource
import org.springframework.stereotype.Component
import org.springframework.web.client.RestClient
import java.util.UUID

@Component
class DefaultSamenwerkfunctionaliteitClient(
    private val restClientBuilder: RestClient.Builder,
) : SamenwerkfunctionaliteitClient {
    override fun getActieverzoek(
        properties: SamenwerkfunctionaliteitProperties,
        actieverzoekId: UUID,
    ): ActieverzoekResponse {
        TODO("Not yet implemented")
    }

    override fun getAllActieverzoeken(properties: SamenwerkfunctionaliteitProperties): List<ActieverzoekResponse> {
        TODO("Not yet implemented")
    }

    override fun getBericht(
        properties: SamenwerkfunctionaliteitProperties,
        actieVerzoekId: UUID,
        berichtId: UUID,
    ): BerichtResponse {
        TODO("Not yet implemented")
    }

    override fun postBericht(
        properties: SamenwerkfunctionaliteitProperties,
        actieverzoekId: UUID,
        requestBody: CreateBerichtRequest,
    ): BerichtResponse {
        TODO("Not yet implemented")
    }

    override fun deleteBericht(
        properties: SamenwerkfunctionaliteitProperties,
        actieVerzoekId: UUID,
        berichtId: UUID,
    ) {
        TODO("Not yet implemented")
    }

    override fun getDocumentenOverzicht(
        properties: SamenwerkfunctionaliteitProperties,
        samenwerkingId: String,
    ): DocumentenOverzichtResponse {
        TODO("Not yet implemented")
    }

    override fun downloadDocument(
        properties: SamenwerkfunctionaliteitProperties,
        documentId: UUID,
    ): InputStreamResource {
        TODO("Not yet implemented")
    }

    override fun uploadDocument(
        properties: SamenwerkfunctionaliteitProperties,
        samenwerkingId: String,
    ) {
        TODO("Not yet implemented")
    }

    override fun getSamenwerkingNotificaties(
        properties: SamenwerkfunctionaliteitProperties,
        samenwerkingId: String,
    ): List<NotificatieResponse> {
        TODO("Not yet implemented")
    }

    companion object {
        private val logger = KotlinLogging.logger { }
    }
}
