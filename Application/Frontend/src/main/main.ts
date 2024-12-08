import { html, render } from "lit-html"
import { style } from "./css_main"
import "./content/content"

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
    getContent(){
        let content = ["ding","dfs"]
        return content
    }
    connectedCallback() {
        let content = this.getContent()
        content.forEach(element => {
            this.shadowRoot.innerHTML+=`
            <custom-content contenthtml="${element}"></custom-content>
        `
        });
        render(this.content(), this.shadowRoot)
    }
}
customElements.define(htmlName, Module)
