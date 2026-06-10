package com.ritense.valtimoplugins.samenwerkfunctionaliteit.dto

import com.fasterxml.jackson.annotation.JsonProperty
import com.ritense.valtimoplugins.samenwerkfunctionaliteit.model.Links

data class GetNotificatieResponse(
    @field:JsonProperty("_embedded")
    val embedded: Notificaties? = null,
    @field:JsonProperty("_links")
    val links: Links? = null,
) {
    data class Notificaties(
        val notificaties: List<Notificaties>,
    )
}
