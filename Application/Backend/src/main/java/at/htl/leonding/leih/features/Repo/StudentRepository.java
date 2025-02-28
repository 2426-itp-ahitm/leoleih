package at.htl.leonding.leih.features.Repo;

import at.htl.leonding.leih.features.Model.Student;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;

import java.util.List;

@ApplicationScoped
public class StudentRepository {

    @Inject
    EntityManager em;

    public List<Student> getAllStudents() {
        return em.createNamedQuery("Student.findAll", Student.class).getResultList();
    }
}
