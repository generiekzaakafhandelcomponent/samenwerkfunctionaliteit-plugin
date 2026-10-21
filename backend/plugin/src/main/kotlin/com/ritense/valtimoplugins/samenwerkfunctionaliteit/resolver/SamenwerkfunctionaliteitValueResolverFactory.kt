package com.ritense.valtimoplugins.samenwerkfunctionaliteit.resolver

import com.ritense.document.domain.Document
import com.ritense.document.domain.impl.JsonSchemaDocumentId
import com.ritense.document.service.impl.JsonSchemaDocumentService
import com.ritense.plugin.annotation.PluginProperty
import com.ritense.processdocument.domain.impl.OperatonProcessInstanceId
import com.ritense.processdocument.service.ProcessDocumentService
import com.ritense.valtimoplugins.samenwerkfunctionaliteit.controller.SamenwerkfunctionaliteitPluginController
import com.ritense.valtimoplugins.samenwerkfunctionaliteit.model.SamenwerkfunctionaliteitProperties
import com.ritense.valtimoplugins.samenwerkfunctionaliteit.service.SamenwerkfunctionaliteitService
import com.ritense.valueresolver.ValueResolverFactory
import com.ritense.valueresolver.ValueResolverPropertyKey.Companion.DOCUMENT_ID
import com.ritense.valueresolver.ValueResolverPropertyKey.Companion.PROCESS_INSTANCE_ID
import com.ritense.valueresolver.ValueResolverPropertyKey.Companion.VARIABLE_SCOPE
import io.github.oshai.kotlinlogging.KotlinLogging
import org.operaton.bpm.engine.delegate.VariableScope
import java.net.URI
import java.util.UUID
import java.util.function.Function

class SamenwerkfunctionaliteitValueResolverFactory(
    private val samenwerkfunctionaliteitService: SamenwerkfunctionaliteitService,
    private val processDocumentService: ProcessDocumentService,
    private val samenwerkfunctionaliteitPluginController: SamenwerkfunctionaliteitPluginController,
    private val documentService: JsonSchemaDocumentService,
) : ValueResolverFactory {
    override fun supportedPrefix(): String = SWF_VALUE_RESOLVER_PREFIX

    override fun createResolver(documentId: String): Function<String, Any?> {
        logger.info { "createResolver(documentId: String) called with the following documentId: $documentId" }
        println("createResolver(documentId: String) called with the following documentId: $documentId")
        return Function { requestedValue: String ->
            when (requestedValue) {
                "actieverzoek" -> getActieverzoek(documentId)

                "samenwerking" -> getSamenwerking(documentId)

                else -> throw IllegalArgumentException(
                    "Unknown requested value in Samenwerkingfunctionaliteit with name: $requestedValue",
                )
            }
        }
    }

    override fun createResolver(
        processInstanceId: String,
        variableScope: VariableScope,
    ): Function<String, Any?> {
        logger.info {
            "createResolver(processInstanceId: String, variableScope: VariableScope) called with the following processInstanceId: $processInstanceId"
        }
        println(
            "createResolver(processInstanceId: String, variableScope: VariableScope) called with the following processInstanceId: $processInstanceId",
        )

        val documentId =
            processDocumentService
                .getDocumentId(
                    OperatonProcessInstanceId(processInstanceId),
                    variableScope,
                ).toString()

        return createResolver(documentId)
    }

    //  This override is called by Formio value resolver references
    override fun createResolver(properties: Map<String, Any>): Function<String, Any?> {
        logger.info { "createResolver(properties: Map<String, Any>) called with the following properties: $properties" }
        println("createResolver(properties: Map<String, Any>) called with the following properties: $properties")

        val documentId = properties[DOCUMENT_ID]?.toString()
        if (documentId != null) {
            return createResolver(documentId)
        }

        val processInstanceId = properties[PROCESS_INSTANCE_ID] as String?
        val variableScope = properties[VARIABLE_SCOPE] as VariableScope?
        if (processInstanceId != null && variableScope != null) {
            return createResolver(processInstanceId, variableScope)
        }

        throw NotImplementedError()
    }

    override fun createResolver(documentId: String): Function<String, Any?> {
        logger.info { "createResolver(documentId: String) called with the following documentId: $documentId" }
        return Function { requestedValue: String ->
            when (requestedValue) {
                "actieverzoek" -> getActieverzoek(documentId)

                "samenwerking" -> getSamenwerking(documentId)

                else -> throw IllegalArgumentException(
                    "Unknown requested value in Samenwerkingfunctionaliteit with name: $requestedValue",
                )
            }
        }
    }

    private fun getActieverzoek(documentId: String) {
//      TODO: Fetch actual actieverzoekId from document
        documentService.getDocumentBy(JsonSchemaDocumentId.existingId(documentId))

        val actieverzoekId = UUID.randomUUID()

        samenwerkfunctionaliteitService.getActieverzoek(
            properties,
            actieverzoekId,
        )
    }

    private fun getSamenwerking(documentId: String) {
//      TODO: Fetch the samenwerkingId from document
        documentService.getDocumentBy(JsonSchemaDocumentId.existingId(documentId))

        val samenwerkingId = "This is not an actual samenwerkingId"

        samenwerkfunctionaliteitService.getSamenwerking(samenwerkingId, properties)
    }

//    @PluginProperty(key = "baseUrl", secret = false, required = true)
//    lateinit var baseUrl: URI
//
//    @PluginProperty(key = "certificate", secret = true, required = true)
//    lateinit var certificate: String
//
//    @PluginProperty(key = "oinNummer", secret = false, required = true)
//    lateinit var oinNummer: String

    val properties =
        SamenwerkfunctionaliteitProperties(
            baseUrl = URI("myUrl"),
            certificate = "myCert",
            oinNummer = "myOin",
        )

    companion object {
        private val logger = KotlinLogging.logger { }
        private const val SWF_VALUE_RESOLVER_PREFIX = "swf"
    }
}
