package at.htlleonding.omnial.DTO;

import at.htlleonding.omnial.model.Person;
import at.htlleonding.omnial.model.Rental;
import at.htlleonding.omnial.repository.PersonRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class RentalMapper {

    @Inject
    PersonRepository personRepository;

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
                rental.getStatus(),
                rental.getNote()
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
        return r;
    }
}
