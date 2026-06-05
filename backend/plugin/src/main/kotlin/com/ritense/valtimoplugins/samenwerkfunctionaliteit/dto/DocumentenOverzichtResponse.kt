package com.ritense.valtimoplugins.samenwerkfunctionaliteit.dto

import com.fasterxml.jackson.annotation.JsonProperty
import com.ritense.valtimoplugins.samenwerkfunctionaliteit.model.Document
import com.ritense.valtimoplugins.samenwerkfunctionaliteit.model.Links

data class DocumentenOverzichtResponse(
    @JsonProperty("_embedded")
    val embedded: Documenten? = null,
    @JsonProperty("_links")
    val links: Links? = null,
)

data class Documenten(
    val documenten: List<Document>
)
