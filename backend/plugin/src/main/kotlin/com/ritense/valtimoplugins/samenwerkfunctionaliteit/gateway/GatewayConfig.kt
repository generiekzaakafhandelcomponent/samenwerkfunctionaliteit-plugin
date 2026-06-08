package com.ritense.valtimoplugins.samenwerkfunctionaliteit.gateway

import org.springframework.cloud.gateway.route.RouteLocator
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.core.env.Environment

@Configuration
class GatewayConfig(
    private val env: Environment,
    private val authorizationFilter: AuthorizationFilter,
) {
    @Bean
    fun samenwerkfunctionaliteitRoutes(builder: RouteLocatorBuilder): RouteLocator {
        val apiUrl = env.getProperty("AUTODEPLOYMENT_PLUGINCONFIG_SAMENWERKFUNCTIONALITEIT_BASE_URL")
        return builder
            .routes()
            .route(
                "samenwerkfunctionaliteit",
            ) { route ->
                route
                    .path("/samenwerkfunctionaliteit/v5/**")
                    .filters { it.filter(authorizationFilter) }
                    .uri(apiUrl)
            }.build()
    }
}
