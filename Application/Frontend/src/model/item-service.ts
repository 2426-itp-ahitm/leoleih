import { Item } from "./item";

export async function loadItems(){
    const response = await fetch("http://localhost:8080/getAll/fotoCams")
    const items = await response.json() as Item[]
    return items
}