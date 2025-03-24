import {Item} from "./item";
import {Category} from "../model";
import {produce} from "immer";
import {store} from "../store";

async function loadItems(searchText: string, category: Category) : Promise<Item[]> {
    if(!searchText) {
        console.log("Search text not found.");
    }
    if (searchText){
        const response = await fetch("http://localhost:8080/devices");
        const data = await response.json();
        let items = [];
        console.log(data)
        switch (category){
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
                items = data;
                break;
        }
        console.log("items: ",items);

        //updates category view state
        const newState = produce(store.getValue(),draft=>{
            draft.categoryBig = items.length == 0;
        })
        store.next(newState);

        return items;
    }else {
        //updates category view state
        const newState = produce(store.getValue(),draft=>{
            draft.categoryBig = true;
        })
        store.next(newState);
        return [];
    }
}
async function loadDetail(id){
    const response = await fetch("http://localhost:8080/devices/"+id);
    const data = await response.json();
    return await data as Item;
}

export {loadItems, loadDetail};