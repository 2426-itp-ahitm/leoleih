import { html, render } from "lit-html"
import { style } from "./css_item"
import {global} from "../../global"
import { Item } from "../../model/item"
import { loadItem } from "../../model/item-service"

const HTML_NAME = "custom-item"//must contain - because webpack

class Module extends HTMLElement {
    viewid: number
    static get observedAttributes() {
        return ['id'];
    }
    constructor(){
        super()
        this.attachShadow({mode: "open"})

        this.shadowRoot.addEventListener('click', (event) => {
            this.shadowRoot.querySelector(".detailview").setAttribute("open","true")
        });
    }
    async content(){
        const item: Item = await loadItem(this.viewid)
        
        return html`
        ${style}
        <div class="item${this.viewid}">
            ${item.item_description}
            <br>
            ${item.item_type}
            <custom-detailview class="detailview" open="false" id="${this.viewid}"></custom-detailview>
        </div>
        `
    }
    async connectedCallback() {
        render(await this.content(), this.shadowRoot)
    }
    attributeChangedCallback(name, _oldValue, newValue) {
        this.viewid = newValue
    }
}
customElements.define(HTML_NAME, Module)