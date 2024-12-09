package at.htl.leonding.leih.features.item;

import jakarta.persistence.*;

import java.sql.Timestamp;

public record ItemDTO(
        Long id,
        String item_description,
        String item_type
) {
}
