package lt.techin.server.trip_application.dto;

import lt.techin.server.trip_application.model.Trip;
import lt.techin.server.trip_application.model.TripDate;
import lt.techin.server.trip_application.service.UserTripService;
import org.springframework.beans.factory.annotation.Autowired;

import java.math.BigDecimal;
import java.util.List;

public class TripMapper {

  public static TripResponseDTO toTripResponseDTO(Trip trip, BigDecimal average) {

    return new TripResponseDTO(trip.getId(), trip.getName(), trip.getCategory().name(), trip.getImage(), trip.getDuration(), trip.getPrice(), !trip.getTripDates().isEmpty(), average);
  }

  public static TripResponseDTONoRating toTripResponseDTONoRating(Trip trip) {
    return new TripResponseDTONoRating(trip.getId(), trip.getName(), trip.getCategory().name(), trip.getImage(), trip.getDuration(), trip.getPrice(), !trip.getTripDates().isEmpty());
  }

  public static List<TripResponseDTONoRating> toTripResponseDTOList(List<Trip> trips) {
    return trips.stream().map(trip -> toTripResponseDTONoRating(trip)).toList();
  }

  public static AvailableDatesResponseDTO toAvailableDateResponseDTO(TripDate tripDate) {
    return new AvailableDatesResponseDTO(tripDate.getId(), tripDate.getTrip().getName(), tripDate.getDate());
  }

  public static List<AvailableDatesResponseDTO> availableDatesResponseDTOList(List<TripDate> tripDates) {
    return tripDates.stream().map(TripMapper::toAvailableDateResponseDTO).toList();
  }
//  public static TripPageResponseDTO toTripPageResponseDTO(List<TripResponseDTO> tripResponseDTOList, boolean isLastPage){
//    return
//  }

}
