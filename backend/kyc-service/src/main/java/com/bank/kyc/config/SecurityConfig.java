//package com.bank.kyc.config;
//
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
//
//import com.bank.kyc.security.JwtFilter;
//
//@Configuration
//@EnableMethodSecurity
//public class SecurityConfig {
//
//    private final JwtFilter jwtFilter;
//
//    public SecurityConfig(JwtFilter jwtFilter) {
//        this.jwtFilter = jwtFilter;
//    }
//
//    @Bean
//    SecurityFilterChain securityFilterChain(HttpSecurity http)
//            throws Exception {
//
//        http.cors(cors -> {})
//            .csrf(csrf -> csrf.disable())
//
//            .authorizeHttpRequests(auth -> auth
//
//                .requestMatchers("kyc/submit")
//                .hasRole("CUSTOMER")
//
//                .requestMatchers("/kyc/me")
//                .hasRole("CUSTOMER")
//
//                .requestMatchers("/kyc/pending")
//                .hasAnyRole("EMPLOYEE", "ADMIN")
//
//                .requestMatchers("/kyc/*/approve")
//                .hasAnyRole("EMPLOYEE", "ADMIN")
//
//                .requestMatchers("/kyc/*/reject")
//                .hasAnyRole("EMPLOYEE", "ADMIN")
//
//                .anyRequest()
//                .authenticated()
//            )
//
//            .addFilterBefore(
//                    jwtFilter,
//                    UsernamePasswordAuthenticationFilter.class);
//
//        return http.build();
//    }
//    
//    
//    
//}

package com.bank.kyc.config;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.bank.kyc.security.JwtFilter;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    @Autowired
    private JwtFilter jwtFilter;
    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http)
            throws Exception {

        http
            .cors(cors -> {})
            .csrf(csrf -> csrf.disable())

            .authorizeHttpRequests(auth -> auth

                // Allow React preflight requests
                .requestMatchers(HttpMethod.OPTIONS, "/**")
                .permitAll()

                // ===========================
                // CUSTOMER
                // ===========================

                .requestMatchers(HttpMethod.POST, "/kyc/submit")
                .hasRole("CUSTOMER")

                .requestMatchers(HttpMethod.GET, "/kyc/me")
                .hasRole("CUSTOMER")

                // ===========================
                // EMPLOYEE / ADMIN
                // ===========================

                .requestMatchers(HttpMethod.GET, "/kyc/pending")
                .hasAnyRole("EMPLOYEE", "ADMIN")

                .requestMatchers(HttpMethod.GET, "/kyc/user/**")
                .hasAnyRole("EMPLOYEE", "ADMIN")

                .requestMatchers(HttpMethod.PUT, "/kyc/*/approve")
                .hasAnyRole("EMPLOYEE", "ADMIN")

                .requestMatchers(HttpMethod.PUT, "/kyc/*/reject")
                .hasAnyRole("EMPLOYEE", "ADMIN")
                
                .requestMatchers(HttpMethod.GET, "/kyc/pan/**")
                .hasAnyRole("EMPLOYEE", "ADMIN")

                .requestMatchers(HttpMethod.GET, "/kyc/aadhaar/**")
                .hasAnyRole("EMPLOYEE", "ADMIN")

                // ===========================
                // ADMIN
                // ===========================

                .requestMatchers(HttpMethod.GET, "/kyc/all")
                .hasRole("ADMIN")

                .anyRequest()
                .authenticated()
            )

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




