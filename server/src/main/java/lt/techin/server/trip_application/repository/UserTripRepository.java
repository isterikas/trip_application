package lt.techin.server.trip_application.repository;

import jakarta.transaction.Transactional;
import lt.techin.server.trip_application.model.UserTrip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface UserTripRepository extends JpaRepository<UserTrip, Long> {
  @Transactional
  @Modifying
  @Query(value = "DELETE FROM users_trips WHERE id = :id", nativeQuery = true)
  void deleteByUserTripId(long id);
}
