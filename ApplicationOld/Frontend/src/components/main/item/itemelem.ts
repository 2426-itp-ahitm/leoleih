import { html, render } from "lit-html";
import { style } from "./css_item";
import { Item } from "Model/item";
import { getIcon } from "Model/icon-service";
import { IconType } from "Model/icon";
import { store } from "../../../store";
import { produce } from "immer";

const HTML_NAME = "custom-item"; //must contain - because webpack

class Module extends HTMLElement {
  get item() {
    const itemdata: Item = store
      .getValue()
      .items.filter((i) => i.dev_id === Number(this.getAttribute("dev_id")))[0];
    let dev_category_enum: IconType = IconType.foto;
    switch (parseInt(itemdata.dev_category)) {
      case 1:
        dev_category_enum = IconType.foto;
        break;
      case 2:
        dev_category_enum = IconType.video;
        break;
      case 3:
        dev_category_enum = IconType.audio;
        break;
      case 4:
        dev_category_enum = IconType.room;
    }
    let item: Item = {
      dev_id: itemdata.dev_id,
      dev_type: itemdata.dev_type,
      dev_category: dev_category_enum,
      dev_serial_nr: itemdata.dev_serial_nr,
      dev_asset_nr: itemdata.dev_asset_nr,
      lent_from: itemdata.lent_from,
      return_date: itemdata.return_date,
      notes: itemdata.notes,
      dev_set: itemdata.dev_set,
    };
    return item;
  }
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.addEventListener("click", (event) => {
      const newState = produce(store.getValue, (draft) => {
        draft.selectedId = this.item.dev_id;
      });
    });
  }
  async content() {
    const item: Item = this.item;
    let icon: IconType;
    switch (item.dev_category) {
      case IconType.foto:
        icon = IconType.foto;
        break;
      case IconType.video:
        icon = IconType.video;
        break;
      case IconType.audio:
        icon = IconType.audio;
        break;
      case IconType.room:
        icon = IconType.room;
        break;
    }
    return html`
      ${style}
      <div
        class="item${item.dev_id}"
        @click=${() => {
          const newState = produce(store.getValue(), (draft) => {
            draft.detailItem = this.item;
          });
          store.next(newState);
        }}
      >
        <div id="box">
          <svg
            class="categoryIcon"
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e8eaed"
          >
            <path d="${getIcon(icon)}" />
          </svg>
          <h4>${item.dev_type}</h4>
        </div>
      </div>
    `;
  }
  stringToEnum<T>(value: string, enumObj: T): T[keyof T] | undefined {
    return (Object.values(enumObj) as unknown as string[]).includes(value)
      ? (value as unknown as T[keyof T])
      : undefined;
  }
  async connectedCallback() {
    render(await this.content(), this.shadowRoot);
  }
}
customElements.define(HTML_NAME, Module);
