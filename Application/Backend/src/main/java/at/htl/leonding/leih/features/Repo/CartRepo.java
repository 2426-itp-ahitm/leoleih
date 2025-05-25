package at.htl.leonding.leih.features.Repo;


import at.htl.leonding.leih.features.Model.DeviceCart;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;

import java.util.List;

@ApplicationScoped
public class CartRepo {
    @Inject
    EntityManager em;

    public List<DeviceCart> getCart(Long id) {
        return em.createQuery("select i from DeviceCart i where i.cart_id=:id", DeviceCart.class).setParameter("id", id).getResultList();
    }
    public List<DeviceCart> getAllCarts() {
        return em.createNamedQuery("DeviceCart.findAll", DeviceCart.class).getResultList();
    }
    public void reserveDevice(Long userId, Long deviceId) {
        Long id = (long) getAllCarts().size();
        id++;

        DeviceCart cart = new DeviceCart(id, userId, deviceId);
        em.persist(cart);
    }
}
