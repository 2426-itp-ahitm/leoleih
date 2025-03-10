import "./header/header"
import "./main/main"
import {loadItems} from "./model/item-service";
import {model, subscribe} from "./model";

let oldSearchText: string = undefined;

subscribe(async model => {
    if (model.searchText != oldSearchText) {
        oldSearchText = model.searchText;
        model.items = await loadItems(model.searchText);
    }
})