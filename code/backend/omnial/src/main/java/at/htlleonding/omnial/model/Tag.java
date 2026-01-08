package at.htlleonding.omnial.model;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.*;

import java.util.Set;

@Entity
public class Tag extends PanacheEntity {
    @Enumerated
    @Column(nullable = false)
    TagType type;

    @ManyToMany(mappedBy="tagSet")
    Set<Equipment> equipmentSet;

    public TagType getType() {
        return type;
    }

    public void setType(TagType type) {
        this.type = type;
    }

    public Set<Equipment> getEquipmentSet() {
        return equipmentSet;
    }
    public void addEquipment(Equipment equipment) {
        equipmentSet.add(equipment);
        equipment.tagSet.add(this);
    }

    public void removeEquipment(Equipment equipment) {
        equipmentSet.remove(equipment);
        equipment.tagSet.remove(this);
    }

    public void setEquipmentSet(Set<Equipment> equipmentSet) {
        this.equipmentSet = equipmentSet;
    }
}
