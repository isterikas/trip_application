package lt.techin.server.trip_application.controller;

import jakarta.validation.Valid;
import lt.techin.server.trip_application.dto.*;
import lt.techin.server.trip_application.model.*;
import lt.techin.server.trip_application.service.TripDateService;
import lt.techin.server.trip_application.service.TripService;
import lt.techin.server.trip_application.service.UserTripService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/trips")
public class TripController {

  private final TripService tripService;
  private final UserTripService userTripService;
  private final TripDateService tripDateService;

  @Autowired
  public TripController(TripService tripService, UserTripService userTripService, TripDateService tripDateService) {
    this.tripService = tripService;
    this.userTripService = userTripService;
    this.tripDateService = tripDateService;
  }

  @PostMapping
  public ResponseEntity<?> createTrip(@Valid @RequestBody TripRequestDTO tripRequestDTO) {
    Trip trip = new Trip();
    trip.setName(tripRequestDTO.name());
    trip.setCategory(TripCategory.valueOf(tripRequestDTO.category().toUpperCase()));
    trip.setImage(tripRequestDTO.image());
    trip.setDuration(tripRequestDTO.duration());
    trip.setPrice(BigDecimal.valueOf(tripRequestDTO.price()));
    tripService.saveTrip(trip);
    ArrayList<TripDate> tripDates = new ArrayList<>();

    tripRequestDTO.dates().forEach(date -> {
      if (!tripDateService.existsByIdAndDate(trip.getId(), date)) {
        TripDate newDate = new TripDate();
        newDate.setTrip(trip);
        newDate.setDate(date);
        tripDateService.saveTripDate(newDate);
        tripDates.add(newDate);
      } else {
        tripDates.add(tripDateService.findDateByIdAndDate(trip.getId(), date));
      }
    });

    trip.setTripDates(tripDates);
    tripService.saveTrip(trip);

    return ResponseEntity.created(ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(trip.getId()).toUri()).body(TripMapper.toTripResponseDTO(trip, BigDecimal.ZERO));
  }

  @PostMapping("/{tripDateId}/register")
  public ResponseEntity<UserTripRegistrationDTO> registerForTrip(@PathVariable long tripDateId, Authentication authentication) {
    if (!tripDateService.existsById(tripDateId)) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
    User user = (User) authentication.getPrincipal();
    if (tripDateService.findTripDateById(tripDateId).get().getUserTrips().stream().anyMatch(userTrip -> userTrip.getUser().getId() == user.getId())) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }
    TripDate tripForRegistration = tripDateService.findTripDateById(tripDateId).get();
    UserTrip userTrip = new UserTrip(tripForRegistration, user);
    userTripService.save(userTrip);
    return ResponseEntity.created(ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(userTrip.getId()).toUri()).body(UserTripMapper.toUserTripResponseDTO(userTrip));
  }

  @GetMapping
  public ResponseEntity<List<TripResponseDTO>> getTrips() {
    List<Trip> trips = tripService.findAll();
    List<TripResponseDTO> tripResponseDTOList = new ArrayList<>();
    for (Trip trip : trips) {
      long tripId = trip.getId();
      BigDecimal totalUsersRegistered = BigDecimal.valueOf(userTripService.findUserTripsByTripId(tripId).stream().filter(userTrip -> userTrip.getRating() != 0).toList().size());
      BigDecimal sum = userTripService.findUserTripsByTripId(tripId).stream().map(userTrip -> BigDecimal.valueOf(userTrip.getRating())).filter(rating -> rating.compareTo(BigDecimal.ZERO) != 0).reduce(BigDecimal.ZERO, BigDecimal::add);
      BigDecimal average = totalUsersRegistered.equals(BigDecimal.ZERO) ? BigDecimal.ZERO : sum.divide(totalUsersRegistered, 2, RoundingMode.HALF_UP);
      tripResponseDTOList.add(new TripResponseDTO(trip.getId(), trip.getName(), trip.getCategory().name(), trip.getImage(), trip.getDuration(), trip.getPrice(), !trip.getTripDates().isEmpty(), average));
    }
    return ResponseEntity.status(HttpStatus.OK).body(tripResponseDTOList);
  }

  @GetMapping("/{tripId}")
  public ResponseEntity<List<AvailableDatesResponseDTO>> getAvailableDates(@PathVariable long tripId) {
    if (!tripService.existsById(tripId)) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
    List<AvailableDatesResponseDTO> tripDates = tripService.findTripById(tripId).get().getTripDates().stream().map(tripDate -> TripMapper.toAvailableDateResponseDTO(tripDate)).toList();
    return ResponseEntity.status(HttpStatus.OK).body(tripDates);
  }

  @GetMapping("/search")
  public ResponseEntity<List<TripResponseDTONoRating>> findTrips(@RequestParam(required = false) String name, @RequestParam(required = false) String date) {

    if (!date.isEmpty()) {
      if (name.isEmpty()) {
        return ResponseEntity.status(HttpStatus.OK).body(tripService.findByDate(date).stream().map(TripMapper::toTripResponseDTONoRating).toList());
      } else {
        return ResponseEntity.status(HttpStatus.OK).body(TripMapper.toTripResponseDTOList(tripService.findByNameAndDate(name, date)));
      }
    }
    return ResponseEntity.status(HttpStatus.OK).body(tripService.findByNameContains(name).stream().map(TripMapper::toTripResponseDTONoRating).toList());
  }
