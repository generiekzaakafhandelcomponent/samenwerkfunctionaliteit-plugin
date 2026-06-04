package com.ritense.valtimoplugins.samenwerkfunctionaliteit.model

import com.fasterxml.jackson.annotation.JsonProperty

data class Link(
    @JsonProperty("deprecation")
    val deprecation: String? = null,

    @JsonProperty("href")
    val href: String? = null,

    @JsonProperty("hreflang")
    val hreflang: String? = null,

    @JsonProperty("name")
    val name: String? = null,

    @JsonProperty("profile")
    val profile: String? = null,

    @JsonProperty("templated")
    val templated: Boolean? = null,

    @JsonProperty("title")
    val title: String? = null,

    @JsonProperty("type")
    val type: String? = null
)
