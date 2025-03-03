import { html, render } from "lit-html";
import { style } from "./css_detailview";
import { loadDetail } from "../../model/item-service";
import { Item } from "Model/item";

const HTML_NAME = "custom-detailview"; //must contain - because webpack

class Module extends HTMLElement {
  detailsForId = 0;
  open = true;

  static get observedAttributes() {
    return ["id", "open"];
  }

  constructor() {
    super();
    this.attachShadow({mode: "open"});
  }

  async content() {
    let item: Item
    try{
      item = await loadDetail(this.detailsForId);
    }catch (e){
      console.error("error", e);
      return;
    }
    return html`
      ${style}
      <dialog id="detailDialog${this.id}">
        <p>dev_id:${item.dev_id}</p>
        <p>dev_type:${item.dev_type}</p>
        <p>dev_category:${item.dev_category}</p>
        <p>dev_serial_nr:${item.dev_serial_nr}</p>
        <p>dev_asset_nr:${item.dev_asset_nr}</p>
        <p>lent_from:${item.lent_from}</p>
        <p>return_date:${item.return_date}</p>
        <p>notes:${item.notes}</p>
        <p>dev_set:${item.dev_set}</p>
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
        if (newValue === "true") {
          try {
            this.shadowRoot.querySelector("dialog").showModal();
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
