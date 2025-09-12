import { Item } from "./model/item";

interface Model {
  readonly searchText?: string;
  readonly items: Item[];
  readonly selectedId?: number;
  readonly category: Category;
  readonly categoryBig: boolean;
  readonly detailItem: Item | null;
  readonly cartOpen: boolean;
  readonly cartItems: Item[];
}

type Category =
  | "all"
  | "photo_camera"
  | "video_camera"
  | "audio_device"
  | "room_reservation";

export { Model, Category };
