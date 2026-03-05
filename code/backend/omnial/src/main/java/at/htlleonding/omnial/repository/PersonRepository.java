package at.htlleonding.omnial.repository;

import at.htlleonding.omnial.model.Person;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.quarkus.runtime.Startup;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.NotFoundException;

import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

/**
 * Repository for Person entities.
 * Manages database access and initial data seeding from local JSON files.
 */
@ApplicationScoped
public class PersonRepository implements io.quarkus.hibernate.orm.panache.PanacheRepositoryBase<Person, Integer> {

    @Inject
    EntityManager entityManager;

    // Jackson mapper for handling JSON file conversions
    ObjectMapper objectMapper = new ObjectMapper();

    /**
     * Bootstraps the database with person data on application start.
     */
    @Startup
    void init(){
        readFromJson();
    }

    public PersonRepository() {
        // Note: Manual call here might be redundant if @Startup is active
        readFromJson();
    }

    /**
     * Standard lookup by Primary Key.
     * @throws NotFoundException if the person doesn't exist.
     */
    public Person getById(int id){
        Person person = entityManager.find(Person.class, id);

        if (person == null){
            throw new NotFoundException();
        }

        return person;
    }

    /**
     * Reads a list of Person objects from 'persons.json' and persists them.
     * Transactional to ensure atomicity during the batch import.
     */
    @Transactional
    public void readFromJson(){
        Path filepath = Paths.get("./data/persons.json");
        File file = new File("./data/persons.json");

        try {
            // Converts JSON array directly into a List of Person entities
            List<Person> langList = objectMapper.readValue(
                    file, // Pass the file object
                    new TypeReference<List<Person>>(){});

            // Persist each imported person into the database
            langList.forEach(a -> entityManager.persist(a));
        }
        catch (Exception ex){
            System.err.println("Error happened while reading person data: " + ex.getMessage());
        }
    }

    /**
     * Retrieves all users using the NamedQuery defined in the Person entity.
     */
    public List<Person> getAll(){
        return entityManager.createNamedQuery(Person.FIND_ALL_PERSONS, Person.class).getResultList();
    }

    /**
     * Finds a person by their unique email address.
     */
    public Person getByEmail(String email){
        TypedQuery<Person> query = entityManager.createNamedQuery(Person.FIND_PERSON_BY_EMAIL, Person.class);
        query.setParameter("email", email);
        return query.getSingleResult();
    }

    /**
     * Finds a person by their UUID (often provided by an external Auth provider).
     * Returns null safely if no user is found.
     */
    public Person getByUuid(String uuid){
        try {
            TypedQuery<Person> query = entityManager.createNamedQuery(Person.FIND_PERSON_BY_UUID, Person.class);
            query.setParameter("uuid", uuid);
            return query.getSingleResult();
        } catch (Exception ex){
            return null; // UUID not found
        }
    }

    /**
     * Adds a person only if their UUID does not already exist in the system.
     */
    @Transactional
    public void addPerson(String uuid, String firstName, String lastName, String email, String grade){
        Person temp = getByUuid(uuid);

        if (temp == null){
            Person newPerson = new Person();
            newPerson.setPerson_uuid(uuid);
            newPerson.setFirstname(firstName);
            newPerson.setSurname(lastName); // Assuming surname mapping
            newPerson.setEmail(email);
            newPerson.setGrade(grade);

            entityManager.persist(newPerson);
        }
    }
}