package lt.techin.server.trip_application.dto;

import lt.techin.server.trip_application.model.Trip;
import lt.techin.server.trip_application.model.TripDate;
import lt.techin.server.trip_application.service.UserTripService;
import org.springframework.beans.factory.annotation.Autowired;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

public class TripMapper {

  public static TripResponseDTO toTripResponseDTO(Trip trip, BigDecimal average) {
    String dates = String.join(", ", trip.getTripDates().stream().map(tripDate -> tripDate.getDate().toString()).toList());

    return new TripResponseDTO(trip.getId(), trip.getName(), trip.getCategory().name(), trip.getImage(), trip.getDuration(), trip.getPrice(), !trip.getTripDates().isEmpty(), average, dates);
  }

  public static TripResponseDTONoRating toTripResponseDTONoRating(Trip trip) {
    String dates = String.join(", ", trip.getTripDates().stream().map(tripDate -> tripDate.getDate().toString()).toList());
    return new TripResponseDTONoRating(trip.getId(), trip.getName(), trip.getCategory().name(), trip.getImage(), trip.getDuration(), trip.getPrice(), !trip.getTripDates().isEmpty(), dates);
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

  public static CategoryResponseDTO toCategoryResponseDTO(Trip trip) {
    return new CategoryResponseDTO(trip.getCategory().name().toLowerCase());
  }

  public static List<CategoryResponseDTO> toCategoryResponseDTOList(List<Trip> trips) {
    return trips.stream().map(TripMapper::toCategoryResponseDTO).toList();
  }

}
