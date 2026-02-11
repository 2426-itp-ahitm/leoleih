package at.htlleonding.omnial.DTO;

import at.htlleonding.omnial.model.Equipment;
import at.htlleonding.omnial.model.Person;
import at.htlleonding.omnial.model.Rental;
import at.htlleonding.omnial.repository.EquipmentRepository;
import at.htlleonding.omnial.repository.PersonRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

@ApplicationScoped
public class RentalMapper {

    @Inject
    PersonRepository personRepository;

    @Inject
    EquipmentRepository equipmentRepository;

    public RentalDTO toDTO(Rental rental) {
        if (rental == null) return null;
        return new RentalDTO(
                rental.getId(),
                rental.getPerson() != null ? rental.getPerson().getId() : -1,
                rental.getLeaseDate(),
                rental.getReturnDate(),
                rental.isRented(),
                rental.isReturned(),
                rental.getActualReturnDate(),
                rental.getState(),
                rental.getNote(),
                rental.getEquipments().stream().map(Equipment::getId).toArray(Long[]::new)
        );
    }

    public Rental toEntity(RentalDTO dto) {
        if (dto == null) return null;
        Rental r = new Rental();
        r.setId(dto.id());
        Person p = personRepository.getById(dto.personId());
        r.setPerson(p);
        r.setLeaseDate(dto.leaseDate());
        r.setReturnDate(dto.returnDate());
        r.setRented(dto.isRented());
        r.setReturned(dto.isReturned());
        r.setActualReturnDate(dto.actualReturnDate());
        r.setNote(dto.note());

        if (dto.equipmentIds() != null) {
            Set<Equipment> equipments = java.util.Arrays.stream(dto.equipmentIds())
                    .map(id -> equipmentRepository.findById(id))
                    .filter(Objects::nonNull)
                    .collect(Collectors.toSet());
            r.setEquipments(equipments);
        }

        return r;
    }
}
