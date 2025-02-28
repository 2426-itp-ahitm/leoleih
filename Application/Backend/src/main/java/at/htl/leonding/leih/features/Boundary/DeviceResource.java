package at.htl.leonding.leih.features.item;

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

    @Inject
    DeviceMapper mapper;

    @GET
    public Response all() {
        var list = repo.listAll().stream().map(mapper::toResource);
        return Response.ok(list)
                .build();
    }

    @POST
    @Transactional
    public Response create(DeviceDTO deviceDTO) {
        repo.persistAndFlush(mapper.fromResource(deviceDTO));
        return Response.ok(deviceDTO).build();
    }

    @GET
    @Path("/{id}")
    public Response get(@PathParam("id") Long id) {
        Device device= repo.findById(id);
        DeviceDTO dto = mapper.toResource(device);
        return Response.ok(dto)
                .build();
    }
}
