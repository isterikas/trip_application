package lt.techin.server.trip_application.model;

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
  @Enumerated(EnumType.STRING)
  @Column(name = "category")
  private TripCategory category;
  private String image;
  private String duration;
  private BigDecimal price;
  @OneToMany(mappedBy = "trip", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<TripDate> tripDates;

  public Trip(String name, TripCategory category, String image, String duration, BigDecimal price) {
    this.name = name;
    this.category = category;
    this.image = image;
    this.duration = duration;
    this.price = price;
    this.tripDates = List.of();
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

  public TripCategory getCategory() {
    return category;
  }

  public void setCategory(TripCategory category) {
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

  public List<TripDate> getTripDates() {
    return tripDates;
  }

  public void setTripDates(List<TripDate> dates) {
    this.tripDates = dates;
  }
}
