package at.htlleonding.omnial.email;

import at.htlleonding.omnial.model.Room;
import at.htlleonding.omnial.repository.RoomRepository;
import io.quarkus.mailer.Mail;
import io.quarkus.mailer.Mailer;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

/**
 * REST endpoint for managing email communications.
 * Accessible via the "/email" base path.
 */
@Path("/email")
public class EmailResource {

    // Injects the Quarkus Mailer instance configured in application.properties
    @Inject
    Mailer mailer;

    /**
     * Sends a hardcoded test email to a specific recipient.
     * * @return A HTTP 200 Response if the email is successfully handed off to the mailer.
     */
    @POST
    @Path("/send")
    public Response sendEmail() {
        // Construct and send a simple text-based email
        mailer.send(Mail.withText(
                "s.Binder@students.htl-leonding.ac.at", // Recipient address
                "Hello from Quarkus!",                 // Subject line
                "This is a test email from Quarkus."    // Plain text body
        ));

        return Response.ok("Email sent successfully!").build();
    }
}