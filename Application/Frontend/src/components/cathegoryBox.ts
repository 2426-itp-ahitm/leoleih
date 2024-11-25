import { html, render } from "lit-html"

let content = html`

`

class Module extends HTMLElement {

    constructor (svgString: string) {
        super()
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svgString, 'image/svg+xml');
        
    }
    connectedCallback() {
        render(content, this)
    }
}
customElements.define("cathegory-box", Module)