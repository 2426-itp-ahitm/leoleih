package at.htl.leonding.leih.features.Boundary;

import at.htl.leonding.leih.features.Repo.TeacherRepository;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Produces(MediaType.APPLICATION_JSON)
@Path("/teacher")
public class TeacherResource {
    @Inject
    TeacherRepository teacherRepository;
    @GET
    public Response getTeachers() {
        return Response.ok().entity(teacherRepository.getAll()).build();
    }
}
