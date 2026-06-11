package com.ritense.valtimoplugins.samenwerkfunctionaliteit.gateway

import org.springframework.beans.factory.annotation.Value
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty
import org.springframework.cloud.gateway.server.mvc.filter.BeforeFilterFunctions.uri
import org.springframework.cloud.gateway.server.mvc.handler.GatewayRouterFunctions.route
import org.springframework.cloud.gateway.server.mvc.handler.HandlerFunctions.http
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.function.RequestPredicates.path
import org.springframework.web.servlet.function.RouterFunction
import org.springframework.web.servlet.function.ServerResponse

@Configuration
class GatewayConfig(
    @param:Value("\${AUTODEPLOYMENT_PLUGINCONFIG_SAMENWERKFUNCTIONALITEIT_BASE_URL}")
    private val apiUrl: String,
    @param:Value("\${AUTODEPLOYMENT_PLUGINCONFIG_SAMENWERKFUNCTIONALITEIT_GATEWAY_ENDPOINT}")
    private val endpoint: String,
    private val permissionFilter: PermissionFilter,
) {
    @Bean
    @ConditionalOnProperty(prefix = "valtimo.samenwerkfunctionaliteit", name = ["enableGateway"], havingValue = "true")
    fun samenwerkfunctionaliteitRoute(): RouterFunction<ServerResponse> =
        route()
            .route(path(endpoint), http())
            .before(uri(apiUrl))
            .filter(permissionFilter)
            .build()
}
