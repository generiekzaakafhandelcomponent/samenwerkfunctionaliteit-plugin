package com.ritense.valtimoplugins.samenwerkfunctionaliteit.model

import com.fasterxml.jackson.annotation.JsonAnyGetter

data class Links(
    private val _additionalProperties: Map<String, Link> = mutableMapOf()
)
