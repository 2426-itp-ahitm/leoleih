package at.htlleonding.omnial.DTO;

import at.htlleonding.omnial.model.State;

import java.util.Date;

//TODO auf frontend aunpassen
public record RentalDTO(
        Long id,
        int personId,
        Date leaseDate,
        Date returnDate,
        boolean isRented,
        boolean isReturned,
        Date actualReturnDate,
        State status,
        String note
) {}
