import { Item } from "./item";
import {model} from "../model";

export async function loadItems(){
    if (model.searchText != ""){
        const response = await fetch("http://localhost:8080/items");
        const items = await response.json() as Item[];
        switch (model.searchText){
            case "photo_camera":
                return items.filter(item => item.item_description == "photo_camera");
            case "video_camera":
                return items.filter(item => item.item_description == "video_camera");
            case "audio_device":
                return items.filter(item => item.item_description == "audio_device");
            default:
                console.log(model.searchText)
                return items;
        }
    }else{
        return [];
    }
}
export async function loadItem(id){
    const response = await fetch("http://localhost:8080/items/"+id);
    const item = await response.json() as Item;
    return item;
}