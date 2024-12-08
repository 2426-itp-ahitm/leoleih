import { html, render } from "lit-html"
import { style } from "./css_content"

const htmlName = "custom-content"//must contain - because webpack

class Module extends HTMLElement {
    contenthtml: string = 'empty';

    static get observedAttributes() {
        return ['contenthtml'];
    }
    constructor(){
        super()
        this.attachShadow({mode: "open"})
    }
    content(){
        console.log(this.contenthtml);
        
        return html`
        ${style}
            <div>
                ${this.contenthtml}
            </div>
        `
    }
    connectedCallback() {
        render(this.content(), this.shadowRoot)
    }
    attributeChangedCallback(_name, _oldValue, newValue) {
        this.contenthtml = newValue
        console.log(newValue);
        
        this.connectedCallback()
    }
}
customElements.define(htmlName, Module)