//  public Page<TripPageResponseDTO> findAllMoviesPage(int page, int size) {
//
//      Pageable pageable = PageRequest.of(page, size);
//
//      return trip.findAll(pageable);
//    }
//    Pageable pageable = PageRequest.of(page, size, Sort.by(sort));
//    return movieRepository.findAll(pageable);
//  }

  @GetMapping("/my")
  public ResponseEntity<List<UserTripStatementDTO>> getAllRegistrations(Authentication authentication) {
    User user = (User) authentication.getPrincipal();
    List<UserTrip> myTrips = userTripService.findAll().stream().filter(userTrip -> userTrip.getUser().getId() == user.getId()).toList();
    return ResponseEntity.status(HttpStatus.OK).body(UserTripMapper.toUserTripStatementDTOList(myTrips));
  }

  @GetMapping("/pending")
  public ResponseEntity<List<UserTripPendingDTO>> getPendingRegistrations() {
    List<UserTrip> pendingTrips = userTripService.findAll().stream().filter(userTrip -> userTrip.getStatus().name().equals("PENDING")).toList();
    return ResponseEntity.status(HttpStatus.OK).body(UserTripMapper.toUserTripPendingDTOList(pendingTrips));
  }


  @PutMapping("/{id}")
  public ResponseEntity<?> updateTrip(@PathVariable long id, @RequestBody TripRequestDTO tripRequestDTO) {
    Optional<Trip> updateTrip = tripService.findTripById(id);
    if (updateTrip.isEmpty()) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Trip not found.");
    }
    updateTrip.get().setName(tripRequestDTO.name() == null ? updateTrip.get().getName() : tripRequestDTO.name());
    updateTrip.get().setCategory(tripRequestDTO.category() == null ? updateTrip.get().getCategory() : TripCategory.valueOf(tripRequestDTO.category().toUpperCase()));
    updateTrip.get().setImage(tripRequestDTO.image() == null ? updateTrip.get().getImage() : tripRequestDTO.image());
    updateTrip.get().setDuration(tripRequestDTO.duration() == null ? updateTrip.get().getDuration() : tripRequestDTO.duration());
    updateTrip.get().setPrice(tripRequestDTO.price() == 0 ? updateTrip.get().getPrice() : BigDecimal.valueOf(tripRequestDTO.price()));
    updateTrip.get().setTripDates(tripRequestDTO.dates() == null ? updateTrip.get().getTripDates() : new ArrayList<>(tripRequestDTO.dates().stream().map(date -> new TripDate(updateTrip.get(), date)).toList()));

    tripService.saveTrip(updateTrip.get());
    return ResponseEntity.status(HttpStatus.OK).body(TripMapper.toTripResponseDTONoRating(updateTrip.get()));
  }

  @PutMapping("/{userTripId}/status")
  public ResponseEntity<RateTripResponseDTO> changeStatus(@PathVariable long userTripId, @RequestBody RateTripRequestDTO rateTripRequestDTO) {
    if (!userTripService.existsById(userTripId)) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
    UserTrip userTrip = userTripService.findUserTripById(userTripId).get();
    userTrip.setRating(rateTripRequestDTO.rating());
    userTrip.setComment(rateTripRequestDTO.comment());
    userTripService.save(userTrip);
    return ResponseEntity.status(HttpStatus.OK).body(UserTripMapper.toRateTripResponseDTO(userTrip));
  }

  @PutMapping("/my/{userTripId}")
  public ResponseEntity<UserTripStatementDTO> changeDate(@PathVariable long userTripId, @RequestBody ChangeDateRequestDTO changeDateRequestDTO) {
    if (!userTripService.existsById(userTripId)) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
    LocalDate date = LocalDate.parse(changeDateRequestDTO.date());
    UserTrip userTrip = userTripService.findUserTripById(userTripId).get();
    TripDate desiredDate = userTripService.findUserTripById(userTripId).get().getTripDate().getTrip().getTripDates().stream().filter(tripDate -> tripDate.getDate().equals(date)).findFirst().get();
    userTrip.setTripDate(desiredDate);
    userTripService.save(userTrip);
    return ResponseEntity.status(HttpStatus.OK).body(UserTripMapper.toUserTripStatementDTO(userTrip));
  }

  @PutMapping("/my/{userTripId}/rate")
  public ResponseEntity<RateTripResponseDTO> leaveFeedback(@PathVariable long userTripId, @RequestBody RateTripRequestDTO rateTripRequestDTO) {
    if (!userTripService.existsById(userTripId)) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
    UserTrip userTrip = userTripService.findUserTripById(userTripId).get();
    userTrip.setRating(rateTripRequestDTO.rating());
    userTrip.setComment(rateTripRequestDTO.comment());
    userTripService.save(userTrip);
    return ResponseEntity.status(HttpStatus.OK).body(UserTripMapper.toRateTripResponseDTO(userTrip));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteTripById(@PathVariable long id) {
    if (!tripService.existsById(id)) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
    tripService.deleteById(id);
    return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
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

  @PatchMapping("/{userTripId}/review")
  public ResponseEntity<Void> changeStatus(@PathVariable long userTripId, @RequestBody StatusRequestDTO statusRequestDTO) {
    if (!userTripService.existsById(userTripId)) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    UserTrip userTrip = userTripService.findUserTripById(userTripId).get();
    userTrip.setStatus(statusRequestDTO.status().equalsIgnoreCase("approved") ? TripStatus.APPROVED : TripStatus.REJECTED);
    userTripService.save(userTrip);
    return ResponseEntity.status(HttpStatus.OK).build();
  }
}
