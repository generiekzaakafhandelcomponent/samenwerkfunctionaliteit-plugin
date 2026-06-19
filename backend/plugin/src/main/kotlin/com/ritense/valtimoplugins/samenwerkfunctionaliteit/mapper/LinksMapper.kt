package com.ritense.valtimoplugins.samenwerkfunctionaliteit.mapper

import com.ritense.valtimoplugins.samenwerkfunctionaliteit.model.Links
import com.ritense.valtimoplugins.samenwerkfunctionaliteit.dto.Links as LinksDTO

fun Links.toDTO() = LinksDTO(
    additionalProperties = _additionalProperties.mapValues { (_, link) -> link.toDTO() }
)

fun LinksDTO.toModel() = Links(
    _additionalProperties = additionalProperties.mapValues { (_, link) -> link.toModel() }
)
