package at.htl.leonding.leih.features.Model;

import jakarta.persistence.*;

import java.sql.Timestamp;

@Entity
@NamedQuery(name="Room.findAll", query="SELECT i FROM Room i")
public class Room {
    @Id
    @GeneratedValue
    private Long room_id;
    @Column(name = "room_category")
    private Integer roomCategory;
    @Column(name = "return_date")
    private Timestamp returnDate;
    @Column(name = "lent_from")
    private Long lentFrom;

    public Long getRoom_id() {
        return room_id;
    }

    public void setRoom_id(Long room_id) {
        this.room_id = room_id;
    }

    public Integer getRoomCategory() {
        return roomCategory;
    }

    public void setRoomCategory(Integer roomCategory) {
        this.roomCategory = roomCategory;
    }

    public Timestamp getReturnDate() {
        return returnDate;
    }

    public void setReturnDate(Timestamp returnDate) {
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

    String notes;
}
