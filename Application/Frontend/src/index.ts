import "./components/header/header";
import "./components/main/main";
import {store} from "./store";
import {produce} from "immer";
import {loadItems} from "Model/item-service";
import {distinctUntilChanged, map} from "rxjs";
import {Category} from "./model";

interface SearchPrompt{
    searchText: string;
    category: Category;
}

let oldSearchText: string = undefined;

store
    .pipe(
        map(model => {
            //returns a SearchPrompt
            return ({
                searchText: model.searchText,
                category: model.category
            });
        }),
        distinctUntilChanged()
    )
    .subscribe(async searchPrompt => {
    if (searchPrompt.searchText != oldSearchText) {
        oldSearchText = searchPrompt.searchText;
        const items = await loadItems(searchPrompt.searchText, searchPrompt.category);
        const newState = produce(store.getValue(), draft=>{
            draft.items = items;
        });
        store.next(newState);
    }
})