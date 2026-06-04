package com.ritense.valtimoplugins.samenwerkfunctionaliteit.service.notificaties

import com.ritense.valtimoplugins.samenwerkfunctionaliteit.model.Notificatie
import java.util.UUID

class NotificatieServiceImpl : NotificatieService {
    override fun getNotificaties(): List<Notificatie> = TODO("Provide the return value")

    override fun getNotificatie(notificatieId: UUID): Notificatie = TODO("Provide the return value")

    override fun deleteNotificatie(notificatieId: UUID) {
    }

    override fun getNotificatieBySamenwerking(samenwerkingsId: UUID): Notificatie = TODO("Provide the return value")
}
