import { html } from "lit-html"

const style = html`
    <style>
        div {
            width: 200px;
            height: 200px;
            background-color: rgb(26, 38, 49);
            border-radius: 10px;
            box-shadow: 0px 4px 40px 5px rgba(42, 57, 65, 0.405);
            display: grid;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease-out;
        }
        div:hover {
            box-shadow: 0px 20px 40px 7px rgba(42, 57, 65, 0.405);
            transform: scale(1.04);
        }
        svg{
            transition: all 0.3s ease-out;
            transform: scale(3);
        }
    </style>
`
export {style}