import {html, render} from "lit-html";
import {style, styleSmall} from "./css_category-container";
import {model, subscribe} from "../../model";
import "./category/category";
import {getIcon} from "../../model/icon-service";
import {IconType} from "../../model/icon";

const HTML_NAME = "category-container";

class Module extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({mode: "open"});
    }
    getCurrentStyle(){
        if(model.searchText == ""){
            return style;
        }else{
            return styleSmall;
        }
    }
    content(){
        return html`
        ${this.getCurrentStyle()}
            <div>
                <custom-category category="photo_camera" svg="${getIcon(IconType.foto)}"></custom-category>
                <custom-category category="video_camera" svg="${getIcon(IconType.video)}"></custom-category>
                <custom-category category="audio_device" svg="${getIcon(IconType.audio)}"></custom-category>
                <custom-category category="room_reservation" svg="${getIcon(IconType.room)}"></custom-category>
            </div>
        `
    }
    renderHTML(){
        render(this.content(), this.shadowRoot);
    }
    connectedCallback() {
        subscribe(model=>{
            this.renderHTML();
        })
        this.renderHTML();
    }
}
customElements.define(HTML_NAME, Module);