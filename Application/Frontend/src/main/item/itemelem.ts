import { html, render } from "lit-html"
import { style } from "./css_item"
import { Item } from "../../model/item"

const HTML_NAME = "custom-item"//must contain - because webpack

class Module extends HTMLElement {
    get item() {
        const item: Item = {
            dev_id:  parseInt(this.getAttribute("dev_id")),
            dev_type: this.getAttribute("dev_type"),
            dev_category: parseInt(this.getAttribute("dev_category")),
            dev_serial_nr: this.getAttribute("dev_serial_nr"),
            dev_asset_nr: this.getAttribute("dev_asset_nr"),
            lent_from: parseInt(this.getAttribute("lent_from")),
            return_date: new Date(this.getAttribute("return_date")),
            notes: this.getAttribute("notes"),
            dev_set: this.getAttribute("dev_set"),
        }
        return item;
    }
    constructor() {
        super()
        this.attachShadow({mode: "open"})
        this.shadowRoot.addEventListener('click', (event) => {
            this.shadowRoot.querySelector(".detailview").setAttribute("open", "true")
        });
    }
    async content(){
        const item: Item = this.item
        return html`
        ${style}
        <div class="item${item.dev_id}">
            ${item.dev_serial_nr}
            <custom-detailview class="detailview" open="false" id="${item.dev_id}"></custom-detailview>
        </div>
        `
    }
    async connectedCallback() {
        render(await this.content(), this.shadowRoot)
    }
}
customElements.define(HTML_NAME, Module)