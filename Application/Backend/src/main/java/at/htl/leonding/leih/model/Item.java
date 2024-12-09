package at.htl.leonding.leih.model;

import jakarta.persistence.*;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

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
    public Item() {}

    public static List<Item> allItems = new ArrayList<>();

    public static List<Item> getallItems(){
        return allItems;
    }

    public static void addItem(Item item){
        allItems.add(item);
    }

    public String getItem_set() {
        return item_set;
    }

    public void setItem_set(String item_set) {
        this.item_set = item_set;
    }

    public String getItem_description() {
        return item_description;
    }

    public void setItem_description(String item_description) {
        this.item_description = item_description;
    }

    public String getItem_type() {
        return item_type;
    }

    public void setItem_type(String item_type) {
        this.item_type = item_type;
    }

    public int getItem_category() {
        return item_category;
    }

    public void setItem_category(int item_category) {
        this.item_category = item_category;
    }

    public String getSerial_nr() {
        return serial_nr;
    }

    public void setSerial_nr(String serial_nr) {
        this.serial_nr = serial_nr;
    }

    public String getLent_from() {
        return lent_from;
    }

    public void setLent_from(String lent_from) {
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

    public static List<Item> getAllItems() {
        return allItems;
    }

    public static void setAllItems(List<Item> allItems) {
        Item.allItems = allItems;
    }
}
