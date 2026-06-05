package com.ritense.valtimoplugins.samenwerkfunctionaliteit.client

import com.ritense.valtimoplugins.samenwerkfunctionaliteit.dto.ActieverzoekListResponse
import com.ritense.valtimoplugins.samenwerkfunctionaliteit.dto.ActieverzoekResponse
import com.ritense.valtimoplugins.samenwerkfunctionaliteit.dto.BerichtResponse
import com.ritense.valtimoplugins.samenwerkfunctionaliteit.dto.CreateBerichtRequest
import com.ritense.valtimoplugins.samenwerkfunctionaliteit.dto.DocumentenOverzichtResponse
import com.ritense.valtimoplugins.samenwerkfunctionaliteit.dto.NotificatieResponse
import com.ritense.valtimoplugins.samenwerkfunctionaliteit.model.SamenwerkfunctionaliteitProperties
import io.github.oshai.kotlinlogging.KotlinLogging
import org.springframework.core.io.InputStreamResource
import org.springframework.stereotype.Component
import org.springframework.web.client.HttpServerErrorException
import org.springframework.web.client.RestClient
import org.springframework.web.client.RestClientResponseException
import org.springframework.web.client.body
import org.springframework.web.util.UriComponentsBuilder
import java.util.UUID

@Component
class DefaultSamenwerkfunctionaliteitClient(
    private val restClientBuilder: RestClient.Builder,
) : SamenwerkfunctionaliteitClient {

    private fun restClient(properties: SamenwerkfunctionaliteitProperties): RestClient =
        restClientBuilder
            .clone()
            .baseUrl(properties.baseUrl.toASCIIString())
            .defaultHeader("x-dienst", "ggd-hl")
            .build()

    override fun getActieverzoek(
        properties: SamenwerkfunctionaliteitProperties,
        actieverzoekId: UUID,
    ): ActieverzoekResponse {
        try {
            val response = this.restClient(properties = properties)
                .get()
                .uri("${SWF_ACTIEVERZOEK_PATH}/${actieverzoekId}")
                .retrieve()
                .body<ActieverzoekResponse>()
                ?: throw IllegalStateException("Error fetching Actieverzoek: response body was null")
            return response
        } catch (e: HttpServerErrorException.InternalServerError) {
            throw e
        } catch (e: RestClientResponseException) {
            throw e
        }
    }

    override fun getAllActieverzoeken(
        properties: SamenwerkfunctionaliteitProperties,
        samenwerkingId: String,
        isOrganisatieDeOntvanger: Boolean
    ): ActieverzoekListResponse {
        try {
            val uri = UriComponentsBuilder
                .fromUriString("/samenwerkfunctionaliteit/v5/${SWF_ACTIEVERZOEK_PATH}?samenwerkingId=$samenwerkingId")
                .apply {
                    if (isOrganisatieDeOntvanger) {
                        queryParam("organisatie", properties.oinNummer)
                    }
                }.build()
                .toUri()

            return this.restClient(properties = properties)
                .get()
                .uri(uri)
                .retrieve()
                .body<ActieverzoekListResponse>()
                ?: throw IllegalStateException("Error fetching Actieverzoeken: response body was null")
        } catch (e: HttpServerErrorException.InternalServerError) {
            throw e
        } catch (e: RestClientResponseException) {
            throw e
        }
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
        private const val SWF_ACTIEVERZOEK_PATH = "/actieverzoeken"
        private val logger = KotlinLogging.logger { }


    }
}
