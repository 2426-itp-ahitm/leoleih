package at.htl.leonding.leih.features.Repo;

import at.htl.leonding.leih.features.Model.Teacher;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;

import java.util.List;

@ApplicationScoped
public class TeacherRepository {
    @Inject
    EntityManager em;

    public List<Teacher> getAll() {
        return em.createNamedQuery("Teacher.findAll", Teacher.class).getResultList();
    }
}
