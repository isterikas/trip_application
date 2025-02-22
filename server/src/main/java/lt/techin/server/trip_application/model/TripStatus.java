package lt.techin.server.trip_application.model;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.deser.std.EnumDeserializer;

@JsonDeserialize(using = EnumDeserializer.class)
public enum TripStatus {
  PENDING, REJECTED, APPROVED;

}
