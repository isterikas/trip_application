package lt.techin.server.trip_application.repository;

import lt.techin.server.trip_application.model.TripDate;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TripDateRepository extends JpaRepository<TripDate, Long> {


}
