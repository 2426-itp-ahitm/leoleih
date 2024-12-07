import { html, render } from "lit-html"
import { style } from "./css_cathegroy"

const htmlName = "custom-cathegroy"//must contain - because webpack

class Module extends HTMLElement {
    svg: string = '';

	static get observedAttributes() {
		return ['svg'];
	}
	
    constructor(){
        super()
        this.attachShadow({mode: "open"})
    }
    content(){
        return html`
        ${style}
            <div><svg class="categoryIcon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="${this.svg}"/></svg></div>
        `
    }
    connectedCallback() {
        render(this.content(), this.shadowRoot)
    }
    attributeChangedCallback(_name, _oldValue, newValue) {
        this.svg = newValue
        this.connectedCallback()
	}
}
customElements.define(htmlName, Module)