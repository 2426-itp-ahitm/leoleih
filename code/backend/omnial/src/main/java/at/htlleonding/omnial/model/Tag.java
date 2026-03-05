package at.htlleonding.omnial.model;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.*;

import java.util.Set;

/**
 * Entity representing a Tag that can be assigned to multiple pieces of equipment.
 * Extends PanacheEntity to provide built-in ID handling and CRUD methods.
 */
@Entity
public class Tag extends PanacheEntity {

    /**
     * The category or type of the tag (e.g., "ELECTRONICS", "CABLE", "CAMERA").
     * Mapped as an ordinal enum by default (use EnumType.STRING if you prefer readable DB values).
     */
    @Enumerated
    @Column(nullable = false)
    TagType type;

    /**
     * The set of equipment associated with this tag.
     * 'mappedBy' indicates that the Equipment entity is the owner of this relationship.
     */
    @ManyToMany(mappedBy="tagSet")
    Set<Equipment> equipmentSet;

    // --- Getters and Setters ---

    public TagType getType() {
        return type;
    }

    public void setType(TagType type) {
        this.type = type;
    }

    public Set<Equipment> getEquipmentSet() {
        return equipmentSet;
    }

    public void setEquipmentSet(Set<Equipment> equipmentSet) {
        this.equipmentSet = equipmentSet;
    }

    /**
     * Helper method to maintain the bi-directional relationship.
     * Ensures the tag is added to the equipment's set as well.
     * * @param equipment The equipment to link with this tag.
     */
    public void addEquipment(Equipment equipment) {
        equipmentSet.add(equipment);
        equipment.tagSet.add(this);
    }

    /**
     * Helper method to safely remove the bi-directional relationship.
     * * @param equipment The equipment to un-link from this tag.
     */
    public void removeEquipment(Equipment equipment) {
        equipmentSet.remove(equipment);
        equipment.tagSet.remove(this);
    }
}