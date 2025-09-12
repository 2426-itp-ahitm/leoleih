import { Item } from "./item";
import { produce } from "immer";
import { store } from "../store";

export function addItemToBasket(itemId: number) {
  fetch("http://localhost:8080/cart/1/" + itemId, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(""), // Convert object to JSON string
  })
    .then((response) => response.json())
    .then((data) => console.log("Server Response:", data))
    .catch((error) => console.error("Error:", error));
}

export async function getCartItems(id: number) {
  const response = await fetch("http://localhost:8080/cart/" + id);
  const data = await response.json();
  return (await data) as Item[];
}

export async function updateCartItems() {
  const cartItems = await getCartItems(1);
  const newState = produce(store.getValue(), (draft) => {
    draft.cartItems = cartItems;
  });
  store.next(newState);
}
