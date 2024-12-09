import { html, render } from "lit-html"
import { style } from "./css_main"
import "./content/content"
import { loadItems } from "../model/item-service"
import { Item } from "../model/item"

const HTML_NAME = "custom-main"//must contain - because webpack
function itemTemplate(item: Item){
    return html`
        <div>
            ${item.item_description}
            <br>
            ${item.item_type}
        </div>
    `
}
class Module extends HTMLElement {
    constructor(){
        super()
        this.attachShadow({mode: "open"})
    }
    //<custom-content contenthtml="${item}"></custom-content>
    async content(){
        const items = await loadItems()
        const elements = items.map(itemTemplate)
        let content = html`
            ${style}
            ${elements}
        `
        return content
    }

    async connectedCallback() {
        const content = await this.content()
        render(content, this.shadowRoot)
    }
}
customElements.define(HTML_NAME, Module)