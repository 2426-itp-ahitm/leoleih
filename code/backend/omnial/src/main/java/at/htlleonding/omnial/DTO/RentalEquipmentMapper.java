package at.htlleonding.omnial.DTO;

import at.htlleonding.omnial.model.Rental_Equipment;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class RentalEquipmentMapper {
    public RentalEquipmentDTO toDTO(Rental_Equipment re) {
        if (re == null) return null;
        return new RentalEquipmentDTO(
                re.getId(),
                re.getRental() != null && re.getRental().getId() != null ? re.getRental().getId() : -1,
                re.getEquipment() != null && re.getEquipment().getId() != null ? re.getEquipment().getId() : -1
        );
    }
}
