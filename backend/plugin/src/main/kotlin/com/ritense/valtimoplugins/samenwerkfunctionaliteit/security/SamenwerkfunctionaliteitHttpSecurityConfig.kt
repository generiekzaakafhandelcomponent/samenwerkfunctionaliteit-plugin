package com.ritense.valtimoplugins.samenwerkfunctionaliteit.security

import com.ritense.valtimo.contract.authentication.AuthoritiesConstants.ADMIN
import com.ritense.valtimo.contract.authentication.AuthoritiesConstants.USER
import com.ritense.valtimo.contract.security.config.HttpConfigurerConfigurationException
import com.ritense.valtimo.contract.security.config.HttpSecurityConfigurer
import com.ritense.valtimoplugins.samenwerkfunctionaliteit.gateway.GatewayProperties
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty
import org.springframework.core.annotation.Order
import org.springframework.http.HttpMethod
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.stereotype.Component

@Order(1)
@Component
@ConditionalOnProperty(prefix = "valtimo.samenwerkfunctionaliteit.gateway", name = ["enabled"], havingValue = "true")
class SamenwerkfunctionaliteitHttpSecurityConfig(
    var gatewayProperties: GatewayProperties,
) : HttpSecurityConfigurer {
    override fun configure(http: HttpSecurity) {
        try {
            http.authorizeHttpRequests { requests ->
                requests
                    .requestMatchers(HttpMethod.GET, gatewayProperties.endpoint)
                    .hasAnyAuthority(ADMIN, USER)
            }
        } catch (e: Exception) {
            throw HttpConfigurerConfigurationException(e)
        }
    }
}
