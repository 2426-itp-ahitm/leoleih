import { html, render } from "lit-html";
import { style } from "./css_detailview";
import { Item } from "Model/item";
import { store } from "../../../store";
import { distinctUntilChanged, map } from "rxjs";

const HTML_NAME = "custom-detailview";
class Module extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    store
      .pipe(
        map((model) => {
          return {
            detailView: model.detailView,
            detailItem: model.detailItem,
          };
        }),
        distinctUntilChanged(),
      )
      .subscribe((detailViewState) => {
        render(this.content(), this.shadowRoot);
      });
  }

  async content() {
    let item: Item = store.getValue().detailItem;
    if (!item) return html``;
    return html`
      ${style}
      <dialog id="detailDialog${this.id}" open>
        <h2>${item.dev_type}</h2>
        <p>Lent From: ${item.lent_from}</p>
        <p>Return Date: ${item.return_date}</p>
        <p>Notes: ${item.notes}</p>
        <button @click=${() => this.closeDialog()}>Close</button>
      </dialog>
    `;
  }
  closeDialog() {
    const dialog = this.shadowRoot.querySelector("dialog");
    console.log("dialog:", dialog);
    dialog.close();
  }
  async connectedCallback() {
    render(await this.content(), this.shadowRoot);
  }
}
customElements.define(HTML_NAME, Module);
