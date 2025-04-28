import "./components/header/header";
import "./components/main/main";
import { store } from "./store";
import { produce } from "immer";
import { loadItems } from "Model/item-service";
import { distinctUntilChanged, map } from "rxjs";
import { Category } from "./model";

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
        prev.searchText === curr.searchText &&
        prev.category === curr.category
    ),
  )
  .subscribe(async (searchPrompt, category) => {
    if (searchPrompt.searchText != oldSearchText) {
      oldSearchText = searchPrompt.searchText;
      const items = await loadItems(searchPrompt.searchText);
      const newState = produce(store.getValue(), (draft) => {
        draft.items = items;
      });
      store.next(newState);
    }
  });
