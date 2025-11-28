package at.htlleonding.omnial.DTO;

import at.htlleonding.omnial.model.Person;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class PersonMapper {
    public PersonDTO toDTO(Person person){
        if (person == null) return null;
        return new PersonDTO(
                person.getId(),
                person.getUuid(),
                person.getSurname(),
                person.getFirstname(),
                person.getEmail(),
                person.getGrade()
        );
    }
}
