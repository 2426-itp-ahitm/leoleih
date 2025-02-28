package at.htl.leonding.leih.features.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.NamedQuery;

import java.security.Timestamp;
import java.util.Date;

@Entity
@NamedQuery(name="Eq.findAll", query="SELECT i FROM Equipment i")
public class Equipment {
    @Id
    @GeneratedValue
    Long equ_id;
    String equ_type;
    Date return_date;
    Long lent_from;
    String notes;
    Long equ_category;

    public Long getEqu_category() {
        return equ_category;
    }

    public void setEqu_category(Long equ_category) {
        this.equ_category = equ_category;
    }

    public Long getEqu_id() {
        return equ_id;
    }

    public void setEqu_id(Long equ_id) {
        this.equ_id = equ_id;
    }


    public String getEqu_type() {
        return equ_type;
    }

    public void setEqu_type(String equ_type) {
        this.equ_type = equ_type;
    }

    public Date getReturn_date() {
        return return_date;
    }

    public void setReturn_date(Date return_date) {
        this.return_date = return_date;
    }

    public Long getLent_from() {
        return lent_from;
    }

    public void setLent_from(Long lent_from) {
        this.lent_from = lent_from;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}
