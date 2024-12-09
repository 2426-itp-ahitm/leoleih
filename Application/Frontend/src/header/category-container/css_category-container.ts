import { html } from "lit-html"

const style = html`
    <style>
        div {
            margin-top: 30px;
            justify-content: center;
            display: grid;
            grid-template-columns: repeat(4, 200px);
            gap: 30px;
            cursor: pointer;
            transition: all 0.3s ease-out;
        }
        @media screen and (max-width: 968px) {
            div{
                grid-template-columns: repeat(2, 200px);

            }
        }
        @media screen and (max-width: 568px) {
            div{
                grid-template-columns: repeat(1, 200px);
            }
        }
    </style>
`
const styleSmall = html`
    <style>
        div {
            margin-top: 30px;
            justify-content: center;
            display: grid;
            grid-template-columns: repeat(4, 80px);
            gap: 2px;
            cursor: pointer;
            transition: all 0.3s ease-out;
        }
        @media screen and (max-width: 968px) {
            div{
                grid-template-columns: repeat(2, 200px);

            }
        }
        @media screen and (max-width: 568px) {
            div{
                grid-template-columns: repeat(1, 200px);
            }
        }
    </style>
`
export {style}
export {styleSmall}