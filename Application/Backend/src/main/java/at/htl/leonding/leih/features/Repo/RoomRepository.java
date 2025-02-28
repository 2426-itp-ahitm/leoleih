package at.htl.leonding.leih.features.Repo;

import at.htl.leonding.leih.features.Model.Room;
import io.quarkus.deployment.annotations.ProduceWeak;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;

import java.util.List;

@ApplicationScoped
public class RoomRepository {
    @Inject
    EntityManager em;

    public List<Room> getRooms() {
        return em.createNamedQuery("Room.findAll", Room.class).getResultList();
    }
}
