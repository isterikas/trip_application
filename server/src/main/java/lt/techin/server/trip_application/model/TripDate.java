package lt.techin.server.trip_application.model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "trips_dates")
public class TripDate {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;
  @ManyToOne
  private Trip trip;
  private LocalDate date;
  @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
  @JoinColumn(name = "trip_date_id")
  private List<UserTrip> userTrips;

  public TripDate(Trip trip, LocalDate date) {
    this.trip = trip;
    this.date = date;
    this.userTrips = List.of();
  }

  public TripDate() {
  }

  public long getId() {
    return id;
  }

  public Trip getTrip() {
    return trip;
  }

  public void setTrip(Trip trip) {
    this.trip = trip;
  }

  public LocalDate getDate() {
    return date;
  }

  public void setDate(LocalDate date) {
    this.date = date;
  }

  public List<UserTrip> getUserTrips() {
    return userTrips;
  }

  public void setUserTrips(List<UserTrip> userTrips) {
    this.userTrips = userTrips;
  }
}
