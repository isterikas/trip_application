package lt.techin.server.trip_application.service;

import lt.techin.server.trip_application.model.User;
import lt.techin.server.trip_application.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

  private final UserRepository userRepository;

  @Autowired
  public UserService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  public Optional<User> findByUsername(String username) {
    return userRepository.findUserByUsername(username);
  }

  public void saveUser(User user) {
    userRepository.save(user);
  }
}
