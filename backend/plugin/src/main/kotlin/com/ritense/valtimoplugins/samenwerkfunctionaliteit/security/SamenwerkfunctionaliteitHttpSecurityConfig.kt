package com.ritense.valtimoplugins.samenwerkfunctionaliteit.security

import com.ritense.valtimo.contract.security.config.HttpConfigurerConfigurationException
import com.ritense.valtimo.contract.security.config.HttpSecurityConfigurer
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty
import org.springframework.core.annotation.Order
import org.springframework.http.HttpMethod
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.stereotype.Component

@Order(1)
@Component
@ConditionalOnProperty(prefix = "valtimo.samenwerkfunctionaliteit", name = ["enableGateway"], havingValue = "true")
class SamenwerkfunctionaliteitHttpSecurityConfig : HttpSecurityConfigurer {
    override fun configure(http: HttpSecurity) {
        try {
            http.authorizeHttpRequests { requests ->
                requests
                    .requestMatchers(HttpMethod.GET, "samenwerkfunctionaliteit/v5/**")
                    .permitAll()
            }
        } catch (e: Exception) {
            throw HttpConfigurerConfigurationException(e)
        }
    }
}
