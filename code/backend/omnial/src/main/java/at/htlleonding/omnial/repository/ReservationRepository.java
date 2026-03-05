package at.htlleonding.omnial.repository;

import at.htlleonding.omnial.model.Reservation;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.BadRequestException;
import jakarta.ws.rs.NotFoundException;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.LinkedList;
import java.util.List;

/**
 * Repository for managing Room Reservations.
 * Includes logic for conflict checking and date-range filtering.
 */
@ApplicationScoped
public class ReservationRepository {

    @Inject
    EntityManager entityManager;

    /**
     * Finds a single reservation by ID.
     * @throws NotFoundException if the ID does not exist.
     */
    public Reservation findByIdReservation(int id){
        Reservation reservation = entityManager.find(Reservation.class, id);
        if (reservation == null){
            throw new NotFoundException();
        }
        return reservation;
    }

    /**
     * Retrieves all reservations using a pre-defined NamedQuery.
     */
    public List<Reservation> getAllReservations(){
        return entityManager.createNamedQuery(Reservation.FIND_ALL_RESERVATIONS, Reservation.class).getResultList();
    }

    /**
     * Filters reservations for a specific room.
     */
    public List<Reservation> getReservationsByRoom(int roomId){
        TypedQuery<Reservation> query = entityManager.createNamedQuery(Reservation.FIND_RESERVATIONS_BY_ROOM, Reservation.class);
        query.setParameter("roomId", roomId);
        return query.getResultList();
    }

    /**
     * Filters reservations made by a specific person.
     */
    public List<Reservation> getReservationsByPerson(int personId){
        TypedQuery<Reservation> query = entityManager.createNamedQuery(Reservation.FIND_RESERVATIONS_BY_PERSON, Reservation.class);
        query.setParameter("personId", personId);
        return query.getResultList();
    }

    /**
     * Persists a new reservation after validating that it doesn't overlap with existing ones.
     * @throws BadRequestException if a time conflict is detected.
     */
    @Transactional
    public void addReservation(Reservation reservation){
        if (!checkReservation(reservation)) {
            throw new BadRequestException("Room is already booked for this time slot.");
        }
        entityManager.persist(reservation);
    }

    /**
     * Removes a reservation from the database.
     */
    @Transactional
    public void deleteReservation(int id){
        Reservation reservation = findByIdReservation(id);
        entityManager.remove(reservation);
    }

    /**
     * Updates an existing reservation with new details.
     * Uses JPA's dirty checking to persist changes at the end of the transaction.
     */
    @Transactional
    public void updateReservation(int id, Reservation reservation){
        Reservation oldReservation = findByIdReservation(id);
        oldReservation.setReservationDate(reservation.getReservationDate());
        oldReservation.setPerson(reservation.getPerson());
        oldReservation.setRoom(reservation.getRoom());
        oldReservation.setEndTime(reservation.getEndTime());
        oldReservation.setStartTime(reservation.getStartTime());
    }

    /**
     * Returns a list of reservations for a 5-day work week starting from a specific date.
     * @param weekDay The starting date string in "yyyy-MM-dd" format.
     */
    public List<Reservation> getWeeklyReservations(String weekDay){
        List<Reservation> reservations = new LinkedList<>();

        // Iterate through 5 days (Monday-Friday logic)
        for (int i = 0; i < 5; i++) {
            String dt = weekDay;
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            Calendar c = Calendar.getInstance();
            try {
                c.setTime(sdf.parse(dt));
            } catch (ParseException e) {
                throw new RuntimeException("Invalid date format provided", e);
            }
            c.add(Calendar.DATE, i);
            dt = sdf.format(c.getTime());

            // Simple filter to match reservations to the current day in the loop
            for (Reservation currRes: getAllReservations()) {
                if (currRes.getReservationDate().toString().equals(dt)){
                    reservations.add(currRes);
                }
            }
        }
        return reservations;
    }

    /**
     * Core validation logic to prevent overlapping bookings.
     * Checks if the start or end times of the new reservation fall within existing time slots.
     * @return true if the slot is free, false if there is a collision.
     */
    public boolean checkReservation(Reservation reservation){
        boolean result = true;

        for (Reservation currRes: getAllReservations()) {
            // Note: Currently compares against ALL reservations.
            // Ideally, this should also filter by Room ID first.
            if (reservation.getId() == currRes.getId()) {
                // Check if start time is inside an existing slot
                if (reservation.getStartTime().isAfter(currRes.getStartTime()) && reservation.getStartTime().isBefore(currRes.getEndTime())) {
                    result =  false;
                }
                // Check if end time is inside an existing slot
                else if (reservation.getEndTime().isAfter(currRes.getStartTime()) && reservation.getEndTime().isBefore(currRes.getEndTime())) {
                    result =  false;
                }
                // Check if an existing slot is entirely inside the new reservation
                else if (currRes.getStartTime().isAfter(reservation.getStartTime()) && currRes.getStartTime().isBefore(reservation.getEndTime())) {
                    result =  false;
                }
                else if (currRes.getEndTime().isAfter(reservation.getStartTime()) && currRes.getEndTime().isBefore(reservation.getEndTime())) {
                    result =  false;
                }
                // Check for exact matches
                else if (reservation.getEndTime().isEqual(currRes.getEndTime()) || reservation.getStartTime().isEqual(currRes.getStartTime())) {
                    result = false;
                }
            }
        }
        return result;
    }
}