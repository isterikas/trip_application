package lt.techin.server.trip_application.service;

import lt.techin.server.trip_application.model.UserTrip;
import lt.techin.server.trip_application.repository.UserTripRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserTripService {

  private final UserTripRepository userTripRepository;

  @Autowired
  public UserTripService(UserTripRepository userTripRepository) {
    this.userTripRepository = userTripRepository;
  }

  public void save(UserTrip userTrip) {
    userTripRepository.save(userTrip);
  }

  public List<UserTrip> findAll() {
    return userTripRepository.findAll();
  }

  public Optional<UserTrip> findUserTripById(long userTripId) {
    return userTripRepository.findById(userTripId);
  }

  public void deleteUserTripById(long userTripId) {
    userTripRepository.deleteByUserTripId(userTripId);
  }

  public boolean existsById(long userTripId) {
    return userTripRepository.existsById(userTripId);
  }

  public List<UserTrip> findUserTripsByTripId(long tripId) {
    return userTripRepository.findAll().stream().filter(userTrip -> userTrip.getTripDate().getTrip().getId() == tripId).toList();
  }
}
