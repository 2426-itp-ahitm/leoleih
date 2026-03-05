package at.htlleonding.omnial.resource;

import at.htlleonding.omnial.DTO.*;
import at.htlleonding.omnial.model.Equipment;
import at.htlleonding.omnial.model.Rental;
import at.htlleonding.omnial.model.State;
import at.htlleonding.omnial.repository.EquipmentRepository;
import at.htlleonding.omnial.repository.PersonRepository;
import at.htlleonding.omnial.repository.RentalRepository;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * REST Endpoint for managing the Equipment Rental lifecycle.
 * Handles the transitions between requested, rented, and returned states.
 */
@Path("api/rental")
@Transactional
public class RentalResource {

    @Inject
    RentalRepository rentalRepository;

    @Inject
    EquipmentRepository equipmentRepository;

    @Inject
    PersonRepository personRepository;

    @Inject
    RentalMapper rentalMapper;

    /**
     * Lists all rentals in the system using Panache's active record pattern.
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/list")
    public List<RentalDTO> getRental() {
        return Rental.<Rental>listAll().stream().map(rentalMapper::toDTO).toList();
    }

    /**
     * Fetches a specific rental by its unique database ID.
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/{id}")
    public Response getRentalId(@PathParam("id") long id) {
        Rental r = Rental.findById(id);
        if (r == null) return Response.status(Response.Status.NOT_FOUND).build();
        return Response.ok(rentalMapper.toDTO(r)).build();
    }

    /**
     * Returns all rental history for a specific user.
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/user/{id}")
    public List<RentalDTO> getRentalByUserId(@PathParam("id") long id) {
        return rentalRepository.getReservationByUser(id).stream().map(rentalMapper::toDTO).toList();
    }

    /**
     * Marks a specific rental as 'rented' (equipment has physically left the storage).
     */
    @PUT
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/rent/{id}")
    public RentalDTO updateRentalRent(@PathParam("id") long id) {
        Rental rental1 = Rental.findById(id);
        rental1.setRented(true);
        return rentalMapper.toDTO(rental1);
    }

    /**
     * Marks a rental as 'returned'.
     * Automatically sets the actualReturnDate if the equipment is returned after the deadline.
     */
    @PUT
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/return/{id}")
    public RentalDTO updateRentalReturn(@PathParam("id") long id) {
        Rental rental1 = Rental.findById(id);
        rental1.setReturned(true);

        if (Date.from(Instant.now()).after(rental1.getReturnDate())){
            rental1.setActualReturnDate(Date.from(Instant.now()));
        }
        return rentalMapper.toDTO(rental1);
    }

    /**
     * Creates a new Rental.
     * Logic: maps the request to an entity, decrements the available count
     * for each piece of equipment, and persists.
     */
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response createRental(RentalRequest rentalRequest) {
        RentalDTO dto = new RentalDTO(
                null,
                rentalRequest.personId,
                rentalRequest.leaseDate,
                rentalRequest.returnDate,
                false,
                false,
                null,
                null,
                rentalRequest.note,
                rentalRequest.equipmentIds.toArray(Long[]::new)
        );

        Rental rental = rentalMapper.toEntity(dto);

        // Inventory Management: Reduce availability of equipment items
        for (Equipment equipment : rental.getEquipments()) {
            equipment.setAvailable(equipment.getAvailable() - 1);
        }

        Rental.persist(rental);
        return Response.status(Response.Status.CREATED).build();
    }

    /**
     * Deletes a rental record based on composite criteria (person and dates).
     */
    @DELETE
    @Consumes(MediaType.APPLICATION_JSON)
    public Response deleteRental(RentalRequest rentalRequest) {
        Rental.delete(
                "person.id = ?1 and leaseDate = ?2 and returnDate = ?3",
                rentalRequest.personId, rentalRequest.leaseDate, rentalRequest.returnDate
        );
        return Response.ok().build();
    }

    /**
     * Updates specific status fields and notes based on a RentalUpdateRequest.
     * Includes string-to-enum mapping for the rental State.
     */
    @PUT
    @Path("/update")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response update(RentalUpdateRequest rentalRequest) {
        // Finding the record based on business keys rather than ID
        Rental myRental = Rental.find("person.id = ?1 and leaseDate = ?2 and returnDate = ?3",
                rentalRequest.personId, rentalRequest.leaseDate, rentalRequest.returnDate).firstResult();

        if (myRental == null) return Response.status(Response.Status.NOT_FOUND).build();

        myRental.note = rentalRequest.note;

        // Manual mapping of String to Enum for the State field
        try {
            myRental.state = State.valueOf(rentalRequest.state);
        } catch (IllegalArgumentException e) {
            return Response.status(Response.Status.BAD_REQUEST).entity("Invalid State").build();
        }

        return Response.ok().build();
    }
}