package at.htl.leonding.leih;

import at.htl.leonding.leih.model.FotoCam;
import at.htl.leonding.leih.model.Micro;
import at.htl.leonding.leih.model.Room;
import at.htl.leonding.leih.model.VideoCam;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

import java.util.List;

@Path("/getAll")
public class ExampleResource {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/fotoCams")
    public List<FotoCam> returnAllFotoCams() {
        return FotoCam.getallFotosCams();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/videoCams")
    public List<VideoCam> returnAllVideoCams() {
        return VideoCam.getallVideoCams();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/micros")
    public List<Micro> returnAllMicros() {
        return Micro.getallMicros();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/rooms")
    public List<Room> returnAllRooms() {
        return Room.getallRooms();
    }


}
