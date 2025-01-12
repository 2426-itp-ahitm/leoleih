package at.htl.leonding.leih.features.item;

import jakarta.persistence.*;

import java.sql.Timestamp;

@Entity
@NamedQueries({
        @NamedQuery(name="Item.findAll", query="SELECT i FROM Item i"),
        @NamedQuery(name="Item.findById", query="SELECT i FROM Item i WHERE id = :filter_id"),
        @NamedQuery(name="item.findByCategory",query="SELECT i FROM Item i WHERE item_category = :filter")
})
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