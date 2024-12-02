import { html } from "lit-html"

const style = html`
    <style>
        #title{
            font-size: 60px;
            user-select: none;
            color: #6cb6dd;
        }
        search-bar {
            padding-left: 20px;
            padding-right: 20px;
            padding-top: 10px;
            padding-bottom: 10px;

            background-color: rgb(51, 77, 100);

            border-radius: 30px;
            border: 0px solid rgba(0, 0, 0, 0);

            width: 25%;
            transition: all 0.2s ease-out;
        }
    </style>
`
export {style}