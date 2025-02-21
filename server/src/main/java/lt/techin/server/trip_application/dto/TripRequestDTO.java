package lt.techin.server.trip_application.dto;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDate;
import java.util.List;

public record TripRequestDTO(String name,
                             String category,
                             String image,
                             String duration,
                             double price,
                             @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
                             List<LocalDate> dates) {
}
