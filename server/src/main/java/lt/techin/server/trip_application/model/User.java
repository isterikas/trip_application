package lt.techin.server.trip_application.model;

import jakarta.persistence.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "users")
public class User implements UserDetails {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;
  private String username;
  private String password;
  @ManyToMany(fetch = FetchType.EAGER)
  @JoinTable(name = "users_roles", joinColumns =
  @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
  private List<Role> roles;
  @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
  @JoinColumn(name = "user_id")
  private List<UserTrip> userTrips;

  public User(String username, String password, List<Role> roles) {
    this.username = username;
    this.password = password;
    this.roles = roles;
    this.userTrips = List.of();
  }

  public User() {
  }

  public long getId() {
    return id;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public List<Role> getRoles() {
    return roles;
  }

  public void setRoles(List<Role> roles) {
    this.roles = roles;
  }

  public List<UserTrip> getUserTrips() {
    return userTrips;
  }

  public void setUserTrips(List<UserTrip> userTrips) {
    this.userTrips = userTrips;
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return roles;
  }

  @Override
  public String getPassword() {
    return password;
  }

  @Override
  public String getUsername() {
    return username;
  }
}
