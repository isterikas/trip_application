package lt.techin.server.store_application.dto;

public record UserRequestDTO(
        String username,
        String password,
        String email) {


}
