import { addDecimals } from "./addDecimals";

export const updateCart = (state) => {
  //Calculate items price
  state.itemsPrice = state.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  //Calculate shipping price (over 100 is free, otherwise $10)

  state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);
  //Calculate tax price

  state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)));
  //Calculate total price

  state.totalPrice = (
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice)
  ).toFixed(2);

  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};
