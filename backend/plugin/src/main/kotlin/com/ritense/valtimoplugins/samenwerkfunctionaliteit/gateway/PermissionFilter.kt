package com.ritense.valtimoplugins.samenwerkfunctionaliteit.gateway

import org.springframework.http.HttpStatus
import org.springframework.stereotype.Component
import org.springframework.web.servlet.function.HandlerFilterFunction
import org.springframework.web.servlet.function.HandlerFunction
import org.springframework.web.servlet.function.ServerRequest
import org.springframework.web.servlet.function.ServerResponse

@Component
class PermissionFilter : HandlerFilterFunction<ServerResponse, ServerResponse> {
    override fun filter(
        request: ServerRequest,
        next: HandlerFunction<ServerResponse>,
    ): ServerResponse {
        val isAllowed = checkPermissions(request)

        return if (isAllowed) {
            next.handle(request)
        } else {
            ServerResponse
                .status(HttpStatus.FORBIDDEN)
                .body("Access Denied: Not allowed to route.")
        }
    }

    // TODO Will be implemented in DGS-601
    private fun checkPermissions(request: ServerRequest): Boolean = true
}
