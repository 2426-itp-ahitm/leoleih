import { style } from "./css_header"
import "./searchbar/searchbar"
import "./category-container/category-container"
import { logo_svg } from "./logo_svg"
import { html, render } from "lit-html"

const HTML_NAME = "custom-header" //must contain - because webpack

class Module extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: "open" })
  }
  content() {
    return html`
      ${style}
      <div>
        <a href="#">${logo_svg}</h1></a>

        <search-bar></search-bar>

        <category-container></category-container>
      </div>
    `;
  }
  renderElement() {
    render(this.content(), this.shadowRoot)
  }
  connectedCallback() {
    this.renderElement()
  }
}
customElements.define(HTML_NAME, Module)
