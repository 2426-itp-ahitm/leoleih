package at.htl.leonding.leih.features.Model;

import jakarta.persistence.*;

import java.io.Serializable;
import java.util.List;
import java.util.Set;

@Entity
@NamedQuery(name="DeviceCart.findAll", query="SELECT i FROM DeviceCart i")
@Table(name = "CART_ITEM")
public class DeviceCart{
    @Id
    @GeneratedValue
    private Long id;

    private Long cart_id;
    private Long dev_id;

    public Long getCart_id() {
        return cart_id;
    }
    public DeviceCart() {
    }

    public DeviceCart(Long cart_id, Long dev_id) {
        this.cart_id = cart_id;
        this.dev_id = dev_id;
    }

    public void setCart_id(Long cart_id) {
        this.cart_id = cart_id;
    }

    public Long getDev_id() {
        return dev_id;
    }

    public void setDev_id(Long dev_id) {
        this.dev_id = dev_id;
    }



    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
