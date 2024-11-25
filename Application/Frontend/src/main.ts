import { html, render } from "lit-html"

const content = html`
    <h1>main</h1>
`

class Module extends HTMLElement {
    connectedCallback() {
        render(content, this)
    }
}
customElements.define("custom-main", Module)
