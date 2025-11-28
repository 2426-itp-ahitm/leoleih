package at.htlleonding.omnial.DTO;

import at.htlleonding.omnial.model.EquipmentType;

public record EquipmentDTO(
        Long id,
        EquipmentType equipmentType,
        String labelNumber,
        String name,
        String title,
        int itemCount,
        int available,
        String link
){ }
