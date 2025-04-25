package at.htl.leonding.leih.features.Model;

import jakarta.persistence.*;

import java.util.List;
import java.util.Set;

@Entity
public class DeviceCart {
    @Id
    @GeneratedValue
    private Long id;

    @OneToOne
    @JoinColumn(name = "cart_Id")
    private Cart cart;

    @OneToMany(mappedBy = "device_cart")
    private Set<Device> devices;
    public DeviceCart() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Cart getCart() {
        return cart;
    }

    public void setCart(Cart cart) {
        this.cart = cart;
    }

    public Set<Device> getDevices() {
        return devices;
    }

    public void setDevices(Set<Device> devices) {
        this.devices = devices;
    }
}
