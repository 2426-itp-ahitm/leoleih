import { html, render } from "lit-html"
import { style, styleSmall } from "./css_category"
import {model, subscribe} from "../../../model";

const HTML_NAME = "custom-category";
class Module extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({ mode: "open" })
  }
  get svg() {
    return this.getAttribute("svg");
  }
  get category(){
    return this.getAttribute("category");
  }
  getCurrentStyle() {
    if (model.searchText == "") {
      return style;
    } else {
      return styleSmall;
    }
  }
  content() {
    return html`
      ${this.getCurrentStyle()}
      <div @click=${()=>this.set_category_to_search()} >
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
  set_category_to_search(){
    console.log("cathegory type clicked and set to search:",this.category)
    model.searchText = this.category;
  }

  connectedCallback() {
    subscribe(model=>{
      this.renderHTML();
    })
    this.renderHTML()
  }
  renderHTML() {
    render(this.content(), this.shadowRoot)
  }
}
customElements.define(HTML_NAME, Module)