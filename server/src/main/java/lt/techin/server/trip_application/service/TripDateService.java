package lt.techin.server.trip_application.service;

import lt.techin.server.trip_application.model.TripDate;
import lt.techin.server.trip_application.repository.TripDateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;

@Service
public class TripDateService {

  private final TripDateRepository tripDateRepository;

  @Autowired
  public TripDateService(TripDateRepository tripDateRepository) {
    this.tripDateRepository = tripDateRepository;
  }

  public Optional<TripDate> findTripDateById(long id) {
    return tripDateRepository.findById(id);
  }


  public boolean existsByIdAndDate(long id, LocalDate date) {
    return tripDateRepository.findAll().stream().filter(tripDate -> tripDate.getTrip().getId() == id).anyMatch(tripDate -> tripDate.getDate().equals(date));
  }

  public void saveTripDate(TripDate newDate) {
    tripDateRepository.save(newDate);
  }

  public TripDate findDateByIdAndDate(long id, LocalDate date) {
    return tripDateRepository.findAll().stream().filter(tripDate -> tripDate.getTrip().getId() == id).filter(tripDate -> tripDate.getDate().equals(date)).findFirst().get();
  }

  public boolean existsById(long id) {
    return tripDateRepository.existsById(id);
  }
}
