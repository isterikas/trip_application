package lt.techin.server.trip_application.model;

import jakarta.persistence.*;

@Entity
@Table(name = "trips_dates")
public class TripDate {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;
  @ManyToOne
  private Trip trip;
  @ManyToOne
  private Date date;

  public TripDate(Trip trip, Date date) {
    this.trip = trip;
    this.date = date;
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

  public Date getDate() {
    return date;
  }

  public void setDate(Date date) {
    this.date = date;
  }
}
