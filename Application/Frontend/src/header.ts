import "./components/searchbar"
import { html, render } from "lit-html"

const content = html`
    <a href="#"><h1 id="title">LeoLei</h1></a>
    <search-bar></search-bar>
    
    <style>
        #title{
            font-size: 60px;
            user-select: none;
            color: #6cb6dd;
        }
    </style>
`

class Header extends HTMLElement {
    connectedCallback() {
        render(content, this)
    }
}
customElements.define("custom-header", Header)