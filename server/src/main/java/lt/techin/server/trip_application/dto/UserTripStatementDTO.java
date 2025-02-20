package lt.techin.server.trip_application.dto;

import lt.techin.server.trip_application.model.TripStatus;

import java.time.LocalDate;

public record UserTripStatementDTO(String name,
                                   LocalDate date,
                                   String comment,
                                   String rating,
                                   String status) {
}
