import { html, render } from "lit-html"
import { style, styleSmall } from "./css_category"
import { global, NavSizeType } from "../../../global"

const HTML_NAME = "custom-category" //must contain - because webpack

class Module extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: "open" })
  }
  get svg() {
    return this.getAttribute("svg")
  }
  getCurrentStyle() {
    switch (global.navState) {
      case NavSizeType.BIG:
        return style
      case NavSizeType.SMALL:
        return styleSmall
      default:
        return html` <p>Error loading style</p> `
    }
  }
  content() {
    return html`
      ${this.getCurrentStyle()}
      <div>
        <svg
          class="categoryIcon"
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#e8eaed"
        >
          <path d="${this.svg}" />
        </svg>
      </div>
    `;
  }
  connectedCallback() {
    this.renderElement()
  }
  renderElement() {
    render(this.content(), this.shadowRoot)
  }
}
customElements.define(HTML_NAME, Module)
