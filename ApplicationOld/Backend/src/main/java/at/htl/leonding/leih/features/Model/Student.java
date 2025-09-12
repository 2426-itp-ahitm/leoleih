package at.htl.leonding.leih.features.Model;

import jakarta.persistence.*;

import java.util.List;

@Entity
@NamedQuery(name="Student.findAll", query="SELECT i FROM Student i")

public class Student {
    @Id
    @GeneratedValue
    private Long stud_id;
    @Column(name = "stud_first_name")
    private String studFirstName;
    @Column(name = "stud_last_name")
    private String studLastName;
    @Column(name = "stud_email")
    private String studEmail;
    @Column(name = "stud_class")
    private String studClass;
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

    public String getStudFirstName() {
        return studFirstName;
    }

    public void setStudFirstName(String studFirstName) {
        this.studFirstName = studFirstName;
    }

    public String getStudLastName() {
        return studLastName;
    }

    public void setStudLastName(String studLastName) {
        this.studLastName = studLastName;
    }

    public String getStudEmail() {
        return studEmail;
    }

    public void setStudEmail(String studEmail) {
        this.studEmail = studEmail;
    }

    public String getStudClass() {
        return studClass;
    }

    public void setStudClass(String studClass) {
        this.studClass = studClass;
    }

    public List<Device> getDevices() {
        return devices;
    }

    public void setDevices(List<Device> devices) {
        this.devices = devices;
    }
}
