package com.ritense.valtimoplugins.samenwerkfunctionaliteit.resolver

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.registerKotlinModule
import com.ritense.document.domain.impl.JsonDocumentContent
import com.ritense.document.domain.impl.JsonSchemaDocument
import com.ritense.document.domain.impl.JsonSchemaDocumentId
import com.ritense.document.service.impl.JsonSchemaDocumentService
import com.ritense.plugin.domain.PluginConfiguration
import com.ritense.plugin.domain.PluginConfigurationId
import com.ritense.plugin.domain.PluginDefinition
import com.ritense.plugin.service.PluginConfigurationSearchParameters
import com.ritense.plugin.service.PluginService
import com.ritense.processdocument.domain.impl.OperatonProcessInstanceId
import com.ritense.processdocument.service.ProcessDocumentService
import com.ritense.valtimoplugins.samenwerkfunctionaliteit.dto.ActieverzoekResponse
import com.ritense.valtimoplugins.samenwerkfunctionaliteit.dto.SamenwerkingResponse
import com.ritense.valtimoplugins.samenwerkfunctionaliteit.model.SamenwerkfunctionaliteitProperties
import com.ritense.valtimoplugins.samenwerkfunctionaliteit.service.SamenwerkfunctionaliteitService
import com.ritense.valueresolver.ValueResolverPropertyKey.Companion.DOCUMENT_ID
import io.mockk.every
import io.mockk.mockk
import io.mockk.slot
import io.mockk.verify
import javassist.NotFoundException
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import org.operaton.bpm.engine.delegate.VariableScope
import java.net.URI
import java.util.UUID

class SamenwerkfunctionaliteitValueResolverFactoryTest {
    private lateinit var factory: SamenwerkfunctionaliteitValueResolverFactory
    private lateinit var samenwerkfunctionaliteitService: SamenwerkfunctionaliteitService
    private lateinit var processDocumentService: ProcessDocumentService
    private lateinit var pluginService: PluginService
    private lateinit var documentService: JsonSchemaDocumentService
    private lateinit var objectMapper: ObjectMapper

    @BeforeEach
    fun setup() {
        samenwerkfunctionaliteitService = mockk()
        processDocumentService = mockk()
        pluginService = mockk()
        documentService = mockk()
        objectMapper = ObjectMapper().registerKotlinModule()

        factory =
            SamenwerkfunctionaliteitValueResolverFactory(
                samenwerkfunctionaliteitService,
                processDocumentService,
                pluginService,
                documentService,
                objectMapper,
            )
    }

    @Test
    fun `supportedPrefix should return swf`() {
        assertEquals("swf", factory.supportedPrefix())
    }

    @Test
    fun `createResolver(documentId) should return a function that resolves 'samenwerking'`() {
        // Arrange
        val mockumentId = UUID.randomUUID().toString()
        val mockSamenwerkingResponse = mockk<SamenwerkingResponse>()
        val mockJsonSchemaDocument = mockk<JsonSchemaDocument>()
        val mockDocumentContent =
            JsonDocumentContent(
                """
                {
                    "samenwerkingProperties": {
                        "samenwerkingId": "SAM-12345"
                    }
                }
                """.trimIndent(),
            )

        val mockPluginConfiguration =
            PluginConfiguration(
                id = PluginConfigurationId.newId(),
                title = "My super cool mock plugin",
                properties =
                    objectMapper.createObjectNode().apply {
                        put("baseUrl", "http://example.com")
                        put("certificate", "Don't tell anyone. Promise?")
                        put("oinNummer", "123456789")
                    },
                pluginDefinition = mockk<PluginDefinition>(),
            )

        every { samenwerkfunctionaliteitService.getSamenwerking(any(), any()) } returns mockSamenwerkingResponse
        every { documentService.getDocumentBy(JsonSchemaDocumentId.existingId(mockumentId)) } returns
            mockJsonSchemaDocument
        every { mockJsonSchemaDocument.content() } returns mockDocumentContent
        every {
            pluginService
                .getPluginConfigurations(any<PluginConfigurationSearchParameters>())
        } returns
            listOf(mockPluginConfiguration)

        //  Act
        val resolver = factory.createResolver(mockumentId)
        val result = resolver.apply("samenwerking")

        // Assert
        assertEquals(mockSamenwerkingResponse, result)
    }

