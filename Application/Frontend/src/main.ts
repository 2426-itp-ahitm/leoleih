import { html, render } from "lit-html"

class Module extends HTMLElement {
    connectedCallback() {
        render(this.content(), this)
    }
    content(){
        return html`
            <h1>main</h1>
        `
    }
}
customElements.define("custom-main", Module)
