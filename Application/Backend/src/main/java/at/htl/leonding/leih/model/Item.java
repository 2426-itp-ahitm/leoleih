package at.htl.leonding.leih.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.NamedQuery;

@NamedQuery(name=FotoCam.QUERY_FIND_ALL, query="SELECT i FROM Item i ")
@Entity
public class Item {
    public static String QUERY_FIND_ALL = "select * from item";
    @Id
    private int id;
    private String item_description;
    private String name;

    public Item(int id, String name) {
        this.id = id;
        this.name = name;
    }

    public Item() {

    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}
