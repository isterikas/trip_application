package lt.techin.server.store_application.model;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "trips")
public class Trip {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;
  private String name;
  private String category;
  private String image;
  private String duration;
  private BigDecimal price;
  @OneToMany
  @JoinColumn(name = "trip_id")
  private List<UserTrip> userTrips;
  @OneToMany(cascade = CascadeType.ALL)
  @JoinColumn(name = "trip_id")
  private List<TripDate> tripDates;

  public Trip(String name, String category, String image, String duration, BigDecimal price, List<TripDate> tripDates) {
    this.name = name;
    this.category = category;
    this.image = image;
    this.duration = duration;
    this.price = price;
    this.userTrips = List.of();
  }

  public Trip() {
  }

  public long getId() {
    return id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getCategory() {
    return category;
  }

  public void setCategory(String category) {
    this.category = category;
  }

  public String getImage() {
    return image;
  }

  public void setImage(String image) {
    this.image = image;
  }

  public String getDuration() {
    return duration;
  }

  public void setDuration(String duration) {
    this.duration = duration;
  }

  public BigDecimal getPrice() {
    return price;
  }

  public void setPrice(BigDecimal price) {
    this.price = price;
  }

  public List<UserTrip> getUserTrips() {
    return userTrips;
  }

  public void setUserTrips(List<UserTrip> userTrips) {
    this.userTrips = userTrips;
  }

  public List<TripDate> getTripDates() {
    return tripDates;
  }

  public void setTripDates(List<TripDate> dates) {
    this.tripDates = dates;
  }
}
