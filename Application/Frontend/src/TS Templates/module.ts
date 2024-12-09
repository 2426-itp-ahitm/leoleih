import { html, render } from "lit-html"
import { style } from "./css_module"
import {global} from "../global"

const HTML_NAME = "custom-module"//must contain - because webpack

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
customElements.define(HTML_NAME, Module)