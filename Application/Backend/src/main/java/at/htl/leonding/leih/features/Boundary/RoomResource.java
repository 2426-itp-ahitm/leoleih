package at.htl.leonding.leih.features.Boundary;

import at.htl.leonding.leih.features.Repo.RoomRepository;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Produces(MediaType.APPLICATION_JSON)
@Path("/room")
public class RoomResource {
    @Inject
    RoomRepository roomRepository;
    @GET
    public Response all() {
        return Response.ok().entity(roomRepository.getRooms()).build();
    }
}
