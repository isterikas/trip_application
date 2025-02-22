package lt.techin.server.trip_application.service;

import lt.techin.server.trip_application.model.Trip;
import lt.techin.server.trip_application.repository.TripRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class TripService {
  private final TripRepository tripRepository;

  @Autowired
  public TripService(TripRepository tripRepository) {
    this.tripRepository = tripRepository;
  }

  public void saveTrip(Trip trip) {
    tripRepository.save(trip);
  }

  public List<Trip> findAll() {
    return tripRepository.findAll();
  }

  public List<Trip> findByNameContains(String name) {
    return tripRepository.findTripByNameContains(name).get();
  }

  public List<Trip> findByDate(String date) {
    LocalDate searchDate = LocalDate.parse(date);
    return findAll().stream().filter(trip -> trip.getTripDates().stream().anyMatch(date1 -> date1.getDate().equals(searchDate))).toList();
  }

  public List<Trip> findByNameAndDate(String name, String date) {

    return findByDate(date).stream().filter(trip -> trip.getName().toLowerCase().contains(name.toLowerCase())).toList();
  }

  public boolean existsById(long id) {
    return tripRepository.existsById(id);
  }

  public void deleteById(long id) {
    tripRepository.deleteById(id);
  }

  public Optional<Trip> findTripById(long id) {
    return tripRepository.findById(id);
  }

}
