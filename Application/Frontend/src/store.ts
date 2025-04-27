import { BehaviorSubject } from "rxjs";
import { Model } from "./model";

const initialModelState: Model = {
  searchText: "",
  items: [],
  category: "all",
  categoryBig: true,
  detailItem: null,
};

const store = new BehaviorSubject<Model>(initialModelState);

function set(recipe: (model: Model) => void) {
  recipe(store.value);
}
export { store, set };
