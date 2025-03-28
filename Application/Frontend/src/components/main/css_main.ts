import { html } from "lit-html"
const style = html`
    <style>
        div{
            align-items: center;
            justify-content: center;
            display: grid;
            grid-template-columns: repeat(3, 200px);
            gap: 20px;
            margin-top: 3vw;
            transition: all 0.5s ease-out;
        }
    </style>
`
export {style}