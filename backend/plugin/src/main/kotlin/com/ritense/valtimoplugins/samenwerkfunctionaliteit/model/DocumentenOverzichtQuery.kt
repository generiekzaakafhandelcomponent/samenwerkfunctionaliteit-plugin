package com.ritense.valtimoplugins.samenwerkfunctionaliteit.model

data class DocumentenOverzichtQuery(
    val aangemaaktDoor: String? = null,
    val negateAangemaaktDoor: Boolean = false,
    val aangemaaktDoorNaam: String? = null,
    val negateAangemaaktDoorNaam: Boolean = false,
    val sort: String? = null,
    val aantal: Int? = null,
    val pagina: Int? = null,
)
