import {html, render} from "lit-html";
import {style} from "./css_main";
import {loadItems} from "../model/item-service";
import {subscribe} from "../model";
import "./detailview/detailview";
import "./item/itemelem";

const HTML_NAME = "custom-main"
function itemTemplate(id){
    return html`
        <custom-item id="${id}"></custom-item>
    `
}
class Module extends HTMLElement {
    constructor(){
        super()
        this.attachShadow({mode: "open"});
    }
    async content(){
        const items = await loadItems()
        console.log(items);
        const elements = []

        for(let i = 0;i<items.length;i++){
            elements.push(itemTemplate(i+1))
        }
        return html`
            ${style}
            <div style="opacity: ${elements.length === 0 ? 0 : 1}">
                ${elements}
            </div>
        `
    }
    connectedCallback() {
        subscribe(model=>{
            this.renderHTML();
        })
        this.renderHTML();
    }
    async renderHTML(){
        const content = await this.content()
        render(content, this.shadowRoot)
    }
}
customElements.define(HTML_NAME, Module)