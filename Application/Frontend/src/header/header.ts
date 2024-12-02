import { style } from "./css_header"
import "./searchbar/searchbar"
import "./cathegorys/cathegorys"

import { html, render } from "lit-html"

class Module extends HTMLElement {
    content(){
        return html`
        ${style}
            <a href="#"><h1 id="title">LeoLei</h1></a>
            
            <search-bar @searchUpdated=${(event: CustomEvent)=>{
                console.log("ja");
            }}></search-bar>

            <custom-cathegorys></custom-cathegorys>
        `
    }
    connectedCallback() {
        render(this.content(), this)
    }
}
customElements.define("custom-header", Module)