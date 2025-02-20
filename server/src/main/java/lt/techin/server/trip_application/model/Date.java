package lt.techin.server.trip_application.model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "dates")
public class Date {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;
  private LocalDate date;
  @OneToMany(cascade = CascadeType.ALL)
  @JoinColumn(name = "date_id")
  private List<TripDate> tripDates;

  public Date(LocalDate date) {
    this.date = date;
  }

  public Date() {
  }

  public long getId() {
    return id;
  }

  public LocalDate getDate() {
    return date;
  }

  public void setDate(LocalDate date) {
    this.date = date;
  }

  public List<TripDate> getTripDates() {
    return tripDates;
  }

  public void setTripDates(List<TripDate> tripDates) {
    this.tripDates = tripDates;
  }
}
