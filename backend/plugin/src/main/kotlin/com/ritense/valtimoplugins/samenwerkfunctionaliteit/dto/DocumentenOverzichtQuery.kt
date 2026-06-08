package com.ritense.valtimoplugins.samenwerkfunctionaliteit.dto

data class DocumentenOverzichtQuery(
    val aangemaaktDoor: String? = null,
    val negateAangemaaktDoor: String = "false",
    val aangemaaktDoorNaam: String? = null,
    val negateAangemaaktDoorNaam: String = "false",
    val sort: String? = null,
    val aantal: Int? = null,
    val pagina: Int? = null,
)
