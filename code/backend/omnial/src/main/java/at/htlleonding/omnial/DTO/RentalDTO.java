package at.htlleonding.omnial.DTO;

import java.util.Date;

public record RentalDTO(
        Long id,
        int personId,
        Date leaseDate,
        Date returnDate,
        boolean isRented,
        boolean isReturned,
        Date actualReturnDate
) {}
