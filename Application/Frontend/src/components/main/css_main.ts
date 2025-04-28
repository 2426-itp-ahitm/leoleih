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
      top: 2%;
      left: 2%;
      padding: 20px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
      width: 80%;
      height: 80%;
    }
    #cartButton {
      position: fixed;
      top: 0vw;
      right: 0vw;
      width: 40px;
      height: 40px;
      background-color: #f0f0f0;
      border-radius: 50%;
      cursor: pointer;
    }
  </style>
`;
export { style };
