import {html, render} from "lit-html";
import {style, styleSmall} from "./css_category-container";
import {store} from "../../../store";
import "./category/category";
import {getIcon} from "Model/icon-service";
import {IconType} from "Model/icon";
import {distinctUntilChanged, map} from "rxjs";

const HTML_NAME = "category-container";

class Module extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({mode: "open"});
    }
    getCurrentStyle(searchText: string){
        if(searchText == ""){
            return style;
        }else{
            return styleSmall;
        }
    }
    content(searchText: string){
        return html`
        ${this.getCurrentStyle(searchText)}
            <div>
                <custom-category category="photo_camera" svg="${getIcon(IconType.foto)}"></custom-category>
                <custom-category category="video_camera" svg="${getIcon(IconType.video)}"></custom-category>
                <custom-category category="audio_device" svg="${getIcon(IconType.audio)}"></custom-category>
                <custom-category category="room_reservation" svg="${getIcon(IconType.room)}"></custom-category>
            </div>
        `
    }
    renderHTML(searchText: string){
        render(this.content(searchText), this.shadowRoot);
    }
    connectedCallback() {
        store
            .pipe(
                map(model=>model.searchText),
                distinctUntilChanged()
            )
            .subscribe(searchText=>{
            this.renderHTML(searchText);
        })
    }
}
customElements.define(HTML_NAME, Module);