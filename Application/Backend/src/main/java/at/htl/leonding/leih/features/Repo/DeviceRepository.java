package at.htl.leonding.leih.features.Repo;

import at.htl.leonding.leih.features.DTO.DeviceDTO;
import at.htl.leonding.leih.features.Model.Device;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;

import java.util.List;

@ApplicationScoped
public class DeviceRepository {
    @Inject
    EntityManager em;

    public List<Device> findAll() {
        return em.createNamedQuery("Device.findAll", Device.class).getResultList();
    }

    public Device findById(Long id) {
        return em.find(Device.class, id);
    }
    public boolean createNew(DeviceDTO device) {
        em.persist(device);
        return true;
    }

}