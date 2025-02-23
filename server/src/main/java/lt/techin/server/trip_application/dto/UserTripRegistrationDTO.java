package lt.techin.server.trip_application.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public record UserTripRegistrationDTO(long id, LocalDate localDate, String tripName,
                                      BigDecimal price,
                                      String feedback) {
}
