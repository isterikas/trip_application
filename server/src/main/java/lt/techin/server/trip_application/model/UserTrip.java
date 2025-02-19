package lt.techin.server.trip_application.model;

import jakarta.persistence.*;

@Entity
@Table(name = "users_trips")
public class UserTrip {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;
  @ManyToOne
  private Trip trip;
  @ManyToOne
  private User user;
  private String comment;
  private int rating;

  public UserTrip(Trip trip, User user, String comment, int rating) {
    this.trip = trip;
    this.user = user;
    this.comment = comment;
    this.rating = rating;
  }

  public UserTrip() {
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
}
