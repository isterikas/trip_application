package lt.techin.server.trip_application.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
            .cors(Customizer.withDefaults())
            .csrf(c -> c.disable())
            .httpBasic(Customizer.withDefaults())
            .authorizeHttpRequests(authorize -> authorize
                    .requestMatchers("/**").permitAll()
//                    .requestMatchers(HttpMethod.POST, "/api/trips").permitAll()
//                    .requestMatchers(HttpMethod.GET, "/api/trips/my").hasRole("USER")
//                    .requestMatchers(HttpMethod.POST, "/api/events").hasRole("ADMIN")
//                    .requestMatchers(HttpMethod.DELETE, "/api/events/{eventId}").hasRole("ADMIN")
//                    .requestMatchers(HttpMethod.GET, "/api/events/{eventId}/participants").hasRole("ADMIN")
                    .anyRequest().permitAll());
    return http.build();
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }
}