package com.ritense.valtimoplugins.samenwerkfunctionaliteit.model

import java.net.URI

data class SamenwerkfunctionaliteitProperties(
    val baseUrl: URI,
    val certificate: String,
    val oinNummer: String,
)
