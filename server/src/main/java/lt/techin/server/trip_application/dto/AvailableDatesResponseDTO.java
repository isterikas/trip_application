package lt.techin.server.trip_application.dto;

import lt.techin.server.trip_application.model.Trip;

import java.time.LocalDate;

public record AvailableDatesResponseDTO(long id,
                                        String tripName,
                                        LocalDate date) {


}
