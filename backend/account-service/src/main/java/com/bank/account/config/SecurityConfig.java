/*
 * package com.bank.account.config;
 * 
 * 
 * 
 * 
 * import org.springframework.beans.factory.annotation.Autowired; import
 * org.springframework.context.annotation.Bean; import
 * org.springframework.context.annotation.Configuration; import
 * org.springframework.http.HttpMethod; import
 * org.springframework.security.config.annotation.web.builders.HttpSecurity;
 * import org.springframework.security.web.SecurityFilterChain; import
 * org.springframework.security.web.authentication.
 * UsernamePasswordAuthenticationFilter;
 * 
 * import com.bank.account.security.JwtFilter;
 * 
 * 
 * @Configuration public class SecurityConfig {
 * 
 * @Autowired private JwtFilter jwtFilter;
 * 
 * @Bean SecurityFilterChain securityFilterChain(HttpSecurity http) throws
 * Exception {
 * 
 * http.csrf(csrf -> csrf.disable()) .authorizeHttpRequests(auth -> auth
 * 
 * .requestMatchers("/profile/me") .hasRole("CUSTOMER")
 * 
 * .requestMatchers(HttpMethod.POST, "/profile") .hasRole("CUSTOMER")
 * 
 * .requestMatchers("/profile/*") .hasAnyRole("EMPLOYEE","ADMIN")
 * 
 * .requestMatchers(HttpMethod.GET, "/profile/all")
 * .hasAnyRole("EMPLOYEE","ADMIN") .anyRequest() .authenticated() )
 * 
 * .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
 * 
 * return http.build(); } }
 * 
 */

package com.bank.account.config;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.bank.account.security.JwtFilter;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    @Autowired
    private JwtFilter jwtFilter;

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http)
            throws Exception {

        http
                .cors(cors -> {})
                .csrf(csrf -> csrf.disable())

                .authorizeHttpRequests(auth -> auth

                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                        .anyRequest().authenticated())

                .addFilterBefore(
                        jwtFilter,
                        UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOrigins(
                List.of("http://localhost:5173"));

        configuration.setAllowedMethods(
                List.of("*"));

        configuration.setAllowedHeaders(
                List.of("*"));

        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration(
                "/**",
                configuration);

        return source;
    }
}