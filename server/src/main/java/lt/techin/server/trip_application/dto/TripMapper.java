package lt.techin.server.store_application.dto;

import lt.techin.server.store_application.model.Trip;

import java.util.List;

public class TripMapper {

  public static TripResponseDTO toTripResponseDTO(Trip trip) {
    return new TripResponseDTO(trip.getName());
  }

  public static List<TripResponseDTO> toTripResponseDTOList(List<Trip> trips) {
    return trips.stream().map(TripMapper::toTripResponseDTO).toList();
  }

}
