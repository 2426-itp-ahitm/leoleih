import { html, render } from "lit-html"
import { style, styleSmall } from "./css_category"
import {store} from "../../../../store";
import {distinctUntilChanged, map} from "rxjs";
import {produce} from "immer";
import {Category} from "../../../../model";

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
    return this.getAttribute("category") as Category;
  }
  getCurrentStyle(categoryBig: boolean) {
    if (categoryBig) {
      return style;
    } else {
      return styleSmall;
    }
  }
  content(categoryBig: boolean) {
    return html`
      ${this.getCurrentStyle(categoryBig)}
      <div @click=${()=>this.set_category()} >
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
  set_category(){
    console.log("category type clicked and set to search:", this.category);
    const newState = produce(store.getValue(),draft=>{
      //Sets the Search text to the name of the category that then gets used in the item service.
      draft.category = this.category as Category;
    })
    store.next(newState);
  }

  connectedCallback() {
    store
        .pipe(
            map(module=>module.categoryBig),
            distinctUntilChanged()
        )
        .subscribe(categoryBig=>{
      this.renderHTML(categoryBig);
    })
  }
  renderHTML(categoryBig: boolean) {
    render(this.content(categoryBig), this.shadowRoot)
  }
}
customElements.define(HTML_NAME, Module)