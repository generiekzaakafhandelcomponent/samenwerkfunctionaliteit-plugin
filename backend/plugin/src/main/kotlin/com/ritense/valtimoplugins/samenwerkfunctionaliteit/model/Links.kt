package com.ritense.valtimoplugins.samenwerkfunctionaliteit.model

import com.fasterxml.jackson.annotation.JsonAnyGetter
import com.fasterxml.jackson.annotation.JsonAnySetter

data class Links(
    private val _additionalProperties: MutableMap<String, Link> = mutableMapOf()
) {
    @JsonAnyGetter
    fun additionalProperties(): Map<String, Link> = _additionalProperties

    @JsonAnySetter
    fun setAdditionalProperty(name: String, value: Link) {
        _additionalProperties[name] = value
    }
}
