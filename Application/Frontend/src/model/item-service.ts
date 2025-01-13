import { Item } from "./item";

export async function loadItems(){
    const response = await fetch("http://localhost:8080/items")
    const items = await response.json() as Item[]
    return items
}
export async function loadItem(id){  

    const response = await fetch("http://localhost:8080/items/"+id)
    const item = await response.json() as Item
    
    return item
}