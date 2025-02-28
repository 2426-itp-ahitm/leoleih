package at.htl.leonding.leih.features.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.sql.Timestamp;

@Entity
@NamedQueries({
    @NamedQuery(name="Device.findAll", query="SELECT i FROM Device i"),
    @NamedQuery(name="Device.findById", query="SELECT i FROM Device i WHERE id = :filter_id"),
    @NamedQuery(name="Device.findByCategory",query="SELECT i FROM Device i WHERE dev_category = :filter")
})
public class Device {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long dev_id;
    String dev_type;
    int dev_category;
    String dev_serial_nr;
    String dev_asset_nr;
    Long lent_from;
    Timestamp return_date;
    String notes;

    public Long getDev_id() {
        return dev_id;
    }

    public void setDev_id(Long dev_id) {
        this.dev_id = dev_id;
    }

    public String getDev_type() {
        return dev_type;
    }

    public void setDev_type(String dev_type) {
        this.dev_type = dev_type;
    }

    public int getDev_category() {
        return dev_category;
    }

    public void setDev_category(int dev_category) {
        this.dev_category = dev_category;
    }

    public String getDev_serial_nr() {
        return dev_serial_nr;
    }

    public void setDev_serial_nr(String dev_serial_nr) {
        this.dev_serial_nr = dev_serial_nr;
    }

    public String getDev_asset_nr() {
        return dev_asset_nr;
    }

    public void setDev_asset_nr(String dev_asset_nr) {
        this.dev_asset_nr = dev_asset_nr;
    }

    public Long getLent_from() {
        return lent_from;
    }

    public void setLent_from(Long lent_from) {
        this.lent_from = lent_from;
    }

    public Timestamp getReturn_date() {
        return return_date;
    }

    public void setReturn_date(Timestamp return_date) {
        this.return_date = return_date;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public String getDev_set() {
        return dev_set;
    }

    public void setDev_set(String dev_set) {
        this.dev_set = dev_set;
    }

    String dev_set;
}