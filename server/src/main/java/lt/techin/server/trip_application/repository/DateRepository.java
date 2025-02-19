package lt.techin.server.store_application.repository;

import lt.techin.server.store_application.model.Date;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Optional;

public interface DateRepository extends JpaRepository<Date, Long> {

  Optional<Date> findByDate(LocalDate date);

}
