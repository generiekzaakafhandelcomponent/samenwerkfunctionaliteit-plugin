package com.ritense.valtimoplugins.samenwerkfunctionaliteit.controller

import com.ritense.valtimoplugins.samenwerkfunctionaliteit.service.SamenwerkfunctionaliteitService
import io.github.oshai.kotlinlogging.KotlinLogging
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/v1/samenwerkfunctionaliteit")
class SamenwerkfunctionaliteitController(
    private val samenwerkfunctionaliteitService: SamenwerkfunctionaliteitService,
) {
    fun getActieverzoek() {}

    fun getAllActieverzoeken() {}

    fun getBericht() {}

    fun postBericht() {}

    fun deleteBericht() {}

    fun getDocumentenOverzicht() {}

    fun downloadDocument() {}

    fun uploadDocument() {}

    fun getSamenwerkFunctionaliteit() {}

    companion object {
        private val logger = KotlinLogging.logger { }
    }
}
