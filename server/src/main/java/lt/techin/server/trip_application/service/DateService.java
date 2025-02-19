package lt.techin.server.trip_application.service;

import lt.techin.server.trip_application.model.Date;
import lt.techin.server.trip_application.repository.DateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class DateService {
  private final DateRepository dateRepository;

  @Autowired
  public DateService(DateRepository dateRepository) {
    this.dateRepository = dateRepository;
  }

  public List<Date> findAllDates() {
    return dateRepository.findAll();
  }

  public boolean existsByDate(LocalDate date) {
    return findAllDates().stream().anyMatch(value -> value.getDate().isEqual(date));
  }


  public void saveDate(Date newDate) {
    dateRepository.save(newDate);
  }

  public Date findDateByDate(LocalDate date) {
    return dateRepository.findByDate(date).get();
  }


}
