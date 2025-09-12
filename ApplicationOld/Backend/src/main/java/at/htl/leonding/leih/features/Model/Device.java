package at.htl.leonding.leih.features.Model;
import jakarta.persistence.*;

import java.sql.Timestamp;

@Entity
@NamedQueries({
    @NamedQuery(name="Device.findAll", query="SELECT i FROM Device i"),
    @NamedQuery(name="Device.findById", query="SELECT i FROM Device i WHERE id = :filter_id"),
    @NamedQuery(name="Device.findByCategory",query="SELECT i FROM Device i WHERE devCategory = :filter")
})
public class Device {
    @Id
    @GeneratedValue()
    private Long dev_id;
    @Column(name = "dev_type")
    private String devType;
    @Column(name = "dev_category")
    private int devCategory;
    @Column(name = "dev_serial_nr")
    private String devSerialNr;
    @Column(name = "dev_asset_nr")
    private String devAssetNr;
    @Column(name = "return_date")
    private Timestamp returnDate;
    private String notes;
    @ManyToOne
    @JoinColumn(name = "lent_from")
    private Student lent_from;

    public Long getDev_id() {
        return dev_id;
    }

    public void setDev_id(Long dev_id) {
        this.dev_id = dev_id;
    }

    public String getDevType() {
        return devType;
    }

    public void setDevType(String devType) {
        this.devType = devType;
    }

    public int getDevCategory() {
        return devCategory;
    }

    public void setDevCategory(int devCategory) {
        this.devCategory = devCategory;
    }

    public String getDevSerialNr() {
        return devSerialNr;
    }

    public void setDevSerialNr(String devSerialNr) {
        this.devSerialNr = devSerialNr;
    }

    public String getDevAssetNr() {
        return devAssetNr;
    }

    public void setDevAssetNr(String devAssetNr) {
        this.devAssetNr = devAssetNr;
    }


    public Timestamp getReturnDate() {
        return returnDate;
    }

    public void setReturnDate(Timestamp returnDate) {
        this.returnDate = returnDate;
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

    public Student getLent_from() {
        return lent_from;
    }

    public void setLent_from(Student lent_from) {
        this.lent_from = lent_from;
    }
}