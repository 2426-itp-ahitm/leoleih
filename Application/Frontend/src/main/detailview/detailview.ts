import { html, render } from "lit-html";
import { style } from "./css_detailview";
import { global } from "../../global";
import { loadItem } from "../../model/item-service";
const HTML_NAME = "custom-detailview"; //must contain - because webpack

class Module extends HTMLElement {
  detailsForId = 0;
  open = true;
  static get observedAttributes() {
    return ["id", "open"];
  }
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  async content() {
    const item = await loadItem(this.detailsForId);

    return html`
      ${style}
      <dialog id="detailDialog${this.id}">
        <p>description:${item.item_description}</p>
        <p>category:${item.item_category}</p>
        <p>set:${item.item_set}</p>
        <p>type:${item.item_type}</p>
        <button @click=${() => this.closeDialog()}>
          Close
        </button>
      </dialog>
    `;
  }
  closeDialog(){
    const dialog = this.shadowRoot.querySelector("dialog");
    console.log('dialog:',dialog);
    dialog.close();
    setTimeout(() => {//"Fixes" a bug where the dialog would open again after closing
      this.setAttribute("open", "false");
      dialog.close();
    }, 10);
  }
  attributeChangedCallback(name: "id" | "open", _: string, newValue: string) {
    switch (name) {
      case "id":
        this.detailsForId = parseInt(newValue);
        break;
      case "open":
        console.log('att change open:',newValue);

        if (newValue === "true") {
          try {
            this.shadowRoot.querySelector("dialog").show();
          } catch (e) {
            console.log(e);
          }
        }
        break;
    }

    this.connectedCallback();
  }
  async connectedCallback() {
    render(await this.content(), this.shadowRoot);
  }
}
customElements.define(HTML_NAME, Module);
