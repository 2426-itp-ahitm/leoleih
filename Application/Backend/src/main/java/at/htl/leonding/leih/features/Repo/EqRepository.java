package at.htl.leonding.leih.features.Repo;

import at.htl.leonding.leih.features.Model.Equipment;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;

import java.util.List;

@ApplicationScoped
public class EqRepository {
    @Inject
    EntityManager em;

    public List<Equipment> getEquipments() {
        return em.createNamedQuery("Eq.findAll", Equipment.class).getResultList();
    }
}
