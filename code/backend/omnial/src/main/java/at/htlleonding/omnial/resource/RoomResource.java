package at.htlleonding.omnial.resource;

import at.htlleonding.omnial.model.Room;
import at.htlleonding.omnial.repository.RoomRepository;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

import java.util.List;

/**
 * REST resource for managing rooms.
 *
 * Base path: /api/rooms
 *
 * Provides endpoints for:
 * - Retrieving all available rooms
 */
@Path("/api/rooms")
public class RoomResource {

    /**
     * Repository for accessing room data from the database.
     */
    @Inject
    RoomRepository roomRepository;

    /**
     * Returns a list of all rooms.
     *
     * Endpoint:
     * GET /api/rooms/list
     *
     * Produces:
     * - application/json
     *
     * @return List of Room entities stored in the system
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/list")
    public List<Room> getAllRooms(){
        return roomRepository.getAllRooms();
    }
}