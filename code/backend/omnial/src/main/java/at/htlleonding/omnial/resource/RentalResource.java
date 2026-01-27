package at.htlleonding.omnial.resource;


import at.htlleonding.omnial.DTO.RentalDTO;
import at.htlleonding.omnial.DTO.RentalEquipmentDTO;
import at.htlleonding.omnial.DTO.RentalEquipmentMapper;
import at.htlleonding.omnial.DTO.RentalMapper;
import at.htlleonding.omnial.DTO.RentalRequest;
import at.htlleonding.omnial.model.Equipment;
import at.htlleonding.omnial.model.Rental;
import at.htlleonding.omnial.model.Rental_Equipment;
import at.htlleonding.omnial.repository.EquipmentRepository;
import at.htlleonding.omnial.repository.PersonRepository;
import at.htlleonding.omnial.repository.RentalRepository;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.time.Instant;
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

    @Inject
    RentalEquipmentMapper rentalEquipmentMapper;


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
    public List<RentalEquipmentDTO> getRentalEquipment() {
        return Rental_Equipment.<Rental_Equipment>listAll().stream().map(rentalEquipmentMapper::toDTO).toList();
    }


    @PUT
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/rent/{id}")
    public RentalDTO updateRentalRent(Rental rental, @PathParam("id") long id) {
        Rental rental1 = Rental.findById(id);
        rental1.setRented(true);
        return rentalMapper.toDTO(rental1);
    }


    @PUT
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/return/{id}")
    public RentalDTO updateRentalReturn(Rental rental, @PathParam("id") long id) {
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
        Rental rental = new Rental();
        rental.person = personRepository.getById(rentalRequest.personId);
        rental.leaseDate = rentalRequest.leaseDate;
        rental.returnDate = rentalRequest.returnDate;
        rental.isRented = false;
        rental.isReturned = false;
        Rental.persist(rental);


        for (Long equipmentId : rentalRequest.equipmentIds) {
            Equipment equipment = Equipment.findById(equipmentId);
            equipment.setAvailable(equipment.getAvailable()-1);
            if (equipment != null) {
               Rental_Equipment rentalEquipment = new Rental_Equipment(rental, equipment);
               Rental_Equipment.persist(rentalEquipment);
            }
        }

        return Response.status(Response.Status.CREATED).build();
    }

    @DELETE
    @Consumes(MediaType.APPLICATION_JSON)
    public Response deleteRental(RentalRequest rentalRequest) {
        Rental toDelete = Rental.find("person.id = ?1 and leaseDate = ?2 and returnDate = ?3",
                rentalRequest.personId, rentalRequest.leaseDate, rentalRequest.returnDate).firstResult();

        long deleteCount = Rental_Equipment.delete("rental.id = ?1", toDelete.id);
        long deleted2Count = Rental.delete(
                "person.id = ?1 and leaseDate = ?2 and returnDate = ?3",
                rentalRequest.personId, rentalRequest.leaseDate, rentalRequest.returnDate
        );

        // Optional: Protokollierung der gelöschten Einträge
        if (deleteCount == rentalRequest.equipmentIds.size() && deleted2Count > 0) {
            return Response.ok().build();
        } else {
            return Response.status(Response.Status.NO_CONTENT).build();
        }
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

}
