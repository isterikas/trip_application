package lt.techin.server.trip_application.controller;

import jakarta.validation.Valid;
import lt.techin.server.trip_application.dto.LoginResponseDTO;
import lt.techin.server.trip_application.dto.UserMapper;
import lt.techin.server.trip_application.dto.UserRequestDTO;
import lt.techin.server.trip_application.model.Role;
import lt.techin.server.trip_application.model.User;
import lt.techin.server.trip_application.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.List;

@RestController
@RequestMapping("/api")
public class UserController {

  private final UserService userService;
  private final PasswordEncoder passwordEncoder;

  @Autowired
  public UserController(UserService userService, PasswordEncoder passwordEncoder) {
    this.userService = userService;
    this.passwordEncoder = passwordEncoder;
  }

  @PostMapping("/auth/register")
  public ResponseEntity<?> createUser(@Valid @RequestBody UserRequestDTO userRequestDTO) {
    User user = new User();
    user.setUsername(userRequestDTO.username());
    user.setPassword(passwordEncoder.encode(userRequestDTO.password()));
    user.setRoles(List.of(new Role(1)));
    userService.saveUser(user);

    return ResponseEntity.created(ServletUriComponentsBuilder.fromCurrentRequest()
                    .path("/{id}")
                    .buildAndExpand(user.getId())
                    .toUri())
            .body(UserMapper.toUserResponseDTO(user));
  }

  @GetMapping("/auth/me")
  public ResponseEntity<LoginResponseDTO> me(Authentication authentication) {
    User user = (User) authentication.getPrincipal();

    return ResponseEntity.ok(UserMapper.toLoginResponseDTO(user));
  }

}
