package at.htlleonding.omnial.DTO;

import at.htlleonding.omnial.model.Room;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class RoomMapper {
    public RoomDTO toDTO(Room room) {
        if (room == null) return null;
        return new RoomDTO(room.getId(), room.getName(), room.getDescription());
    }

    public Room toEntity(RoomDTO dto) {
        if (dto == null) return null;
        Room room = new Room();
        room.setId(dto.id());
        room.setName(dto.name());
        room.setDescription(dto.description());
        return room;
    }
}
