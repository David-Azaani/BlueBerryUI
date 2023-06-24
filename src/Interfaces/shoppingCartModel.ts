import cartItemModel from "./cartItemModel";

export default interface shoppingCartModel {
  id?: number;
  userId?: string;
  cartItems?: cartItemModel[];
  cartTotal?: number;
  stripPaymentIntentId?: string;
  cartTotalItems?: number;
  clientSecret?: any;
}
