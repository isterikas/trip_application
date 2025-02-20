package lt.techin.server.trip_application.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public record UserTripRegistrationDTO(LocalDate localDate, String tripName, BigDecimal price,
                                      String feedback) {
}
