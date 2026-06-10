package com.ritense.valtimoplugins.samenwerkfunctionaliteit.model

import com.fasterxml.jackson.annotation.JsonProperty

data class Links(
    @get:JsonProperty("_additionalProperties")
    val additionalProperties: Map<String, Link> = mutableMapOf(),
)
