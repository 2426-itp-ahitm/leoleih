import { html, render } from "lit-html"
import { style } from "./css_module"

const htmlName = "module-custom"//must contain - because webpack

class Module extends HTMLElement {
    constructor(){
        super()
        this.attachShadow({mode: "open"})
    }
    content(){
        return html`
        ${style}
            <p>Test Module</p>
        `
    }
    connectedCallback() {
        render(this.content(), this.shadowRoot)
    }
}
customElements.define(htmlName, Module)