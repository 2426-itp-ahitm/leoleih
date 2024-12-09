import { style } from "./css_header"
import "./searchbar/searchbar"
import "./category-container/category-container"

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
        <a href="#"><h1 id="title">LeoLeih</h1></a>

        <search-bar
          @searchUpdated=${(event: CustomEvent) => {
            console.log("updated searchbars: ", event.detail)
            this.renderElement()
          }}
        ></search-bar>

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
