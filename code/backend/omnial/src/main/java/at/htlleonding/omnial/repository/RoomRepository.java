package at.htlleonding.omnial.repository;

import at.htlleonding.omnial.model.Room;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.ws.rs.NotFoundException;

import java.util.List;

/**
 * Repository for Room entities.
 * Managed as an @ApplicationScoped bean, meaning a single instance is shared
 * across the entire application's lifecycle.
 */
@ApplicationScoped
public class RoomRepository {

    /**
     * Jakarta Persistence EntityManager.
     * Injected by the Quarkus runtime to handle database transactions and entity mapping.
     */
    @Inject
    EntityManager entityManager;

    /**
     * Retrieves a specific room by its primary key.
     * * @param id The unique integer ID of the room.
     * @return The Room entity if found.
     * @throws NotFoundException (404) if no room exists with the provided ID.
     */
    public Room getRoomById(int id){
        Room room = entityManager.find(Room.class, id);

        if(room == null){
            // Throws a standard JAX-RS exception that Quarkus can map to a 404 response
            throw new NotFoundException("Room with ID " + id + " not found.");
        }

        return room;
    }

    /**
     * Retrieves a list of all rooms currently stored in the database.
     * Uses the NamedQuery 'Room.findAll' defined within the Room entity class.
     * * @return A List of all Room objects.
     */
    public List<Room> getAllRooms(){
        return entityManager.createNamedQuery(Room.FIND_ALL_ROOMS, Room.class).getResultList();
    }
}