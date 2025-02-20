package lt.techin.server.trip_application.controller;

import jakarta.validation.Valid;
import lt.techin.server.trip_application.dto.*;
import lt.techin.server.trip_application.model.*;
import lt.techin.server.trip_application.service.DateService;
import lt.techin.server.trip_application.service.TripDateService;
import lt.techin.server.trip_application.service.TripService;
import lt.techin.server.trip_application.service.UserTripService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/trips")
public class TripController {

  private final TripService tripService;
  private final UserTripService userTripService;
  private final DateService dateService;
  private final TripDateService tripDateService;

  @Autowired
  public TripController(TripService tripService, UserTripService userTripService, DateService dateService, TripDateService tripDateService) {
    this.tripService = tripService;
    this.userTripService = userTripService;
    this.dateService = dateService;
    this.tripDateService = tripDateService;
  }

  @PostMapping
  public ResponseEntity<?> createTrip(@Valid @RequestBody TripRequestDTO tripRequestDTO) {
    Trip trip = new Trip();
    trip.setName(tripRequestDTO.name());
    trip.setCategory(tripRequestDTO.category());
    trip.setImage(tripRequestDTO.image());
    trip.setDuration(tripRequestDTO.duration());
    trip.setPrice(BigDecimal.valueOf(tripRequestDTO.price()));

    List<Date> tripDates = new ArrayList<>();

    tripRequestDTO.dates().forEach(date -> {
      if (!dateService.existsByDate(date.getDate())) {
        Date newDate = new Date();
        newDate.setDate(date.getDate());
        dateService.saveDate(newDate);

        tripDates.add(newDate);
      } else {
        tripDates.add(dateService.findDateByDate(date.getDate()));
      }
    });

    trip.setTripDates(tripDates.stream().map(date -> new TripDate(trip, date)).toList());
    tripService.saveTrip(trip);

    return ResponseEntity.created(ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(trip.getId()).toUri()).body(TripMapper.toTripResponseDTO(trip));
  }

  @GetMapping
  public ResponseEntity<List<TripResponseDTO>> getTrips() {
    List<Trip> trips = tripService.findAll();
    return ResponseEntity.status(HttpStatus.OK).body(TripMapper.toTripResponseDTOList(trips));
  }

  @GetMapping("/search")
  public ResponseEntity<List<TripResponseDTO>> findTrips(@RequestParam(required = false) String name, @RequestParam(required = false) String date) {

    if (!date.isEmpty()) {

      if (name.isEmpty()) {
        return ResponseEntity.status(HttpStatus.OK).body(tripService.findByDate(date).stream().map(trip -> TripMapper.toTripResponseDTO(trip)).toList());
      } else {
        return ResponseEntity.status(HttpStatus.OK).body(TripMapper.toTripResponseDTOList(tripService.findByNameAndDate(name, date)));
      }
    }
    return ResponseEntity.status(HttpStatus.OK).body(tripService.findByNameContains(name).stream().map(trip -> TripMapper.toTripResponseDTO(trip)).toList());

  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteTripById(@PathVariable long id) {
    if (!tripService.existsById(id)) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
    tripService.deleteById(id);
    return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
  }

  @PutMapping("/{id}")
  public ResponseEntity<?> updateTrip(@PathVariable long id, @RequestBody TripRequestDTO tripRequestDTO) {
    Optional<Trip> updateTrip = tripService.findTripById(id);
    if (updateTrip.isEmpty()) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Trip not found.");
    }
    updateTrip.get().setName(tripRequestDTO.name() == null ? updateTrip.get().getName() : tripRequestDTO.name());
    updateTrip.get().setCategory(tripRequestDTO.category() == null ? updateTrip.get().getCategory() : tripRequestDTO.category());
    updateTrip.get().setImage(tripRequestDTO.image() == null ? updateTrip.get().getImage() : tripRequestDTO.image());
    updateTrip.get().setDuration(tripRequestDTO.duration() == null ? updateTrip.get().getDuration() : tripRequestDTO.duration());
    updateTrip.get().setPrice(tripRequestDTO.price() == 0 ? updateTrip.get().getPrice() : BigDecimal.valueOf(tripRequestDTO.price()));
    updateTrip.get().setTripDates(tripRequestDTO.dates() == null ? updateTrip.get().getTripDates() : tripRequestDTO.dates().stream().map(date -> new TripDate(updateTrip.get(), date)).toList());

    tripService.saveTrip(updateTrip.get());
    return ResponseEntity.status(HttpStatus.OK).body(TripMapper.toTripResponseDTO(updateTrip.get()));
  }

  @PostMapping("/{tripId}/{tripDateId}/register")
  public ResponseEntity<UserTripRegistrationDTO> registrateForTrip(@PathVariable long tripId, @PathVariable long tripDateId, Authentication authentication) {
    if (tripService.findTripById(tripId).isEmpty()) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
    User user = (User) authentication.getPrincipal();
    if (tripDateService.findTripDateById(tripDateId).get().getUserTrips().stream().anyMatch(userTrip -> userTrip.getUser().getId() == user.getId())) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }
    Optional<TripDate> tripForRegistration = tripService.findTripById(tripId).get().getTripDates().stream().filter(tripDate -> tripDate.getId() == tripDateId).findFirst();
    if (tripForRegistration.isEmpty()) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    UserTrip userTrip = new UserTrip(tripForRegistration.get(), user);
    userTripService.save(userTrip);
    return ResponseEntity.created(ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(userTrip.getId()).toUri()).body(UserTripMapper.toUserTripResponseDTO(userTrip));
  }

  @GetMapping("/my")
  public ResponseEntity<List<UserTripStatementDTO>> getAllRegistrations(Authentication authentication) {
    User user = (User) authentication.getPrincipal();
    List<UserTrip> myTrips = userTripService.findAll().stream().filter(userTrip -> userTrip.getUser().getId() == user.getId()).toList();
    return ResponseEntity.status(HttpStatus.OK).body(UserTripMapper.toUserTripStatementDTOList(myTrips));
  }

  @DeleteMapping("/my/{userTripId}")
  public ResponseEntity<Void> deleteRegistration(@PathVariable long userTripId, Authentication authentication) {
    if (!userTripService.existsById(userTripId)) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
    UserTrip userTrip = userTripService.findUserTripById(userTripId).get();
    User user = (User) authentication.getPrincipal();
    if (user.getId() == userTrip.getUser().getId()) {
      userTripService.deleteUserTripById(userTripId);
      return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
  }

}
