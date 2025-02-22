package lt.techin.server.trip_application.dto;

import java.util.List;

public record TripPageResponseDTO(List<TripResponseDTO> tripResponseDTOList, boolean isLastPage) {

}
