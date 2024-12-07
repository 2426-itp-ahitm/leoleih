import { style } from "./css_header"
import "./searchbar/searchbar"
import "./cathegorys/cathegorys"

import { html, render } from "lit-html"

const htmlName = "custom-header"//must contain - because webpack

class Module extends HTMLElement {
    constructor(){
        super()
        this.attachShadow({mode: "open"})
    }
    content(){
        return html`
        ${style}
        <div>
            <a href="#"><h1 id="title">LeoLeih</h1></a>
                
            <search-bar @searchUpdated=${(event: CustomEvent)=>{
                console.log("ja");
            }}></search-bar>

            <custom-cathegorys></custom-cathegorys>
        </div>

        `
    }
    connectedCallback() {
        render(this.content(), this.shadowRoot)
    }
}
customElements.define(htmlName, Module)