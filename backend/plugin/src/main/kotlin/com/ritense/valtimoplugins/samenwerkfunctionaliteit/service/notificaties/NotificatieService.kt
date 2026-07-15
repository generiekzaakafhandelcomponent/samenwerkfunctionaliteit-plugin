package com.ritense.valtimoplugins.samenwerkfunctionaliteit.service.notificaties

import com.ritense.valtimoplugins.samenwerkfunctionaliteit.model.Notificatie
import java.util.UUID

interface NotificatieService {
    fun getNotificaties(): List<Notificatie>

    fun getNotificatie(notificatieId: UUID): Notificatie

    fun deleteNotificatie(notificatieId: UUID)

    fun getNotificatieBySamenwerking(samenwerkingsId: UUID): Notificatie
}
