package at.htl.leonding.leih.features.Boundary;

import at.htl.leonding.leih.features.Repo.EqRepository;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Produces(MediaType.APPLICATION_JSON)
@Path("/eq")
public class EqResource {
    @Inject
    EqRepository repo;
    @GET
    public Response All() {
        return Response.ok().entity(repo.getEquipments()).build();
    }

}
