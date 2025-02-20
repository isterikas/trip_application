package lt.techin.server.trip_application.service;

import lt.techin.server.trip_application.model.TripDate;
import lt.techin.server.trip_application.repository.TripDateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}
