import { html, render } from "lit-html"
import { style } from "./css_detailview"
import {global} from "../../global"
import {loadItem} from "../../model/item-service"
const HTML_NAME = "custom-detailview"//must contain - because webpack

class Module extends HTMLElement {
    detailsForId: number = 0;
    open: boolean = true
    static get observedAttributes() {
        return ['id','open'];
    }
    constructor(){
        super()
        this.attachShadow({mode: "open"})

        this.shadowRoot.addEventListener('click', (event) => {
            this.shadowRoot.querySelector("dialog").close()
        });
    }
    async content(){
        const item = await loadItem(this.detailsForId)
        
        try{            
            return html`
            ${style}
                <dialog id="detailDialog${this.id}">
                    <p>description:${item.item_description}</p>
                    <p>category:${item.item_category}</p>
                    <p>set:${item.item_set}</p>
                    <p>type:${item.item_type}</p>
                    <button>Close</button>
                </dialog>
            `
        }catch(e){
            //console.log(e);
        }

    }
    getOpenStatus(){
        console.log(this.open);
        
        if (this.open){
            return open
        }else{
            return
        }
    }
    attributeChangedCallback(name, _oldValue, newValue) {
        switch(name){
            case "id":                              
                this.detailsForId = parseInt(newValue)
                break;
            case "open":
                console.log(newValue);
                
                if (newValue === "true"){
                    try{
                        console.log(this.shadowRoot.children);
                        
                        this.shadowRoot.querySelector("dialog").show()

                    }catch(e){
                        console.log(e);
                    }
                }
                break;
        }
        
        this.connectedCallback()
    }
    async connectedCallback() {
        render( await this.content(), this.shadowRoot)
    }
}
customElements.define(HTML_NAME, Module)