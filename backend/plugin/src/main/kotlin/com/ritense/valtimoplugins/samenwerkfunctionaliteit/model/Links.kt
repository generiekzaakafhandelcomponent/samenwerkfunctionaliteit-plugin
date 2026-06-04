package com.ritense.valtimoplugins.samenwerkfunctionaliteit.model

import com.fasterxml.jackson.annotation.JsonAnyGetter
import com.fasterxml.jackson.annotation.JsonAnySetter

/**
 * Represents an object whose properties are dynamic and map to Link objects.
 * Serialized/deserialized as a JSON object with arbitrary named properties.
 */
data class Links(
    // keep a map of additionalProperties => Link
    private val _additionalProperties: MutableMap<String, Link> = mutableMapOf()
) {
    @JsonAnyGetter
    fun additionalProperties(): Map<String, Link> = _additionalProperties

    @JsonAnySetter
    fun setAdditionalProperty(name: String, value: Link) {
        _additionalProperties[name] = value
    }
}
