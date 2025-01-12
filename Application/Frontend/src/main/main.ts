import { html, render } from "lit-html"
import { style } from "./css_main"
import "./content/content"
import { loadItems } from "../model/item-service"
import { Item } from "../model/item"
import "./detailview/detailview"

const HTML_NAME = "custom-main"//must contain - because webpack
function itemTemplate(item: Item, id){
    return html`
        <div style="border: 1px solid red" class="item${id}"
            ${item.item_description}
            <br>
            ${item.item_type}
        </div>
    `
}
function detailTemplate(id){
    return html`
        <custom-detailview class="detailview${id}" open="true"></custom-detailview>
    `
}
class Module extends HTMLElement {
    constructor(){
        super()
        this.attachShadow({mode: "open"})

        this.shadowRoot.addEventListener('click', (event)=>{
            const target = event.target as HTMLElement
            console.log("detailview"+target.classList[0].split("item")[1]);
            
            console.log(this.shadowRoot.querySelector("detailview"+target.classList[0].split("item")[1]));
            
        });

    }
    async content(){
        const items = await loadItems()
        const elements = []
        let detailViews = []

        for(let i = 0;i<items.length;i++){
            detailViews.push(detailTemplate(i))
            elements.push(itemTemplate(items[i], i))
        }

        let content = html`
            ${style}
            ${elements}
            ${detailViews}
        `
        return content
    }

    async connectedCallback() {
        const content = await this.content()
        render(content, this.shadowRoot)
    }
}
customElements.define(HTML_NAME, Module)