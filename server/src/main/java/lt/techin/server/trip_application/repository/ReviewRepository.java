package lt.techin.server.store_application.repository;

import lt.techin.server.store_application.model.UserTrip;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<UserTrip, Long> {


}
