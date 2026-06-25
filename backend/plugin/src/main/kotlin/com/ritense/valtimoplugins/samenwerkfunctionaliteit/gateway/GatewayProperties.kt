package com.ritense.valtimoplugins.samenwerkfunctionaliteit.gateway

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.stereotype.Component

@Component
@ConfigurationProperties(prefix = "valtimo.samenwerkfunctionaliteit.gateway")
class GatewayProperties {
    var customHeaders: Map<String, String> = emptyMap()
    var baseUrl: String? = null
}
