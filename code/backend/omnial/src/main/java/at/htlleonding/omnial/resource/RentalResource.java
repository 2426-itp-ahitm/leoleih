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

//TODO neiche routen vom aktualisieren von Statusse
//TODO delete a ufnktional mochn (vielleicht is es a frontend problem)
//TODO lehrer soll eine notiz auf ein rental hinterlassen können (wichtig um z.b. ort und zeit der abholung auszumachen)
@Path("api/rental")
@Transactional
public class RentalResource {

    @Inject
    RentalRepository rentalRepository;;


    @Inject
    EquipmentRepository equipmentRepository;

    @Inject
    PersonRepository personRepository;

    @Inject
    RentalMapper rentalMapper;


    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/list")
    public List<RentalDTO> getRental() {
        return Rental.<Rental>listAll().stream().map(rentalMapper::toDTO).toList();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/{id}")
    public Response getRentalId(@PathParam("id") long id) {
        Rental r = Rental.findById(id);
        if (r == null) return Response.status(Response.Status.NOT_FOUND).build();
        return Response.ok(rentalMapper.toDTO(r)).build();
    }


    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/user/{id}")
    public List<RentalDTO> getRentalByUserId(@PathParam("id") long id) {
        return rentalRepository.getReservationByUser(id).stream().map(rentalMapper::toDTO).toList();
    }


    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/eq/list")
    public List<RentalDTO> getRentalEquipment() {
        return Rental.<Rental>listAll().stream()
                .map(rentalMapper::toDTO)
                .toList();
    }


    @PUT
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/rent/{id}")
    public RentalDTO updateRentalRent(@PathParam("id") long id) {
        Rental rental1 = Rental.findById(id);
        rental1.setRented(true);
        return rentalMapper.toDTO(rental1);
    }


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


    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response createRental(RentalRequest rentalRequest) {
        System.out.println(rentalRequest);
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

        // adjust available count
        for (Equipment equipment : rental.getEquipments()) {
            equipment.setAvailable(equipment.getAvailable() - 1);
        }

        Rental.persist(rental);

        return Response.status(Response.Status.CREATED).build();
    }

    @DELETE
    @Consumes(MediaType.APPLICATION_JSON)
    public Response deleteRental(RentalRequest rentalRequest) {
        Rental toDelete = Rental.find("person.id = ?1 and leaseDate = ?2 and returnDate = ?3",
                rentalRequest.personId, rentalRequest.leaseDate, rentalRequest.returnDate).firstResult();

        Rental.delete(
                "person.id = ?1 and leaseDate = ?2 and returnDate = ?3",
                rentalRequest.personId, rentalRequest.leaseDate, rentalRequest.returnDate
        );

        return Response.ok().build();
    }

    @PUT
    @Path("/rent")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateIsRented(RentalRequest rentalRequest) {
        Rental myRental= Rental.find("person.id = ?1 and leaseDate = ?2 and returnDate = ?3",
                rentalRequest.personId, rentalRequest.leaseDate, rentalRequest.returnDate).firstResult();

        myRental.isRented = true;

        return Response.ok().build();

    }
    @PUT
    @Path("/return")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateReturn(RentalRequest rentalRequest) {
        Rental myRental= Rental.find("person.id = ?1 and leaseDate = ?2 and returnDate = ?3",
                rentalRequest.personId, rentalRequest.leaseDate, rentalRequest.returnDate).firstResult();

        if(myRental.isRented) {
            myRental.isRented = false;
            myRental.isReturned = true;
            return Response.ok().build();

        }else {
            return Response.status(Response.Status.FORBIDDEN).build();
        }

    }
    @PUT
    @Path("/update")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response update(RentalUpdateRequest rentalRequest) {
        Rental myRental= Rental.find("person.id = ?1 and leaseDate = ?2 and returnDate = ?3",
                rentalRequest.personId, rentalRequest.leaseDate, rentalRequest.returnDate).firstResult();
        myRental.note = rentalRequest.note;
        if(rentalRequest.state.equals("AUSSTEHEND")) {
            myRental.state = State.AUSSTEHEND;
        } else if (rentalRequest.state.equals("AUSGEBORGT")) {
            myRental.state = State.AUSGEBORGT;
        } else if (rentalRequest.state.equals("RESERVIERT")) {
            myRental.state = State.RESERVIERT;
        } else if (rentalRequest.state.equals("ZURÜCKGEGEBEN")) {
            myRental.state = State.ZURÜCKGEGEBEN;
        } else if (rentalRequest.state.equals("ÜBERZOGEN")) {
            myRental.state = State.ÜBERZOGEN;
        }else {
            System.out.println(rentalRequest.note);
            return Response.status(Response.Status.BAD_REQUEST).build();
        }
    return Response.ok().build();
    }

}
