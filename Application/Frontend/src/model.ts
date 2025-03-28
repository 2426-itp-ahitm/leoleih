import {Item} from "./model/item";

interface Model {
    readonly searchText?: string,
    readonly items: Item[],
    readonly selectedId?: number,
    readonly category: Category,
    readonly categoryBig: boolean
}

type Category = "all"|"photo_camera"|"video_camera"|"audio_device"|"room_reservation";

export {Model, Category};