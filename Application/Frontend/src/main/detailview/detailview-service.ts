import { Item } from "Model/item"
export async function loadItem(id){
    if (id<=0){
        return
    }
    const response = await fetch("http://localhost:8080/items/"+id)
    const item = await response.json() as Item

    return item
}