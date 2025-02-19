package lt.techin.server.store_application.dto;

import lt.techin.server.store_application.model.User;

public class UserMapper {

  public static UserResponseDTO toUserResponseDTO(User user) {
    return new UserResponseDTO(user.getUsername(), user.getEmail());
  }

}
