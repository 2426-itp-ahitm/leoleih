import { html, render } from "lit-html";
import { style, styleSmall } from "./css_category-container";
import {model, Model, subscribe} from "../../model";
import "./category/category";
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
                <custom-category category="photo_camera" svg="M480-260q75 0 127.5-52.5T660-440q0-75-52.5-127.5T480-620q-75 0-127.5 52.5T300-440q0 75 52.5 127.5T480-260Zm0-80q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM160-120q-33 0-56.5-23.5T80-200v-480q0-33 23.5-56.5T160-760h126l74-80h240l74 80h126q33 0 56.5 23.5T880-680v480q0 33-23.5 56.5T800-120H160Zm0-80h640v-480H638l-73-80H395l-73 80H160v480Zm320-240Z"></custom-category>
                <custom-category category="video_camera" svg="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h480q33 0 56.5 23.5T720-720v180l160-160v440L720-420v180q0 33-23.5 56.5T640-160H160Zm0-80h480v-480H160v480Zm0 0v-480 480Z"></custom-category>
                <custom-category category="audio_device" svg="M480-40v-80h280v-40H600v-320h160v-40q0-116-82-198t-198-82q-116 0-198 82t-82 198v40h160v320H200q-33 0-56.5-23.5T120-240v-280q0-74 28.5-139.5T226-774q49-49 114.5-77.5T480-880q74 0 139.5 28.5T734-774q49 49 77.5 114.5T840-520v400q0 33-23.5 56.5T760-40H480ZM200-240h80v-160h-80v160Zm480 0h80v-160h-80v160ZM200-400h80-80Zm480 0h80-80Z"></custom-category>
                <custom-category category="room_reservation" svg="M120-120v-80h80v-640h400v40h160v600h80v80H680v-600h-80v600H120Zm160-640v560-560Zm160 320q17 0 28.5-11.5T480-480q0-17-11.5-28.5T440-520q-17 0-28.5 11.5T400-480q0 17 11.5 28.5T440-440ZM280-200h240v-560H280v560Z"></custom-category>
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