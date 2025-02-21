package lt.techin.server.trip_application.repository;

import lt.techin.server.trip_application.model.Trip;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TripRepository extends JpaRepository<Trip, Long> {

  Optional<List<Trip>> findTripByNameContains(String name);

}
