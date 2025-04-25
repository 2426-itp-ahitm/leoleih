package at.htl.leonding.leih.features.Model;

import jakarta.persistence.*;

@Entity
public class Cart {
    public Cart() {
    }

    @Id
    @GeneratedValue
    private Long cart_Id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "stud_id", referencedColumnName = "stud_id")
    private Student student;

    @OneToOne(mappedBy = "cart")
    private DeviceCart deviceCart;

    public Cart(Long cart_Id, Student student, DeviceCart deviceCart) {
        this.cart_Id = cart_Id;
        this.student = student;
        this.deviceCart = deviceCart;
    }

    public Long getCartId() {
        return cart_Id;
    }

    public void setCartId(Long cart_Id) {
        this.cart_Id = cart_Id;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public DeviceCart getDeviceCart() {
        return deviceCart;
    }

    public void setDeviceCart(DeviceCart deviceCart) {
        this.deviceCart = deviceCart;
    }
}
