package at.htlleonding.omnial.repository;

import at.htlleonding.omnial.model.Equipment;
import at.htlleonding.omnial.model.Rental;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityManager;

import java.util.List;

/**
 * Repository for handling database operations related to the Rental entity.
 */
@ApplicationScoped
public class RentalRepository {

    @Inject
    EntityManager entityManager;

    /**
     * Retrieves all rental records for a specific person.
     * Note: The method name uses "Reservation", but it queries the "Rental" table.
     * * @param id The database primary key (ID) of the Person.
     * @return A list of Rental objects associated with the given user ID.
     */
    public List<Rental> getReservationByUser(long id) {
        // JPQL query to filter rentals based on the nested person's ID
        return entityManager.createQuery("select r from Rental r where r.person.id = :id", Rental.class)
                .setParameter("id", id)    // Bind the long ID to the :id parameter
                .getResultList();          // Fetch and return the list of results
    }
}