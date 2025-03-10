import { html, render } from "lit-html"
import { style } from "./css_searchbar"
import {model} from "../../model";
import {loadItems} from "Model/item-service";

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
        model.searchText = this.shadowRoot.querySelector("input").value;
    }
    connectedCallback() {
        render(this.content(), this.shadowRoot)
    }

}
customElements.define("search-bar", Module)