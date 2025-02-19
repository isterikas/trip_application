package lt.techin.server.store_application.service;

import lt.techin.server.store_application.repository.TripDateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TripDateService {

  private final TripDateRepository tripDateRepository;

  @Autowired
  public TripDateService(TripDateRepository tripDateRepository) {
    this.tripDateRepository = tripDateRepository;
  }
}
