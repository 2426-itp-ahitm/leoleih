package at.htlleonding.omnial.DTO;

import at.htlleonding.omnial.model.Equipment;
import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class EquipmentMapper {

    public static EquipmentDTO toDTO(Equipment equipment) {
        if (equipment == null) return null;
        return new EquipmentDTO(
                equipment.getId(),
                equipment.getEquipmentType(),
                equipment.getLabelNumber(),
                equipment.getName(),
                equipment.getTitle(),
                equipment.getItemCount(),
                equipment.getAvailable(),
                equipment.getLink()
        );
    }

    public static Equipment toEntity(EquipmentDTO dto) {
        if (dto == null) return null;
        Equipment equipment = new Equipment();
        equipment.setId(dto.id());
        equipment.setEquipmentType(dto.equipmentType());
        equipment.setLabelNumber(dto.labelNumber());
        equipment.setName(dto.name());
        equipment.setTitle(dto.title());
        equipment.setItemCount(dto.itemCount());
        equipment.setAvailable(dto.available());
        equipment.setLink(dto.link());
        return equipment;
    }
}
