package at.htl.leonding.leih.features.item;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Produces(MediaType.APPLICATION_JSON)
@Path("/items")
public class ItemResource {
    @Inject
    ItemRepository repo;

    @Inject
    ItemMapper mapper;
    @GET
    public Response all() {
        var list = repo.listAll().stream().map(mapper::toResource);
        return Response.ok(list)
                .build();
    }

    @POST
    @Transactional
    public Response create(ItemDTO item) {
        repo.persistAndFlush(mapper.fromResource(item));
        return Response.ok(item).build();
    }
}
