import { html } from "lit-html"

const style = html`
    <style>
        #searchbar {
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

        #searchbar:focus {
            width: 45%;
            border: 3px solid rgba(255, 255, 255, 0.545);
            box-shadow: 0px 10px 10px rgba(255, 255, 255, 0.053);

        }
    </style>
`

export {style} 