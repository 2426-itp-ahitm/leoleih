import { html } from "lit-html";

const style = html`
    <style>
        svg {
            user-select: none;
            width: 300px;
            margin-bottom: 2em;
        }

        div {
            display: grid;
            text-align: center;
            margin-top: 20vh;
            font-family: "Passion One", sans-serif;
            position: sticky;
        }

        a {
            margin-left: auto;
            margin-right: auto;
            width: 30vw;
            text-decoration: none;
            filter: drop-shadow(0 0 30px rgba(108, 182, 221, 0.68));
        }
    </style>
`
export { style }
