package com.ritense.valtimoplugins.samenwerkfunctionaliteit.controller

import com.fasterxml.jackson.databind.node.ObjectNode
import com.ritense.plugin.service.PluginConfigurationSearchParameters
import com.ritense.plugin.service.PluginService
import io.github.oshai.kotlinlogging.KotlinLogging
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("plugin/samenwerkfunctionaliteit/api/v1/")
class SamenwerkfunctionaliteitPluginController(
    private val pluginService: PluginService,
) {
    @GetMapping("properties")
    fun getSamenwerkfunctionaliteitPluginConfigurationProperties(): ResponseEntity<Map<String, String?>> =
        ResponseEntity.ok(
            mapOf(
                SAMENWERKFUNCTIONALITEIT_PLUGIN_OIN_PROPERTY_NAME to
                    extractPropertyFromSamenwerkfunctionaliteitPluginConfiguration(
                        SAMENWERKFUNCTIONALITEIT_PLUGIN_OIN_PROPERTY_NAME,
                    ),
                SAMENWERKFUNCTIONALITEIT_PLUGIN_BASEURL_PROPERTY_NAME to
                    extractPropertyFromSamenwerkfunctionaliteitPluginConfiguration(
                        SAMENWERKFUNCTIONALITEIT_PLUGIN_BASEURL_PROPERTY_NAME,
                    ),
            ),
        )

    private fun getSamenwerkfunctionaliteitPluginConfiguration(): ObjectNode? =
        pluginService
            .getPluginConfigurations(
                PluginConfigurationSearchParameters(
                    pluginDefinitionKey = SAMENWERKFUNCTIONALITEIT_PLUGIN_KEY,
                ),
            ).firstOrNull()
            ?.properties

    private fun extractPropertyFromSamenwerkfunctionaliteitPluginConfiguration(name: String): String? =
        getSamenwerkfunctionaliteitPluginConfiguration()
            ?.get(name)
            ?.let { node ->
                if (node.isTextual) node.asText() else null
            }

    companion object {
        private val logger = KotlinLogging.logger { }
        const val SAMENWERKFUNCTIONALITEIT_PLUGIN_KEY = "samenwerkfunctionaliteit"
        const val SAMENWERKFUNCTIONALITEIT_PLUGIN_OIN_PROPERTY_NAME = "oinNummer"
        const val SAMENWERKFUNCTIONALITEIT_PLUGIN_BASEURL_PROPERTY_NAME = "baseUrl"
    }
}