    @Test
    fun `createResolver(documentId) should return a function that resolves 'actieverzoek'`() {
        // Arrange
        val mockumentId = UUID.randomUUID().toString()
        val mockActieverzoekResponse = mockk<ActieverzoekResponse>()
        val mockJsonSchemaDocument = mockk<JsonSchemaDocument>()
        val mockActieverzoekId = UUID.randomUUID()
        val mockDocumentContent =
            JsonDocumentContent(
                """
                {
                    "samenwerkingProperties": {
                        "actieverzoekDetails": {
                            "actieverzoekId": "$mockActieverzoekId"
                        }
                    }
                }
                """.trimIndent(),
            )

        val mockPluginConfiguration =
            PluginConfiguration(
                id = PluginConfigurationId.newId(),
                title = "My super cool mock plugin",
                properties =
                    objectMapper.createObjectNode().apply {
                        put("baseUrl", "http://example.com")
                        put("certificate", "Don't tell anyone. Promise?")
                        put("oinNummer", "123456789")
                    },
                pluginDefinition = mockk<PluginDefinition>(),
            )

        every { samenwerkfunctionaliteitService.getActieverzoek(any(), any()) } returns mockActieverzoekResponse
        every { documentService.getDocumentBy(JsonSchemaDocumentId.existingId(mockumentId)) } returns
            mockJsonSchemaDocument
        every { mockJsonSchemaDocument.content() } returns mockDocumentContent
        every {
            pluginService
                .getPluginConfigurations(any<PluginConfigurationSearchParameters>())
        } returns
            listOf(mockPluginConfiguration)

        //  Act
        val resolver = factory.createResolver(documentId = mockumentId)
        val result = resolver.apply("actieverzoek")

        // Assert
        assertEquals(mockActieverzoekResponse, result)

        verify { samenwerkfunctionaliteitService.getActieverzoek(any(), mockActieverzoekId) }
    }

    @Test
    fun `the returned function should throw an IllegalArgumentException if the requested value is not found`() {
        // Arrange
        val mockumentId = UUID.randomUUID().toString()
        val resolver = factory.createResolver(mockumentId)

        // Act and assert
        assertThrows<IllegalArgumentException> {
            resolver.apply("meat bals")
        }
    }

    @Test
    fun `createResolver(processInstanceId, variableScope) should lookup Document ID`() {
        //  Arrange
        val mockumentId = JsonSchemaDocumentId.existingId(UUID.randomUUID())
        val mockProcessInstanceId = UUID.randomUUID().toString()
        val mockVariableScope = mockk<VariableScope>()

        every {
            processDocumentService
                .getDocumentId(OperatonProcessInstanceId(mockProcessInstanceId), mockVariableScope)
        } returns mockumentId

        // Act
        factory.createResolver(mockProcessInstanceId, mockVariableScope)

        // Assert
        verify(exactly = 1) {
            processDocumentService.getDocumentId(
                OperatonProcessInstanceId(mockProcessInstanceId),
                mockVariableScope,
            )
        }
    }

    @Test
    fun `createResolver(processInstanceId, variableScope) should call createResolver(documentId)`() {
        //  Arrange
        val mockumentId = JsonSchemaDocumentId.existingId(UUID.randomUUID())
        val mockProcessInstanceId = UUID.randomUUID().toString()
        val mockVariableScope = mockk<VariableScope>()
        val mockJsonSchemaDocument = mockk<JsonSchemaDocument>()
        val mockDocumentContent =
            JsonDocumentContent(
                """
                {
                    "samenwerkingProperties": {
                        "samenwerkingId": "SAM-12345"
                    }
                }
                """.trimIndent(),
            )
        val mockPluginConfiguration =
            PluginConfiguration(
                id = PluginConfigurationId.newId(),
                title = "My super cool mock plugin",
                properties =
                    objectMapper.createObjectNode().apply {
                        put("baseUrl", "http://example.com")
                        put("certificate", "Don't tell anyone. Promise?")
                        put("oinNummer", "123456789")
                    },
                pluginDefinition = mockk<PluginDefinition>(),
            )
        val mockSamenwerkingResponse = mockk<SamenwerkingResponse>()

        every {
            processDocumentService
                .getDocumentId(OperatonProcessInstanceId(mockProcessInstanceId), mockVariableScope)
        } returns mockumentId
        every {
            documentService.getDocumentBy(mockumentId)
        } returns mockJsonSchemaDocument
        every { mockJsonSchemaDocument.content() } returns mockDocumentContent
        every {
            pluginService
                .getPluginConfigurations(any<PluginConfigurationSearchParameters>())
        } returns
            listOf(mockPluginConfiguration)
        every { samenwerkfunctionaliteitService.getSamenwerking(any(), any()) } returns mockSamenwerkingResponse

        // Act
        val resolver =
            factory.createResolver(
                processInstanceId = mockProcessInstanceId,
                variableScope = mockVariableScope,
            )
        resolver.apply("samenwerking")

        // Assert
        verify { documentService.getDocumentBy(mockumentId) }
    }

