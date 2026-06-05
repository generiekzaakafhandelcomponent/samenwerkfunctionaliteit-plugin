package com.ritense.valtimoplugins.samenwerkfunctionaliteit.dto

import com.fasterxml.jackson.annotation.JsonProperty
import com.ritense.valtimoplugins.samenwerkfunctionaliteit.model.Actieverzoek
import com.ritense.valtimoplugins.samenwerkfunctionaliteit.model.Links

data class ActieverzoekListResponse(
    @JsonProperty("_embedded")
    val embedded: Actieverzoeken? = null,
    @JsonProperty("_links")
    val links: Links? = null,
)

data class Actieverzoeken(
    val actieverzoeken: List<Actieverzoek>
)
