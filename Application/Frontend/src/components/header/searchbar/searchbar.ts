import { html, render } from "lit-html"
import { style } from "./css_searchbar"
import {store} from "../../../store";
import {produce} from "immer";

class Module extends HTMLElement {
    constructor(){
        super()
        this.attachShadow({mode: "open"})
    }
    content(){
        return html`
            ${style}
            <input @keyup=${()=> this.updateSearch()} type="text" id="input" placeholder="Search">
        `
    }
    async updateSearch(){
        const newState = produce(store.getValue(),draft=>{
            draft.category = "all";
            draft.searchText = this.shadowRoot.querySelector("input").value;
        })
        store.next(newState);
    }
    connectedCallback() {
        render(this.content(), this.shadowRoot)
    }

}
customElements.define("search-bar", Module)