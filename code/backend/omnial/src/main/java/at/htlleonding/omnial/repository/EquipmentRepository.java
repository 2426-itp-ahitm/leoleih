package at.htlleonding.omnial.repository;

import at.htlleonding.omnial.model.Equipment;
import at.htlleonding.omnial.model.EquipmentType;
import at.htlleonding.omnial.model.Person;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;

import java.util.List;

/**
 * Repository for Equipment operations.
 * Extends PanacheRepository to provide standard CRUD, but uses EntityManager
 * for custom JPQL queries involving complex joins and aggregations.
 */
@ApplicationScoped
public class EquipmentRepository implements PanacheRepository<Equipment> {

    @Inject
    EntityManager entityManager;

    /**
     * Executes the pre-defined NamedQuery located in the Equipment entity.
     * @return List of all equipment.
     */
    public List<Equipment> getAll(){
        return entityManager.createNamedQuery(Equipment.FIND_ALL_EQUIPMENT, Equipment.class).getResultList();
    }

    /**
     * Filters equipment by its category (e.g., AUDIO, VIDEO).
     */
    public List<Equipment> getEquipmentByType(EquipmentType type) {
        return entityManager.createQuery("select e from Equipment e where e.equipmentType = :type", Equipment.class)
                .setParameter("type", type)
                .getResultList();
    }

    /**
     * Retrieves all items that have a stock count of at least 1.
     */
    public List<Equipment> getEquipmentAvailable() {
        return entityManager.createQuery("select e from Equipment e where e.available >= 1", Equipment.class)
                .getResultList();
    }

    /**
     * Ranks equipment by how many times it has appeared in a Rental.
     * Logic: Joins Rental with Equipment and counts occurrences per Equipment ID.
     */
    public List<Equipment> getEquipmentMostPopular() {
        return entityManager.createQuery("select e from Rental r join r.equipments e group by e.id order by count(r) DESC", Equipment.class)
                .getResultList();
    }

    /**
     * Returns equipment ordered by the most recent lease date.
     */
    public List<Equipment> getEquipmentRecently() {
        return entityManager.createQuery("select e from Rental r join r.equipments e order by r.leaseDate DESC", Equipment.class)
                .getResultList();
    }

    /**
     * Retrieves a history of equipment rented by a specific person,
     * likely to suggest items they might want to "Rent Again".
     */
    public List<Equipment> getEquipmentAgain(long id) {
        return entityManager.createQuery("select e from Rental r join r.equipments e where r.person.id = :id order by r.leaseDate DESC", Equipment.class)
                .setParameter("id", id)
                .getResultList();
    }

    /**
     * Finds equipment currently in the possession of a specific user
     * (where the rental has not yet been marked as returned).
     */
    public List<Equipment> getEquipmentByUser(long id) {
        return entityManager.createQuery("select e from Rental r join r.equipments e where r.person.id = :id and r.isReturned=false", Equipment.class)
                .setParameter("id", id)
                .getResultList();
    }
}