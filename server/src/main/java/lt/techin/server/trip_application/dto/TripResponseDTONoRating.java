package lt.techin.server.trip_application.dto;

import java.math.BigDecimal;

public record TripResponseDTONoRating(long id,
                                      String name,
                                      String category,
                                      String image,
                                      String duration,
                                      BigDecimal price,
                                      boolean available) {
}