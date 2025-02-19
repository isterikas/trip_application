package lt.techin.server.trip_application.repository;

import lt.techin.server.trip_application.model.UserTrip;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<UserTrip, Long> {


}
