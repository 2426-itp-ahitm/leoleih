import { html, render } from "lit-html"
import { style } from "./css_module"
//import {global} from "../global"
import { Item } from "Model/item"

const HTML_NAME = "custom-module"//must contain - because webpack

export async function loadItems(){
    const response = await fetch("http://localhost:8080/items")
    const items = await response.json() as Item[]
    return items
}

class Module extends HTMLElement {
    
    constructor(){
        super()
        this.attachShadow({mode: "open"})
    }
    content(){
        return html`
        ${style}
            <dialog>details:${loadItems}
            </dialog>
        `
    }
    connectedCallback() {
        render(this.content(), this.shadowRoot)
    }
}
customElements.define(HTML_NAME, Module)