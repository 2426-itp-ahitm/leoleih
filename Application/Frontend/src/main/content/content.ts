import { html, render } from "lit-html"
import { style } from "./css_content"
import { Item } from "Model/item";
//TODO:Use content.ts and model
const HTML_NAME = "custom-content"//must contain - because webpack
class Module extends HTMLElement {
    itemId: string = 'empty';

    static get observedAttributes() {
        return ['contenthtml'];
    }
    constructor(){
        super()
        this.attachShadow({mode: "open"})
    }
    content(){        
        return html`
        ${style}
            <div>
                
            </div>
        `
    }
    connectedCallback() {
        render(this.content(), this.shadowRoot)
    }
    attributeChangedCallback(_name, _oldValue, newValue) {
        //this.contenthtml = newValue        
        this.connectedCallback()
    }
}
customElements.define(HTML_NAME, Module)
