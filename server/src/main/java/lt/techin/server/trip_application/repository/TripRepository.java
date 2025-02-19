package lt.techin.server.store_application.repository;

import lt.techin.server.store_application.model.Trip;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface TripRepository extends JpaRepository<Trip, Long> {

  Optional<List<Trip>> findTripByNameContains(String name);

//  Optional<List<Trip>> findTripByDates(LocalDate date);

}
