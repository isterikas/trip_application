package lt.techin.server.store_application.model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "dates")
public class Date {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;
  private LocalDate date;

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
}
