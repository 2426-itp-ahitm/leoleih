package at.htl.leonding.leih.model;

import jakarta.persistence.*;

import java.sql.Timestamp;

@Entity
@NamedQuery(name="Item.findAll", query="SELECT i FROM Item i")
public class Item {
    @Id
    private String item_set;
    private String item_description;
    private String item_type;
    private int item_category;
    private String serial_nr;
    private String lent_from;
    private Timestamp return_date;
    private String notes;



    public Item(String item_set, String item_description, String item_type, int item_category, String serial_nr, String lent_from, Timestamp return_date, String notes) {
        this.item_set = item_set;
        this.item_description = item_description;
        this.item_type = item_type;
        this.item_category = item_category;
        this.serial_nr = serial_nr;
        this.lent_from = lent_from;
        this.return_date = return_date;
        this.notes = notes;
    }

    public Item() {

    }
}
