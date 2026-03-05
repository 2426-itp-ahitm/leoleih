package at.htlleonding.omnial.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Objects;

import static at.htlleonding.omnial.model.Reservation.*;

/**
 * Entity representing a room reservation within the system.
 * This class maps to the database and provides structured access to booking data.
 */
@Entity
// Named queries provide pre-compiled JPQL for common search operations
@NamedQuery(name = FIND_ALL_RESERVATIONS, query = "Select r from Reservation r")
@NamedQuery(name = FIND_RESERVATIONS_BY_ROOM, query = "SELECT r from Reservation r where r.room.id = :roomId")
@NamedQuery(name = FIND_RESERVATIONS_BY_PERSON, query = "SELECT r from Reservation r where r.person.id = :personId")
public class Reservation {

    // Constants for query names to ensure type-safety and easier maintenance
    public static final String FIND_ALL_RESERVATIONS = "Reservation.findAll";
    public static final String FIND_RESERVATIONS_BY_ROOM = "Reservation.filterByRoom";
    public static final String FIND_RESERVATIONS_BY_PERSON = "Reservation.filterByPerson";

    /**
     * Primary key with a specific database sequence.
     * allocationSize = 1 ensures the DB handles incrementing one-by-one.
     */
    @Id
    @SequenceGenerator(name = "reservation_seq", sequenceName = "reservation_seq", allocationSize = 1, initialValue = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "reservation_seq")
    private int id;

    // Static count usually used for manual ID tracking; generally not needed if JPA handles IDs
    private static int countId;

    /**
     * Many-to-One relationship: Multiple reservations can exist for one Room.
     */
    @ManyToOne
    @JoinColumn(name = "roomId")
    private Room room;

    /**
     * Many-to-One relationship: Multiple reservations can be made by one Person.
     */
    @ManyToOne
    @JoinColumn(name = "personId")
    private Person person;

    // Temporal data using modern Java 8+ Time API
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private LocalDate reservationDate;

    /**
     * Note to Timon regarding Constructors:
     * JPA strictly requires a public/protected no-args constructor to instantiate
     * the object when fetching from the DB.
     * If you uncomment the custom constructors below, you MUST uncomment the empty one too.
     */

    // --- Getters and Setters ---

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public static int getCountId() {
        return countId;
    }

    public static void setCountId(int countId) {
        Reservation.countId = countId;
    }

    public Room getRoom() {
        return room;
    }

    public void setRoom(Room room) {
        this.room = room;
    }

    public Person getPerson() {
        return person;
    }

    public void setPerson(Person person) {
        this.person = person;
    }

    public LocalDateTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }

    public LocalDateTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalDateTime endTime) {
        this.endTime = endTime;
    }

    public LocalDate getReservationDate() {
        return reservationDate;
    }

    public void setReservationDate(LocalDate date) {
        this.reservationDate = date;
    }

    /**
     * Standard toString implementation for logging and debugging.
     */
    @Override
    public String toString() {
        return "Reservation{" +
                "id=" + id +
                ", roomId=" + room +
                ", personId=" + person +
                ", startTime=" + startTime +
                ", endTime=" + endTime +
                ", reservationDate=" + reservationDate +
                '}';
    }

    /**
     * Equals/HashCode: Crucial for comparing reservations or using them in Sets.
     * Note: 'id' is excluded to allow comparison of logically identical slots
     * before they are persisted to the database.
     */
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Reservation that = (Reservation) o;
        return Objects.equals(room, that.room) &&
                Objects.equals(startTime, that.startTime) &&
                Objects.equals(endTime, that.endTime) &&
                Objects.equals(reservationDate, that.reservationDate);
    }

    @Override
    public int hashCode() {
        return Objects.hash(room, startTime, endTime, reservationDate);
    }
}