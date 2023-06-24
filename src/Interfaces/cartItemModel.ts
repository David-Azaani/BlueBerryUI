import menuItemModel from "./menuItemModel";

export default interface cartItemModel {
  id?: number;
  menuItemId?: string;
  menuItem?: menuItemModel;
  quantity?: number;
}
