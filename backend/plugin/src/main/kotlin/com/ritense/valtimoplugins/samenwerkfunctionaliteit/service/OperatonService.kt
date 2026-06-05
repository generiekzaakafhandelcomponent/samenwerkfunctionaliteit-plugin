package com.ritense.valtimoplugins.samenwerkfunctionaliteit.service

import org.operaton.bpm.engine.delegate.DelegateExecution

interface OperatonService {
    fun <T> saveToOperaton(execution: DelegateExecution, resultPvName: String, result: T)
}
