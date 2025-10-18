package com.biplove.ecommerce.security;

import com.biplove.ecommerce.models.enums.UserRole;
import com.biplove.ecommerce.service.CustomerUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
  
  private CustomerUserDetailsService customerUserDetailsService;
  private JWTAuthEntryPoint jwtAuthEntryPoint;
  private CorsConfig corsConfig; // Autowire the new CorsConfig class
  
  @Autowired
  public SecurityConfig(CustomerUserDetailsService customerUserDetailsService, JWTAuthEntryPoint jwtAuthEntryPoint, CorsConfig corsConfig) {
    this.customerUserDetailsService = customerUserDetailsService;
    this.jwtAuthEntryPoint = jwtAuthEntryPoint;
    this.corsConfig = corsConfig;
  }
  
  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
        .csrf(AbstractHttpConfigurer::disable)
        .cors(c -> c.configurationSource(corsConfig.corsConfigurationSource()))
        .exceptionHandling(
            exceptionHandling ->
                exceptionHandling.authenticationEntryPoint(jwtAuthEntryPoint))
        .sessionManagement(
            sessionManagement ->
                sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        
        .authorizeHttpRequests(authz -> authz
//                .anyRequest().permitAll()
                .requestMatchers("/error").permitAll()
                .requestMatchers(HttpMethod.GET, "/product/**").permitAll()
                .requestMatchers(HttpMethod.POST, "/product/**").hasAnyAuthority(String.valueOf(UserRole.SELLER))
//                .requestMatchers(HttpMethod.POST, "/product/**").permitAll()
                .requestMatchers(HttpMethod.DELETE, "/product/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/customer/**").permitAll()
                .requestMatchers(HttpMethod.POST, "/photos/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/photos/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/seller/**").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/auth/**").permitAll()
                .requestMatchers("/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
        )
        
        .addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class)
        .httpBasic(httpBasic -> {
        });
    
    return http.build();
  }
  
  @Bean
  public JWTAuthenticationFilter jwtAuthenticationFilter() {
    return new JWTAuthenticationFilter();
  }
  
  @Bean
  public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
    return authenticationConfiguration.getAuthenticationManager();
  }
  
  @Bean
  PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }
}
