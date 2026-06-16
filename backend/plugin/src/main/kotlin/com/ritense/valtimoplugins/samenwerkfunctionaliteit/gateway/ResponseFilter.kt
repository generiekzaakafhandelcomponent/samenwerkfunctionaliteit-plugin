package com.ritense.valtimoplugins.samenwerkfunctionaliteit.gateway

import org.springframework.http.HttpHeaders
import org.springframework.stereotype.Component
import org.springframework.web.servlet.function.HandlerFilterFunction
import org.springframework.web.servlet.function.HandlerFunction
import org.springframework.web.servlet.function.ServerRequest
import org.springframework.web.servlet.function.ServerResponse

@Component
class ResponseFilter : HandlerFilterFunction<ServerResponse, ServerResponse> {
    override fun filter(
        request: ServerRequest,
        next: HandlerFunction<ServerResponse?>,
    ): ServerResponse {
        val response = next.handle(request)

        return ServerResponse
            .from(response)
            .headers { it.remove(HttpHeaders.ACCESS_CONTROL_ALLOW_ORIGIN) }
            .build()
    }
}
