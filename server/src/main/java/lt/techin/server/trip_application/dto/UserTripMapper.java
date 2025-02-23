package lt.techin.server.trip_application.dto;

import lt.techin.server.trip_application.model.UserTrip;

import java.util.List;

public class UserTripMapper {

  public static UserTripRegistrationDTO toUserTripResponseDTO(UserTrip userTrip) {
    return new UserTripRegistrationDTO(userTrip.getTripDate().getId(), userTrip.getTripDate().getDate(), userTrip.getTripDate().getTrip().getName(), userTrip.getTripDate().getTrip().getPrice(), "Registration successful.");
  }

  public static UserTripStatementDTO toUserTripStatementDTO(UserTrip userTrip) {
    return new UserTripStatementDTO(userTrip.getId(), userTrip.getTripDate().getTrip().getName(), userTrip.getTripDate().getDate(), userTrip.getComment() == null ? "Please comment on your experience" : userTrip.getComment(), userTrip.getRating() == 0 ? "Please rate the trip." : String.valueOf(userTrip.getRating()), userTrip.getStatus().name());
  }

  public static List<UserTripStatementDTO> toUserTripStatementDTOList(List<UserTrip> userTrips) {
    return userTrips.stream().map(UserTripMapper::toUserTripStatementDTO).toList();
  }

  public static RateTripResponseDTO toRateTripResponseDTO(UserTrip userTrip) {
    return new RateTripResponseDTO(userTrip.getTripDate().getTrip().getName(), userTrip.getTripDate().getDate(), userTrip.getComment(), userTrip.getRating());
  }

  public static UserTripPendingDTO toUserTripPendingDTO(UserTrip userTrip) {
    return new UserTripPendingDTO(userTrip.getId(), userTrip.getUser().getUsername(), userTrip.getTripDate().getTrip().getName(), userTrip.getTripDate().getDate(), userTrip.getTripDate().getUserTrips().size());
  }

  public static List<UserTripPendingDTO> toUserTripPendingDTOList(List<UserTrip> userTrips) {
    return userTrips.stream().map(userTrip -> toUserTripPendingDTO(userTrip)).toList();
  }


}
