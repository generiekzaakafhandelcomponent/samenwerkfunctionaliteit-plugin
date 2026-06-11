package com.ritense.valtimoplugins.samenwerkfunctionaliteit.gateway

import com.ritense.valtimoplugins.samenwerkfunctionaliteit.config.SamenwerkfunctionaliteitConfigurationProperties
import org.springframework.stereotype.Component
import org.springframework.web.servlet.function.HandlerFilterFunction
import org.springframework.web.servlet.function.HandlerFunction
import org.springframework.web.servlet.function.ServerRequest
import org.springframework.web.servlet.function.ServerResponse

@Component
class HeaderProcessingFilter(
    private val properties: SamenwerkfunctionaliteitConfigurationProperties,
) : HandlerFilterFunction<ServerResponse, ServerResponse> {
    override fun filter(
        request: ServerRequest,
        next: HandlerFunction<ServerResponse>,
    ): ServerResponse {
        val headersToAdd = properties.customHeaders
        val newRequest =
            ServerRequest
                .from(request)
                .removeHeader(AUTHORIZATION_HEADER_NAME)
                .addHeaders(headersToAdd)
                .build()
        return next.handle(newRequest)
    }

    private fun ServerRequest.Builder.removeHeader(headerName: String) =
        headers {
            it.remove(headerName)
        }

    private fun ServerRequest.Builder.addHeaders(headersToAdd: Map<String, String>) =
        headers {
            headersToAdd.forEach(it::add)
        }

    companion object {
        const val AUTHORIZATION_HEADER_NAME = "Authorization"
    }
}
