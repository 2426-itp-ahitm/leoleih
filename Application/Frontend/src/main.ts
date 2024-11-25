import { html, render } from "lit-html"

const content = html`
    <h1>main</h1>
`

class Main extends HTMLElement {
    connectedCallback() {
        render(content, this)
    }
}
customElements.define("custom-main", Main)
