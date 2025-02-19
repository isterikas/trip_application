package lt.techin.server.store_application.repository;

import lt.techin.server.store_application.model.TripDate;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TripDateRepository extends JpaRepository<TripDate, Long> {


}
