package at.htlleonding.omnial.resource;

import at.htlleonding.omnial.DTO.ReservationMapper;
import at.htlleonding.omnial.DTO.ReservationDTO;
import at.htlleonding.omnial.repository.PersonRepository;
import at.htlleonding.omnial.repository.ReservationRepository;
import jakarta.annotation.security.PermitAll;
import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.LinkedList;
import java.util.List;

/**
 * REST resource for managing reservations.
 *
 * Base path: /api/reservations
 *
 * Provides endpoints for:
 * - Retrieving reservations (all, by id, by room, by person, by week)
 * - Creating new reservations
 * - Updating existing reservations
 * - Deleting reservations
 */
@Path("/api/reservations")
@RequestScoped
public class ReservationResource {

    /**
     * Repository for database access of reservations.
     */
    @Inject
    ReservationRepository reservationRepository;

    /**
     * Repository for accessing person data.
     */
    @Inject
    PersonRepository personRepository;

    /**
     * Mapper for converting between Reservation entities and ReservationDTOs.
     */
    @Inject
    ReservationMapper reservationMapper;


    /**
     * Returns a list of all reservations.
     *
     * GET /api/reservations/list
     *
     * @return List of ReservationDTO objects
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/list")
    public List<ReservationDTO> reservationList() {
        return this.reservationRepository
                .getAllReservations()
                .stream()
                .map(reservationMapper::toDTO)
                .toList();
    }

    /**
     * Returns a reservation by its ID.
     *
     * GET /api/reservations/{id}
     *
     * @param id Reservation ID
     * @return ReservationDTO of the requested reservation
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/{id}")
    public ReservationDTO reservationById(@PathParam("id") int id){
        return reservationMapper
                .toDTO(this.reservationRepository.findByIdReservation(id));
    }

    /**
     * Returns all reservations for a specific room.
     *
     * GET /api/reservations/room/{id}
     *
     * @param id Room ID
     * @return List of ReservationDTO for the given room
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/room/{id}")
    @PermitAll
    public List<ReservationDTO> reservationByRoom(@PathParam("id") int id){
        return reservationRepository
                .getReservationsByRoom(id)
                .stream()
                .map(reservationMapper::toDTO)
                .toList();
    }

    /**
     * Returns all reservations for a specific person.
     *
     * GET /api/reservations/person/{id}
     *
     * @param id Person ID
     * @return List of ReservationDTO for the given person
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/person/{id}")
    @PermitAll
    public List<ReservationDTO> reservationByPerson(@PathParam("id") int id){
        return reservationRepository
                .getReservationsByPerson(id)
                .stream()
                .map(reservationMapper::toDTO)
                .toList();
    }

    /**
     * Creates a new reservation.
     *
     * POST /api/reservations
     *
     * @param reservationDTO Reservation data transferred as JSON
     */
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public void addReservation(ReservationDTO reservationDTO){
        this.reservationRepository
                .addReservation(reservationMapper.toEntity(reservationDTO));
    }

    /**
     * Deletes a reservation by its ID.
     *
     * DELETE /api/reservations/{id}
     *
     * @param id Reservation ID
     */
    @DELETE
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/{id}")
    public void deleteReservation(@PathParam("id") int id){
        this.reservationRepository.deleteReservation(id);
    }

    /**
     * Updates an existing reservation.
     *
     * PUT /api/reservations/{id}
     *
     * @param id Reservation ID
     * @param reservationDTO Updated reservation data
     */
    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/{id}")
    public void updateReservation(@PathParam("id") int id, ReservationDTO reservationDTO){
        this.reservationRepository
                .updateReservation(id, reservationMapper.toEntity(reservationDTO));
    }

    /**
     * Returns reservations for a given weekday string.
     *
     * GET /api/reservations/week/{weekDay}
     *
     * @param weekDay Weekday string (format depends on repository implementation)
     * @return List of ReservationDTO for that weekday
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/week/{weekDay}")
    public List<ReservationDTO> getWeekReservation(@PathParam("weekDay") String weekDay){
        return this.reservationRepository
                .getWeeklyReservations(weekDay)
                .stream()
                .map(reservationMapper::toDTO)
                .toList();
    }

    /**
     * Generates a list of 5 consecutive dates starting from a given date.
     *
     * GET /api/reservations/weekDay/{weekDay}
     *
     * Example input format: yyyy-MM-dd
     *
     * @param weekDay Start date as String (format: yyyy-MM-dd)
     * @return List of 5 consecutive date strings
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/weekDay/{weekDay}")
    public List<String> getWeek(@PathParam("weekDay") String weekDay) {

        List<String> dates = new LinkedList<>();

        for (int i = 0; i < 5; i++) {
            String dt = weekDay;
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            Calendar c = Calendar.getInstance();

            try {
                c.setTime(sdf.parse(dt));
            } catch (ParseException e) {
                throw new RuntimeException("Invalid date format. Expected yyyy-MM-dd", e);
            }

            // Add i days to the start date
            c.add(Calendar.DATE, i);
            dt = sdf.format(c.getTime());

            dates.add(dt);
        }

        return dates;
    }
}