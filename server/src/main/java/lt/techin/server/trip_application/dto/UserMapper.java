package lt.techin.server.trip_application.dto;

import lt.techin.server.trip_application.model.User;

public class UserMapper {

  public static UserResponseDTO toUserResponseDTO(User user) {
    return new UserResponseDTO(user.getUsername(), user.getEmail());
  }

}
