import { html } from "lit-html"

const style = html`
    <style>
        div{
            width: 200px;
            height: 150px;
            background-color: rgb(26, 38, 49);
            border-radius: 10px;
            border: 3px none rgba(42, 57, 65, 0.405);
            box-shadow: 0px 4px 40px 5px rgba(42, 57, 65, 0.405);
            display: grid;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease-out;
            cursor: pointer;
        }
        div:hover{
            box-shadow: 0px 4px 40px 5px rgba(71, 96, 110, 0.6);
        }
    </style>
`
export {style}