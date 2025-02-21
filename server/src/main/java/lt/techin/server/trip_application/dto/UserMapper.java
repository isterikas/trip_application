package lt.techin.server.trip_application.dto;

import lt.techin.server.trip_application.model.Role;
import lt.techin.server.trip_application.model.User;

public class UserMapper {

  public static UserResponseDTO toUserResponseDTO(User user) {
    return new UserResponseDTO(user.getUsername());
  }

  public static LoginResponseDTO toLoginResponseDTO(User user) {
    return new LoginResponseDTO(
            user.getUsername(),
            user.getRoles()
                    .stream()
                    .map(Role::getName)
                    .toList()
    );
  }

}
