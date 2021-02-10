import { Injectable } from "@angular/core";
import { NotificationService } from "app/shared/messages/notification.service";
import { MenuItem } from "../menu-item/menu-item.model";
import { CartItem } from "./cart-item.model";

@Injectable()
export class ShoppingCartService {
  items: CartItem[];

  constructor(private notificationService: NotificationService) {
    this.items = [];
  }

  addItem(item: MenuItem) {
    let foundItem = this.items.find(((mItem) => mItem.menuItem.id === item.id));

    if (foundItem) {
      this.increaseQty(foundItem);
    } else {
      this.items.push(new CartItem(item));
    }

    // Publicando a mensagens para os ouvintes
    this.notificationService.notify(`Você adicionou o item ${item.name}`)
  }
  
  increaseQty(item: CartItem) {
    item.quantity = item.quantity + 1;
  }
  
  decreaseQty(item: CartItem) { 
    item.quantity = item.quantity - 1;
    
    if (item.quantity === 0) {
      this.removeItem(item);
    }
  }
  
  removeItem(item: CartItem) {
    this.items.splice(this.items.indexOf(item), 1);
    
    // Publicando a mensagens para os ouvintes
    this.notificationService.notify(`Você removeu o item ${item.menuItem.name}`)
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
