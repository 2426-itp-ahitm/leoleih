package at.htlleonding.omnial.model;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.quarkus.hibernate.orm.panache.PanacheEntity;
import io.smallrye.common.constraint.NotNull;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Entity
public class Rental extends PanacheEntity {

    @ManyToOne
    @JsonIgnoreProperties(value = {"rentals"})

    public Person person;

    public Date leaseDate;

    public Date returnDate;

    public boolean isRented;

    public boolean isReturned;

    public Date actualReturnDate;

    @Enumerated(EnumType.STRING)
    @NotNull
    public State state = State.AUSSTEHEND;

    public String note;

    @ManyToMany(cascade = { CascadeType.PERSIST, CascadeType.MERGE }, fetch = FetchType.EAGER)
    @JoinTable(
            joinColumns = @JoinColumn(name = "rental_id"),
            inverseJoinColumns = @JoinColumn(name = "equipment_id"),
            name = "rental_equipment"
    )
    private Set<Equipment> equipments = new java.util.HashSet<>();

// Brauchen ma des überhaupt? - Timon
//    public Rental() {
//    }
//
//    public Rental(Person person, Date leaseDate, Date returnDate, boolean isRented, boolean isReturned, State state) {
//        this.person = person;
//        this.leaseDate = leaseDate;
//        this.returnDate = returnDate;
//        this.isRented = isRented;
//        this.isReturned = isReturned;
//        this.state = state;
//    }


    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public Set<Equipment> getEquipments() {
        return equipments;
    }

    public void setEquipments(Set<Equipment> equipments) {
        this.equipments = equipments;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public Person getPerson() {
        return person;
    }

    public void setPerson(Person person) {
        this.person = person;
    }

    public Date getLeaseDate() {
        return leaseDate;
    }

    public void setLeaseDate(Date leaseDate) {
        this.leaseDate = leaseDate;
    }

    public Date getReturnDate() {
        return returnDate;
    }

    public void setReturnDate(Date returnDate) {
        this.returnDate = returnDate;
    }

    public boolean isReturned() {
        return isReturned;
    }

    public void setReturned(boolean returned) {
        isReturned = returned;
    }

    public boolean isRented() {
        return isRented;
    }

    public void setRented(boolean rented) {
        isRented = rented;
    }

    public Date getActualReturnDate() {
        return actualReturnDate;
    }

    public void setActualReturnDate(Date actualReturnDate) {
        this.actualReturnDate = actualReturnDate;
    }

    public State getState() {
        return state;
    }

    public void setState(State state) {
        this.state = state;
    }
}
