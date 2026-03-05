package at.htlleonding.omnial.resource;

import at.htlleonding.omnial.DTO.PersonDTO;
import at.htlleonding.omnial.DTO.PersonMapper;
import at.htlleonding.omnial.model.Person;
import at.htlleonding.omnial.repository.PersonRepository;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.HttpHeaders;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.jose4j.jwt.JwtClaims;
import org.jose4j.jwt.consumer.JwtConsumer;
import org.jose4j.jwt.consumer.JwtConsumerBuilder;
import org.jose4j.jwt.consumer.JwtContext;

import java.util.List;

/**
 * REST API for managing Person entities.
 * Handles standard lookups and identity extraction from JWT tokens.
 */
@Path("/api/persons")
public class PersonResource {

    @Inject
    PersonRepository personRepository;

    @Inject
    PersonMapper personMapper;

    /**
     * Finds a person by their internal database ID.
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/{id}")
    public PersonDTO getPersonById(@PathParam("id") int id){
        return personMapper.toDTO(personRepository.getById(id));
    }

    /**
     * Finds a person using their email address provided as a query parameter.
     * Example: /api/persons/?email=test@example.com
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/")
    public PersonDTO getPersonByEmail(@QueryParam("email") String email){
        return personMapper.toDTO(personRepository.getByEmail(email));
    }

    /**
     * Returns a list of all persons in the system, mapped to DTOs.
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/list")
    public List<PersonDTO> getAllPersons(){
        return personRepository.getAll().stream()
                .map(personMapper::toDTO)
                .toList();
    }

    /**
     * Extracts user information from the 'Authorization' Bearer token.
     * If the user doesn't exist in the local database yet, they are automatically created (Provisioning).
     * * @param headers Injected HTTP headers to access the Authorization field.
     * @return Response containing the PersonDTO of the authenticated user.
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/token")
    public Response getPersonByToken (@Context HttpHeaders headers) {
        try {
            // 1. Extract Bearer Token
            String authorizationHeader = headers.getHeaderString(HttpHeaders.AUTHORIZATION);
            if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
                return Response.status(Response.Status.UNAUTHORIZED)
                        .entity("No valid authorization header found")
                        .build();
            }

            String token = authorizationHeader.substring(7);

            // 2. Parse JWT (Signature verification skipped here; assuming an upstream Gateway/Filter handles it)
            JwtConsumer jwtConsumer = new JwtConsumerBuilder()
                    .setSkipSignatureVerification()
                    .setSkipAllValidators()
                    .build();

            JwtContext jwtContext = jwtConsumer.process(token);
            JwtClaims claims = jwtContext.getJwtClaims();

            // 3. Extract Identity Claims
            String firstName = claims.getClaimValueAsString("given_name");
            String familyName = claims.getClaimValueAsString("family_name");
            String email = claims.getClaimValue("email").toString();

            // Note: substring(15,21) is specific to the organization's distinguishedName format (e.g., school class)
            String grade = claims.getClaimValueAsString("distinguishedName").substring(15,21);
            String uuid = claims.getClaimValueAsString("sub"); // 'sub' is the unique ID from the Auth provider

            // 4. Database Sync / JIT Provisioning
            Person p1 = personRepository.getByUuid(uuid);
            if (p1 == null) {
                // If the user isn't in our DB yet, create them on the fly
                personRepository.addPerson(uuid, firstName, familyName, email, grade);

                // Return a temporary object for the response
                Person tokenPerson = new Person();
                tokenPerson.setPerson_uuid(uuid);
                tokenPerson.setFirstname(firstName);
                tokenPerson.setSurname(familyName);
                tokenPerson.setEmail(email);
                tokenPerson.setGrade(grade);

                return Response.ok(personMapper.toDTO(tokenPerson)).build();
            }

            return Response.ok(personMapper.toDTO(p1)).build();

        } catch (Exception e) {
            return Response.serverError()
                    .entity("Error processing token: " + e.getMessage())
                    .build();
        }
    }
}