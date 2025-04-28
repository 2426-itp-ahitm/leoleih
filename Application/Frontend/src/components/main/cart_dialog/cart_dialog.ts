import { html, render } from "lit-html";
import { produce } from "immer";
import { store } from "../../../store";
import { style } from "./css_dialog";
import { getCartItems, addItemToBasket } from "../../../model/cart_service";
import { distinctUntilChanged, map } from "rxjs";
import { Item } from "Model/item";

const HTML_NAME = "custom-cart-dialog"; //must contain - because webpack

function cartItemTemplate(item) {
  console.log(item);
  return html`<p>${item.dev_type}</p>`;
}

class Module extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  content(items: Item[]) {
    const elements = [];

    for (let i = 0; i < items.length; i++) {
      elements.push(cartItemTemplate(items[i]));
    }
    console.log(elements);
    return html`
      ${style}
      <dialog id="cartDialog" open>
        <div>${elements}</div>
        <button @click=${() => this.closeCartDialog()}>Close</button>
      </dialog>
    `;
  }
  connectedCallback() {
    store
      .pipe(
        map((module) => ({
          cartItems: module.cartItems,
        })),
        distinctUntilChanged((prev, curr) => prev.cartItems === curr.cartItems),
      )
      .subscribe(({ cartItems }) => {
        this.renderHTML(cartItems);
      });
  }
  async renderHTML(items: Item[]) {
    render(this.content(items), this.shadowRoot);
  }
  closeCartDialog() {
    const newState = produce(store.getValue(), (draft) => {
      draft.cartOpen = false;
    });
    store.next(newState);
  }
}
customElements.define(HTML_NAME, Module);
