package com.ritense.valtimoplugins.samenwerkfunctionaliteit

import com.ritense.valtimoplugins.samenwerkfunctionaliteit.dto.DocumentenOverzichtQuery
import com.ritense.valtimoplugins.samenwerkfunctionaliteit.model.Document
import com.ritense.valtimoplugins.samenwerkfunctionaliteit.plugin.SamenwerkfunctionaliteitPlugin
import com.ritense.valtimoplugins.samenwerkfunctionaliteit.service.OperatonService
import com.ritense.valtimoplugins.samenwerkfunctionaliteit.service.SamenwerkfunctionaliteitService
import org.junit.jupiter.api.DisplayName
import org.mockito.kotlin.any
import org.mockito.kotlin.eq
import org.mockito.kotlin.mock
import org.mockito.kotlin.verify
import org.mockito.kotlin.whenever
import org.operaton.bpm.engine.delegate.DelegateExecution
import java.net.URI
import java.time.OffsetDateTime
import java.util.UUID
import kotlin.test.Test

class SamenwerkfunctionaliteitPluginTest {
    private val samenwerkfunctionaliteitService = mock<SamenwerkfunctionaliteitService>()
    private val operatonService = mock<OperatonService>()
    private val execution = mock<DelegateExecution>()
    val plugin =
        SamenwerkfunctionaliteitPlugin(
            samenwerkfunctionaliteitService,
            operatonService,
        )

    @Test
    @DisplayName("Should get documenten overzicht and save result to document")
    fun ShouldGetDocumentenoverzichtAndSaveResult() {
        plugin.baseUrl = URI("https://example.com")
        plugin.certificate = "certificate"
        plugin.oinNummer = "oin-123"

        val resultPvName = "documenten"
        val samenwerkingId = "swf-123"
        val query =
            DocumentenOverzichtQuery(
                aangemaaktDoor = "user-id",
                negateAangemaaktDoor = "true",
                aangemaaktDoorNaam = "Jan",
                negateAangemaaktDoorNaam = "false",
                sort = "naam",
                aantal = "10",
                pagina = "1",
            )

        val documents =
            listOf(
                Document(
                    documentId = UUID.fromString("00000000-0000-0000-0000-000000000001"),
                    bestandsNaam = "test.pdf",
                    kenmerkSysteem = null,
                    nummerBinnenSysteem = null,
                    samenwerkingId = samenwerkingId,
                    aangemaaktDoor = "user-id",
                    aangemaaktDoorNaam = "Jan",
                    creatieDatumTijd = OffsetDateTime.parse("2026-01-01T00:00:00Z"),
                    laatstAangepastDoor = null,
                    laatstAangepastDoorNaam = null,
                    laatstAangepastDatumTijd = null,
                    documentOmschrijving = null,
                    vertrouwelijkheidsAanduiding = null,
                    taal = null,
                    formaat = "application/pdf",
                    documentHash = null,
                ),
            )

        whenever(
            samenwerkfunctionaliteitService.getDocumentenOverzicht(
                any(),
                eq(samenwerkingId),
                eq(query),
            ),
        ).thenReturn(documents)

        plugin.getDocumentenOverzicht(
            execution = execution,
            resultPvName = resultPvName,
            samenwerkingId = samenwerkingId,
            aangemaaktDoor = "user-id",
            negateAangemaaktDoor = "true",
            aangemaaktDoorNaam = "Jan",
            negateAangemaaktDoorNaam = "false",
            sort = "naam",
            aantal = "10",
            pagina = "1",
        )

        verify(samenwerkfunctionaliteitService).getDocumentenOverzicht(
            any(),
            eq(samenwerkingId),
            eq(query),
        )

        verify(operatonService).saveToOperaton(
            execution,
            resultPvName,
            documents,
        )
    }

    @Test
    @DisplayName("Should default negate filters to false when not provided")
    fun `ShouldDefaultNegateFiltersToFalse`() {
        plugin.baseUrl = URI("https://example.com")
        plugin.certificate = "certificate"
        plugin.oinNummer = "oin-123"

        val resultPvName = "documenten"
        val samenwerkingId = "swf-123"

        val expectedQuery =
            DocumentenOverzichtQuery(
                aangemaaktDoor = "user-id",
                negateAangemaaktDoor = "false",
                aangemaaktDoorNaam = "Jan",
                negateAangemaaktDoorNaam = "false",
                sort = "naam",
                aantal = "10",
                pagina = "1",
            )

        val documents = emptyList<Document>()

        whenever(
            samenwerkfunctionaliteitService.getDocumentenOverzicht(
                any(),
                eq(samenwerkingId),
                eq(expectedQuery),
            ),
        ).thenReturn(documents)

        plugin.getDocumentenOverzicht(
            execution = execution,
            resultPvName = resultPvName,
            samenwerkingId = samenwerkingId,
            aangemaaktDoor = "user-id",
            negateAangemaaktDoor = null,
            aangemaaktDoorNaam = "Jan",
            negateAangemaaktDoorNaam = null,
            sort = "naam",
            aantal = "10",
            pagina = "1",
        )

        verify(samenwerkfunctionaliteitService).getDocumentenOverzicht(
            any(),
            eq(samenwerkingId),
            eq(expectedQuery),
        )
    }
}
