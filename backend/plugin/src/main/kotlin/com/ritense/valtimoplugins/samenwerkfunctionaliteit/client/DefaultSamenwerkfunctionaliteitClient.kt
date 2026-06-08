package com.ritense.valtimoplugins.samenwerkfunctionaliteit.client

import com.ritense.valtimoplugins.samenwerkfunctionaliteit.dto.GetActieverzoekenResponse
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
import org.springframework.web.util.UriBuilder
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
            return restClient(properties = properties)
                .get()
                .uri("${SWF_ACTIEVERZOEK_PATH}/${actieverzoekId}")
                .retrieve()
                .body<ActieverzoekResponse>()
                ?: throw IllegalStateException("Error fetching Actieverzoek: response body was null")
        } catch (e: HttpServerErrorException.InternalServerError) {
            throw e
        } catch (e: RestClientResponseException) {
            throw e
        }
    }

    override fun getAllActieverzoeken(
        properties: SamenwerkfunctionaliteitProperties,
        samenwerkingId: String,
        organisatie: String?
    ): GetActieverzoekenResponse {
        try {
            return restClient(properties = properties)
                .get()
                .uri { uriBuilder ->
                    uriBuilder
                        .path(SWF_ACTIEVERZOEK_PATH)
                        .queryParam(SAMENWERKING_ID, samenwerkingId)
                        .queryParamNotNull(name = ORGANISATIE, query = organisatie)
                        .build()
                }
                .retrieve()
                .body<GetActieverzoekenResponse>()
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

    fun <T> UriBuilder.queryParamNotNull(name: String, query: T?) = apply {
        if (query != null) {
            queryParam(name, query)
        }
    }

    companion object {
        private const val SWF_ACTIEVERZOEK_PATH = "/actieverzoeken"
        private const val SAMENWERKING_ID = "samenwerkingId"
        private const val ORGANISATIE = "organisatie"
        private val logger = KotlinLogging.logger { }


    }
}
