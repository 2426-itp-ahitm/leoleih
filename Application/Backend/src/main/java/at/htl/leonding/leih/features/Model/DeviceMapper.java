package at.htl.leonding.leih.features.item;

import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class DeviceMapper {
    DeviceDTO toResource(Device device) {
        return new DeviceDTO(device.dev_id, device.dev_type, device.notes, device.dev_category,device.dev_serial_nr,
                 device.dev_set,device.lent_from, device.dev_asset_nr,device.return_date);
    }
    Device fromResource(DeviceDTO deviceDTO){
        Device device = new Device();
        device.dev_category = deviceDTO.dev_category();
        device.dev_type = deviceDTO.dev_type();
        device.dev_set = deviceDTO.dev_set();
        device.dev_serial_nr = deviceDTO.dev_serial_nr();
        device.dev_asset_nr = deviceDTO.dev_asset_nr();
        device.lent_from = deviceDTO.lent_from();
        device.notes = deviceDTO.notes();
        return device;
    }
}
