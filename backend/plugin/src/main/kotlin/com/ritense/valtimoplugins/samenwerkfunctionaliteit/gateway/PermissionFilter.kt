package com.ritense.valtimoplugins.samenwerkfunctionaliteit.gateway

import com.ritense.authorization.Action
import com.ritense.authorization.AuthorizationService
import com.ritense.authorization.request.EntityAuthorizationRequest
import org.springframework.http.HttpMethod
import org.springframework.stereotype.Component
import org.springframework.web.servlet.function.HandlerFilterFunction
import org.springframework.web.servlet.function.HandlerFunction
import org.springframework.web.servlet.function.ServerRequest
import org.springframework.web.servlet.function.ServerResponse

@Component
class PermissionFilter(
    private val authorizationService: AuthorizationService,
) : HandlerFilterFunction<ServerResponse, ServerResponse> {
    override fun filter(
        request: ServerRequest,
        next: HandlerFunction<ServerResponse>,
    ): ServerResponse {
        requireGatewayPermission(request.method())

        return next.handle(request)
    }

    private fun requireGatewayPermission(httpMethod: HttpMethod) =
        authorizationService.requirePermission(
            EntityAuthorizationRequest(
                GatewayProperties::class.java,
                Action(getActionKeyFrom(httpMethod)),
                null,
            ),
        )

    private fun getActionKeyFrom(httpMethod: HttpMethod) =
        when (httpMethod) {
            HttpMethod.GET -> Action.VIEW
            HttpMethod.HEAD -> Action.VIEW
            HttpMethod.POST -> Action.CREATE
            HttpMethod.PUT -> Action.MODIFY
            HttpMethod.PATCH -> Action.MODIFY
            HttpMethod.DELETE -> Action.DELETE
            HttpMethod.OPTIONS -> Action.VIEW
            HttpMethod.TRACE -> Action.DENY
            else -> Action.DENY
        }
}
