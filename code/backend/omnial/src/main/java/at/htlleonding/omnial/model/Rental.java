package at.htlleonding.omnial.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.quarkus.hibernate.orm.panache.PanacheEntity;
import io.smallrye.common.constraint.NotNull;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Set;

/**
 * Entity representing a Rental transaction.
 * Extends PanacheEntity for simplified database access (Active Record pattern).
 */
@Entity
public class Rental extends PanacheEntity {

    /**
     * The person who is renting the equipment.
     * @JsonIgnoreProperties avoids circular references when serializing to JSON.
     */
    @ManyToOne
    @JsonIgnoreProperties(value = {"rentals"})
    public Person person;

    public Date leaseDate;        // When the equipment was taken
    public Date returnDate;       // The scheduled/expected return date
    public boolean isRented;      // Flag indicating if the equipment is currently out
    public boolean isReturned;    // Flag indicating if the transaction is completed
    public Date actualReturnDate; // The actual date the equipment was brought back

    /**
     * Current status of the rental (e.g., PENDING, APPROVED, REJECTED).
     * Defaults to AUSSTEHEND (Pending).
     */
    @Enumerated(EnumType.STRING)
    @NotNull
    public State state = State.AUSSTEHEND;

    public String note; // Optional comments or damage reports

    /**
     * The set of equipment included in this specific rental.
     * Uses EAGER fetching to ensure equipment details are loaded with the rental.
     * 'rental_equipment' acts as the bridge table.
     */
    @ManyToMany(cascade = { CascadeType.PERSIST, CascadeType.MERGE }, fetch = FetchType.EAGER)
    @JoinTable(
            joinColumns = @JoinColumn(name = "rental_id"),
            inverseJoinColumns = @JoinColumn(name = "equipment_id"),
            name = "rental_equipment"
    )
    private Set<Equipment> equipments = new java.util.HashSet<>();

    // Note to Timon: Quarkus/Hibernate requires a no-args constructor.
    // Since this is a PanacheEntity, the default one is provided automatically if no other
    // constructors are present. If you add a custom constructor, you MUST manually add the empty one back.

    // --- Getters and Setters ---

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