import { html, render } from "lit-html"
import { style } from "./css_searchButton"

const htmlName = "search-button"
const content = html`
    ${style}
        <p>😀</p>
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