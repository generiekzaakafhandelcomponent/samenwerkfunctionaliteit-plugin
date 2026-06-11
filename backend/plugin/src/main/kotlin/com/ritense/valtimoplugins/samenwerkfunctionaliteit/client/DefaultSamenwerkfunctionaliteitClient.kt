package com.ritense.valtimoplugins.samenwerkfunctionaliteit.client

import com.ritense.valtimoplugins.samenwerkfunctionaliteit.dto.ActieverzoekResponse
import com.ritense.valtimoplugins.samenwerkfunctionaliteit.dto.BerichtResponse
import com.ritense.valtimoplugins.samenwerkfunctionaliteit.dto.CreateBerichtRequest
import com.ritense.valtimoplugins.samenwerkfunctionaliteit.dto.DocumentenOverzichtQuery
import com.ritense.valtimoplugins.samenwerkfunctionaliteit.dto.DocumentenOverzichtResponse
import com.ritense.valtimoplugins.samenwerkfunctionaliteit.dto.NotificatieResponse
import com.ritense.valtimoplugins.samenwerkfunctionaliteit.model.SamenwerkfunctionaliteitProperties
import io.github.oshai.kotlinlogging.KotlinLogging
import org.springframework.core.io.InputStreamResource
import org.springframework.stereotype.Component
import org.springframework.web.client.RestClient
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
        query: DocumentenOverzichtQuery,
    ): DocumentenOverzichtResponse =
        restClient(properties)
            .get()
            .uri { uriBuilder ->
                uriBuilder
                    .path("/samenwerkingen/{samenwerkingId}/documenten")
                    .apply {
                        queryParamWithNegation(
                            DocumentenOverzichtQueryParam.AANGEMAAKT_DOOR,
                            query.aangemaaktDoor,
                            query.negateAangemaaktDoor,
                        )
                        queryParamWithNegation(
                            DocumentenOverzichtQueryParam.AANGEMAAKT_DOOR_NAAM,
                            query.aangemaaktDoorNaam,
                            query.negateAangemaaktDoorNaam,
                        )
                        queryParamIfNotNull(DocumentenOverzichtQueryParam.SORT, query.sort)
                        queryParamIfNotNull(DocumentenOverzichtQueryParam.AANTAL, query.aantal)
                        queryParamIfNotNull(DocumentenOverzichtQueryParam.PAGINA, query.pagina)
                    }.build(samenwerkingId)
            }.retrieve()
            .body(DocumentenOverzichtResponse::class.java)
            ?: error("No list of Documents received.")

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

    private fun UriBuilder.queryParamIfNotNull(
        name: DocumentenOverzichtQueryParam,
        value: Any?,
    ) = apply {
        value?.let { queryParam(name.paramName, it) }
    }

    private fun UriBuilder.queryParamWithNegation(
        name: DocumentenOverzichtQueryParam,
        value: String?,
        negate: String?,
    ) = apply {
        value
            ?.takeIf { it.isNotBlank() }
            ?.let { queryParam(if (negate.toBoolean()) name.negated() else name.paramName, it) }
    }

    private enum class DocumentenOverzichtQueryParam(
        val paramName: String,
    ) {
        AANGEMAAKT_DOOR("aangemaaktDoor"),
        AANGEMAAKT_DOOR_NAAM("aangemaaktDoorNaam"),
        SORT("_sort"),
        AANTAL("aantal"),
        PAGINA("pagina"),
        ;

        fun negated(): String = "$paramName[not]"
    }

    companion object {
        private val logger = KotlinLogging.logger { }
    }
}
