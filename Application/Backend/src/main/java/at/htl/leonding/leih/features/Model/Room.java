package at.htl.leonding.leih.features.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.NamedQuery;

import java.sql.Timestamp;

@Entity
@NamedQuery(name="Room.findAll", query="SELECT i FROM Room i")
public class Room {
    @Id
    @GeneratedValue
    private Long room_id;
    private Integer room_category;
    private Timestamp return_date;
    private Long lent_from;

    public Long getRoom_id() {
        return room_id;
    }

    public void setRoom_id(Long room_id) {
        this.room_id = room_id;
    }

    public Integer getRoom_category() {
        return room_category;
    }

    public void setRoom_category(Integer room_category) {
        this.room_category = room_category;
    }

    public Timestamp getReturn_date() {
        return return_date;
    }

    public void setReturn_date(Timestamp return_date) {
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

    String notes;
}
