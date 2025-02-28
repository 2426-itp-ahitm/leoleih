package at.htl.leonding.leih.features.Model;

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
    String dev_set;
}