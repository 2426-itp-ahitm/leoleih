import { html, render } from "lit-html"
import { style } from "./css_module"

const htmlName = "module-custom"//must contain - because webpack
const content = html`
    ${style}
        <p>Test Module</p>
    `

class Module extends HTMLElement {
    constructor(){
        super()
        this.attachShadow({mode: "open"})
    }
    connectedCallback() {
        render(content, this.shadowRoot)
    }
}
customElements.define(htmlName, Module)