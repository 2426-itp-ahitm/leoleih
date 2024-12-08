import { html, render } from "lit-html"
import { style, styleSmall } from "./css_cathegroy"
import {global} from "../../../global"

const htmlName = "custom-cathegroy"//must contain - because webpack

class Module extends HTMLElement {
    svg: string = '';

    constructor(){
        super()
        this.attachShadow({mode: "open"})
    }
    static get observedAttributes() {
        return ['svg'];
    }
    getCurrentStyle(){
        switch(global.navState){
            case 0:
                return style
            case 1:
                return styleSmall
            default:
                return html`
                    <p>Error loading style</p>
                `
        }
    }
    content(){
        return html`
        ${this.getCurrentStyle()}
            <div><svg class="categoryIcon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="${this.svg}"/></svg></div>
        `
    }
    connectedCallback() {
        render(this.content(), this.shadowRoot)
    }
    attributeChangedCallback(_name, _oldValue, newValue) {
        console.log(newValue);
        
        this.svg = newValue
        this.connectedCallback()
	}
}
customElements.define(htmlName, Module)