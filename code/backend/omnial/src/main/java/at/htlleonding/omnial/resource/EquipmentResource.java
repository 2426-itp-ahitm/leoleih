package at.htlleonding.omnial.resource;

import at.htlleonding.omnial.DTO.EquipmentDTO;
import at.htlleonding.omnial.DTO.EquipmentMapper;
import at.htlleonding.omnial.model.Equipment;
import at.htlleonding.omnial.model.EquipmentType;
import at.htlleonding.omnial.repository.EquipmentRepository;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("api/equipment")
@Transactional
public class EquipmentResource {

    @Inject
    EquipmentRepository equipmentRepository;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/list")
    public Response getEquipment() {
        List<EquipmentDTO> equipmentList = equipmentRepository.getAll().stream().map(EquipmentMapper::toDTO).toList();
        return Response.ok(equipmentList).build();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/type/{type}")
    public Response getEquipmentByType(@PathParam("type") EquipmentType type) {
        List<EquipmentDTO> list = equipmentRepository.getEquipmentByType(type).stream().map(EquipmentMapper::toDTO).toList();
        return Response.ok(list).build();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/{id}")
    public Response getEquipmentById(@PathParam("id") Long id) {
        Equipment e = Equipment.findById(id);
        if (e == null) return Response.status(Response.Status.NOT_FOUND).build();
        return Response.ok(EquipmentMapper.toDTO(e)).build();
    }


    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/available")
    public Response getRentalAvailable(){
        List<EquipmentDTO> list = this.equipmentRepository.getEquipmentAvailable().stream().map(EquipmentMapper::toDTO).toList();
        return Response.ok(list).build();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/popular")
    public Response getByMostPopular(){
        List<EquipmentDTO> list = this.equipmentRepository.getEquipmentMostPopular().stream().map(EquipmentMapper::toDTO).toList();
        return Response.ok(list).build();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/recentAvailable")
    public Response getByRecentlyAvailable(){
        List<EquipmentDTO> list = this.equipmentRepository.getEquipmentRecently().stream().map(EquipmentMapper::toDTO).toList();
        return Response.ok(list).build();
    }


    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/again/{id}")
    public Response getAgain(@PathParam("id") long id){
        List<EquipmentDTO> list = this.equipmentRepository.getEquipmentAgain(id).stream().map(EquipmentMapper::toDTO).toList();
        return Response.ok(list).build();
    }


    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/user/{id}")
    public Response getByUser(@PathParam("id") long id){
        if (id < 0){
            return Response.status(Response.Status.BAD_REQUEST).entity("id must be positive").build();
        }
        List<EquipmentDTO> list = this.equipmentRepository.getEquipmentByUser(id).stream().map(EquipmentMapper::toDTO).toList();
        return Response.ok(list).build();
    }

}
