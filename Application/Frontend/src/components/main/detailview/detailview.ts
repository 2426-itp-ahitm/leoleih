import { html, render } from "lit-html";
import { style } from "./css_detailview";
import { Item } from "Model/item";

const HTML_NAME = "custom-detailview"; //must contain - because webpack

class Module extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({mode: "open"});
  }

  async content() {
    let item: Item
    try{
      //item = await loadDetail(this.detailsForId);
    }catch (e){
      console.error("error", e);
      return;
    }
    if(item == undefined){
      return html``;
    }
    return html`
      ${style}
      <dialog id="detailDialog${this.id}">
        <h2>${item.dev_type}</h2>
        <p>Lent From: ${item.lent_from}</p>
        <p>Return Date: ${item.return_date}</p>
        <p>Notes: ${item.notes}</p>
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
  async connectedCallback() {
    render(await this.content(), this.shadowRoot);
  }
}
customElements.define(HTML_NAME, Module);
