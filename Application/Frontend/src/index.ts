import "./components/header/header";
import "./components/main/main";
import { store } from "./store";
import { produce } from "immer";
import { loadItems } from "Model/item-service";
import { distinctUntilChanged, map } from "rxjs";
import { Category } from "./model";
import { getCartItems } from "./model/cart_service";
import { Item } from "./model/item";

interface SearchPrompt {
  searchText: string;
  category: Category;
}

let oldSearchText: string = undefined;

store
  .pipe(
    map((model) => ({
      searchText: model.searchText,
      category: model.category,
    })),
    distinctUntilChanged(
      (prev, curr) =>
        prev.searchText === curr.searchText && prev.category === curr.category,
    ),
  )
  .subscribe(async ({ searchText, category }) => {
    console.log("category:", category);
    const items = await loadItems(searchText);
    const newState = produce(store.getValue(), (draft) => {
      draft.items = items;
    });
    store.next(newState);
  });

//cart
updateCartItems();
async function updateCartItems() {
  const cartItems = await getCartItems(1);
  const newState = produce(store.getValue(), (draft) => {
    draft.cartItems = cartItems;
  });
  store.next(newState);
}
