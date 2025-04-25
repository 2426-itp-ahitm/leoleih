package at.htl.leonding.leih.features.Model;

import jakarta.persistence.*;
import org.jboss.resteasy.spi.touri.MappedBy;

import java.util.Collection;
import java.util.List;

@Entity
@NamedQuery(name="Student.findAll", query="SELECT i FROM Student i")

public class Student {
    @Id
    @GeneratedValue
    private Long stud_id;
    private String stud_first_name;
    private String stud_last_name;
    private String stud_email;
    private String stud_class;
    @OneToOne(mappedBy = "student")
    private Cart cart;
    @OneToMany(mappedBy = "lent_from")
    private List<Device> devices;

    public Long getStud_id() {
        return stud_id;
    }

    public void setStud_id(Long stud_id) {
        this.stud_id = stud_id;
    }

    public String getStud_first_name() {
        return stud_first_name;
    }

    public void setStud_first_name(String stud_first_name) {
        this.stud_first_name = stud_first_name;
    }

    public String getStud_last_name() {
        return stud_last_name;
    }

    public void setStud_last_name(String stud_last_name) {
        this.stud_last_name = stud_last_name;
    }

    public String getStud_email() {
        return stud_email;
    }

    public void setStud_email(String stud_email) {
        this.stud_email = stud_email;
    }

    public String getStud_class() {
        return stud_class;
    }

    public void setStud_class(String stud_class) {
        this.stud_class = stud_class;
    }

    public List<Device> getDevices() {
        return devices;
    }

    public void setDevices(List<Device> devices) {
        this.devices = devices;
    }
}
