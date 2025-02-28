package at.htl.leonding.leih.features.item;

import java.sql.Timestamp;

public record DeviceDTO(
        Long dev_id,
        String dev_set,
        String dev_type,
        int dev_category,
        String dev_serial_nr,
        String dev_asset_nr,
        Long lent_from,
        String notes,
        Timestamp return_date

) {
}
