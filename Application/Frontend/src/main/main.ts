import { html, render } from "lit-html"
import { style } from "./css_main"
import "./content/content"
import { loadItems } from "../model/item-service"
import { Item } from "../model/item"
import "./detailview/detailview"
import "./item/itemelem"

const HTML_NAME = "custom-main"//must contain - because webpack
function itemTemplate(id){
    return html`
        <custom-item id="${id}"></custom-item>
    `
}
class Module extends HTMLElement {
    constructor(){
        super()
        this.attachShadow({mode: "open"})
    }
    async content(){
        const items = await loadItems()
        const elements = []

        for(let i = 0;i<items.length;i++){
            elements.push(itemTemplate(i+1))
        }

        let content = html`
            ${style}
            ${elements}
        `
        return content
    }

    async connectedCallback() {
        const content = await this.content()
        this.shadowRoot.addEventListener('click', (event)=>{
            const target = event.target as HTMLElement
            //console.log("detailview"+target.classList[0].split("item")[1]);
            
            //console.log(this.shadowRoot);

            //this.shadowRoot.querySelector("detailview"+target.classList[0].split("item")[1])
            
        });
        render(content, this.shadowRoot)
    }
}
customElements.define(HTML_NAME, Module)