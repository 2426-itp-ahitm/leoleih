package at.htlleonding.omnial.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/**
 * Entity representing a Person (e.g., student or teacher) in the system.
 * Uses standard JPA annotations for database mapping.
 */
@Entity
// Named queries for optimized and reusable database lookups
@NamedQuery(name = Person.FIND_PERSON_BY_EMAIL, query = "SELECT p from Person p where p.email = :email")
@NamedQuery(name = Person.FIND_PERSON_BY_UUID, query = "SELECT p from Person p where p.person_uuid = :uuid")
@NamedQuery(name = Person.FIND_ALL_PERSONS, query = "SELECT p from Person p")
public class Person {

    // Constants for referring to named queries to prevent typos in the DAO/Repository layer
    public static final String FIND_ALL_PERSONS = "Person.finAll";
    public static final String FIND_PERSON_BY_EMAIL = "Person.findByEmail";
    public static final String FIND_PERSON_BY_UUID = "Person.findByUuid";

    /**
     * Primary Key with a Sequence Generator.
     * Useful for databases like PostgreSQL to handle ID increments efficiently.
     */
    @Id
    @SequenceGenerator(name = "person_seq", sequenceName = "person_seq", allocationSize = 1, initialValue = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "person_seq")
    private int id;

    private String person_uuid; // External unique identifier (e.g., from an Auth provider)
    private String surname;
    private String firstname;
    private String email;
    private String grade; // Optional field for student class/grade

    /**
     * One-to-Many relationship with Rental.
     * @JsonIgnoreProperties prevents infinite JSON loops when serializing
     * (Person -> Rental -> Person -> ...) by ignoring the 'person' field in the Rental object.
     */
    @OneToMany(mappedBy = "person")
    @JsonIgnoreProperties(value = {"person"})
    List<Rental> rentals;

    // --- Getters and Setters ---

    public void setId(int id) {
        this.id = id;
    }

    public String getPerson_uuid() {
        return person_uuid;
    }

    public void setPerson_uuid(String person_uuid) {
        this.person_uuid = person_uuid;
    }

    public List<Rental> getRentals() {
        return rentals;
    }

    public void setRentals(List<Rental> rentals) {
        this.rentals = rentals;
    }

    public int getId() {
        return id;
    }

    public String getUuid() {
        return person_uuid;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getGrade() {
        return grade;
    }

    public void setGrade(String grade) {
        this.grade = grade;
    }
}