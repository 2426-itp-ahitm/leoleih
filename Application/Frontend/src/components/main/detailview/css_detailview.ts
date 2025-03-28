import { html } from "lit-html"

const style = html`
    <style>
        dialog{
            position:fixed;
            width:80%;
            height:60%;
            top: 50%;
            bottom: 50%;
            border-radius: 30px;
            justify-content: center;
            align-items: center;

            border: 3px solid rgba(41, 47, 57, 0.70);
            background-color:rgba(41, 47, 57, 0.76);
            backdrop-filter: blur(8px);

            cursor: auto;
        }
    </style>
`
export {style}