    @Test
    fun `createResolver(properties) should call createResolver(documentId)`() {
        //  Arrange
        val mockumentId = JsonSchemaDocumentId.existingId(UUID.randomUUID())
        val mockerties = mapOf(DOCUMENT_ID to mockumentId)
        val mockProcessInstanceId = UUID.randomUUID().toString()
        val mockVariableScope = mockk<VariableScope>()
        val mockJsonSchemaDocument = mockk<JsonSchemaDocument>()
        val mockDocumentContent =
            JsonDocumentContent(
                """
                {
                    "samenwerkingProperties": {
                        "samenwerkingId": "SAM-12345"
                    }
                }
                """.trimIndent(),
            )
        val mockPluginConfiguration =
            PluginConfiguration(
                id = PluginConfigurationId.newId(),
                title = "My super cool mock plugin",
                properties =
                    objectMapper.createObjectNode().apply {
                        put("baseUrl", "http://example.com")
                        put("certificate", "Don't tell anyone. Promise?")
                        put("oinNummer", "123456789")
                    },
                pluginDefinition = mockk<PluginDefinition>(),
            )
        val mockSamenwerkingResponse = mockk<SamenwerkingResponse>()

        every {
            processDocumentService
                .getDocumentId(OperatonProcessInstanceId(mockProcessInstanceId), mockVariableScope)
        } returns mockumentId
        every {
            documentService.getDocumentBy(mockumentId)
        } returns mockJsonSchemaDocument
        every { mockJsonSchemaDocument.content() } returns mockDocumentContent
        every {
            pluginService
                .getPluginConfigurations(any<PluginConfigurationSearchParameters>())
        } returns
            listOf(mockPluginConfiguration)
        every { samenwerkfunctionaliteitService.getSamenwerking(any(), any()) } returns mockSamenwerkingResponse

        // Act
        val resolver = factory.createResolver(properties = mockerties)
        resolver.apply("samenwerking")

        // Assert
        verify { documentService.getDocumentBy(mockumentId) }
    }

    @Test
    fun `handleValues should throw NotImplementedError`() {
        // Arrange

        val mockProcessInstanceId = UUID.randomUUID().toString()
        val mockVariableScope = mockk<VariableScope>()
        val mockValues = mapOf<String, Any?>("six seven" to "skibidy toilet")

        // Act and assert
        assertThrows<NotImplementedError> {
            factory.handleValues(
                processInstanceId = mockProcessInstanceId,
                variableScope = mockVariableScope,
                values = mockValues,
            )
        }
    }

