import { html, render } from "lit-html";
import { style } from "./css_main";
import { store } from "../../store";
import "./item/itemelem";
import { distinctUntilChanged, map } from "rxjs";
import { Item } from "Model/item";
import { produce } from "immer";

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

  content(items: Item[], detailItem: Item | undefined, cartOpen: boolean) {
    const elements = [];
    for (let i = 0; i < items.length; i++) {
      elements.push(itemTemplate(items[i]));
    }
    console.log(detailItem);
    return html`
      ${style}
      <div style="opacity: ${elements.length === 0 ? 0 : 1}">${elements}</div>

      <button id="cartButton" @click=${() => this.openCartDialog()}></button>

      ${detailItem != undefined
        ? html`
            <dialog id="detailDialog" open>
              <h2>${detailItem.dev_type}</h2>
              ${detailItem.notes != ""
                ? html`<p>Notizen: ${detailItem.notes}</p>`
                : html`Keine Notizen`}
              <button @click=${() => this.closeDetailDialog()}>Close</button>
            </dialog>
          `
        : html``}
      ${cartOpen
        ? html`
            <dialog id="cartDialog" open>
              <h2>cart</h2>
              <p>Items in card</p>
              <button @click=${() => this.closeCartDialog()}>Close</button>
            </dialog>
          `
        : html``}
    `;
  }
  //Detail Dialog
  closeDetailDialog() {
    const newState = produce(store.getValue(), (draft) => {
      draft.detailItem = undefined;
    });
    store.next(newState);
  }
  //Cart Dialog
  openCartDialog() {
    const newState = produce(store.getValue(), (draft) => {
      draft.cartOpen = true;
    });
    store.next(newState);
  }
  closeCartDialog() {
    const newState = produce(store.getValue(), (draft) => {
      draft.cartOpen = false;
    });
    store.next(newState);
  }
  connectedCallback() {
    store
      .pipe(
        map((module) => ({
          items: module.items,
          detailItem: module.detailItem,
          cartOpen: module.cartOpen,
        })),
        distinctUntilChanged(
          (prev, curr) =>
            prev.items === curr.items &&
            prev.detailItem === curr.detailItem &&
            prev.cartOpen === curr.cartOpen,
        ),
      )
      .subscribe(({ items, detailItem, cartOpen }) => {
        this.renderHTML(items, detailItem, cartOpen);
      });
  }

  async renderHTML(
    items: Item[],
    detailItem: Item | undefined,
    basketOpen: boolean,
  ) {
    render(this.content(items, detailItem, basketOpen), this.shadowRoot);
  }
}

customElements.define(HTML_NAME, Module);
