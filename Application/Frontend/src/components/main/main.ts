import { html, render } from "lit-html";
import { style } from "./css_main";
import { store } from "../../store";
import "./detailview/detailview";
import "./item/itemelem";
import { distinctUntilChanged, map } from "rxjs";
import { Item } from "Model/item";

const HTML_NAME = "custom-main";

function itemTemplate(item) {
  if (item == undefined) {
    return html``;
  }
  return html`
        <custom-item dev_id="${item.dev_id}"}"></custom-item>
    `;
}

class Module extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  content(items: Item[]) {
    const elements = [];
    for (let i = 0; i < items.length; i++) {
      elements.push(itemTemplate(items[i]));
    }
    return html`
      ${style}
      <div style="opacity: ${elements.length === 0 ? 0 : 1}">${elements}</div>
      <custom-detailview></custom-detailview>
    `;
  }

  connectedCallback() {
    store
      .pipe(
        map((module) => module.items),
        distinctUntilChanged(),
      )
      .subscribe((items) => {
        this.renderHTML(items);
      });
  }

  async renderHTML(items: Item[]) {
    render(this.content(items), this.shadowRoot);
  }
}

customElements.define(HTML_NAME, Module);
