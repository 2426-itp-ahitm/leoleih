package at.htl.leonding.leih.model;

import at.htl.leonding.leih.features.item.Item;
import at.htl.leonding.leih.features.item.ItemDTO;

import java.util.ArrayList;
import java.util.List;

public class Room extends Item {
    public Room() {
        super();
    }
    public static List<Room> rooms = new ArrayList<>();

    public static List<Room> getallRooms(){
        return rooms;
    }

    public void addRoom(Room room){
        rooms.add(room);
    }
}
