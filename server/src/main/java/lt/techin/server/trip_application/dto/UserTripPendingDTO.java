package lt.techin.server.trip_application.dto;

import java.time.LocalDate;

public record UserTripPendingDTO(long registrationId,
                                 String username,
                                 String tripName,
                                 LocalDate tripDate,
                                 int currentlyBooked) {
}
