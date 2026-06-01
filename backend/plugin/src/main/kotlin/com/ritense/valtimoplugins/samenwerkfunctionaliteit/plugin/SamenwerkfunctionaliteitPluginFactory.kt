package com.ritense.valtimoplugins.samenwerkfunctionaliteit.plugin

import com.ritense.plugin.PluginFactory
import com.ritense.plugin.service.PluginService
import com.ritense.valtimoplugins.samenwerkfunctionaliteit.service.SamenwerkfunctionaliteitService
import org.springframework.stereotype.Component

@Component
class SamenwerkfunctionaliteitPluginFactory(
    pluginService: PluginService,
    private val samenwerkfunctionaliteitService: SamenwerkfunctionaliteitService,
) : PluginFactory<SamenwerkfunctionaliteitPlugin>(pluginService) {
    override fun create() =
        SamenwerkfunctionaliteitPlugin(
            samenwerkfunctionaliteitService,
        )
}