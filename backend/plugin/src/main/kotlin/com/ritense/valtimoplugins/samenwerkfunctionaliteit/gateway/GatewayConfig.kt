package com.ritense.valtimoplugins.samenwerkfunctionaliteit.gateway

import com.ritense.plugin.service.PluginConfigurationSearchParameters
import com.ritense.plugin.service.PluginService
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty
import org.springframework.cloud.gateway.server.mvc.filter.BeforeFilterFunctions.uri
import org.springframework.cloud.gateway.server.mvc.handler.GatewayRouterFunctions.route
import org.springframework.cloud.gateway.server.mvc.handler.HandlerFunctions.http
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.function.RequestPredicates.path
import org.springframework.web.servlet.function.RouterFunction
import org.springframework.web.servlet.function.ServerResponse
import java.net.URI

@Configuration
class GatewayConfig(
    private val gatewayProperties: GatewayProperties,
    private val permissionFilter: PermissionFilter,
    private val headerProcessingFilter: HeaderProcessingFilter,
    private val pluginService: PluginService,
) {
    @Bean
    @ConditionalOnProperty(
        prefix = "valtimo.samenwerkfunctionaliteit.gateway",
        name = ["enabled"],
        havingValue = "true",
    )
    fun samenwerkfunctionaliteitRoute(): RouterFunction<ServerResponse> =
        route()
            .route(path(gatewayProperties.endpoint), http())
            .before(uri(getApiUrl()))
            .filter(permissionFilter)
            .filter(headerProcessingFilter)
            .build()

    private fun getApiUrl(): URI {
        val urlAsString =
            gatewayProperties.baseUrl ?: getApiUrlFromPluginService()

        if (urlAsString.isNullOrBlank()) {
            throw IllegalStateException("Missing or invalid base API URL configuration for Samenwerkfunctionaliteit")
        }

        return URI.create(urlAsString)
    }

    private fun getApiUrlFromPluginService(): String? =
        pluginService
            .getPluginConfigurations(
                PluginConfigurationSearchParameters(
                    pluginDefinitionKey = SAMENWERKFUNCTIONALITEIT_PLUGIN_KEY,
                ),
            ).firstOrNull()
            ?.properties
            ?.get(SAMENWERKFUNCTIONALITEIT_PLUGIN_BASEURL_PROPERTY_NAME)
            ?.let { node ->
                if (node.isTextual) node.asText() else null
            }

    companion object {
        const val SAMENWERKFUNCTIONALITEIT_PLUGIN_KEY = "samenwerkfunctionaliteit"
        const val SAMENWERKFUNCTIONALITEIT_PLUGIN_BASEURL_PROPERTY_NAME = "baseUrl"
    }
}
