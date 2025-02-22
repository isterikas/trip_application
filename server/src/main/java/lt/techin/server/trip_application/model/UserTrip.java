package lt.techin.server.trip_application.model;

import jakarta.persistence.*;

@Entity
@Table(name = "users_trips")
public class UserTrip {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;
  @ManyToOne
  private TripDate tripDate;
  @ManyToOne
  private User user;
  private String comment;
  private int rating;
  @Enumerated(EnumType.STRING)
  @Column(name = "status")
  private TripStatus status = TripStatus.PENDING;

  public UserTrip(TripDate tripDate, User user) {
    this.tripDate = tripDate;
    this.user = user;
    this.comment = null;
    this.rating = 0;
  }


  public UserTrip() {
  }

  public long getId() {
    return id;
  }

  public TripDate getTripDate() {
    return tripDate;
  }

  public void setTripDate(TripDate tripDate) {
    this.tripDate = tripDate;
  }

  public User getUser() {
    return user;
  }

  public void setUser(User user) {
    this.user = user;
  }

  public String getComment() {
    return comment;
  }

  public void setComment(String comment) {
    this.comment = comment;
  }

  public int getRating() {
    return rating;
  }

  public void setRating(int rating) {
    this.rating = rating;
  }

  public TripStatus getStatus() {
    return status;
  }

  public void setStatus(TripStatus status) {
    this.status = status;
  }
}
