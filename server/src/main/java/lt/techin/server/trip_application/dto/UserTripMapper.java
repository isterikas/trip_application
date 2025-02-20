package lt.techin.server.trip_application.dto;

import lt.techin.server.trip_application.model.UserTrip;

import java.util.List;

public class UserTripMapper {

  public static UserTripRegistrationDTO toUserTripResponseDTO(UserTrip userTrip) {
    return new UserTripRegistrationDTO(userTrip.getTripDate().getDate().getDate(), userTrip.getTripDate().getTrip().getName(), userTrip.getTripDate().getTrip().getPrice(), "Registration successful.");
  }

  public static UserTripStatementDTO toUserTripStatementDTO(UserTrip userTrip) {
    return new UserTripStatementDTO(userTrip.getTripDate().getTrip().getName(), userTrip.getTripDate().getDate().getDate(), userTrip.getComment() == null ? "Please comment on your experience" : userTrip.getComment(), userTrip.getRating() == 0 ? "Please rate the trip." : String.valueOf(userTrip.getRating()));
  }

  public static List<UserTripStatementDTO> toUserTripStatementDTOList(List<UserTrip> userTrips) {
    return userTrips.stream().map(UserTripMapper::toUserTripStatementDTO).toList();
  }


}
