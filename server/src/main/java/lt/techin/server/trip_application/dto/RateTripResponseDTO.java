package lt.techin.server.trip_application.dto;

import java.time.LocalDate;

public record RateTripResponseDTO(String name,
                                  LocalDate date,
                                  String comment,
                                  int rating) {
}
