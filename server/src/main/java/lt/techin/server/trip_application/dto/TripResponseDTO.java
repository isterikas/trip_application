package lt.techin.server.trip_application.dto;

import java.math.BigDecimal;

public record TripResponseDTO(String name,
                              BigDecimal price) {
}
