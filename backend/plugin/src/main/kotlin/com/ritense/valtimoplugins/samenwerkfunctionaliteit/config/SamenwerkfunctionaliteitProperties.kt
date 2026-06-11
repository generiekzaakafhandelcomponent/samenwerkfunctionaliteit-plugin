package com.ritense.valtimoplugins.samenwerkfunctionaliteit.config

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.stereotype.Component

@Component
@ConfigurationProperties(prefix = "valtimo.samenwerkfunctionaliteit")
class SamenwerkfunctionaliteitProperties {
    var customHeaders: Map<String, String> = emptyMap()
}
