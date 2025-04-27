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

    public List getCart(Long id) {
        return em.createQuery("select i from DeviceCart i where i.cart_id=:id").setParameter("id", id).getResultList();
    }
    public List<DeviceCart> getAllCarts() {
        return em.createNamedQuery("DeviceCart.findAll", DeviceCart.class).getResultList();
    }
    public void reserveDevice(Long userId, Long deviceId) {
        DeviceCart cart = new DeviceCart(userId, deviceId);
        em.persist(cart);
    }
}
