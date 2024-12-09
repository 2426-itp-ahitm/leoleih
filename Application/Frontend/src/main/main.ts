import { html, render } from "lit-html"
import { style } from "./css_main"
import "./content/content"
import {global} from "../global"

const htmlName = "custom-main"//must contain - because webpack

class Module extends HTMLElement {
    constructor(){
        super()
        this.attachShadow({mode: "open"})
    }
    content(){
        let content = html`
            ${style}
        `
        return content

    }

    connectedCallback() {
        let content = getContent()
        console.log(content.length);
        if (content.length != 0){
            global.navState = 1
        }else{
            global.navState = 0
        }
        content.forEach(element => {
            this.shadowRoot.innerHTML+=`
            <custom-content contenthtml="${element}"></custom-content>
        `
        });
        render(this.content(), this.shadowRoot)
    }
}
customElements.define(htmlName, Module)

function getContent(){
    let content = ["Nikon D5600","Nikon D3500", "Nikon D3400", "Nikon D3400", "Nikon D3400"]
    return content
}