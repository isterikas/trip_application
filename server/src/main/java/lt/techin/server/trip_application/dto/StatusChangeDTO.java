package lt.techin.server.trip_application.dto;

import lt.techin.server.trip_application.model.TripStatus;

public record StatusChangeDTO(TripStatus tripStatus) {
}
