package com.ritense.valtimoplugins.samenwerkfunctionaliteit.service

import com.fasterxml.jackson.databind.JsonNode
import com.fasterxml.jackson.databind.ObjectMapper
import org.operaton.bpm.engine.delegate.DelegateExecution
import org.springframework.stereotype.Service

@Service
class DefaultOperatonService(
    private val objectMapper: ObjectMapper,
) : OperatonService {
    override fun <T> saveToOperaton(
        execution: DelegateExecution,
        resultPvName: String,
        result: T,
    ) {
        val resultToJson = objectMapper.valueToTree<JsonNode>(result)
        execution.setVariable(resultPvName, resultToJson)
    }
}
