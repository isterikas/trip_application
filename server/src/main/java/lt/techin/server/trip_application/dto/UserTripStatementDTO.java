package lt.techin.server.trip_application.dto;

import java.time.LocalDate;

public record UserTripStatementDTO(String name,
                                   LocalDate date,
                                   String comment,
                                   String rating) {
}
