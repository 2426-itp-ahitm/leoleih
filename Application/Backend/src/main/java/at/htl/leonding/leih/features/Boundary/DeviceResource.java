package at.htl.leonding.leih.features.Boundary;

import at.htl.leonding.leih.features.DTO.DeviceDTO;
import at.htl.leonding.leih.features.Model.Device;
import at.htl.leonding.leih.features.Repo.DeviceRepository;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Produces(MediaType.APPLICATION_JSON)
@Path("/devices")
public class DeviceResource {
    @Inject
    DeviceRepository repo;

    @GET
    public Response all() {
        return Response.ok().entity(repo.findAll())
                .build();
    }

    @POST
    @Transactional
    public Response create(DeviceDTO deviceDTO) {
        repo.createNew(deviceDTO);
        return Response.ok(deviceDTO).build();
    }

    @GET
    @Path("/{id}")
    public Response get(@PathParam("id") Long id) {
        Device device= repo.findById(id);
        //DeviceDTO dto = mapper.toResource(device);
        return Response.ok().entity(device)
                .build();
    }
}
