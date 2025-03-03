import {Item} from "./item";
import {model} from "../model";
import {IconType} from "../model/icon";

export async function loadItems(){
    if (model.searchText != ""){
        const response = await fetch("http://localhost:8080/devices");
        const data = await response.json();
        let items = [];
        console.log(data)
        switch (model.searchText){
            case "photo_camera":
                items = data.filter(item => item.dev_category == 1);
                break;
            case "video_camera":
                items = data.filter(item => item.dev_category == 2);
                break;
            case "audio_device":
                items = data.filter(item => item.dev_category	== 3);
                break;
            case "room_reservation":
                items = data.filter(item => item.dev_category	== 4);
                break;
            default:
                console.log(model.searchText)
                items = data;
                break;
        }
        console.log("items: ",items);
        return items;
    }else{
        return [];
    }
}
export async function loadDetail(id){
    const response = await fetch("http://localhost:8080/devices/"+id);
    const data = await response.json();
    return await data as Item;
}