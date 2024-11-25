import { html, render } from "lit-html"

const content = html`
    <p>HelloWorld</p>
`

class AppComponent extends HTMLElement {
    connectedCallback() {
        render(content, this)
    }
}
customElements.define("app-component", AppComponent)