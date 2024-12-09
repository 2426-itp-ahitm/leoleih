package at.htl.leonding.leih.features.item;

import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ItemMapper {
    ItemDTO toResource(Item item) {
        return new ItemDTO(item.id, item.item_description, item.item_type);
    }
    Item fromResource(ItemDTO itemDTO){
        Item item = new Item();
        item.id = itemDTO.id();
        item.item_description = itemDTO.item_description();
        item.item_type = itemDTO.item_type();
        return item;
    }
}
