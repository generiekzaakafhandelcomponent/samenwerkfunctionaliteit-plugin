package com.ritense.valtimoplugins.samenwerkfunctionaliteit.gateway.specification

import com.ritense.authorization.permission.Permission
import com.ritense.authorization.request.AuthorizationRequest
import com.ritense.authorization.specification.AuthorizationSpecification
import com.ritense.authorization.specification.AuthorizationSpecificationFactory
import com.ritense.valtimo.contract.database.QueryDialectHelper
import com.ritense.valtimoplugins.samenwerkfunctionaliteit.gateway.GatewayProperties

class GatewaySpecificationFactory(
    private val queryDialectHelper: QueryDialectHelper,
) : AuthorizationSpecificationFactory<GatewayProperties> {
    override fun create(
        request: AuthorizationRequest<GatewayProperties>,
        permissionSupplier: () -> List<Permission>,
    ): AuthorizationSpecification<GatewayProperties> =
        GatewaySpecification(
            request,
            permissionSupplier,
            queryDialectHelper,
        )

    override fun canCreate(
        request: AuthorizationRequest<*>,
        permissionSupplier: () -> List<Permission>,
    ): Boolean = GatewayProperties::class.java == request.resourceType
}
