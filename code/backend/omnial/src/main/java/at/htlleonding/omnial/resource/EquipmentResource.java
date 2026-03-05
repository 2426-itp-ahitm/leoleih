package at.htlleonding.omnial.resource;

import at.htlleonding.omnial.DTO.EquipmentDTO;
import at.htlleonding.omnial.DTO.EquipmentMapper;
import at.htlleonding.omnial.model.Equipment;
import at.htlleonding.omnial.model.EquipmentType;
import at.htlleonding.omnial.repository.EquipmentRepository;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

/**
 * REST Endpoint for Equipment management.
 * Accessible via the "api/equipment" base path.
 * The @Transactional annotation ensures database sessions are managed for all methods.
 */
@Path("api/equipment")
@Transactional
public class EquipmentResource {

    @Inject
    EquipmentRepository equipmentRepository;

    /**
     * Fetches all equipment items.
     * Uses a Stream to map each Equipment entity to an EquipmentDTO.
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/list")
    public Response getEquipment() {
        List<EquipmentDTO> equipmentList = equipmentRepository.getAll()
                .stream()
                .map(EquipmentMapper::toDTO)
                .toList();
        return Response.ok(equipmentList).build();
    }

    /**
     * Filters equipment by a specific category (e.g., AUDIO, VIDEO).
     * Quarkus automatically maps the path string to the EquipmentType enum.
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/type/{type}")
    public Response getEquipmentByType(@PathParam("type") EquipmentType type) {
        List<EquipmentDTO> list = equipmentRepository.getEquipmentByType(type)
                .stream()
                .map(EquipmentMapper::toDTO)
                .toList();
        return Response.ok(list).build();
    }

    /**
     * Retrieves a single equipment item by its database ID.
     * Returns a 404 NOT FOUND if the ID does not exist.
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/{id}")
    public Response getEquipmentById(@PathParam("id") Long id) {
        // Direct Panache lookup on the model
        Equipment e = Equipment.findById(id);
        if (e == null) return Response.status(Response.Status.NOT_FOUND).build();
        return Response.ok(EquipmentMapper.toDTO(e)).build();
    }

    /**
     * Returns all equipment that is currently marked as available for rental.
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/available")
    public Response getRentalAvailable(){
        List<EquipmentDTO> list = this.equipmentRepository.getEquipmentAvailable()
                .stream()
                .map(EquipmentMapper::toDTO)
                .toList();
        return Response.ok(list).build();
    }

    /**
     * Returns items ranked by their frequency in the Rental table.
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/popular")
    public Response getByMostPopular(){
        List<EquipmentDTO> list = this.equipmentRepository.getEquipmentMostPopular()
                .stream()
                .map(EquipmentMapper::toDTO)
                .toList();
        return Response.ok(list).build();
    }

    /**
     * Returns items sorted by their most recent rental activity.
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/recentAvailable")
    public Response getByRecentlyAvailable(){
        List<EquipmentDTO> list = this.equipmentRepository.getEquipmentRecently()
                .stream()
                .map(EquipmentMapper::toDTO)
                .toList();
        return Response.ok(list).build();
    }

    /**
     * Personalized suggestion: Items a specific user has rented before.
     * Useful for "Rent it again" features.
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/again/{id}")
    public Response getAgain(@PathParam("id") long id){
        List<EquipmentDTO> list = this.equipmentRepository.getEquipmentAgain(id)
                .stream()
                .map(EquipmentMapper::toDTO)
                .toList();
        return Response.ok(list).build();
    }

    /**
     * Lists all equipment currently in the possession of a specific user.
     * Includes basic validation to ensure the provided ID is positive.
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/user/{id}")
    public Response getByUser(@PathParam("id") long id){
        if (id < 0){
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("id must be positive")
                    .build();
        }
        List<EquipmentDTO> list = this.equipmentRepository.getEquipmentByUser(id)
                .stream()
                .map(EquipmentMapper::toDTO)
                .toList();
        return Response.ok(list).build();
    }
}