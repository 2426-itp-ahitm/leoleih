package at.htl.leonding.leih.features.Model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@NamedQuery(name="Eq.findAll", query="SELECT i FROM Equipment i")
public class Equipment {
    @Id
    @GeneratedValue
    private Long equ_id;
    @Column(name = "equ_type")
    private String equType;
    @Column(name = "equ_set")
    private String equSet;
    @Column(name = "return_date")
    private Date returnDate;
    @Column(name = "lent_from")
    private Long lentFrom;
    private String notes;
    @Column(name = "equ_category")
    private Long equCategory;

    public String getEquSet() {
        return equSet;
    }

    public void setEquSet(String equSet) {
        this.equSet = equSet;
    }

    public Long getEquCategory() {
        return equCategory;
    }

    public void setEquCategory(Long equCategory) {
        this.equCategory = equCategory;
    }

    public Long getEqu_id() {
        return equ_id;
    }

    public void setEqu_id(Long equ_id) {
        this.equ_id = equ_id;
    }


    public String getEquType() {
        return equType;
    }

    public void setEquType(String equType) {
        this.equType = equType;
    }

    public Date getReturnDate() {
        return returnDate;
    }

    public void setReturnDate(Date returnDate) {
        this.returnDate = returnDate;
    }

    public Long getLentFrom() {
        return lentFrom;
    }

    public void setLentFrom(Long lentFrom) {
        this.lentFrom = lentFrom;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}
