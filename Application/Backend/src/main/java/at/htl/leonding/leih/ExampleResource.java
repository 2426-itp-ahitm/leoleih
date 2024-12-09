package at.htl.leonding.leih;

import at.htl.leonding.leih.model.*;
import at.htl.leonding.leih.repo.Repository;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/getAll")
public class ExampleResource {

    @Inject
    Repository repo;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/fotoCams")
    public Response returnAllFotoCams() {
        List<Item> list = this.repo.getAllPhotoCameras();

        return Response.ok()
                .entity(list)
                .build();
    }
/*
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/videoCams")
    public List<VideoCam> returnAllVideoCams() {
        return repo.getAllVideoCameras();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/micros")
    public List<Micro> returnAllMicros() {
        return repo.getAllAudioDevices();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/rooms")
    public List<Room> returnAllRooms() {
        return null;
        //TODO add rooms to database
    }
*/

}
