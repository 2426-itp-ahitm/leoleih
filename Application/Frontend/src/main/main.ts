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

    async connectedCallback() {
        let content = getContent()
        console.log((await content).length);
        if ((await content).length != 0){
            global.navState = 1
        }else{
            global.navState = 0
        }
        (await content).forEach(element => {
            this.shadowRoot.innerHTML+=`
            <custom-content contenthtml="${element}"></custom-content>
        `
        });
        render(this.content(), this.shadowRoot)
    }
}
customElements.define(htmlName, Module)

async function getContent(){
    let content = []

    await fetch("http://localhost:8080/getAll/fotoCams")
        .then(response => response.json())
        .then(data => {
            data.forEach(element => {
                content.push(element.item_description)
            });
        });
    
    return content
}