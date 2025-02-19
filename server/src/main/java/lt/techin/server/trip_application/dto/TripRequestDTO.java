package lt.techin.server.store_application.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lt.techin.server.store_application.model.Date;
import lt.techin.server.store_application.model.TripDate;

import java.math.BigDecimal;
import java.util.List;

public record TripRequestDTO(String name,
                             String category,
                             String image,
                             String duration,
                             double price,
                             @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
                             List<Date> dates) {
}
