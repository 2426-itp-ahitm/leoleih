package at.htlleonding.omnial.DTO;

public record PersonDTO(
        int id,
        String uuid,
        String surname,
        String firstname,
        String email,
        String grade
) {}