    @Test
    fun `getValueFromJsonDocument should return an empty string if no value is found`() {
//  Arrange
        val mockumentId = JsonSchemaDocumentId.existingId(UUID.randomUUID())
        val mockerties = mapOf(DOCUMENT_ID to mockumentId)
        val mockProcessInstanceId = UUID.randomUUID().toString()
        val mockVariableScope = mockk<VariableScope>()
        val mockJsonSchemaDocument = mockk<JsonSchemaDocument>()
        val mockDocumentContent =
            JsonDocumentContent(
                """
                {
                    "samenwerkingProperties": {
                        "no Samenwerking ID here!": ""
                    }
                }
                """.trimIndent(),
            )
        val mockPluginConfiguration =
            PluginConfiguration(
                id = PluginConfigurationId.newId(),
                title = "My super cool mock plugin",
                properties =
                    objectMapper.createObjectNode().apply {
                        put("baseUrl", "http://example.com")
                        put("certificate", "Don't tell anyone. Promise?")
                        put("oinNummer", "123456789")
                    },
                pluginDefinition = mockk<PluginDefinition>(),
            )
        val mockSamenwerkingResponse = mockk<SamenwerkingResponse>()

        every {
            processDocumentService
                .getDocumentId(OperatonProcessInstanceId(mockProcessInstanceId), mockVariableScope)
        } returns mockumentId
        every {
            documentService.getDocumentBy(mockumentId)
        } returns mockJsonSchemaDocument
        every { mockJsonSchemaDocument.content() } returns mockDocumentContent
        every {
            pluginService
                .getPluginConfigurations(any<PluginConfigurationSearchParameters>())
        } returns
            listOf(mockPluginConfiguration)
        every { samenwerkfunctionaliteitService.getSamenwerking(any(), any()) } returns mockSamenwerkingResponse

        // Act
        val resolver = factory.createResolver(properties = mockerties)
        resolver.apply("samenwerking")

        // Assert
        verify(exactly = 0) {
            samenwerkfunctionaliteitService.getSamenwerking(any(), any())
        }
    }

    @Test
    fun `getProperties() should correctly map plugin properties to SamenwerkfunctionaliteitProperties`() {
        // Arrange
        val mockumentId = JsonSchemaDocumentId.existingId(UUID.randomUUID())
        val mockSamenwerkingResponse = mockk<SamenwerkingResponse>()
        val mockJsonSchemaDocument = mockk<JsonSchemaDocument>()
        val mockDocumentContent =
            JsonDocumentContent(
                """
                {
                    "samenwerkingProperties": {
                        "samenwerkingId": "SAM-12345"
                    }
                }
                """.trimIndent(),
            )
        val pluginConfiguration =
            PluginConfiguration(
                id = PluginConfigurationId.newId(),
                title = "Test configuration",
                properties =
                    objectMapper.createObjectNode().apply {
                        put("baseUrl", "http://example.com")
                        put("certificate", "Don't tell anyone. Promise?")
                        put("oinNummer", "123456789")
                    },
                pluginDefinition = mockk<PluginDefinition>(),
            )
        val propertiesSlot = slot<SamenwerkfunctionaliteitProperties>()

        every {
            pluginService.getPluginConfigurations(
                any<PluginConfigurationSearchParameters>(),
            )
        } returns listOf(pluginConfiguration)
        every {
            documentService.getDocumentBy(mockumentId)
        } returns mockJsonSchemaDocument
        every { mockJsonSchemaDocument.content() } returns mockDocumentContent
        every {
            samenwerkfunctionaliteitService.getSamenwerking(
                any(),
                capture(propertiesSlot),
            )
        } returns mockSamenwerkingResponse

        // Act
        val resolver = factory.createResolver(documentId = mockumentId.toString())
        resolver.apply("samenwerking")

        // Assert
        assertEquals(URI.create("http://example.com"), propertiesSlot.captured.baseUrl)
        assertEquals("Don't tell anyone. Promise?", propertiesSlot.captured.certificate)
        assertEquals("123456789", propertiesSlot.captured.oinNummer)
    }

    @Test
    fun `getProperties() should throw a NotFoundException if no plugin configuration is found`() {
        // Arrange
        val mockumentId = JsonSchemaDocumentId.existingId(UUID.randomUUID())
        val mockJsonSchemaDocument = mockk<JsonSchemaDocument>()
        val mockDocumentContent =
            JsonDocumentContent(
                """
                {
                    "samenwerkingProperties": {
                        "samenwerkingId": "SAM-12345"
                    }
                }
                """.trimIndent(),
            )

        every {
            pluginService.getPluginConfigurations(
                any<PluginConfigurationSearchParameters>(),
            )
        } returns listOf()
        every {
            documentService.getDocumentBy(mockumentId)
        } returns mockJsonSchemaDocument
        every { mockJsonSchemaDocument.content() } returns mockDocumentContent

        // Act
        val resolver = factory.createResolver(documentId = mockumentId.toString())

        // Assert
        assertThrows<NotFoundException> {
            resolver.apply("samenwerking")
        }
    }
}
