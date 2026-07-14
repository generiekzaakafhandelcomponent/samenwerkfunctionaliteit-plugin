package com.ritense.valtimoplugins.samenwerkfunctionaliteit.gateway.specification

import com.ritense.authorization.permission.Permission
import com.ritense.authorization.request.AuthorizationRequest
import com.ritense.authorization.specification.AuthorizationSpecification
import com.ritense.valtimo.contract.database.QueryDialectHelper
import com.ritense.valtimoplugins.samenwerkfunctionaliteit.gateway.GatewayProperties
import jakarta.persistence.criteria.AbstractQuery
import jakarta.persistence.criteria.CriteriaBuilder
import jakarta.persistence.criteria.Predicate
import jakarta.persistence.criteria.Root

class GatewaySpecification(
    authRequest: AuthorizationRequest<GatewayProperties>,
    permissionSupplier: () -> List<Permission>,
    private val queryDialectHelper: QueryDialectHelper,
) : AuthorizationSpecification<GatewayProperties>(
        authRequest,
        permissionSupplier,
    ) {
    override fun toPredicate(
        root: Root<GatewayProperties>,
        query: AbstractQuery<*>,
        criteriaBuilder: CriteriaBuilder,
    ): Predicate {
        val predicates =
            permissionSupplier()
                .filter { permission ->
                    GatewayProperties::class.java == permission.resourceType &&
                        permission.actions.contains(
                            authRequest.action,
                        )
                }.map { permission: Permission ->
                    permission.toPredicate(
                        root,
                        query,
                        criteriaBuilder,
                        authRequest,
                        queryDialectHelper,
                    )
                }

        return combinePredicates(criteriaBuilder, predicates)
    }

    override fun identifierToEntity(identifier: String): GatewayProperties = throw NotImplementedError()
}
