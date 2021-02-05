import { MenuItem } from "../menu-item/menu-item.model";
import { CardItem } from "./cart-item.model";

export class ShoppingCartService {
  items: CardItem[];

  constructor() {
      this.items = []
  }

  addItem(item: MenuItem) {
    let foundItem = this.items.find(((mItem) => mItem.menuItem.id === item.id));

    if (foundItem) {
      foundItem.quantity = foundItem.quantity + 1;
    } else {
      this.items.push(new CardItem(item));
    }
  }

  removeItem(item: CardItem) {
    this.items.splice(this.items.indexOf(item), 1);
  }

  clear() {
    this.items = [];
  }

  total(): number {
    return this.items.map((item) => item.value()).reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0,
    );
  }
}
