import { html, render } from "lit-html"
import { style } from "./css_searchbar"
import {model} from "../../model";

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
    updateSearch(){
        model.searchText = this.shadowRoot.querySelector("input").value;
    }
    connectedCallback() {
        render(this.content(), this.shadowRoot)
    }

}
customElements.define("search-bar", Module)