package at.htl.leonding.leih.features.item;

import jakarta.persistence.*;

import java.sql.Timestamp;

@Entity
@NamedQuery(name="Item.findAll", query="SELECT i FROM Item i")
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String item_description;
    String item_type;
    int item_category;
    String serial_nr;
    String lent_from;
    Timestamp return_date;
    String item_set;
    String notes;
}