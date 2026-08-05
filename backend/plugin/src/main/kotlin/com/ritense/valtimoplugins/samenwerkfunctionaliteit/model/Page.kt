package com.ritense.valtimoplugins.samenwerkfunctionaliteit.model

data class Page<T>(
    val item: T,
    val number: Int,
    val size: Int,
    val totalElements: Int,
    val totalPages: Int,
)
