package com.ritense.valtimoplugins.samenwerkfunctionaliteit.gateway

import org.springframework.cloud.gateway.filter.GatewayFilter
import org.springframework.cloud.gateway.filter.GatewayFilterChain
import org.springframework.http.HttpStatus
import org.springframework.http.server.reactive.ServerHttpRequest
import org.springframework.stereotype.Component
import org.springframework.web.server.ServerWebExchange
import reactor.core.publisher.Mono

@Component
class AuthorizationFilter : GatewayFilter {
    override fun filter(
        exchange: ServerWebExchange,
        chain: GatewayFilterChain,
    ): Mono<Void?>? {
        val request = exchange.request

        val allowed = checkAuthorization(request)

        return if (!allowed) {
            exchange.response.statusCode = HttpStatus.FORBIDDEN
            exchange.response.setComplete()
        } else {
            chain.filter(exchange)
        }
    }

    private fun checkAuthorization(request: ServerHttpRequest): Boolean = true
}
