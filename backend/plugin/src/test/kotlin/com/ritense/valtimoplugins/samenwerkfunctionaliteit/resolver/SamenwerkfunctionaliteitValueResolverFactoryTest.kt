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
import com.ritense.processdocument.service.ProcessDocumentService
import com.ritense.valtimoplugins.samenwerkfunctionaliteit.config.PLUGIN_KEY
import com.ritense.valtimoplugins.samenwerkfunctionaliteit.dto.SamenwerkingResponse
import com.ritense.valtimoplugins.samenwerkfunctionaliteit.service.SamenwerkfunctionaliteitService
import io.mockk.every
import io.mockk.mockk
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import java.util.UUID
import kotlin.test.assertSame

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
        val documentId = UUID.randomUUID().toString()
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
        every { documentService.getDocumentBy(JsonSchemaDocumentId.existingId(documentId)) } returns
            mockJsonSchemaDocument
        every { mockJsonSchemaDocument.content() } returns mockDocumentContent
        every {
            pluginService
                .getPluginConfigurations(any<PluginConfigurationSearchParameters>())
        } returns
            listOf(mockPluginConfiguration)

        //  Act
        val resolver = factory.createResolver(documentId)
        val result = resolver.apply("samenwerking")

        // Assert
        assertEquals(mockSamenwerkingResponse.toString(), result)
    }

    @Test
    fun `the returned function should throw an exception if the requested value is not found`() {
//        Arrange

//        Act

//        Assert
    }

    @Test
    fun `createResolver(processInstanceId, variableScope) should call createResolver(documentId)`() {
//        Arrange

//        Act

//        Assert
    }

    @Test
    fun `createResolver(properties) should call createResolver(documentId)`() {
//        Arrange

//        Act

//        Assert
    }

    @Test
    fun `handleValues should should throw NotImplementedError`() {
//        Arrange

//        Act

//        Assert
    }

    @Test
    fun `getValueFromJsonDocument should return values from a JsonSchemaDocument`() {
//        Arrange

//        Act

//        Assert
    }

    @Test
    fun `getValueFromJsonDocument should return an empty string if no value is found`() {
//        Arrange

//        Act

//        Assert
    }

    @Test
    fun `getProperties() should correctly map plugin properties to SamenwerkfunctionaliteitProperties`() {
//        Arrange
//        Make the service always return a bunch of plugin configurations here (one of which is with key 'samenwerkfunctionaliteit')

//        Act

//        Assert
    }

    @Test
    fun `getProperties() should throw a NotFoundException if no plugin configuration is found`() {
//        Arrange

//        Act

//        Assert
    }
}
