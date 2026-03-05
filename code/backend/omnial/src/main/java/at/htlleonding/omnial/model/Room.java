package at.htlleonding.omnial.model;

import jakarta.persistence.*;

import static at.htlleonding.omnial.model.Room.FIND_ALL_ROOMS;

/**
 * Entity representing a physical Room within the facility.
 * This class is used to categorize and locate where reservations occur.
 */
@Entity
// Pre-defined JPQL query to retrieve all rooms from the database
@NamedQuery(name = FIND_ALL_ROOMS, query = "SELECT r from Room r")
public class Room {

    // Constant to provide a central, type-safe reference for the NamedQuery
    public static final String FIND_ALL_ROOMS = "Room.findAll";

    /**
     * Primary Key with a dedicated database sequence.
     * allocationSize = 1 ensures IDs are incremented by exactly 1 per entry.
     */
    @Id
    @SequenceGenerator(name = "room_seq", sequenceName = "room_seq", allocationSize = 1, initialValue = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "room_seq")
    private Integer id;

    private String name;        // e.g., "EDV-1" or "Meeting Room Alpha"
    private String description; // e.g., "Equipped with 25 PCs and a projector"

    // --- Getters and Setters ---

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    /**
     * Custom constructor for easy instantiation in business logic.
     * @param name The display name of the room.
     * @param description A brief overview of room features.
     */
    public Room(String name, String description) {
        this.name = name;
        this.description = description;
    }

    /**
     * Mandatory no-args constructor for JPA/Hibernate.
     * Hibernate uses this to create the object before populating it with DB data.
     */
    public Room() {
    }
}