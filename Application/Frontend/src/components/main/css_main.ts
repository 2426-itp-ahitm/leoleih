import { html } from "lit-html";
const style = html`
  <style>
    div {
      align-items: center;
      justify-content: center;
      display: grid;
      grid-template-columns: repeat(3, 200px);
      gap: 20px;
      margin-top: 3vw;
      transition: all 0.5s ease-out;
    }
    dialog {
      position: fixed;
      top: 50%;
      left: 50%;
      padding: 20px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    }
  </style>
`;
export { style };
