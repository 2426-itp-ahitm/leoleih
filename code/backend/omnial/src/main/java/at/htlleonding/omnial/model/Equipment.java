package at.htlleonding.omnial.model;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.*;
import java.util.Set;

/**
 * Represents a piece of equipment in the system.
 * Inherits from PanacheEntity, which automatically provides an ID field and static CRUD methods.
 */
@NamedQuery(name = Equipment.FIND_ALL_EQUIPMENT, query = "SELECT e from Equipment e")
@Entity
public class Equipment extends PanacheEntity {

    // Constant for referencing the NamedQuery in repository or service layers
    public static final String FIND_ALL_EQUIPMENT = "Equipment.finAll";

    // Stores the enum value as a String in the database for better readability
    @Enumerated(EnumType.STRING)
    private EquipmentType equipmentType;

    private String labelNumber;

    private String name;

    private String title;

    private int itemCount;

    private int available;

    private String link;

    /**
     * Bi-directional many-to-many relationship with Rental.
     * 'mappedBy' indicates that the Rental entity owns the relationship mapping.
     */
    @ManyToMany(mappedBy = "equipments")
    private Set<Rental> rentals;

    /**
     * Bi-directional many-to-many relationship with Tag.
     * Defines a join table named 'article_tag' to link the two entities.
     */
    @ManyToMany(cascade = { CascadeType.PERSIST, CascadeType.MERGE })
    @JoinTable(
            name = "article_tag",
            joinColumns = @JoinColumn(name = "equipment_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id")
    )
    Set<Tag> tagSet;

    // --- Getters and Seters ---

    public Set<Rental> getRentals() {
        return rentals;
    }

    public void setRentals(Set<Rental> rentals) {
        this.rentals = rentals;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public int getAvailable() {
        return available;
    }

    public void setAvailable(int available) {
        this.available = available;
    }

    public int getItemCount() {
        return itemCount;
    }

    public void setItemCount(int itemCount) {
        this.itemCount = itemCount;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLabelNumber() {
        return labelNumber;
    }

    public void setLabelNumber(String labelNumber) {
        this.labelNumber = labelNumber;
    }

    public EquipmentType getEquipmentType() {
        return equipmentType;
    }

    public void setEquipmentType(EquipmentType equipmentType) {
        this.equipmentType = equipmentType;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Set<Tag> getTagSet() {
        return tagSet;
    }

    public void setTagSet(Set<Tag> tagSet) {
        this.tagSet = tagSet;
    }

    /**
     * Helper method to sync the bi-directional relationship with Tag.
     * Ensures both sides of the relationship are aware of the link.
     */
    public void addTag(Tag tag) {
        tagSet.add(tag);
        tag.equipmentSet.add(this);
    }

    /**
     * Helper method to remove the bi-directional relationship with Tag.
     */
    public void removeTag(Tag tag) {
        tagSet.remove(tag);
        tag.equipmentSet.remove(this);
    }
}