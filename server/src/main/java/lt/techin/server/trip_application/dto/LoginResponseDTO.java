package lt.techin.server.trip_application.dto;

import java.util.List;

public record LoginResponseDTO(String username, List<String> roles) {
}
